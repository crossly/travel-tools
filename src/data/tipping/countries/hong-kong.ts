import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_HONG_KONG = defineTippingCountry({
  slug: 'hong-kong',
  countryCode: 'HK',
  region: 'asia',
  flag: '🇭🇰',
  title: copy('香港小费速查', 'Tipping in Hong Kong'),
  description: copy('香港不少账单会含服务费，真正需要额外小费的场景并不多。', 'Many Hong Kong bills already include a service charge, so extra tipping is limited.'),
  headlineRule: copy('香港不少账单已含服务费。', 'Many Hong Kong bills already include a service charge.'),
  rules: {
    restaurant: copy('先看账单；坐桌餐厅通常不用再加很多。', 'Check the bill first; sit-down restaurants usually do not need much extra.'),
    cafe: copy('咖啡馆通常不用给。', 'Cafes usually do not expect a tip.'),
    bar: copy('酒吧若有服务费，通常不用再加。', 'If a service charge is already included, bars usually do not need extra.'),
    taxi: copy('出租车通常凑整即可。', 'Taxis are usually just rounded up.'),
    hotel: copy('酒店行李和门童若提供帮助，可留少量现金。', 'Hotel porters and concierge help can be thanked with a small cash amount.'),
    guide: copy('导游或私人司机可留少量现金。', 'Guides or private drivers can be thanked with a small cash amount.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually receive a small cash tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not require an extra tip.'),
  },
  notes: [
    copy('很多地方会把服务费直接算进账单。', 'Service charge is often already built into the bill.'),
    copy('如果现场没有明示服务费，再决定是否凑整。', 'If service charge is not shown, decide whether to round up.'),
  ],
  sources: [
    source('Wikivoyage：香港', 'Wikivoyage: Hong Kong', 'https://en.wikivoyage.org/wiki/Hong_Kong'),
    source('World Travel Guide：中国香港特别行政区', 'World Travel Guide: Hong Kong SAR China', 'https://www.worldtravelguide.net/guides/asia/china/hong-kong/'),
  ],
  lastReviewed: '2026-03-19',
})
