import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_GREECE = defineTippingCountry({
  slug: 'greece',
  countryCode: 'GR',
  region: 'europe',
  flag: '🇬🇷',
  title: copy('希腊小费速查', 'Tipping in Greece'),
  description: copy('希腊通常是留一点零钱或小比例，旅游岛屿会更常见。', 'In Greece, leaving a little change or a small percentage is common, especially on tourist islands.'),
  headlineRule: copy('希腊通常是留一点零钱或小比例。', 'Leaving a little change or a small percentage is common in Greece.'),
  rules: {
    restaurant: copy('坐桌餐厅常见 5% 到 10% 或凑整。', 'At sit-down restaurants, 5% to 10% or a round-up is common.'),
    cafe: copy('咖啡馆通常留一点零钱。', 'Cafes usually only need a little change.'),
    bar: copy('酒吧可给少量现金。', 'Bars can be tipped with a small cash amount.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或包车司机可给少量现金。', 'Guides or private drivers can receive a small cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually receive a small cash tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not need an extra tip.'),
  },
  notes: [
    copy('旅游岛和游轮港口更常见小费。', 'Tourist islands and cruise ports are more tip-friendly.'),
    copy('如果账单里已有服务费，就不用再堆太多。', 'If service is already included in the bill, do not add too much more.'),
  ],
  sources: [
    source('Wikivoyage：希腊', 'Wikivoyage: Greece', 'https://en.wikivoyage.org/wiki/Greece'),
    source('World Travel Guide：希腊', 'World Travel Guide: Greece', 'https://www.worldtravelguide.net/guides/europe/greece/'),
  ],
  lastReviewed: '2026-03-19',
})
