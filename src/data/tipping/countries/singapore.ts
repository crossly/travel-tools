import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_SINGAPORE = defineTippingCountry({
  slug: 'singapore',
  countryCode: 'SG',
  region: 'asia',
  flag: '🇸🇬',
  title: copy('新加坡小费速查', 'Tipping in Singapore'),
  description: copy('新加坡多数账单已含服务费，小费通常不是刚需。', 'Service charge is usually included in Singapore, so tipping is not normally required.'),
  headlineRule: copy('新加坡多数账单已含服务费。', 'Service charge is usually already included in Singapore.'),
  rules: {
    restaurant: copy('坐桌餐厅先看账单，通常不用额外给。', 'For sit-down restaurants, check the bill first and usually skip extra tipping.'),
    cafe: copy('咖啡馆一般不用给。', 'Cafes usually do not expect a tip.'),
    bar: copy('酒吧通常不额外给。', 'Bars usually do not expect an extra tip.'),
    taxi: copy('出租车通常不用给，凑整也可以。', 'Taxis usually do not need a tip, though rounding up is fine.'),
    hotel: copy('行李或礼宾若有特别帮助，可留少量现金。', 'For standout luggage or concierge help, a small cash thank-you is fine.'),
    guide: copy('导游若服务很到位，可酌情给少量现金。', 'For an especially helpful guide, a small cash thank-you is optional.'),
    porter: copy('行李员若有帮助，少量现金即可。', 'Porters can be thanked with a small cash amount if needed.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not require a tip.'),
  },
  notes: [
    copy('看账单里是否已经包含 service charge。', 'Check whether a service charge is already on the bill.'),
    copy('在新加坡，最常见的动作是直接付款或轻微凑整。', 'In Singapore, the most common move is to pay the bill or round up a little.'),
  ],
  sources: [
    source('Wikivoyage：新加坡', 'Wikivoyage: Singapore', 'https://en.wikivoyage.org/wiki/Singapore'),
    source('World Travel Guide：新加坡', 'World Travel Guide: Singapore', 'https://www.worldtravelguide.net/guides/asia/singapore/'),
  ],
  lastReviewed: '2026-03-19',
})
