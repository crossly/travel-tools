import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_PORTUGAL = defineTippingCountry({
  slug: 'portugal',
  countryCode: 'PT',
  region: 'europe',
  flag: '🇵🇹',
  title: copy('葡萄牙小费速查', 'Tipping in Portugal'),
  description: copy('葡萄牙常见做法是留一点零钱或少量百分比，旅游区更常见。', 'In Portugal, leaving a little change or a small percentage is common, especially in tourist areas.'),
  headlineRule: copy('葡萄牙常见留一点零钱或少量百分比。', 'Leaving a little change or a small percentage is common in Portugal.'),
  rules: {
    restaurant: copy('坐桌餐厅常见 5% 左右或凑整。', 'At sit-down restaurants, around 5% or a round-up is common.'),
    cafe: copy('咖啡馆通常留一点零钱。', 'Cafes usually only need a little change.'),
    bar: copy('酒吧可留少量现金。', 'Bars can be tipped with a small cash amount.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或司机可给少量现金。', 'Guides or drivers can receive a small cash tip.'),
    porter: copy('行李员通常给少量零钱。', 'Porters usually only need a small coin tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not need an extra tip.'),
  },
  notes: [
    copy('在里斯本和海边城市，凑整很常见。', 'In Lisbon and coastal cities, rounding up is common.'),
    copy('如果账单有服务项，再补一点就够。', 'If a service item is already on the bill, only add a little more.'),
  ],
  sources: [
    source('Wikivoyage：葡萄牙', 'Wikivoyage: Portugal', 'https://en.wikivoyage.org/wiki/Portugal'),
    source('World Travel Guide：葡萄牙', 'World Travel Guide: Portugal', 'https://www.worldtravelguide.net/guides/europe/portugal/'),
  ],
  lastReviewed: '2026-03-19',
})
