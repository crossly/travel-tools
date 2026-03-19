import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_NEW_ZEALAND = defineTippingCountry({
  slug: 'new-zealand',
  countryCode: 'NZ',
  region: 'oceania',
  flag: '🇳🇿',
  title: copy('新西兰小费速查', 'Tipping in New Zealand'),
  description: copy('新西兰通常不把小费当作刚需，凑整和少量感谢最常见。', 'Tipping is usually optional in New Zealand, with rounding up and small thank-yous being most common.'),
  headlineRule: copy('新西兰通常不把小费当作刚需。', 'Tipping is usually optional in New Zealand.'),
  rules: {
    restaurant: copy('餐厅通常不用额外给，服务特别好可少量补充。', 'Restaurants usually do not expect extra tipping, though a small amount is fine for standout service.'),
    cafe: copy('咖啡馆一般不用给。', 'Cafes usually do not expect a tip.'),
    bar: copy('酒吧通常不用额外给。', 'Bars usually do not expect an extra tip.'),
    taxi: copy('出租车可凑整，但不强求。', 'Taxis can be rounded up, but it is not expected.'),
    hotel: copy('酒店行李和礼宾若帮忙，可留少量现金。', 'For luggage or concierge help, a small cash thank-you is fine.'),
    guide: copy('导游或司机若服务很好，可给少量现金。', 'For a great guide or driver, a small cash thank-you is optional.'),
    porter: copy('行李员可收少量零钱。', 'Porters can be thanked with a small coin tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not need a tip.'),
  },
  notes: [
    copy('旅游区和高端旅馆更常见少量感谢。', 'Tourist areas and upscale hotels are more used to small thank-yous.'),
    copy('如果账单已经有 service charge，就按情况看是否补一点。', 'If a service charge is already on the bill, decide whether to add a little more.'),
  ],
  sources: [
    source('Wikivoyage：新西兰', 'Wikivoyage: New Zealand', 'https://en.wikivoyage.org/wiki/New_Zealand'),
    source('World Travel Guide：新西兰', 'World Travel Guide: New Zealand', 'https://www.worldtravelguide.net/guides/oceania/new-zealand/'),
  ],
  lastReviewed: '2026-03-19',
})
