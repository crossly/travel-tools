import { raw } from 'hono/html';
import type { FC, PropsWithChildren } from 'hono/jsx';
import { BUILD_VERSION } from '../lib/version';

const css = raw(`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #ffffff; --bg-secondary: #f8fafc; --text: #0f172a; --text-secondary: #64748b;
    --border: #e2e8f0; --accent: #3b82f6; --accent-hover: #2563eb;
    --radius: 12px; --shadow: 0 1px 3px rgba(0,0,0,0.1);
    color-scheme: light dark;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0f172a; --bg-secondary: #1e293b; --text: #f1f5f9; --text-secondary: #94a3b8;
      --border: #334155; --accent: #60a5fa; --accent-hover: #3b82f6;
      --shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    background: var(--bg); color: var(--text);
    min-height: 100dvh; display: flex; flex-direction: column;
    -webkit-font-smoothing: antialiased;
  }
  .container {
    max-width: 480px; width: 100%; margin: 0 auto; flex: 1;
    padding: 24px 16px;
    padding-top: max(24px, env(safe-area-inset-top));
    padding-bottom: max(24px, env(safe-area-inset-bottom));
  }
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 14px 24px; border-radius: var(--radius); border: none;
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
    outline: none; transition: border-color 0.15s ease;
  }
  input:focus, select:focus { border-color: var(--accent); }
  .currency-option { border-left: 3px solid transparent; }
  .currency-option:hover { background: var(--bg) !important; }
  .currency-option.selected {
    background: #2563eb !important; color: #fff !important;
    border-left-color: #1d4ed8;
  }
  .currency-option.selected * { color: #fff !important; }
  .fade-in { animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
`);

export const Layout: FC<PropsWithChildren<{ title?: string }>> = ({ children, title }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <title>{title || 'Tiny Currency'}</title>
      <meta name="description" content="Lightweight currency converter for travelers" />
      <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
      <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
      {raw('<link rel="apple-touch-icon" href="/icons/icon.svg"/>')}
      <style>{css}</style>
    </head>
    <body>
      <div class="container fade-in">
        {children}
        <div style="text-align: center; padding-top: 24px; padding-bottom: 8px; font-size: 11px; color: var(--text-secondary); opacity: 0.5;">
          {BUILD_VERSION}
        </div>
      </div>
      <script src="/static/app.js"></script>
    </body>
  </html>
);
