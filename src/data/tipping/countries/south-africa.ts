import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_SOUTH_AFRICA = defineTippingCountry({
  slug: 'south-africa',
  countryCode: 'ZA',
  region: 'africa',
  flag: '🇿🇦',
  title: copy('南非小费速查', 'Tipping in South Africa'),
  description: copy('南非坐桌餐厅和旅游服务常见小费，酒店和司机也很常见。', 'In South Africa, tips are common at sit-down restaurants and for travel services, hotels, and drivers.'),
  headlineRule: copy('南非坐桌餐厅和旅游服务常见小费。', 'Tips are common at South African sit-down restaurants and travel services.'),
  rules: {
    restaurant: copy('餐厅常见 10% 到 15%。', 'Restaurants commonly see 10% to 15%.'),
    cafe: copy('咖啡馆可留少量现金。', 'Cafes can receive a small cash tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车可凑整。', 'Taxis can usually be rounded up.'),
    hotel: copy('酒店行李、客房和门童都常见小费。', 'Hotel porters, housekeeping, and concierge help are commonly tipped.'),
    guide: copy('导游或司机通常会期待现金小费。', 'Guides or drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('野生动物行程和酒庄路线的小费更标准。', 'Safari and wine-route trips have more established tipping norms.'),
    copy('如果账单已经有 service charge，就少量补足即可。', 'If service charge is already on the bill, only add a little more.'),
  ],
  sources: [
    source('Wikivoyage：南非', 'Wikivoyage: South Africa', 'https://en.wikivoyage.org/wiki/South_Africa'),
    source('World Travel Guide：南非', 'World Travel Guide: South Africa', 'https://www.worldtravelguide.net/guides/africa/south-africa/'),
  ],
  lastReviewed: '2026-03-19',
})
