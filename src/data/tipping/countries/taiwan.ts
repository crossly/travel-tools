import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_TAIWAN = defineTippingCountry({
  slug: 'taiwan',
  countryCode: 'TW',
  region: 'asia',
  flag: '🇹🇼',
  title: copy('台湾小费速查', 'Tipping in Taiwan'),
  description: copy('台湾大多数本地场景不期待小费，很多账单还会另外写服务费。', 'Tipping is usually not expected in Taiwan, and many bills already show a service charge.'),
  headlineRule: copy('台湾大多数本地场景不期待小费。', 'Tipping is usually not expected in Taiwan.'),
  rules: {
    restaurant: copy('先看账单；不少餐厅已经含服务费。', 'Check the bill first; many restaurants already include a service charge.'),
    cafe: copy('咖啡馆通常不用给。', 'Cafes usually do not expect a tip.'),
    bar: copy('酒吧一般也不用额外给。', 'Bars usually do not expect an extra tip.'),
    taxi: copy('出租车通常凑整即可。', 'Taxis are usually just rounded up.'),
    hotel: copy('酒店行李或客房服务若特别帮助，可留少量现金。', 'For standout hotel help, a small cash thank-you is fine.'),
    guide: copy('导游或包车司机可给少量现金。', 'Guides or private drivers can receive a small cash thank-you.'),
    porter: copy('行李员若提供帮助，少量现金即可。', 'Porters can be thanked with a small cash amount.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not require a tip.'),
  },
  notes: [
    copy('很多账单会单独写 service charge。', 'Many bills list a service charge separately.'),
    copy('如果已经含服务费，通常不用再另外给。', 'If service charge is included, extra tipping is usually unnecessary.'),
  ],
  sources: [
    source('Wikivoyage：台湾', 'Wikivoyage: Taiwan', 'https://en.wikivoyage.org/wiki/Taiwan'),
    source('World Travel Guide：台湾', 'World Travel Guide: Taiwan', 'https://www.worldtravelguide.net/guides/asia/taiwan/'),
  ],
  lastReviewed: '2026-03-19',
})
