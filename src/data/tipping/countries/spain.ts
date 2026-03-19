import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_SPAIN = defineTippingCountry({
  slug: 'spain',
  countryCode: 'ES',
  region: 'europe',
  flag: '🇪🇸',
  title: copy('西班牙小费速查', 'Tipping in Spain'),
  description: copy('西班牙多数时候只要凑整或留一点零钱，餐厅常见少量补充。', 'In Spain, rounding up or leaving a little change is common, with small restaurant add-ons in some places.'),
  headlineRule: copy('西班牙多数时候只要凑整或留一点零钱。', 'Rounding up or leaving a little change is common in Spain.'),
  rules: {
    restaurant: copy('坐桌餐厅常见 5% 左右或直接凑整。', 'At sit-down restaurants, around 5% or a round-up is common.'),
    cafe: copy('咖啡馆通常留一点零钱。', 'Cafes usually only need a little change.'),
    bar: copy('酒吧通常不用额外给。', 'Bars usually do not expect an extra tip.'),
    taxi: copy('出租车可直接凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或司机可给少量现金。', 'Guides or drivers can receive a small cash tip.'),
    porter: copy('行李员通常给少量零钱。', 'Porters usually only need a small coin tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not need an extra tip.'),
  },
  notes: [
    copy('旅游区的坐桌餐厅更常见小费。', 'Sit-down restaurants in tourist areas are more tip-friendly.'),
    copy('如果账单有服务项，通常不需要再加很多。', 'If the bill already has a service item, usually do not add much more.'),
  ],
  sources: [
    source('Wikivoyage：西班牙', 'Wikivoyage: Spain', 'https://en.wikivoyage.org/wiki/Spain'),
    source('World Travel Guide：西班牙', 'World Travel Guide: Spain', 'https://www.worldtravelguide.net/guides/europe/spain/'),
  ],
  lastReviewed: '2026-03-19',
})
