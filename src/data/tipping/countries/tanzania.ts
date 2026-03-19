import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_TANZANIA = defineTippingCountry({
  slug: 'tanzania',
  countryCode: 'TZ',
  region: 'africa',
  flag: '🇹🇿',
  title: copy('坦桑尼亚小费速查', 'Tipping in Tanzania'),
  description: copy('坦桑尼亚的 safari、导游和酒店服务常见小费，现金最方便。', 'In Tanzania, tips are common for safari, guides, and hotel services, and cash is the easiest format.'),
  headlineRule: copy('坦桑尼亚的 safari 和导游服务常见小费。', 'Tips are common for safari and guide services in Tanzania.'),
  rules: {
    restaurant: copy('餐厅常见少量现金或 10% 左右。', 'Restaurants commonly see a small cash amount or around 10%.'),
    cafe: copy('咖啡馆可留少量零钱。', 'Cafes can receive a small change tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李、客房和门童常见小费。', 'Hotel porters, housekeeping, and concierge help are commonly tipped.'),
    guide: copy('safari 导游和司机通常更期待现金小费。', 'Safari guides and drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('野外行程和登山线路上的小费更标准。', 'Safari and trekking routes have more established tipping norms.'),
    copy('如果有人帮忙搬装备或处理行李，少量现金很合适。', 'If someone helps with gear or luggage, a small cash tip is appropriate.'),
  ],
  sources: [
    source('Wikivoyage：坦桑尼亚', 'Wikivoyage: Tanzania', 'https://en.wikivoyage.org/wiki/Tanzania'),
    source('World Travel Guide：坦桑尼亚', 'World Travel Guide: Tanzania', 'https://www.worldtravelguide.net/guides/africa/tanzania/'),
  ],
  lastReviewed: '2026-03-19',
})
