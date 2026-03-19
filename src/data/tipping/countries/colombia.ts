import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_COLOMBIA = defineTippingCountry({
  slug: 'colombia',
  countryCode: 'CO',
  region: 'americas',
  flag: '🇨🇴',
  title: copy('哥伦比亚小费速查', 'Tipping in Colombia'),
  description: copy('哥伦比亚餐厅和导游场景常见小费，账单上有时已经包含服务费。', 'In Colombia, tips are common at restaurants and for guides, and some bills already include a service charge.'),
  headlineRule: copy('哥伦比亚餐厅和导游场景常见小费。', 'Tips are common at Colombian restaurants and for guides.'),
  rules: {
    restaurant: copy('餐厅常见 10%，先看账单是否已含。', 'Restaurants commonly see 10%, but check whether it is already included.'),
    cafe: copy('咖啡馆可留少量零钱。', 'Cafes can receive a small change tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或司机通常会期待现金小费。', 'Guides or drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('旅游区的餐厅更常见 10% 左右。', 'Tourist-area restaurants are more likely to use around 10%.'),
    copy('如果账单已含服务费，就只补少量即可。', 'If service charge is already on the bill, only add a little more.'),
  ],
  sources: [
    source('Wikivoyage：哥伦比亚', 'Wikivoyage: Colombia', 'https://en.wikivoyage.org/wiki/Colombia'),
    source('World Travel Guide：哥伦比亚', 'World Travel Guide: Colombia', 'https://www.worldtravelguide.net/guides/south-america/colombia/'),
  ],
  lastReviewed: '2026-03-19',
})
