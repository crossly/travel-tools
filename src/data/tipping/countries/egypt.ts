import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_EGYPT = defineTippingCountry({
  slug: 'egypt',
  countryCode: 'EG',
  region: 'africa',
  flag: '🇪🇬',
  title: copy('埃及小费速查', 'Tipping in Egypt'),
  description: copy('埃及小额现金很常见，导游、行李员和司机尤其如此。', 'In Egypt, small cash tips are very common, especially for guides, porters, and drivers.'),
  headlineRule: copy('埃及小额现金很常见。', 'Small cash tips are very common in Egypt.'),
  rules: {
    restaurant: copy('餐厅常见 10% 左右，先看账单。', 'Restaurants commonly see around 10%, but check the bill first.'),
    cafe: copy('咖啡馆可给少量现金。', 'Cafes can receive a small cash tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车常见凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李、客房和门童都常见小费。', 'Hotel porters, housekeeping, and concierge help are commonly tipped.'),
    guide: copy('导游或司机通常会期待现金小费。', 'Guides or drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('小额纸币最实用，尤其是在景点和交通点。', 'Small bills are the most practical choice, especially at sights and transport stops.'),
    copy('旅游服务里，少量现金比固定百分比更灵活。', 'For travel services, a small cash amount is more flexible than a fixed percentage.'),
  ],
  sources: [
    source('Wikivoyage：埃及', 'Wikivoyage: Egypt', 'https://en.wikivoyage.org/wiki/Egypt'),
    source('World Travel Guide：埃及', 'World Travel Guide: Egypt', 'https://www.worldtravelguide.net/guides/africa/egypt/'),
  ],
  lastReviewed: '2026-03-19',
})
