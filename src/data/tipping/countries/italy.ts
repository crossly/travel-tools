import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_ITALY = defineTippingCountry({
  slug: 'italy',
  countryCode: 'IT',
  region: 'europe',
  flag: '🇮🇹',
  title: copy('意大利小费速查', 'Tipping in Italy'),
  description: copy('意大利常见做法是看账单里的 coperto 或服务费，再决定要不要补一点。', 'In Italy, the usual move is to check for coperto or service charge before adding anything extra.'),
  headlineRule: copy('意大利先看账单里的 coperto 或服务费。', 'In Italy, check for coperto or service charge first.'),
  rules: {
    restaurant: copy('坐桌餐厅常见凑整或少量现金。', 'At sit-down restaurants, rounding up or a small cash tip is common.'),
    cafe: copy('咖啡馆通常不用给。', 'Cafes usually do not expect a tip.'),
    bar: copy('酒吧通常不用额外给。', 'Bars usually do not expect an extra tip.'),
    taxi: copy('出租车可凑整。', 'Taxis can usually be rounded up.'),
    hotel: copy('酒店行李或客房服务可给少量现金。', 'Hotel porters or housekeeping can receive a small cash tip.'),
    guide: copy('导游或司机若服务整天，可给少量现金。', 'For a full-day guide or driver, a small cash tip is reasonable.'),
    porter: copy('行李员通常给少量零钱。', 'Porters usually only need a small coin tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not need an extra tip.'),
  },
  notes: [
    copy('在旅游城市，凑整比大额更自然。', 'In tourist cities, rounding up feels more natural than leaving a large amount.'),
    copy('如果账单已经写了服务项，就少补一点即可。', 'If the bill already lists a service item, only add a little more.'),
  ],
  sources: [
    source('Wikivoyage：意大利', 'Wikivoyage: Italy', 'https://en.wikivoyage.org/wiki/Italy'),
    source('World Travel Guide：意大利', 'World Travel Guide: Italy', 'https://www.worldtravelguide.net/guides/europe/italy/'),
  ],
  lastReviewed: '2026-03-19',
})
