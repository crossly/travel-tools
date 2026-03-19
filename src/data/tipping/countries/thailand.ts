import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_THAILAND = defineTippingCountry({
  slug: 'thailand',
  countryCode: 'TH',
  region: 'asia',
  flag: '🇹🇭',
  title: copy('泰国小费速查', 'Tipping in Thailand'),
  description: copy('泰国的旅游和酒店场景常见少量现金，餐厅则先看账单。', 'In Thailand, small cash tips are common in tourist and hotel settings, while restaurants should be checked bill first.'),
  headlineRule: copy('泰国旅游和酒店场景常见少量现金。', 'Small cash tips are common in Thai tourist and hotel settings.'),
  rules: {
    restaurant: copy('餐厅常见凑整或 5% 到 10%。', 'At restaurants, rounding up or 5% to 10% is common.'),
    cafe: copy('咖啡馆多半凑整即可。', 'Cafes usually only need a round-up.'),
    bar: copy('酒吧可给少量现金。', 'Bars can usually be tipped with a small cash amount.'),
    taxi: copy('出租车多半直接凑整。', 'Taxis are usually just rounded up.'),
    hotel: copy('酒店行李、客房和门童都常见小费。', 'Hotel porters, housekeeping, and concierge help are commonly tipped.'),
    guide: copy('导游或包车司机通常会期待现金小费。', 'Guides or private drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually receive a small cash tip.'),
    delivery: copy('外卖或送餐可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('旅游区的餐厅更可能接受小费。', 'Tourist-area restaurants are more likely to accept tips.'),
    copy('先看账单有没有服务费，再决定给多少。', 'Check the bill for a service charge before deciding how much to add.'),
  ],
  sources: [
    source('Wikivoyage：泰国', 'Wikivoyage: Thailand', 'https://en.wikivoyage.org/wiki/Thailand'),
    source('World Travel Guide：泰国', 'World Travel Guide: Thailand', 'https://www.worldtravelguide.net/guides/asia/thailand/'),
  ],
  lastReviewed: '2026-03-19',
})
