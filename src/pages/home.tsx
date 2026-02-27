import type { Context } from 'hono';
import { Layout } from '../components/layout';
import { currencyInfo } from '../lib/currencies';

// Build a slim lookup for the frontend
const currencyInfoJson = JSON.stringify(
  Object.fromEntries(
    Object.entries(currencyInfo).map(([k, v]) => [k, { flag: v.flag, name: v.name, symbol: v.symbol }])
  )
);

export const homePage = (c: Context) => {
  return c.html(
    <Layout title="Tiny Currency">
      <div id="app-home">
        {/* Header */}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h1 style="font-size: 20px; font-weight: 700;">💱 Tiny Currency</h1>
          <button id="settings-btn" style="background: none; border: none; font-size: 20px; cursor: pointer; padding: 4px;">⚙️</button>
        </div>

        {/* Source Currency */}
        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <button id="source-area" style="display: flex; align-items: center; gap: 8px; background: none; border: none; cursor: pointer; padding: 0; color: var(--text);">
              <span id="source-flag" style="font-size: 28px;">💱</span>
              <span id="source-code" style="font-size: 18px; font-weight: 700;">---</span>
            </button>
            <span id="source-symbol" style="color: var(--text-secondary); font-size: 14px;"></span>
          </div>
          <input
            type="text"
            id="amount-input"
            inputmode="decimal"
            placeholder="0"
            autocomplete="off"
            style="font-size: 36px; font-weight: 700; border: none; background: transparent; padding: 0; text-align: right; letter-spacing: -0.5px;"
          />
        </div>

        {/* Swap Button */}
        <div style="display: flex; justify-content: center; margin: -6px 0;">
          <button id="swap-btn" style="background: var(--accent); color: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 18px; cursor: pointer; z-index: 1; box-shadow: var(--shadow); transition: transform 0.2s ease; display: flex; align-items: center; justify-content: center;">
            ⇅
          </button>
        </div>

        {/* Target Currency */}
        <div class="card" style="margin-top: -6px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <button id="target-area" style="display: flex; align-items: center; gap: 8px; background: none; border: none; cursor: pointer; padding: 0; color: var(--text);">
              <span id="target-flag" style="font-size: 28px;">💱</span>
              <span id="target-code" style="font-size: 18px; font-weight: 700;">---</span>
            </button>
            <span id="target-symbol" style="color: var(--text-secondary); font-size: 14px;"></span>
          </div>
          <div id="result" style="font-size: 36px; font-weight: 700; text-align: right; letter-spacing: -0.5px; min-height: 44px; color: var(--accent);">
            0
          </div>
        </div>

        {/* Rate Info */}
        <div style="text-align: center; color: var(--text-secondary); font-size: 13px;">
          <div id="rate-info">1 <span id="rate-source">---</span> = <span id="rate-value">---</span> <span id="rate-target">---</span></div>
          <div id="rate-time" style="margin-top: 4px; font-size: 11px;"></div>
        </div>
      </div>

      <script>{`
        (function() {
          // Redirect to setup if not configured
          if (!localStorage.getItem('tc_setup_done')) {
            window.location.href = '/setup';
            return;
          }

          var source = localStorage.getItem('tc_source') || 'USD';
          var target = localStorage.getItem('tc_target') || 'EUR';
          var rates = JSON.parse(localStorage.getItem('tc_rates') || '{}');
          var rateUpdatedAt = localStorage.getItem('tc_rates_updated') || '';

          // Currency info (injected at render time)
          var currencyData = ${currencyInfoJson};

          function getCurrencyInfo(code) {
            return currencyData[code] || { flag: '💱', symbol: code, name: code };
          }

          function updateDisplay() {
            var info_s = getCurrencyInfo(source);
            var info_t = getCurrencyInfo(target);
            document.getElementById('source-flag').textContent = info_s.flag;
            document.getElementById('source-code').textContent = source;
            document.getElementById('source-symbol').textContent = info_s.name;
            document.getElementById('target-flag').textContent = info_t.flag;
            document.getElementById('target-code').textContent = target;
            document.getElementById('target-symbol').textContent = info_t.name;
            document.getElementById('rate-source').textContent = source;
            document.getElementById('rate-target').textContent = target;
            convert();
            updateRateDisplay();
          }

          function getRate() {
            if (rates && rates.base === source && rates.rates && rates.rates[target]) {
              return rates.rates[target];
            }
            return null;
          }

          function convert() {
            var input = document.getElementById('amount-input');
            var val = parseFloat(input.value.replace(/,/g, '')) || 0;
            var rate = getRate();
            var result = document.getElementById('result');
            if (rate && val > 0) {
              var converted = val * rate;
              result.textContent = formatNumber(converted);
            } else if (val === 0) {
              result.textContent = '0';
            } else {
              result.textContent = '...';
            }
          }

          function formatNumber(n) {
            if (n >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
            if (n >= 1) return n.toFixed(2);
            return n.toFixed(4);
          }

          function updateRateDisplay() {
            var rate = getRate();
            var rateValueEl = document.getElementById('rate-value');
            var rateTimeEl = document.getElementById('rate-time');
            if (rate) {
              rateValueEl.textContent = rate >= 1 ? rate.toFixed(4) : rate.toFixed(6);
            } else {
              rateValueEl.textContent = '---';
            }
            if (rateUpdatedAt) {
              var d = new Date(rateUpdatedAt);
              rateTimeEl.textContent = 'Updated ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
          }

          function fetchRates() {
            fetch('/api/rates?base=' + source)
              .then(function(r) { return r.json(); })
              .then(function(data) {
                if (data.rates) {
                  rates = data;
                  rateUpdatedAt = data.updatedAt || new Date().toISOString();
                  localStorage.setItem('tc_rates', JSON.stringify(data));
                  localStorage.setItem('tc_rates_updated', rateUpdatedAt);
                  convert();
                  updateRateDisplay();
                }
              })
              .catch(function() {});
          }

          // Input handler
          document.getElementById('amount-input').addEventListener('input', convert);

          // Swap
          document.getElementById('swap-btn').addEventListener('click', function() {
            this.style.transform = 'rotate(180deg)';
            setTimeout(function() { document.getElementById('swap-btn').style.transform = ''; }, 200);
            var tmp = source;
            source = target;
            target = tmp;
            localStorage.setItem('tc_source', source);
            localStorage.setItem('tc_target', target);
            rates = {};
            updateDisplay();
            fetchRates();
          });

          // Settings
          document.getElementById('settings-btn').addEventListener('click', function() {
            localStorage.removeItem('tc_setup_done');
            window.location.href = '/setup';
          });

          // Init
          updateDisplay();
          fetchRates();
        })();
      `}</script>
    </Layout>
  );
};
