import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_GERMANY = defineTippingCountry({
  slug: 'germany',
  countryCode: 'DE',
  region: 'europe',
  flag: '🇩🇪',
  title: copy('德国小费速查', 'Tipping in Germany'),
  description: copy('德国通常是凑整或留少量现金，服务好的坐桌餐厅更常见 5% 到 10%。', 'In Germany, rounding up or leaving a small cash tip is common, with 5% to 10% more normal at good sit-down restaurants.'),
  headlineRule: copy('德国通常是凑整或留少量现金。', 'Rounding up or leaving a small cash tip is common in Germany.'),
  rules: {
    restaurant: copy('坐桌餐厅常见 5% 到 10%，也可直接凑整。', 'At sit-down restaurants, 5% to 10% or a round-up is common.'),
    cafe: copy('咖啡馆通常凑整即可。', 'Cafes usually only need a round-up.'),
    bar: copy('酒吧留一点零钱就够。', 'Bars usually only need a small change tip.'),
    taxi: copy('出租车通常直接凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或司机可视服务给少量现金。', 'Guides or drivers can receive a small cash tip when service is good.'),
    porter: copy('行李员通常给少量零钱。', 'Porters usually get a small coin tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not require an extra tip.'),
  },
  notes: [
    copy('直接告诉收银员你要付的总额很常见。', 'It is common to tell the cashier the total amount you want to pay.'),
    copy('先看账单有没有服务费或已含的小费项。', 'Check the bill first for any included service charge or gratuity.'),
  ],
  sources: [
    source('Wikivoyage：德国', 'Wikivoyage: Germany', 'https://en.wikivoyage.org/wiki/Germany'),
    source('World Travel Guide：德国', 'World Travel Guide: Germany', 'https://www.worldtravelguide.net/guides/europe/germany/'),
  ],
  lastReviewed: '2026-03-19',
})
