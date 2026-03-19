import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_INDIA = defineTippingCountry({
  slug: 'india',
  countryCode: 'IN',
  region: 'asia',
  flag: '🇮🇳',
  title: copy('印度小费速查', 'Tipping in India'),
  description: copy('印度很多场景会给少量小费，餐厅和导游尤其常见。', 'In India, small tips are common in many settings, especially at restaurants and for guides.'),
  headlineRule: copy('印度很多场景会给少量小费。', 'Small tips are common in many Indian service settings.'),
  rules: {
    restaurant: copy('餐厅常见 5% 到 10%，先看账单有没有服务费。', 'Restaurants often see 5% to 10%, but check whether a service charge is already included.'),
    cafe: copy('咖啡馆或简餐点可留少量零钱。', 'At cafes or quick-service spots, a small coin tip is enough.'),
    bar: copy('酒吧可留少量现金。', 'Bars can usually be tipped with a small cash amount.'),
    taxi: copy('出租车可凑整，长途时再多一点。', 'Taxis can be rounded up, with a little more for longer rides.'),
    hotel: copy('酒店行李、客房和门童都常见小费。', 'Hotel porters, housekeeping, and concierge help are commonly tipped.'),
    guide: copy('导游或司机常会期待更明确的现金感谢。', 'Guides or drivers often expect a more explicit cash thank-you.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖或送餐可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('现金最稳，尤其是在旅游区和小城镇。', 'Cash is the safest option, especially in tourist areas and smaller towns.'),
    copy('如果账单里已经有 service charge，就别重复算太多。', 'If the bill already has a service charge, do not add much more on top.'),
  ],
  sources: [
    source('Wikivoyage：印度', 'Wikivoyage: India', 'https://en.wikivoyage.org/wiki/India'),
    source('World Travel Guide：印度', 'World Travel Guide: India', 'https://www.worldtravelguide.net/guides/asia/india/'),
  ],
  lastReviewed: '2026-03-19',
})
