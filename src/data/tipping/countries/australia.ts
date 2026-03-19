import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_AUSTRALIA = defineTippingCountry({
  slug: 'australia',
  countryCode: 'AU',
  region: 'oceania',
  flag: '🇦🇺',
  title: copy('澳大利亚小费速查', 'Tipping in Australia'),
  description: copy('澳大利亚通常不把小费当作刚需，凑整和少量感谢更常见。', 'Tipping is usually optional in Australia, and rounding up or a small thank-you is more common.'),
  headlineRule: copy('澳大利亚通常不把小费当作刚需。', 'Tipping is usually optional in Australia.'),
  rules: {
    restaurant: copy('餐厅多半不用额外给，服务特别好再酌情。', 'Restaurants usually do not expect extra tipping, unless the service stands out.'),
    cafe: copy('咖啡馆一般不用给。', 'Cafes usually do not expect a tip.'),
    bar: copy('酒吧通常不需要。', 'Bars usually do not need a tip.'),
    taxi: copy('出租车可凑整，通常不用强求。', 'Taxis can be rounded up, but tipping is not expected.'),
    hotel: copy('行李或礼宾若提供帮助，可留少量现金。', 'For luggage or concierge help, a small cash thank-you is enough.'),
    guide: copy('导游若服务很到位，可给少量现金。', 'For a great guide, a small cash thank-you is optional.'),
    porter: copy('行李员若帮忙，少量现金即可。', 'Porters can be thanked with a small cash amount.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not require a tip.'),
  },
  notes: [
    copy('先看账单里是否已经有 service charge。', 'Check the bill first for any included service charge.'),
    copy('在澳大利亚，凑整比强行给比例更自然。', 'In Australia, rounding up feels more natural than forcing a percentage.'),
  ],
  sources: [
    source('Wikivoyage：澳大利亚', 'Wikivoyage: Australia', 'https://en.wikivoyage.org/wiki/Australia'),
    source('World Travel Guide：澳大利亚', 'World Travel Guide: Australia', 'https://www.worldtravelguide.net/guides/oceania/australia/'),
  ],
  lastReviewed: '2026-03-19',
})
