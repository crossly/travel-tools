import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_MAURITIUS = defineTippingCountry({
  slug: 'mauritius',
  countryCode: 'MU',
  region: 'africa',
  flag: '🇲🇺',
  title: copy('毛里求斯小费速查', 'Tipping in Mauritius'),
  description: copy('毛里求斯常见做法是看服务场景给少量现金，酒店和司机更常见。', 'In Mauritius, small cash tips are common depending on the setting, especially at hotels and for drivers.'),
  headlineRule: copy('毛里求斯常见少量现金小费。', 'Small cash tips are common in Mauritius.'),
  rules: {
    restaurant: copy('餐厅可留少量现金或凑整。', 'Restaurants can be tipped with a small cash amount or a round-up.'),
    cafe: copy('咖啡馆通常给少量零钱。', 'Cafes usually only need a small change tip.'),
    bar: copy('酒吧可给少量现金。', 'Bars can receive a small cash tip.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李、客房和门童常见小费。', 'Hotel porters, housekeeping, and concierge help are commonly tipped.'),
    guide: copy('导游或司机可给少量现金。', 'Guides or drivers can receive a small cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('度假村和海滩酒店更常见小费。', 'Resorts and beach hotels are more tip-friendly.'),
    copy('如果账单里已经有服务费，就只补少量。', 'If service charge is already on the bill, only add a little more.'),
  ],
  sources: [
    source('Wikivoyage：毛里求斯', 'Wikivoyage: Mauritius', 'https://en.wikivoyage.org/wiki/Mauritius'),
    source('World Travel Guide：毛里求斯', 'World Travel Guide: Mauritius', 'https://www.worldtravelguide.net/guides/africa/mauritius/'),
  ],
  lastReviewed: '2026-03-19',
})
