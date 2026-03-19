import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_UNITED_ARAB_EMIRATES = defineTippingCountry({
  slug: 'united-arab-emirates',
  countryCode: 'AE',
  region: 'middle-east',
  flag: '🇦🇪',
  title: copy('阿联酋小费速查', 'Tipping in the United Arab Emirates'),
  description: copy('阿联酋常见做法是看账单是否已含服务费，再给少量现金。', 'In the UAE, the usual move is to check whether service charge is already on the bill before adding a small cash tip.'),
  headlineRule: copy('阿联酋常先看账单有没有服务费。', 'In the UAE, check the bill for service charge first.'),
  rules: {
    restaurant: copy('餐厅常见 10% 左右，先看账单。', 'Restaurants often see around 10%, but check the bill first.'),
    cafe: copy('咖啡馆可给少量现金。', 'Cafes can receive a small cash tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车可凑整或留少量零钞。', 'Taxis can be rounded up or given small change.'),
    hotel: copy('酒店行李和门童常见小费。', 'Hotel porters and concierge help are commonly tipped.'),
    guide: copy('导游或司机可给更明确的现金小费。', 'Guides or drivers can be thanked with a more explicit cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually receive a small cash tip.'),
    delivery: copy('外卖通常给少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('在迪拜或阿布扎比，服务费常已写进账单。', 'In Dubai or Abu Dhabi, service charge is often already written on the bill.'),
    copy('如果没有服务费，再按服务强度补一点。', 'If no service charge is included, add a little more based on service quality.'),
  ],
  sources: [
    source('Wikivoyage：阿联酋', 'Wikivoyage: United Arab Emirates', 'https://en.wikivoyage.org/wiki/United_Arab_Emirates'),
    source('World Travel Guide：阿拉伯联合酋长国', 'World Travel Guide: United Arab Emirates', 'https://www.worldtravelguide.net/guides/middle-east/united-arab-emirates/'),
  ],
  lastReviewed: '2026-03-19',
})
