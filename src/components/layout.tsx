import { raw } from 'hono/html';
import type { FC, PropsWithChildren } from 'hono/jsx';
import { BUILD_VERSION } from '../lib/version';

const css = raw(`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #fafaf9; --bg-secondary: #ffffff; --text: #1c1917; --text-secondary: #a8a29e;
    --border: #e7e5e4; --accent: #f97316; --accent-hover: #ea580c; --accent-soft: #fff7ed;
    --radius: 16px; --shadow: 0 1px 2px rgba(0,0,0,0.04);
    --font-display: 'DM Mono', 'SF Mono', 'Fira Code', monospace;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    --safe-top: env(safe-area-inset-top, 0px);
    --safe-bottom: env(safe-area-inset-bottom, 0px);
    --safe-left: env(safe-area-inset-left, 0px);
    --safe-right: env(safe-area-inset-right, 0px);
    color-scheme: light dark;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0c0a09; --bg-secondary: #1c1917; --text: #fafaf9; --text-secondary: #78716c;
      --border: #292524; --accent: #fb923c; --accent-hover: #f97316; --accent-soft: #1c1410;
      --shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
  }
  body {
    font-family: var(--font-body);
    background: var(--bg); color: var(--text);
    min-height: 100dvh; display: flex; flex-direction: column;
    -webkit-font-smoothing: antialiased;
  }
  .container {
    max-width: 480px; width: 100%; margin: 0 auto; flex: 1;
    display: flex; flex-direction: column;
    padding: 16px;
    padding-top: max(16px, var(--safe-top));
    padding-bottom: max(16px, var(--safe-bottom));
    padding-left: max(16px, var(--safe-left));
    padding-right: max(16px, var(--safe-right));
    min-height: 100dvh;
  }
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 14px 24px; border-radius: var(--radius); border: none;
    font-family: var(--font-body);
    font-size: 16px; font-weight: 600; cursor: pointer;
    transition: all 0.15s ease;
  }
  .btn-primary { background: var(--accent); color: #fff; width: 100%; }
  .btn-primary:hover { background: var(--accent-hover); }
  .btn-primary:active { transform: scale(0.98); }
  .card {
    background: var(--bg-secondary); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px;
    box-shadow: var(--shadow);
  }
  input, select {
    background: var(--bg-secondary); color: var(--text);
    border: 1px solid var(--border); border-radius: var(--radius);
    padding: 12px 16px; font-size: 16px; width: 100%;
    font-family: var(--font-body);
    outline: none; transition: border-color 0.15s ease;
  }
  input:focus, select:focus { border-color: var(--accent); }
  .currency-option { border-left: 3px solid transparent; }
  .currency-option:hover { background: var(--bg) !important; }
  .currency-option.selected {
    background: var(--accent) !important; color: #fff !important;
    border-left-color: var(--accent-hover);
  }
  .currency-option.selected * { color: #fff !important; }
  .fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  .num { font-family: var(--font-display); font-variant-numeric: tabular-nums; }
`);

export const Layout: FC<PropsWithChildren<{ title?: string }>> = ({ children, title }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      <title>{title || 'Tiny Currency'}</title>
      <meta name="description" content="Lightweight currency converter for travelers" />
      <meta name="theme-color" content="#0c0a09" media="(prefers-color-scheme: dark)" />
      <meta name="theme-color" content="#fafaf9" media="(prefers-color-scheme: light)" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
      {raw('<link rel="apple-touch-icon" href="/icons/icon.svg"/>')}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {raw('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />')}
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{css}</style>
    </head>
    <body>
      <div class="container fade-in">
        {children}
        <div id="build-footer" style="text-align: center; font-size: 10px; color: var(--text-secondary); opacity: 0.35; padding: 4px 0;">
          <span>{BUILD_VERSION}</span>
          <span id="detect-info"></span>
        </div>
        {raw(`<script>try{var d=JSON.parse(localStorage.getItem('tc_detect_info')||'{}');if(d.via){document.getElementById('detect-info').textContent=' · '+d.via+(d.via==='timezone'?' ('+d.tz+')':' ('+d.country+')');}}catch(e){}</script>`)}
      </div>
      <script src="/static/app.js"></script>
    </body>
  </html>
);
