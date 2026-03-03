import { raw } from 'hono/html';
import type { Context } from 'hono';
import { Layout } from '../components/layout';
import { currencyInfo, supportedCurrencies } from '../lib/currencies';

const setupScript = raw(`
(function() {
  var selectedTarget = null;
  var detectedSource = null;

  var tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch(e) {}
  function readJsonOrEmpty(r) {
    return r.json().catch(function() { return {}; });
  }
  function isValidDetectPayload(data) {
    return data
      && typeof data.currency === 'string'
      && typeof data.flag === 'string'
      && typeof data.name === 'string';
  }

  fetch('/api/detect?tz=' + encodeURIComponent(tz)).then(function(r) {
    return readJsonOrEmpty(r).then(function(data) {
      if (!r.ok) throw new Error((data && data.error) || ('HTTP_' + r.status));
      if (!isValidDetectPayload(data)) throw new Error('invalid_detect_payload');
      return data;
    });
  }).then(function(data) {
    detectedSource = data.currency;
    document.getElementById('source-flag').textContent = data.flag;
    document.getElementById('source-code').textContent = data.currency;
    document.getElementById('source-name').textContent = data.name;
    localStorage.setItem('tc_detect_info', JSON.stringify({ via: data.detectedVia, tz: data.tz, country: data.country, tzCurrency: data.tzCurrency }));
  }).catch(function() {
    detectedSource = 'USD';
    document.getElementById('source-flag').textContent = '🇺🇸';
    document.getElementById('source-code').textContent = 'USD';
    document.getElementById('source-name').textContent = 'US Dollar';
  });

  document.getElementById('currency-search').addEventListener('input', function(e) {
    var q = e.target.value.toLowerCase();
    document.querySelectorAll('.currency-option').forEach(function(el) {
      var text = el.textContent.toLowerCase();
      el.style.display = text.includes(q) ? 'flex' : 'none';
    });
  });

  document.querySelectorAll('.currency-option').forEach(function(el) {
    el.addEventListener('click', function() {
      document.querySelectorAll('.currency-option').forEach(function(o) {
        o.classList.remove('selected');
      });
      el.classList.add('selected');
      selectedTarget = el.dataset.code;
      var btn = document.getElementById('confirm-btn');
      btn.disabled = false;
      btn.style.opacity = '1';
    });
  });

  document.getElementById('confirm-btn').addEventListener('click', function() {
    if (!selectedTarget) return;
    localStorage.setItem('tc_source', detectedSource || 'USD');
    localStorage.setItem('tc_target', selectedTarget);
    localStorage.setItem('tc_setup_done', 'true');
    window.location.href = '/';
  });
})();
`);

export const setupPage = (c: Context) => {
  const options = supportedCurrencies.map((code) => {
    const info = currencyInfo[code];
    return { code, flag: info.flag, name: info.name };
  });

  return c.html(
    <Layout title="Tiny Currency — Setup">
      <div style="text-align: center; padding-top: 20px;">
        <div style="font-size: 48px; margin-bottom: 8px;">💱</div>
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 4px;">Tiny Currency</h1>
        <p style="color: var(--text-secondary); margin-bottom: 32px;">Quick setup for your travels</p>
      </div>

      <div class="card" style="margin-bottom: 16px;">
        <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
          📍 Your current currency
        </label>
        <div id="source-currency" style="display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--bg); border-radius: var(--radius); border: 1px solid var(--border);">
          <span id="source-flag" style="font-size: 28px;">⏳</span>
          <div>
            <div id="source-code" style="font-weight: 600;">Detecting...</div>
            <div id="source-name" style="font-size: 13px; color: var(--text-secondary);">Based on your location</div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
          🏠 Your home currency
        </label>
        <div style="position: relative;">
          <input
            type="text"
            id="currency-search"
            placeholder="Search currency..."
            autocomplete="off"
            style="margin-bottom: 8px;"
          />
          <div id="currency-list" style="max-height: 240px; overflow-y: auto; border-radius: var(--radius);">
            {options.map(({ code, flag, name }) => (
              <div
                class="currency-option"
                data-code={code}
                style="display: flex; align-items: center; gap: 12px; padding: 12px; cursor: pointer; border-radius: 8px; transition: background 0.1s ease;"
              >
                <span style="font-size: 24px;">{flag}</span>
                <div>
                  <span style="font-weight: 600;">{code}</span>
                  <span style="color: var(--text-secondary); font-size: 13px; margin-left: 8px;">{name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button id="confirm-btn" class="btn btn-primary" disabled style="opacity: 0.5;">
        Start Converting ✈️
      </button>

      <script>{setupScript}</script>
    </Layout>
  );
};
