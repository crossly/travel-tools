import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_AUSTRIA = defineTippingCountry({
  slug: 'austria',
  countryCode: 'AT',
  region: 'europe',
  flag: '🇦🇹',
  title: copy('奥地利小费速查', 'Tipping in Austria'),
  description: copy('奥地利常见做法是凑整或留一点零钱，餐厅一般按小比例看待。', 'In Austria, rounding up or leaving a little change is common, while restaurants usually see a small percentage.'),
  headlineRule: copy('奥地利常见凑整或留一点零钱。', 'Rounding up or leaving a little change is common in Austria.'),
  rules: {
    restaurant: copy('坐桌餐厅常见 5% 到 10% 或直接凑整。', 'At sit-down restaurants, 5% to 10% or rounding up is common.'),
    cafe: copy('咖啡馆通常凑整即可。', 'Cafes usually only need a round-up.'),
    bar: copy('酒吧一般留一点零钱就够。', 'Bars usually only need a small change tip.'),
    taxi: copy('出租车可直接凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can be thanked with a small cash amount.'),
    guide: copy('导游或司机可给少量现金。', 'Guides or drivers can receive a small cash tip.'),
    porter: copy('行李员通常给少量零钱。', 'Porters usually get a small coin tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not need an extra tip.'),
  },
  notes: [
    copy('在维也纳和旅游区，餐厅会更习惯小额现金。', 'In Vienna and tourist areas, restaurants are more used to small cash tips.'),
    copy('如果账单已经把服务费写进去了，就别重复加太多。', 'If service is already reflected in the bill, do not add much more.'),
  ],
  sources: [
    source('Wikivoyage：奥地利', 'Wikivoyage: Austria', 'https://en.wikivoyage.org/wiki/Austria'),
    source('World Travel Guide：奥地利', 'World Travel Guide: Austria', 'https://www.worldtravelguide.net/guides/europe/austria/'),
  ],
  lastReviewed: '2026-03-19',
})
