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
    var val = parseFloat(input.value.replace(/,/g, '')) || 0; if (!isFinite(val) || val < 0) val = 0;
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
      .catch(function() {
        document.getElementById('rate-time').textContent = 'Update failed';
        document.getElementById('rate-time').style.color = 'var(--accent)';
      });
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
    var oldRate = getRate();
    var tmp = source; source = target; target = tmp;
    localStorage.setItem('tc_source', source);
    localStorage.setItem('tc_target', target);
    if (oldRate) {
      rates = { base: source, rates: {} };
      rates.rates[target] = 1 / oldRate;
      updateDisplay();
      fetchRates();
    } else {
      rates = {};
      updateDisplay();
      fetchRates();
    }
  });

  document.getElementById('settings-btn').addEventListener('click', function() {
    if (!confirm('Reset currency settings?')) return;
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
      <div id="app-home" style="flex: 1; display: flex; flex-direction: column; padding-top: 48px;">

        {/* Settings — top right, absolute */}
        <div style="position: fixed; top: 0; right: 0; padding: max(12px, var(--safe-top)) max(12px, var(--safe-right)) 0 0; z-index: 10;">
          <button id="settings-btn" style="background: none; border: none; cursor: pointer; padding: 6px; color: var(--text-secondary); transition: color 0.15s;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>

        {/* Source section */}
        <div id="source-section" style="padding: 0 0 16px;">
          <button id="source-area" style="display: flex; align-items: center; gap: 6px; background: none; border: none; cursor: pointer; padding: 0; color: var(--text-secondary); font-family: var(--font-body); font-size: 14px; font-weight: 500; margin-bottom: 8px; letter-spacing: 0.02em;">
            <span id="source-flag" style="font-size: 18px;">💱</span>
            <span id="source-code" style="font-weight: 600; color: var(--text);">---</span>
            <span id="source-symbol" style="opacity: 0.6;"></span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.4;"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <input
            type="text"
            id="amount-input"
            inputmode="decimal"
            placeholder="0"
            autocomplete="off"
            style="font-family: var(--font-display); font-size: 48px; font-weight: 500; border: none; background: transparent; padding: 0; width: 100%; letter-spacing: -1.5px; color: var(--text); caret-color: var(--accent);"
          />
        </div>

        {/* Divider with swap */}
        <div style="display: flex; align-items: center; gap: 12px; padding: 4px 0;">
          <div style="flex: 1; height: 1px; background: var(--border);"></div>
          <button id="swap-btn" style="background: var(--bg-secondary); color: var(--text-secondary); border: 1px solid var(--border); width: 36px; height: 36px; border-radius: 50%; font-size: 14px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
          </button>
          <div style="flex: 1; height: 1px; background: var(--border);"></div>
        </div>

        {/* Target section */}
        <div id="target-section" style="padding: 16px 0 0;">
          <button id="target-area" style="display: flex; align-items: center; gap: 6px; background: none; border: none; cursor: pointer; padding: 0; color: var(--text-secondary); font-family: var(--font-body); font-size: 14px; font-weight: 500; margin-bottom: 8px; letter-spacing: 0.02em;">
            <span id="target-flag" style="font-size: 18px;">💱</span>
            <span id="target-code" style="font-weight: 600; color: var(--text);">---</span>
            <span id="target-symbol" style="opacity: 0.6;"></span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.4;"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div id="result" class="num" style="font-size: 48px; font-weight: 500; letter-spacing: -1.5px; min-height: 58px; color: var(--accent);">
            0
          </div>
        </div>

        {/* Rate info */}
        <div style="color: var(--text-secondary); font-size: 12px; padding: 16px 0 0; display: flex; align-items: center; gap: 8px;">
          <span id="rate-info" class="num" style="opacity: 0.6;">1 <span id="rate-source">---</span> = <span id="rate-value">---</span> <span id="rate-target">---</span></span>
          <span id="rate-time" style="opacity: 0.4; font-size: 11px;"></span>
        </div>
      </div>

      {/* Currency Picker Modal */}
      <div id="currency-modal" class="picker-modal">
        <div id="currency-modal-backdrop" class="picker-backdrop"></div>
        <div class="picker-sheet">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px 12px;">
            <h2 id="picker-title" style="font-size: 16px; font-weight: 700;">Select currency</h2>
            <button id="picker-close" style="background: none; border: none; font-size: 20px; cursor: pointer; padding: 4px; color: var(--text-secondary); line-height: 1;">✕</button>
          </div>
          <div style="padding: 0 20px 12px;">
            <input type="text" id="picker-search" placeholder="Search currency..." autocomplete="off" style="margin: 0; font-size: 15px;" />
          </div>
          <div id="picker-list" style="overflow-y: auto; padding: 0 12px 20px; padding-bottom: max(20px, var(--safe-bottom)); flex: 1;">
          </div>
        </div>
      </div>

      <script>{homeScript}</script>
      <style>{raw(`
        #amount-input::placeholder { color: var(--text-secondary); opacity: 0.3; }
        #swap-btn:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
        #swap-btn:active { transform: scale(0.92); }
        #settings-btn:hover { color: var(--text); }
        .picker-modal {
          position: fixed; inset: 0; z-index: 100;
          display: flex; flex-direction: column; justify-content: flex-end;
          pointer-events: none; opacity: 0;
          transition: opacity 0.2s ease;
        }
        .picker-modal.open { pointer-events: auto; opacity: 1; }
        .picker-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
        .picker-sheet {
          position: relative; background: var(--bg-secondary); border-radius: 20px 20px 0 0;
          max-height: 70vh; display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 -4px 32px rgba(0,0,0,0.12);
        }
        .picker-modal.open .picker-sheet { transform: translateY(0); }
        .picker-item {
          display: flex; align-items: center; gap: 12px; padding: 12px 8px;
          cursor: pointer; border-radius: 12px; border: none; background: none;
          width: 100%; text-align: left; color: var(--text); font-family: var(--font-body);
          font-size: 15px; transition: background 0.1s;
        }
        .picker-item:active { background: var(--border); }
        .picker-selected { background: var(--accent) !important; color: #fff; }
        .picker-selected span { color: #fff !important; }
      `)}</style>
    </Layout>
  );
};
