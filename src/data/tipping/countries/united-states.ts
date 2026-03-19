import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_UNITED_STATES = defineTippingCountry({
  slug: 'united-states',
  countryCode: 'US',
  region: 'americas',
  flag: '🇺🇸',
  title: copy('美国小费速查', 'Tipping in the United States'),
  description: copy('美国多数服务场景都默认给小费，餐厅和外卖尤其明显。', 'Tipping is expected in most service settings in the United States, especially at restaurants and for delivery.'),
  headlineRule: copy('美国多数服务场景都默认给小费。', 'Tipping is expected in most service settings in the United States.'),
  rules: {
    restaurant: copy('坐桌餐厅通常按 15% 到 20% 看待。', 'At sit-down restaurants, 15% to 20% is the common range.'),
    cafe: copy('咖啡馆或快餐柜台可留少量零钱或用支付机提示。', 'At cafes or counter service, a small amount or a prompt on the card terminal is common.'),
    bar: copy('酒吧按杯给少量或每杯留一点。', 'At bars, a small amount per drink or a round-up is typical.'),
    taxi: copy('出租车通常按 10% 到 15% 看待。', 'Taxi tips are usually around 10% to 15%.'),
    hotel: copy('行李员、客房和门童都常见小费。', 'Hotel porters, housekeeping, and concierge help are commonly tipped.'),
    guide: copy('导游或司机通常会给更明确的小费。', 'Guides or drivers usually receive a more explicit cash tip.'),
    porter: copy('行李员通常会给几美元。', 'Porters usually receive a few dollars.'),
    delivery: copy('外卖和送餐一般会给少量现金或按应用建议金额。', 'Delivery is usually tipped with a small cash amount or the app-suggested value.'),
  },
  notes: [
    copy('很多服务岗位默认把小费算进收入预期里。', 'Many service jobs in the US expect tips as part of normal pay.'),
    copy('如果账单已经有 service charge，就先看清再决定。', 'If the bill already includes a service charge, check that first before adding more.'),
  ],
  sources: [
    source('Wikivoyage：美国', 'Wikivoyage: United States', 'https://en.wikivoyage.org/wiki/United_States_of_America'),
    source('World Travel Guide：美国', 'World Travel Guide: United States', 'https://www.worldtravelguide.net/guides/north-america/united-states-of-america/'),
  ],
  lastReviewed: '2026-03-19',
})
