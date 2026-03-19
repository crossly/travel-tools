import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_COSTA_RICA = defineTippingCountry({
  slug: 'costa-rica',
  countryCode: 'CR',
  region: 'americas',
  flag: '🇨🇷',
  title: copy('哥斯达黎加小费速查', 'Tipping in Costa Rica'),
  description: copy('哥斯达黎加常见做法是看账单是否含服务费，再决定是否补一点。', 'In Costa Rica, the usual move is to check the bill for service charge before adding a little more.'),
  headlineRule: copy('哥斯达黎加常先看账单是否含服务费。', 'In Costa Rica, check the bill for service charge first.'),
  rules: {
    restaurant: copy('餐厅常见少量百分比或凑整。', 'Restaurants commonly see a small percentage or a round-up.'),
    cafe: copy('咖啡馆可留少量零钱。', 'Cafes can receive a small change tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或司机通常会期待现金小费。', 'Guides or drivers usually expect a cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('旅游生态里，小费通常是少量而不是大额。', 'In tourism settings, tips are usually small rather than large.'),
    copy('如果账单里已经列了服务费，就不要重复加太多。', 'If a service charge is already listed, do not add much more.'),
  ],
  sources: [
    source('Wikivoyage：哥斯达黎加', 'Wikivoyage: Costa Rica', 'https://en.wikivoyage.org/wiki/Costa_Rica'),
    source('World Travel Guide：哥斯达黎加', 'World Travel Guide: Costa Rica', 'https://www.worldtravelguide.net/guides/north-america/costa-rica/'),
  ],
  lastReviewed: '2026-03-19',
})
