import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_KENYA = defineTippingCountry({
  slug: 'kenya',
  countryCode: 'KE',
  region: 'africa',
  flag: '🇰🇪',
  title: copy('肯尼亚小费速查', 'Tipping in Kenya'),
  description: copy('肯尼亚旅游和野外服务常见小费，酒店、司机和导游都很常见。', 'In Kenya, tips are common in tourism and safari settings, especially for hotels, drivers, and guides.'),
  headlineRule: copy('肯尼亚旅游和野外服务常见小费。', 'Tips are common in Kenyan tourism and safari settings.'),
  rules: {
    restaurant: copy('餐厅常见 10%，先看账单。', 'Restaurants commonly see around 10%, but check the bill first.'),
    cafe: copy('咖啡馆可留少量零钱。', 'Cafes can receive a small change tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李、客房和门童都常见小费。', 'Hotel porters, housekeeping, and concierge help are commonly tipped.'),
    guide: copy('导游或司机在野外线路上常期待现金小费。', 'Guides or drivers on safari routes usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('Safari 线路上，导游和护林车服务尤其常见小费。', 'On safari routes, guides and ranger drivers are especially tip-friendly.'),
    copy('如果账单含服务费，再少量补足就好。', 'If service charge is already on the bill, only top up a little more.'),
  ],
  sources: [
    source('Wikivoyage：肯尼亚', 'Wikivoyage: Kenya', 'https://en.wikivoyage.org/wiki/Kenya'),
    source('World Travel Guide：肯尼亚', 'World Travel Guide: Kenya', 'https://www.worldtravelguide.net/guides/africa/kenya/'),
  ],
  lastReviewed: '2026-03-19',
})
