import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_MEXICO = defineTippingCountry({
  slug: 'mexico',
  countryCode: 'MX',
  region: 'americas',
  flag: '🇲🇽',
  title: copy('墨西哥小费速查', 'Tipping in Mexico'),
  description: copy('墨西哥坐桌餐厅和酒店服务都常见小费，旅游区尤其明显。', 'In Mexico, sit-down restaurants and hotel services are commonly tipped, especially in tourist areas.'),
  headlineRule: copy('墨西哥坐桌餐厅和酒店服务常见小费。', 'Tips are common at Mexican sit-down restaurants and hotels.'),
  rules: {
    restaurant: copy('餐厅常见 10% 到 15%。', 'Restaurants commonly see 10% to 15%.'),
    cafe: copy('咖啡馆可留少量现金。', 'Cafes can receive a small cash tip.'),
    bar: copy('酒吧可留少量现金。', 'Bars can receive a small cash tip.'),
    taxi: copy('出租车通常凑整，网约车看平台规则。', 'Taxis are usually rounded up, while rideshares depend on the app.'),
    hotel: copy('酒店行李、客房和门童都常见小费。', 'Hotel porters, housekeeping, and concierge help are commonly tipped.'),
    guide: copy('导游或司机通常会期待现金小费。', 'Guides or drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖或送餐可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('旅游区和海边城市更习惯现金小费。', 'Tourist areas and beach cities are more tip-friendly.'),
    copy('如果账单里已经有 servicio 或 propina，再少量补就好。', 'If the bill already includes servicio or propina, only add a little more.'),
  ],
  sources: [
    source('Wikivoyage：墨西哥', 'Wikivoyage: Mexico', 'https://en.wikivoyage.org/wiki/Mexico'),
    source('World Travel Guide：墨西哥', 'World Travel Guide: Mexico', 'https://www.worldtravelguide.net/guides/north-america/mexico/'),
  ],
  lastReviewed: '2026-03-19',
})
