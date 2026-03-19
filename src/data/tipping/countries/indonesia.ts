import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_INDONESIA = defineTippingCountry({
  slug: 'indonesia',
  countryCode: 'ID',
  region: 'asia',
  flag: '🇮🇩',
  title: copy('印尼小费速查', 'Tipping in Indonesia'),
  description: copy('印尼常见做法是看账单是否含服务费，再决定是否凑整或给少量现金。', 'In Indonesia, the usual move is to check the bill for service charge before rounding up or leaving a small cash tip.'),
  headlineRule: copy('印尼常先看账单是否含服务费。', 'In Indonesia, check the bill for service charge first.'),
  rules: {
    restaurant: copy('坐桌餐厅常见凑整或少量现金。', 'At sit-down restaurants, rounding up or a small cash tip is common.'),
    cafe: copy('咖啡馆一般只要凑整。', 'Cafes usually only need a round-up.'),
    bar: copy('酒吧通常给少量现金即可。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车可直接凑整。', 'Taxis are usually just rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或包车司机更常见小额现金。', 'Guides or private drivers more often receive a small cash thank-you.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖或送餐可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('旅游区和酒店最常见的是零钱或小额纸币。', 'In tourist areas and hotels, small bills and coins are most common.'),
    copy('账单里如果已经有 service charge，就按实际服务再决定。', 'If the bill already includes a service charge, tip based on the service level.'),
  ],
  sources: [
    source('Wikivoyage：印尼', 'Wikivoyage: Indonesia', 'https://en.wikivoyage.org/wiki/Indonesia'),
    source('World Travel Guide：印度尼西亚', 'World Travel Guide: Indonesia', 'https://www.worldtravelguide.net/guides/asia/indonesia/'),
  ],
  lastReviewed: '2026-03-19',
})
