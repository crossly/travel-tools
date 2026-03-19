import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_BRAZIL = defineTippingCountry({
  slug: 'brazil',
  countryCode: 'BR',
  region: 'americas',
  flag: '🇧🇷',
  title: copy('巴西小费速查', 'Tipping in Brazil'),
  description: copy('巴西很多餐厅已含 10% 服务费，但其他场景仍常见少量现金。', 'Many Brazilian restaurants already include a 10% service charge, but small cash tips still show up elsewhere.'),
  headlineRule: copy('巴西很多餐厅已含 10% 服务费。', 'Many Brazilian restaurants already include a 10% service charge.'),
  rules: {
    restaurant: copy('先看账单是否含 10% service。', 'Check whether the bill already includes 10% service.'),
    cafe: copy('咖啡馆可留少量零钱。', 'Cafes can receive a small change tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或司机可给少量现金。', 'Guides or drivers can receive a small cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('如果账单已经有 10% service，就别重复给很多。', 'If 10% service is already on the bill, do not add much more.'),
    copy('旅游区和海滩城市的小费习惯更明确。', 'Tourist areas and beach cities are more tip-friendly.'),
  ],
  sources: [
    source('Wikivoyage：巴西', 'Wikivoyage: Brazil', 'https://en.wikivoyage.org/wiki/Brazil'),
    source('World Travel Guide：巴西', 'World Travel Guide: Brazil', 'https://www.worldtravelguide.net/guides/south-america/brazil/'),
  ],
  lastReviewed: '2026-03-19',
})
