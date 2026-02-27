export const manifestJson = JSON.stringify({
  name: 'Tiny Currency',
  short_name: 'Currency',
  description: 'Lightweight currency converter for travelers',
  start_url: '/',
  display: 'standalone',
  background_color: '#0f172a',
  theme_color: '#3b82f6',
  icons: [
    { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
  ],
});
