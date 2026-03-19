import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_CHINA = defineTippingCountry({
  slug: 'china',
  countryCode: 'CN',
  region: 'asia',
  flag: '🇨🇳',
  title: copy('中国小费速查', 'Tipping in China'),
  description: copy('中国大多数本地服务不靠小费，少量现金更多出现在导游或高端服务。', 'In China, tipping is usually not part of everyday local service, with cash tips showing up more in tours or premium service.'),
  headlineRule: copy('中国大多数本地服务不靠小费。', 'Tipping is usually not part of everyday local service in China.'),
  rules: {
    restaurant: copy('普通餐厅通常不需要小费。', 'Ordinary restaurants usually do not expect a tip.'),
    cafe: copy('咖啡馆一般不用给。', 'Cafes usually do not expect a tip.'),
    bar: copy('酒吧通常也不用额外给。', 'Bars usually do not expect an extra tip.'),
    taxi: copy('出租车通常不用给，凑整也不是必须。', 'Taxis usually do not need a tip, and rounding up is optional.'),
    hotel: copy('酒店里只有特别帮助时才会出现少量现金。', 'At hotels, a cash thank-you is usually reserved for standout help.'),
    guide: copy('导游或包车服务更常见小额现金感谢。', 'Guides or private drivers are more likely to receive a small cash thank-you.'),
    porter: copy('行李员若有帮助，少量现金即可。', 'Porters can be thanked with a small cash amount when they help.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not require a tip.'),
  },
  notes: [
    copy('很多本地场景直接按账单付款就行。', 'In many local situations, just paying the bill is normal.'),
    copy('如果是在高端酒店或旅游包车，少量现金更合适。', 'For upscale hotels or private tours, a small cash thank-you is more appropriate.'),
  ],
  sources: [
    source('Wikivoyage：中国', 'Wikivoyage: China', 'https://en.wikivoyage.org/wiki/China'),
    source('World Travel Guide：中国', 'World Travel Guide: China', 'https://www.worldtravelguide.net/guides/asia/china/'),
  ],
  lastReviewed: '2026-03-19',
})
