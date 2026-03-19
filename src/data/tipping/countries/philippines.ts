import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_PHILIPPINES = defineTippingCountry({
  slug: 'philippines',
  countryCode: 'PH',
  region: 'asia',
  flag: '🇵🇭',
  title: copy('菲律宾小费速查', 'Tipping in the Philippines'),
  description: copy('菲律宾很多服务场景会给少量现金，尤其是餐厅、酒店和导游。', 'Small cash tips are common in the Philippines, especially at restaurants, hotels, and for guides.'),
  headlineRule: copy('菲律宾很多服务场景会给少量现金。', 'Small cash tips are common in the Philippines.'),
  rules: {
    restaurant: copy('餐厅常见 10% 左右，先看账单是否已经含服务费。', 'Restaurants often see around 10%, but check whether service charge is already included.'),
    cafe: copy('咖啡馆可留少量零钱。', 'At cafes, a small coin tip is enough.'),
    bar: copy('酒吧可留少量现金。', 'Bars can usually be tipped with a small cash amount.'),
    taxi: copy('出租车通常凑整或留少量零钞。', 'Taxis are usually rounded up or given small change.'),
    hotel: copy('酒店行李和客房服务常见小费。', 'Hotel porters and housekeeping commonly receive tips.'),
    guide: copy('导游或包车司机通常会期待现金小费。', 'Guides or private drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖或送餐可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('现金最灵活，尤其是岛屿和旅游区。', 'Cash is the most flexible option, especially on islands and in tourist areas.'),
    copy('如果账单里已有 service charge，先别重复算太高。', 'If service charge is already on the bill, do not tip too heavily on top.'),
  ],
  sources: [
    source('Wikivoyage：菲律宾', 'Wikivoyage: Philippines', 'https://en.wikivoyage.org/wiki/Philippines'),
    source('World Travel Guide：菲律宾', 'World Travel Guide: Philippines', 'https://www.worldtravelguide.net/guides/asia/philippines/'),
  ],
  lastReviewed: '2026-03-19',
})
