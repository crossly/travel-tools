import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_CHILE = defineTippingCountry({
  slug: 'chile',
  countryCode: 'CL',
  region: 'americas',
  flag: '🇨🇱',
  title: copy('智利小费速查', 'Tipping in Chile'),
  description: copy('智利坐桌餐厅常见 10% 左右，出租车和酒店则偏少量现金。', 'In Chile, sit-down restaurants commonly see around 10%, while taxis and hotels lean toward small cash tips.'),
  headlineRule: copy('智利坐桌餐厅常见 10% 左右。', 'Around 10% is common in Chilean sit-down restaurants.'),
  rules: {
    restaurant: copy('餐厅常见 10%，先看账单有没有已含。', 'Restaurants commonly see 10%, but check whether it is already included.'),
    cafe: copy('咖啡馆可留少量零钱。', 'Cafes can receive a small change tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或司机通常会期待现金小费。', 'Guides or drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('很多旅游餐厅会把 10% 当作默认参考。', 'Many tourist restaurants use 10% as the default reference.'),
    copy('先看账单和服务项目，再决定是否再补。', 'Check the bill and service line before adding more.'),
  ],
  sources: [
    source('Wikivoyage：智利', 'Wikivoyage: Chile', 'https://en.wikivoyage.org/wiki/Chile'),
    source('World Travel Guide：智利', 'World Travel Guide: Chile', 'https://www.worldtravelguide.net/guides/south-america/chile/'),
  ],
  lastReviewed: '2026-03-19',
})
