import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_NETHERLANDS = defineTippingCountry({
  slug: 'netherlands',
  countryCode: 'NL',
  region: 'europe',
  flag: '🇳🇱',
  title: copy('荷兰小费速查', 'Tipping in the Netherlands'),
  description: copy('荷兰通常是凑整或留一点零钱，餐厅并不强求大比例。', 'In the Netherlands, rounding up or leaving a little change is common, and large percentages are not usually expected.'),
  headlineRule: copy('荷兰通常是凑整或留一点零钱。', 'Rounding up or leaving a little change is common in the Netherlands.'),
  rules: {
    restaurant: copy('坐桌餐厅常见凑整或 5% 左右。', 'At sit-down restaurants, rounding up or around 5% is common.'),
    cafe: copy('咖啡馆通常只要凑整。', 'Cafes usually only need a round-up.'),
    bar: copy('酒吧留一点零钱就够。', 'Bars usually only need a little change.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或司机可给少量现金。', 'Guides or drivers can receive a small cash tip.'),
    porter: copy('行李员通常给少量零钱。', 'Porters usually only need a small coin tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not need an extra tip.'),
  },
  notes: [
    copy('在阿姆斯特丹和旅游点，餐厅会更熟悉小额小费。', 'In Amsterdam and tourist areas, restaurants are more used to small tips.'),
    copy('如果账单里没有服务费，再考虑是否凑整。', 'If no service charge is on the bill, decide whether to round up.'),
  ],
  sources: [
    source('Wikivoyage：荷兰', 'Wikivoyage: Netherlands', 'https://en.wikivoyage.org/wiki/Netherlands'),
    source('World Travel Guide：荷兰', 'World Travel Guide: Netherlands', 'https://www.worldtravelguide.net/guides/europe/netherlands/'),
  ],
  lastReviewed: '2026-03-19',
})
