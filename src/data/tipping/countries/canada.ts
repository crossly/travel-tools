import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_CANADA = defineTippingCountry({
  slug: 'canada',
  countryCode: 'CA',
  region: 'americas',
  flag: '🇨🇦',
  title: copy('加拿大小费速查', 'Tipping in Canada'),
  description: copy('加拿大和美国相近，餐厅和配送通常都默认给小费。', 'Canada is similar to the US: tipping is expected at restaurants and for delivery.'),
  headlineRule: copy('加拿大餐厅和配送通常默认给小费。', 'Tipping is expected in Canadian restaurants and for delivery.'),
  rules: {
    restaurant: copy('坐桌餐厅常见 15% 到 20%。', 'At sit-down restaurants, 15% to 20% is common.'),
    cafe: copy('咖啡馆或柜台点单可留少量零钱。', 'At cafes or counter service, a small amount or round-up is common.'),
    bar: copy('酒吧按杯留一点更常见。', 'At bars, a small per-drink tip or round-up is common.'),
    taxi: copy('出租车通常按 10% 到 15% 看待。', 'Taxi tips are usually around 10% to 15%.'),
    hotel: copy('酒店行李、客房和礼宾都常见小费。', 'Hotel porters, housekeeping, and concierge help are commonly tipped.'),
    guide: copy('导游或司机通常会期待现金小费。', 'Guides or drivers usually expect a cash tip.'),
    porter: copy('行李员通常会收几加元。', 'Porters usually receive a few dollars.'),
    delivery: copy('外卖和送餐通常会给少量现金或按终端提示。', 'Delivery is usually tipped with a small cash amount or the card terminal suggestion.'),
  },
  notes: [
    copy('很多地方对小费的默认值很像美国。', 'Many places mirror US tipping defaults.'),
    copy('如果账单已经有 service charge，就先看清再补。', 'If the bill already has a service charge, check it before adding more.'),
  ],
  sources: [
    source('Wikivoyage：加拿大', 'Wikivoyage: Canada', 'https://en.wikivoyage.org/wiki/Canada'),
    source('World Travel Guide：加拿大', 'World Travel Guide: Canada', 'https://www.worldtravelguide.net/guides/north-america/canada/'),
  ],
  lastReviewed: '2026-03-19',
})
