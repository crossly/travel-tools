import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_CAMBODIA = defineTippingCountry({
  slug: 'cambodia',
  countryCode: 'KH',
  region: 'asia',
  flag: '🇰🇭',
  title: copy('柬埔寨小费速查', 'Tipping in Cambodia'),
  description: copy('柬埔寨不少旅游场景会收少量小费，现金最顺手。', 'In Cambodia, small cash tips are common in many tourist settings.'),
  headlineRule: copy('柬埔寨旅游场景常见少量现金小费。', 'Small cash tips are common in Cambodian tourist settings.'),
  rules: {
    restaurant: copy('餐厅若没有服务费，常见留少量现金或凑整。', 'If no service charge is included, a small cash tip or round-up is common.'),
    cafe: copy('咖啡馆通常给一点零钱就够。', 'At cafes, a small coin tip or round-up is enough.'),
    bar: copy('酒吧通常给少量现金即可。', 'Bars usually only need a small cash tip.'),
    taxi: copy('出租车通常凑整，若帮提行李可再多一点。', 'Taxis are usually rounded up, with a little extra for luggage help.'),
    hotel: copy('酒店行李和客房服务常会收少量现金。', 'Hotel porters and housekeeping often receive a small cash tip.'),
    guide: copy('导游或司机通常会期待更明确的小费。', 'Guides or drivers often expect a clearer cash tip.'),
    porter: copy('行李员一般给少量现金。', 'Porters usually get a small cash tip.'),
    delivery: copy('外卖或送餐可留少量现金。', 'Delivery can be tipped with a small cash amount.'),
  },
  notes: [
    copy('在旅游区，零钱和小额纸币最方便。', 'In tourist areas, small bills and coins are the easiest to use.'),
    copy('如果账单已含服务费，通常只要再看服务质量。', 'If the bill already includes a service charge, tip a little more only when the service stands out.'),
  ],
  sources: [
    source('Wikivoyage：柬埔寨', 'Wikivoyage: Cambodia', 'https://en.wikivoyage.org/wiki/Cambodia'),
    source('World Travel Guide：柬埔寨', 'World Travel Guide: Cambodia', 'https://www.worldtravelguide.net/guides/asia/cambodia/'),
  ],
  lastReviewed: '2026-03-19',
})
