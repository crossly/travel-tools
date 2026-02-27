import { raw } from 'hono/html';
import type { Context } from 'hono';
import { Layout } from '../components/layout';
import { currencyInfo, supportedCurrencies } from '../lib/currencies';

const currencyInfoJson = JSON.stringify(
  Object.fromEntries(
    Object.entries(currencyInfo).map(([k, v]) => [k, { flag: v.flag, name: v.name, symbol: v.symbol }])
  )
);

const currencyListJson = JSON.stringify(supportedCurrencies);

const homeScript = raw(`
(function() {
  if (!localStorage.getItem('tc_setup_done')) {
    window.location.href = '/setup';
    return;
  }

  var source = localStorage.getItem('tc_source') || 'USD';
  var target = localStorage.getItem('tc_target') || 'EUR';
  var rates = JSON.parse(localStorage.getItem('tc_rates') || '{}');
  var rateUpdatedAt = localStorage.getItem('tc_rates_updated') || '';
  var currencyData = ${currencyInfoJson};
  var allCurrencies = ${currencyListJson};
  var pickerTarget = null; // 'source' or 'target'

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
      result.textContent = formatNumber(val * rate);
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
    document.getElementById('rate-value').textContent = rate
      ? (rate >= 1 ? rate.toFixed(4) : rate.toFixed(6))
      : '---';
    if (rateUpdatedAt) {
      var d = new Date(rateUpdatedAt);
      document.getElementById('rate-time').textContent = 'Updated ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

  // --- Currency Picker ---
  function openPicker(which) {
    pickerTarget = which;
    var modal = document.getElementById('currency-modal');
    var title = document.getElementById('picker-title');
    title.textContent = which === 'source' ? 'Source currency' : 'Target currency';
    var search = document.getElementById('picker-search');
    search.value = '';
    renderPickerList('');
    modal.classList.add('open');
    setTimeout(function() { search.focus(); }, 100);
  }

  function closePicker() {
    document.getElementById('currency-modal').classList.remove('open');
    pickerTarget = null;
  }

  function renderPickerList(query) {
    var list = document.getElementById('picker-list');
    var current = pickerTarget === 'source' ? source : target;
    var q = query.toLowerCase();
    var html = '';
    for (var i = 0; i < allCurrencies.length; i++) {
      var code = allCurrencies[i];
      var info = getCurrencyInfo(code);
      var text = (code + ' ' + info.name).toLowerCase();
      if (q && text.indexOf(q) === -1) continue;
      var selected = code === current ? ' picker-selected' : '';
      html += '<button class="picker-item' + selected + '" data-code="' + code + '">'
        + '<span style="font-size:24px">' + info.flag + '</span>'
        + '<div><span style="font-weight:600">' + code + '</span>'
        + '<span style="color:var(--text-secondary);font-size:13px;margin-left:8px">' + info.name + '</span></div>'
        + '</button>';
    }
    list.innerHTML = html;
  }

  function selectCurrency(code) {
    if (pickerTarget === 'source' && code !== source) {
      source = code;
      localStorage.setItem('tc_source', source);
      rates = {};
      updateDisplay();
      fetchRates();
    } else if (pickerTarget === 'target' && code !== target) {
      target = code;
      localStorage.setItem('tc_target', target);
      updateDisplay();
    }
    closePicker();
  }

  document.getElementById('amount-input').addEventListener('input', convert);

  document.getElementById('swap-btn').addEventListener('click', function() {
    this.style.transform = 'rotate(180deg)';
    var btn = this;
    setTimeout(function() { btn.style.transform = ''; }, 200);
    var tmp = source; source = target; target = tmp;
    localStorage.setItem('tc_source', source);
    localStorage.setItem('tc_target', target);
    rates = {};
    updateDisplay();
    fetchRates();
  });

  document.getElementById('settings-btn').addEventListener('click', function() {
    localStorage.removeItem('tc_setup_done');
    window.location.href = '/setup';
  });

  document.getElementById('source-area').addEventListener('click', function() { openPicker('source'); });
  document.getElementById('target-area').addEventListener('click', function() { openPicker('target'); });
  document.getElementById('picker-close').addEventListener('click', closePicker);
  document.getElementById('currency-modal-backdrop').addEventListener('click', closePicker);

  document.getElementById('picker-search').addEventListener('input', function(e) {
    renderPickerList(e.target.value);
  });

  document.getElementById('picker-list').addEventListener('click', function(e) {
    var item = e.target.closest('.picker-item');
    if (item) selectCurrency(item.dataset.code);
  });

  updateDisplay();
  fetchRates();
})();
`);

export const homePage = (c: Context) => {
  return c.html(
    <Layout title="Tiny Currency">
      <div id="app-home">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h1 style="font-size: 20px; font-weight: 700;">💱 Tiny Currency</h1>
          <button id="settings-btn" style="background: none; border: none; font-size: 20px; cursor: pointer; padding: 4px;">⚙️</button>
        </div>

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

        <div style="display: flex; justify-content: center; margin: -6px 0;">
          <button id="swap-btn" style="background: var(--accent); color: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 18px; cursor: pointer; z-index: 1; box-shadow: var(--shadow); transition: transform 0.2s ease; display: flex; align-items: center; justify-content: center;">
            ⇅
          </button>
        </div>

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

        <div style="text-align: center; color: var(--text-secondary); font-size: 13px;">
          <div id="rate-info">1 <span id="rate-source">---</span> = <span id="rate-value">---</span> <span id="rate-target">---</span></div>
          <div id="rate-time" style="margin-top: 4px; font-size: 11px;"></div>
        </div>
      </div>

      {/* Currency Picker Modal */}
      <div id="currency-modal" style="position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column; justify-content: flex-end; pointer-events: none; opacity: 0; transition: opacity 0.2s ease;">
        <div id="currency-modal-backdrop" style="position: absolute; inset: 0; background: rgba(0,0,0,0.4);"></div>
        <div style="position: relative; background: var(--card-bg); border-radius: 20px 20px 0 0; max-height: 70vh; display: flex; flex-direction: column; transform: translateY(100%); transition: transform 0.3s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px 8px;">
            <h2 id="picker-title" style="font-size: 17px; font-weight: 700;">Select currency</h2>
            <button id="picker-close" style="background: none; border: none; font-size: 22px; cursor: pointer; padding: 4px; color: var(--text-secondary);">✕</button>
          </div>
          <div style="padding: 0 20px 12px;">
            <input type="text" id="picker-search" placeholder="Search currency..." autocomplete="off" style="margin: 0;" />
          </div>
          <div id="picker-list" style="overflow-y: auto; padding: 0 12px 20px; flex: 1;">
          </div>
        </div>
      </div>

      <script>{homeScript}</script>
      <style>{raw(`
        #currency-modal.open { pointer-events: auto; opacity: 1; }
        #currency-modal.open > div:last-child { transform: translateY(0); }
        .picker-item { display: flex; align-items: center; gap: 12px; padding: 12px 8px; cursor: pointer; border-radius: 10px; border: none; background: none; width: 100%; text-align: left; color: var(--text); font-size: 15px; transition: background 0.1s; }
        .picker-item:active { background: var(--border); }
        .picker-selected { background: var(--accent); color: #fff; }
        .picker-selected span { color: #fff !important; }
      `)}</style>
    </Layout>
  );
};
