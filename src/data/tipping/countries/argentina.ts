import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_ARGENTINA = defineTippingCountry({
  slug: 'argentina',
  countryCode: 'AR',
  region: 'americas',
  flag: '🇦🇷',
  title: copy('阿根廷小费速查', 'Tipping in Argentina'),
  description: copy('阿根廷坐桌餐厅和导游服务常见少量小费，现金最顺手。', 'In Argentina, small tips are common at sit-down restaurants and for guides, and cash is the easiest format.'),
  headlineRule: copy('阿根廷坐桌餐厅和导游服务常见小费。', 'Small tips are common in Argentine sit-down restaurants and guide services.'),
  rules: {
    restaurant: copy('餐厅常见 10% 左右，先看账单。', 'Restaurants often see around 10%, but check the bill first.'),
    cafe: copy('咖啡馆可留少量零钱。', 'Cafes can receive a small change tip.'),
    bar: copy('酒吧通常给少量现金。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车通常凑整。', 'Taxis are usually rounded up.'),
    hotel: copy('酒店行李和客房服务可给少量现金。', 'Hotel porters and housekeeping can receive a small cash tip.'),
    guide: copy('导游或司机通常会期待更明确的小费。', 'Guides or drivers usually expect a more explicit cash tip.'),
    porter: copy('行李员通常给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('通胀和汇率变化快，现金比固定百分比更好用。', 'Inflation and exchange rates move quickly, so cash matters more than a fixed percentage.'),
    copy('旅游区通常比本地街区更习惯小费。', 'Tourist areas are usually more tip-friendly than local neighborhoods.'),
  ],
  sources: [
    source('Wikivoyage：阿根廷', 'Wikivoyage: Argentina', 'https://en.wikivoyage.org/wiki/Argentina'),
    source('World Travel Guide：阿根廷', 'World Travel Guide: Argentina', 'https://www.worldtravelguide.net/guides/south-america/argentina/'),
  ],
  lastReviewed: '2026-03-19',
})
