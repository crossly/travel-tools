import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_PERU = defineTippingCountry({
  slug: 'peru',
  countryCode: 'PE',
  region: 'americas',
  flag: '🇵🇪',
  title: copy('秘鲁小费速查', 'Tipping in Peru'),
  description: copy('秘鲁常见做法是留少量现金，餐厅和导游最常见。', 'In Peru, small cash tips are common, especially at restaurants and for guides.'),
  headlineRule: copy('秘鲁常见少量现金小费。', 'Small cash tips are common in Peru.'),
  rules: {
    restaurant: copy('餐厅常见 10% 左右或凑整。', 'Restaurants commonly see around 10% or a round-up.'),
    cafe: copy('咖啡馆可留少量零钱。', 'Cafes can receive a small change tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或包车司机通常会期待现金小费。', 'Guides or private drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('马丘比丘和高地线路上的导游更常见小费。', 'Guides on Machu Picchu and highland routes are more tip-friendly.'),
    copy('如果账单有服务费，再多一点小额现金就够。', 'If a service charge is already on the bill, only add a small amount more.'),
  ],
  sources: [
    source('Wikivoyage：秘鲁', 'Wikivoyage: Peru', 'https://en.wikivoyage.org/wiki/Peru'),
    source('World Travel Guide：秘鲁', 'World Travel Guide: Peru', 'https://www.worldtravelguide.net/guides/south-america/peru/'),
  ],
  lastReviewed: '2026-03-19',
})
