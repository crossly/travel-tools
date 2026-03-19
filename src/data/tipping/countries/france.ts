import { copy, defineTippingCountry, source } from '../schema'

export const TIPPING_COUNTRY_FRANCE = defineTippingCountry({
  slug: 'france',
  countryCode: 'FR',
  region: 'europe',
  flag: '🇫🇷',
  title: copy('法国小费速查', 'Tipping in France'),
  description: copy('法国很多账单已含服务费，但坐桌服务和凑整仍然常见。', 'France often includes service in the bill, but rounding up and small sit-down tips are still common.'),
  headlineRule: copy('法国通常先看账单，服务费常已包含。', 'In France, check the bill first because service is often already included.'),
  rules: {
    restaurant: copy('坐桌餐厅常见留一点零钱或凑整。', 'At sit-down restaurants, rounding up or leaving a small amount is common.'),
    cafe: copy('咖啡馆通常只要凑整。', 'Cafes usually only need a round-up.'),
    bar: copy('酒吧一般不用额外给。', 'Bars usually do not expect an extra tip.'),
    taxi: copy('出租车可凑整，长途再多一点。', 'Taxis can usually be rounded up, with a little more for longer rides.'),
    hotel: copy('酒店行李和客房服务若到位，可留少量现金。', 'For helpful hotel service, a small cash tip is reasonable.'),
    guide: copy('导游或司机若陪你一整天，可留少量现金。', 'For a full-day guide or driver, a small cash tip is reasonable.'),
    porter: copy('行李员通常给少量零钱即可。', 'Porters usually only need a small coin tip.'),
    delivery: copy('外卖通常不用额外给。', 'Delivery usually does not need an extra tip.'),
  },
  notes: [
    copy('service compris 很常见。', 'Service compris is common.'),
    copy('服务特别好时，凑整比大额更自然。', 'If service stands out, rounding up feels more natural than a large tip.'),
  ],
  sources: [
    source('Wikivoyage：法国', 'Wikivoyage: France', 'https://en.wikivoyage.org/wiki/France'),
    source('World Travel Guide：法国', 'World Travel Guide: France', 'https://www.worldtravelguide.net/guides/europe/france/'),
  ],
  lastReviewed: '2026-03-19',
})
