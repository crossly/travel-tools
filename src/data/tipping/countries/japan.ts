import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_JAPAN = defineTippingCountry({
  slug: 'japan',
  countryCode: 'JP',
  region: 'asia',
  flag: '🇯🇵',
  title: copy('日本小费速查', 'Tipping in Japan'),
  description: copy('日本大多数场景不期待小费，付款按账单结清就行。', 'Japan usually does not expect tips, so paying the bill as shown is the safest move.'),
  headlineRule: copy('日本大多数场景不需要小费。', 'Japan usually does not expect tipping.'),
  rules: {
    restaurant: copy('餐厅通常不留小费，直接结账即可。', 'Restaurants usually do not expect a tip; just settle the bill.'),
    cafe: copy('咖啡馆一般不用给，零钱可留可不留。', 'Cafes usually do not expect a tip, and keeping the change is fine.'),
    bar: copy('酒吧通常不用额外给。', 'Bars usually do not expect an extra tip.'),
    taxi: copy('出租车通常不需要小费。', 'Taxis usually do not need a tip.'),
    hotel: copy('行李或特别帮助时，少量现金表示感谢即可。', 'For luggage help or standout service, a small cash thank-you is enough.'),
    guide: copy('私人导游若帮了大忙，少量现金即可。', 'For a private guide, a small cash thank-you is enough if the service was especially helpful.'),
    porter: copy('行李员若提供帮助，少量现金即可。', 'Porters can be thanked with a small cash amount if they help.'),
    delivery: copy('外卖一般不用给。', 'Delivery usually does not require a tip.'),
  },
  notes: [
    copy('高端餐厅有时会把服务感做得更正式，但也不等于要给小费。', 'Upscale dining may feel more formal, but that still does not usually mean tipping.'),
    copy('如果不确定，直接按账单付款最稳。', 'If you are unsure, paying exactly what is on the bill is safest.'),
  ],
  sources: [
    source('Wikivoyage：日本', 'Wikivoyage: Japan', 'https://en.wikivoyage.org/wiki/Japan'),
    source('World Travel Guide：日本', 'World Travel Guide: Japan', 'https://www.worldtravelguide.net/guides/asia/japan/'),
  ],
  lastReviewed: '2026-03-19',
})
