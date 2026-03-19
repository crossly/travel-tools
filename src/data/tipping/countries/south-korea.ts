import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_SOUTH_KOREA = defineTippingCountry({
  slug: 'south-korea',
  countryCode: 'KR',
  region: 'asia',
  flag: '🇰🇷',
  title: copy('韩国小费速查', 'Tipping in South Korea'),
  description: copy('韩国大多数本地服务不收小费，直接付款最自然。', 'Most local service in South Korea does not expect a tip, so paying the bill directly is the most natural move.'),
  headlineRule: copy('韩国大多数本地服务不收小费。', 'Most local service in South Korea does not expect tipping.'),
  rules: {
    restaurant: copy('普通餐厅一般不用给。', 'Ordinary restaurants usually do not expect a tip.'),
    cafe: copy('咖啡馆通常不用给。', 'Cafes usually do not expect a tip.'),
    bar: copy('酒吧通常也不用额外给。', 'Bars usually do not expect an extra tip.'),
    taxi: copy('出租车通常不用给，凑整也不是必要。', 'Taxis usually do not need a tip, and rounding up is optional.'),
    hotel: copy('酒店只有特别帮助时才会出现少量现金。', 'At hotels, a cash thank-you is usually only for standout help.'),
    guide: copy('私人导游或司机可视情况给少量现金。', 'Private guides or drivers can receive a small cash thank-you when appropriate.'),
    porter: copy('行李员若帮忙，少量现金即可。', 'Porters can be thanked with a small cash amount.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not require a tip.'),
  },
  notes: [
    copy('如果去的是高端酒店或包车场景，再看服务再决定。', 'For upscale hotels or private-car service, decide based on the service level.'),
    copy('多数本地场景按账单结清就行。', 'In most local situations, just paying the bill is enough.'),
  ],
  sources: [
    source('Wikivoyage：韩国', 'Wikivoyage: South Korea', 'https://en.wikivoyage.org/wiki/South_Korea'),
    source('World Travel Guide：韩国', 'World Travel Guide: South Korea', 'https://www.worldtravelguide.net/guides/asia/south-korea/'),
  ],
  lastReviewed: '2026-03-19',
})
