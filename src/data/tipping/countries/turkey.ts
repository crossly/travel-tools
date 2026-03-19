import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_TURKEY = defineTippingCountry({
  slug: 'turkey',
  countryCode: 'TR',
  region: 'middle-east',
  flag: '🇹🇷',
  title: copy('土耳其小费速查', 'Tipping in Turkey'),
  description: copy('土耳其常见做法是看服务场景给少量现金，餐厅和导游更常见。', 'In Turkey, small cash tips are common depending on the setting, especially at restaurants and for guides.'),
  headlineRule: copy('土耳其常见少量现金小费。', 'Small cash tips are common in Turkey.'),
  rules: {
    restaurant: copy('餐厅通常按 5% 到 10% 看待。', 'Restaurants commonly see around 5% to 10%.'),
    cafe: copy('咖啡馆可留少量现金。', 'Cafes can be tipped with a small cash amount.'),
    bar: copy('酒吧通常给少量现金即可。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车可凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务常见小费。', 'Hotel porters and housekeeping commonly receive tips.'),
    guide: copy('导游或包车司机通常会期待更明确的小费。', 'Guides or private drivers usually expect a more explicit cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually receive a small cash tip.'),
    delivery: copy('外卖或送餐可给少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('旅游城镇和邮轮港口的小费更常见。', 'Tips are more common in tourist towns and cruise ports.'),
    copy('如果账单里有 service fee，就先看再加。', 'If the bill includes a service fee, check it before adding more.'),
  ],
  sources: [
    source('Wikivoyage：土耳其', 'Wikivoyage: Turkey', 'https://en.wikivoyage.org/wiki/Turkey'),
    source('World Travel Guide：土耳其', 'World Travel Guide: Türkiye', 'https://www.worldtravelguide.net/guides/europe/turkey/'),
  ],
  lastReviewed: '2026-03-19',
})
