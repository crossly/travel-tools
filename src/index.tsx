import { Hono } from 'hono';
import { detectHandler } from './api/detect';
import { ratesHandler } from './api/rates';
import { cronHandler } from './lib/cron';
import { homePage } from './pages/home';
import { setupPage } from './pages/setup';
import { appJs } from './static/app';
import { swJs } from './static/sw';
import { manifestJson } from './static/manifest';
import { BUILD_VERSION } from './lib/version';

type Bindings = {
  RATES_KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

// Pages
app.get('/', homePage);
app.get('/setup', setupPage);

// API
app.get('/api/detect', detectHandler);
app.get('/api/rates', ratesHandler);

// Static assets
app.get('/static/app.js', (c) => {
  c.header('Content-Type', 'application/javascript');
  c.header('Cache-Control', 'public, max-age=86400');
  return c.text(appJs);
});
app.get('/sw.js', (c) => {
  c.header('Content-Type', 'application/javascript');
  c.header('Cache-Control', 'no-cache');
  return c.text(swJs(BUILD_VERSION));
});
app.get('/manifest.json', (c) => {
  c.header('Content-Type', 'application/json');
  c.header('Cache-Control', 'public, max-age=86400');
  return c.text(manifestJson);
});

// SVG icon for PWA
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#3b82f6"/>
  <text x="256" y="340" text-anchor="middle" font-size="280" font-family="sans-serif">💱</text>
</svg>`;
app.get('/icons/:filename', (c) => {
  c.header('Content-Type', 'image/svg+xml');
  c.header('Cache-Control', 'public, max-age=604800');
  return c.text(iconSvg);
});

export default {
  fetch: app.fetch,
  async scheduled(event: ScheduledEvent, env: Bindings, ctx: ExecutionContext) {
    ctx.waitUntil(cronHandler(env.RATES_KV));
  },
};
