export const manifestJson = JSON.stringify({
  name: 'Tiny Currency',
  short_name: 'Currency',
  description: 'Lightweight currency converter for travelers',
  start_url: '/',
  display: 'standalone',
  background_color: '#0c0a09',
  theme_color: '#f97316',
  icons: [
    { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
  ],
});
