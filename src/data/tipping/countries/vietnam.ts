import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_VIETNAM = defineTippingCountry({
  slug: 'vietnam',
  countryCode: 'VN',
  region: 'asia',
  flag: '🇻🇳',
  title: copy('越南小费速查', 'Tipping in Vietnam'),
  description: copy('越南很多旅游服务会收少量现金，尤其是导游和包车。', 'Small cash tips are common in many Vietnamese tourist settings, especially for guides and private transport.'),
  headlineRule: copy('越南旅游服务常见少量现金小费。', 'Small cash tips are common in Vietnamese tourist services.'),
  rules: {
    restaurant: copy('餐厅常见凑整或少量现金。', 'Restaurants often see rounding up or a small cash tip.'),
    cafe: copy('咖啡馆通常凑整即可。', 'Cafes usually only need a round-up.'),
    bar: copy('酒吧可留少量现金。', 'Bars can be tipped with a small cash amount.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或包车司机通常更期待现金小费。', 'Guides or private drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('在游客多的地方，零钱比大额更自然。', 'In tourist-heavy areas, small change feels more natural than large bills.'),
    copy('如果账单已经含服务费，就按服务再补一点。', 'If the bill already includes service charge, only add a little more for strong service.'),
  ],
  sources: [
    source('Wikivoyage：越南', 'Wikivoyage: Vietnam', 'https://en.wikivoyage.org/wiki/Vietnam'),
    source('World Travel Guide：越南', 'World Travel Guide: Vietnam', 'https://www.worldtravelguide.net/guides/asia/vietnam/'),
  ],
  lastReviewed: '2026-03-19',
})
