import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_SWITZERLAND = defineTippingCountry({
  slug: 'switzerland',
  countryCode: 'CH',
  region: 'europe',
  flag: '🇨🇭',
  title: copy('瑞士小费速查', 'Tipping in Switzerland'),
  description: copy('瑞士通常是小额补充或凑整，账单里有时已含服务费。', 'In Switzerland, a small add-on or round-up is common, and service is sometimes already included.'),
  headlineRule: copy('瑞士通常是小额补充或凑整。', 'A small add-on or round-up is common in Switzerland.'),
  rules: {
    restaurant: copy('坐桌餐厅常见凑整或少量百分比。', 'At sit-down restaurants, rounding up or a small percentage is common.'),
    cafe: copy('咖啡馆通常凑整即可。', 'Cafes usually only need a round-up.'),
    bar: copy('酒吧一般留一点零钱。', 'Bars usually only need a little change.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或司机可给少量现金。', 'Guides or drivers can receive a small cash tip.'),
    porter: copy('行李员通常给少量零钱。', 'Porters usually only need a small coin tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not need an extra tip.'),
  },
  notes: [
    copy('看账单有没有 service included 或类似项。', 'Check the bill for a service-included line or similar.'),
    copy('在瑞士，小额补充比大比例更常见。', 'In Switzerland, a small add-on is more common than a large percentage.'),
  ],
  sources: [
    source('Wikivoyage：瑞士', 'Wikivoyage: Switzerland', 'https://en.wikivoyage.org/wiki/Switzerland'),
    source('World Travel Guide：瑞士', 'World Travel Guide: Switzerland', 'https://www.worldtravelguide.net/guides/europe/switzerland/'),
  ],
  lastReviewed: '2026-03-19',
})
