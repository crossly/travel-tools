import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_MOROCCO = defineTippingCountry({
  slug: 'morocco',
  countryCode: 'MA',
  region: 'africa',
  flag: '🇲🇦',
  title: copy('摩洛哥小费速查', 'Tipping in Morocco'),
  description: copy('摩洛哥小额现金很常见，餐厅、司机和行李员都常见。', 'In Morocco, small cash tips are common, especially at restaurants and for drivers or porters.'),
  headlineRule: copy('摩洛哥小额现金很常见。', 'Small cash tips are common in Morocco.'),
  rules: {
    restaurant: copy('餐厅常见少量现金或凑整。', 'Restaurants commonly see a small cash amount or a round-up.'),
    cafe: copy('咖啡馆可给少量零钱。', 'Cafes can receive a small change tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李、客房和门童都常见小费。', 'Hotel porters, housekeeping, and concierge help are commonly tipped.'),
    guide: copy('导游或司机通常会期待现金小费。', 'Guides or drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('在马拉喀什和菲斯等旅游城市，零钱更常用。', 'In tourist cities like Marrakech and Fes, small change is more common.'),
    copy('市集、司机和行李服务通常都能接受小额现金。', 'Markets, drivers, and luggage help can usually accept small cash tips.'),
  ],
  sources: [
    source('Wikivoyage：摩洛哥', 'Wikivoyage: Morocco', 'https://en.wikivoyage.org/wiki/Morocco'),
    source('World Travel Guide：摩洛哥', 'World Travel Guide: Morocco', 'https://www.worldtravelguide.net/guides/africa/morocco/'),
  ],
  lastReviewed: '2026-03-19',
})
