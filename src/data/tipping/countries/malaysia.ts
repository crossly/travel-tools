import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_MALAYSIA = defineTippingCountry({
  slug: 'malaysia',
  countryCode: 'MY',
  region: 'asia',
  flag: '🇲🇾',
  title: copy('马来西亚小费速查', 'Tipping in Malaysia'),
  description: copy('马来西亚不少账单已含服务费，额外小费更多是看服务场景。', 'Many Malaysian bills already include a service charge, so extra tipping depends on the setting.'),
  headlineRule: copy('马来西亚不少账单已含服务费。', 'Many Malaysian bills already include a service charge.'),
  rules: {
    restaurant: copy('先看账单，通常只要凑整或少量现金。', 'Check the bill first; rounding up or a small cash tip is usually enough.'),
    cafe: copy('咖啡馆通常不用给。', 'Cafes usually do not expect a tip.'),
    bar: copy('酒吧可视服务凑整。', 'At bars, a small round-up is usually enough.'),
    taxi: copy('出租车通常凑整即可。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和礼宾若帮忙，可给少量现金。', 'For hotel porters or concierge help, a small cash amount is fine.'),
    guide: copy('导游或司机可给少量现金。', 'Guides or drivers can be thanked with a small cash amount.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not require an extra tip.'),
  },
  notes: [
    copy('旅游区里凑整比给大额更自然。', 'In tourist areas, rounding up feels more natural than leaving a large amount.'),
    copy('如果账单已经列了 service charge，就不要重复给太多。', 'If the bill already lists a service charge, do not over-tip.'),
  ],
  sources: [
    source('Wikivoyage：马来西亚', 'Wikivoyage: Malaysia', 'https://en.wikivoyage.org/wiki/Malaysia'),
    source('World Travel Guide：马来西亚', 'World Travel Guide: Malaysia', 'https://www.worldtravelguide.net/guides/asia/malaysia/'),
  ],
  lastReviewed: '2026-03-19',
})
