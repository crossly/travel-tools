import type { Locale, LocalAppCategoryId, LocalAppPlatformId } from '@/lib/types'

type LocalizedCopy = Record<Locale, string>

type RawLocalAppLink = {
  platform: LocalAppPlatformId
  url: string
}

type RawLocalAppRecommendation = {
  id: string
  name: string
  summary: LocalizedCopy
  reason: LocalizedCopy
  recommended: boolean
  links: RawLocalAppLink[]
}

type RawLocalAppCategory = {
  id: LocalAppCategoryId
  summary: LocalizedCopy
  apps: RawLocalAppRecommendation[]
}

type RawLocalAppGuideDefinition = {
  slug: string
  teaser: LocalizedCopy
  intro: LocalizedCopy
  highlights: Record<Locale, string[]>
  cautions: Record<Locale, string[]>
  categories: RawLocalAppCategory[]
}

const GOOGLE_MAPS_LINKS: RawLocalAppLink[] = [
  { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
  { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
]

const UBER_LINKS: RawLocalAppLink[] = [
  { platform: 'ios', url: 'https://apps.apple.com/us/app/uber-request-a-ride/id368677368' },
  { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.ubercab' },
]

const BOOKING_LINKS: RawLocalAppLink[] = [
  { platform: 'official', url: 'https://www.booking.com/' },
]

function copy(zh: string, en: string): LocalizedCopy {
  return {
    'zh-CN': zh,
    'en-US': en,
  }
}

function app(
  id: string,
  name: string,
  summaryZh: string,
  summaryEn: string,
  reasonZh: string,
  reasonEn: string,
  recommended: boolean,
  links: RawLocalAppLink[],
): RawLocalAppRecommendation {
  return {
    id,
    name,
    summary: copy(summaryZh, summaryEn),
    reason: copy(reasonZh, reasonEn),
    recommended,
    links,
  }
}

function category(
  id: LocalAppCategoryId,
  summaryZh: string,
  summaryEn: string,
  apps: RawLocalAppRecommendation[],
): RawLocalAppCategory {
  return {
    id,
    summary: copy(summaryZh, summaryEn),
    apps,
  }
}

function mapCategory() {
  return category(
    'maps',
    '地图层继续保留主流入口即可。',
    'The maps layer can stay on the mainstream tool you already know.',
    [
      app(
        'google-maps',
        'Google Maps',
        '默认首选。',
        'Primary.',
        '如果你只留一个地图 app，就先留它。',
        'If you keep one map app, keep this one.',
        true,
        GOOGLE_MAPS_LINKS,
      ),
    ],
  )
}

function bookingCategory(id: string) {
  return category(
    'stays',
    '住的层面先保留一个成熟酒店入口。',
    'For stays, begin with one mature hotel-booking app.',
    [
      app(
        id,
        'Booking.com',
        '默认首选。',
        'Primary.',
        '如果你只留一个住的入口，就先留它。',
        'If you keep one hotel-booking app, keep this one.',
        true,
        BOOKING_LINKS,
      ),
    ],
  )
}

function tripadvisorCategory(id: string) {
  return category(
    'food-discovery',
    '吃喝层先保留一个评分和发现入口。',
    'For dining, keep one ratings-and-discovery layer first.',
    [
      app(
        id,
        'Tripadvisor',
        '默认首选。',
        'Primary.',
        '如果你更依赖先看评价和区域筛店，就先用它。',
        'If ratings and neighborhood scanning matter first, start here.',
        true,
        [{ platform: 'official', url: 'https://www.tripadvisor.com/' }],
      ),
    ],
  )
}

export const LOCAL_APP_GUIDE_ADDITIONS_REMAINING: RawLocalAppGuideDefinition[] = [
  {
    slug: 'cambodia',
    teaser: copy(
      '柬埔寨更适合先把叫车、外卖和住宿入口准备好，其他层保持轻量即可。',
      'Cambodia works best when rides, delivery, and stays are ready first while the rest of the stack stays light.',
    ),
    intro: copy(
      '柬埔寨不需要很重的 app 栈。先把打车、地图、购物、找餐厅、外卖和住宿准备好，机场到酒店、临时补货和晚到点餐都会顺很多。',
      'Cambodia does not need a heavy app stack. Once rides, maps, shopping, restaurant discovery, delivery, and stays are ready, airport arrivals, replacement buys, and late food orders become much easier.',
    ),
    highlights: { 'zh-CN': ['打车', '外卖', '住宿'], 'en-US': ['Rides', 'Delivery', 'Stays'] },
    cautions: {
      'zh-CN': [
        '柬埔寨更适合保持轻量 app 栈，先确保叫车、外卖和住宿可用。',
        '如果你已经习惯 Google Maps，就没有必要额外加很多导航备份。',
      ],
      'en-US': [
        'Cambodia is usually better with a lighter stack. Make sure rides, delivery, and stays are covered first.',
        'If Google Maps already fits your flow, there is no need to add many map backups.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个区域强入口。', 'For rides, keep one strong regional default.', [
        app('grab-kh', 'Grab', '默认首选。', 'Primary.', '如果你只留一个打车入口，就先装它。', 'If you keep one ride app, start here.', true, [{ platform: 'official', url: 'https://www.grab.com/kh/en/' }]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和应急补货先保留一个本地大盘入口。', 'For clothing and quick replacement buys, keep one broad local marketplace.', [
        app('khmer24', 'Khmer24', '默认首选。', 'Primary.', '如果你想先解决“衣”和临时补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.khmer24.com/' }]),
      ]),
      tripadvisorCategory('tripadvisor-kh'),
      category('food-delivery', '外卖先保留一个成熟入口即可。', 'For delivery, one mature app is enough.', [
        app('foodpanda-kh', 'foodpanda', '默认首选。', 'Primary.', '如果晚到、下雨或不想出门找吃的，就先装它。', 'If you expect late arrivals, rainy days, or nights in, start here.', true, [{ platform: 'official', url: 'https://www.foodpanda.com.kh/' }]),
      ]),
      category('stays', '住宿层更适合先保留一个东南亚常用入口。', 'For stays, begin with one Southeast Asia-friendly hotel app.', [
        app('agoda-kh', 'Agoda', '默认首选。', 'Primary.', '如果你只保留一个订酒店入口，就先留它。', 'If you keep one hotel app, keep this one.', true, [{ platform: 'official', url: 'https://www.agoda.com/' }]),
      ]),
    ],
  },
  {
    slug: 'austria',
    teaser: copy(
      '奥地利更适合先把打车、外卖和住宿入口准备好，其他层保持精简即可。',
      'Austria works best when rides, delivery, and stays are sorted first while the rest of the stack stays restrained.',
    ),
    intro: copy(
      '奥地利的 app 栈不需要很重。先把打车、地图、购物、找餐厅、外卖和住宿准备好，机场进城、找店和临时补酒店都会顺很多。',
      'Austria does not need a very heavy app stack. Once rides, maps, shopping, restaurant discovery, delivery, and stays are ready, airport arrivals, restaurant decisions, and hotel changes become much smoother.',
    ),
    highlights: { 'zh-CN': ['打车', '外卖', '住宿'], 'en-US': ['Rides', 'Delivery', 'Stays'] },
    cautions: {
      'zh-CN': [
        '如果你已经有熟悉的国际地图 app，就继续保留它。',
        '奥地利更适合把 app 栈做轻，先把 ride 和 delivery 准备好。',
      ],
      'en-US': [
        'If you already have a trusted global map app, keep it.',
        'Austria usually works better with a lighter stack. Sort rides and delivery first.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个本地强入口。', 'For rides, keep one strong local default.', [
        app('freenow-at', 'FREENOW', '默认首选。', 'Primary.', '如果你想先准备一个更本地化的叫车入口，就先装它。', 'If you want the more local ride layer first, start here.', true, [{ platform: 'official', url: 'https://www.free-now.com/at-en/' }]),
      ]),
      mapCategory(),
      category('shopping', '买衣服先保留一个成熟时尚入口。', 'For fashion and basics, keep one mature shopping platform.', [
        app('zalando-at', 'Zalando', '默认首选。', 'Primary.', '如果你只补一个“衣”的入口，就先装它。', 'If you add only one clothing-focused app, start here.', true, [{ platform: 'official', url: 'https://en.zalando.at/' }]),
      ]),
      tripadvisorCategory('tripadvisor-at'),
      category('food-delivery', '外卖先保留一个本地常见入口。', 'For delivery, keep one locally common default.', [
        app('foodora-at', 'foodora', '默认首选。', 'Primary.', '如果外卖会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://www.foodora.at/' }]),
      ]),
      bookingCategory('booking-at'),
    ],
  },
  {
    slug: 'greece',
    teaser: copy(
      '希腊更适合先把打车、探店和住宿入口准备好，购物和外卖层保持轻量即可。',
      'Greece works best when rides, food discovery, and stays are ready first while shopping and delivery stay lighter.',
    ),
    intro: copy(
      '希腊更适合保持一个轻量但可执行的 app 栈。先把打车、地图、购物、餐厅发现、外卖和住宿准备好，机场、海岛切换和餐厅选择都会顺很多。',
      'Greece works better with a light but usable app stack. Once rides, maps, shopping, restaurant discovery, delivery, and stays are ready, airport arrivals, island transfers, and dining decisions become much easier.',
    ),
    highlights: { 'zh-CN': ['打车', '探店', '住宿'], 'en-US': ['Rides', 'Food discovery', 'Stays'] },
    cautions: {
      'zh-CN': [
        '如果你的行程会在多个城市或岛屿切换，先把住和吃的层准备好。',
        '地图层继续用你最熟悉的主流 app 即可。',
      ],
      'en-US': [
        'If your trip switches between cities or islands, sort the stays and food layers first.',
        'For maps, the mainstream app you already know is usually enough.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个成熟入口。', 'For rides, keep one mature local default.', [
        app('freenow-gr', 'FREENOW', '默认首选。', 'Primary.', '如果你想先装一个更接近本地日常使用的打车入口，就先装它。', 'If you want the ride app that feels more local-first, start here.', true, [{ platform: 'official', url: 'https://www.free-now.com/gr-en/' }]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和临时补货先保留一个本地电商入口。', 'For clothing and quick replacement shopping, keep one broad local marketplace.', [
        app('skroutz', 'Skroutz', '默认首选。', 'Primary.', '如果你想先解决“衣”和应急补货层，就先装它。', 'If clothing and emergency replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.skroutz.gr/' }]),
      ]),
      tripadvisorCategory('tripadvisor-gr'),
      category('food-delivery', '外卖先保留一个本地强入口即可。', 'For delivery, one strong local app is enough.', [
        app('efood', 'efood', '默认首选。', 'Primary.', '如果你会晚到或不想出门找吃的，就先装它。', 'If you expect late arrivals or nights in, start here.', true, [{ platform: 'official', url: 'https://www.e-food.gr/' }]),
      ]),
      bookingCategory('booking-gr'),
    ],
  },
  {
    slug: 'switzerland',
    teaser: copy(
      '瑞士更适合先把打车、探店和住宿入口准备好，其他层保持克制即可。',
      'Switzerland works best when rides, dining discovery, and stays are ready first while the rest of the stack stays restrained.',
    ),
    intro: copy(
      '瑞士不需要一个很重的本地 app 栈。先把打车、地图、购物、探店、外卖和住宿准备好，大部分游客的日常决策都能覆盖。',
      'Switzerland does not need a very heavy local app stack. Once rides, maps, shopping, food discovery, delivery, and stays are ready, most common traveler decisions are already covered.',
    ),
    highlights: { 'zh-CN': ['打车', '探店', '住宿'], 'en-US': ['Rides', 'Food discovery', 'Stays'] },
    cautions: {
      'zh-CN': [
        '瑞士更适合保持一个轻量 app 栈，先把住和吃的层准备好。',
        '如果你已经熟悉 Google Maps，就继续留它即可。',
      ],
      'en-US': [
        'Switzerland is usually better with a lighter stack, so sort stays and food first.',
        'If Google Maps is already your default, keep it.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个国际化主入口。', 'For rides, keep one international default first.', [
        app('uber-ch', 'Uber', '默认首选。', 'Primary.', '如果你只留一个打车入口，就先留它。', 'If you keep one ride app, keep this one.', true, [{ platform: 'official', url: 'https://www.uber.com/ch/en/ride/' }, ...UBER_LINKS]),
      ]),
      mapCategory(),
      category('shopping', '买衣服先保留一个成熟时尚平台。', 'For fashion and basics, keep one mature shopping platform.', [
        app('zalando-ch', 'Zalando', '默认首选。', 'Primary.', '如果你只补一个“衣”的入口，就先装它。', 'If you add only one clothing-focused app, start here.', true, [{ platform: 'official', url: 'https://www.zalando.ch/' }]),
      ]),
      category('food-discovery', '吃喝层先保留一个订位和发现入口。', 'For dining, keep one reservation-and-discovery layer first.', [
        app('thefork-ch', 'TheFork', '默认首选。', 'Primary.', '如果你更依赖先找店和看订位层，就先用它。', 'If discovery and reservations come first, start here.', true, [{ platform: 'official', url: 'https://www.thefork.com/' }]),
      ]),
      category('food-delivery', '外卖先保留一个成熟本地入口。', 'For delivery, keep one mature local default.', [
        app('just-eat-ch', 'Just Eat', '默认首选。', 'Primary.', '如果外卖会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://www.just-eat.ch/en/' }]),
      ]),
      bookingCategory('booking-ch'),
    ],
  },
  {
    slug: 'argentina',
    teaser: copy(
      '阿根廷更适合先把打车、外卖、购物和住宿入口准备好，日常城市切换会顺很多。',
      'Argentina works best when rides, delivery, shopping, and stays are ready before daily city movement starts.',
    ),
    intro: copy(
      '阿根廷更适合围绕打车、地图、购物、餐厅发现、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找吃的和临时补货都会顺很多。',
      'Argentina works better when the app stack is built around rides, maps, shopping, restaurant discovery, delivery, and stays. Getting those layers ready early makes airport arrivals, meals, and replacement shopping much smoother.',
    ),
    highlights: { 'zh-CN': ['打车', '外卖', '购物'], 'en-US': ['Rides', 'Delivery', 'Shopping'] },
    cautions: {
      'zh-CN': [
        '如果你已经在别国用过 Uber，也可以保留它，但先把本地 ride 层准备好更值。',
        '阿根廷的购物和外卖层更值得提前准备。',
      ],
      'en-US': [
        'If Uber is already in your stack, you can keep it, but the more local ride layer is worth sorting first.',
        'In Argentina, shopping and delivery are often the more useful layers to sort early.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个更本地化的主入口。', 'For rides, keep one more local-first default.', [
        app('cabify-ar', 'Cabify', '默认首选。', 'Primary.', '如果你想先准备一个更本地化的 ride app，就先装它。', 'If you want the more local-first ride app, start here.', true, [{ platform: 'official', url: 'https://cabify.com/ar' }]),
        app('uber-ar', 'Uber', '适合作为国际化备选。', 'A useful international backup.', '如果 Uber 已经在你的旅行栈里，就继续保留它。', 'Keep it if Uber is already part of your broader travel stack.', false, UBER_LINKS),
      ]),
      mapCategory(),
      category('shopping', '买衣服和补货先保留一个本地大盘入口。', 'For clothing and replacement shopping, keep one broad local marketplace.', [
        app('mercado-libre-ar', 'Mercado Libre', '默认首选。', 'Primary.', '如果你想先解决“衣”和补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.mercadolibre.com.ar/' }]),
      ]),
      tripadvisorCategory('tripadvisor-ar'),
      category('food-delivery', '外卖先保留一个本地强入口即可。', 'For delivery, one strong local app is enough.', [
        app('pedidosya-ar', 'PedidosYa', '默认首选。', 'Primary.', '如果外卖会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://www.pedidosya.com/' }]),
      ]),
      bookingCategory('booking-ar'),
    ],
  },
  {
    slug: 'canada',
    teaser: copy(
      '加拿大不需要很本地化的 app 栈，但把打车、探店、外卖和住宿层准备好会省很多切换成本。',
      'Canada does not need a deeply local stack, but sorting rides, dining discovery, delivery, and stays early removes a lot of friction.',
    ),
    intro: copy(
      '加拿大更适合保持一个轻量而稳的 app 栈。先把打车、地图、购物、探店、外卖和住宿准备好，大多数城市里的高频动作就都能覆盖。',
      'Canada works best with a light but reliable app stack. Once rides, maps, shopping, food discovery, delivery, and stays are ready, most common city-travel actions are already covered.',
    ),
    highlights: { 'zh-CN': ['打车', '探店', '外卖'], 'en-US': ['Rides', 'Food discovery', 'Delivery'] },
    cautions: {
      'zh-CN': [
        '加拿大很多层面不必追求更“本地”的替代，保留你已经熟的主流 app 往往更高效。',
        '如果你的行程以城市为主，先把外卖和住的层准备好就够了。',
      ],
      'en-US': [
        'In Canada, you often do not need a more local substitute for every layer. The mainstream apps you already know are usually efficient enough.',
        'If the trip is city-heavy, sorting delivery and stays first is usually enough.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个全国通用入口。', 'For rides, keep one nationwide default first.', [
        app('uber-ca', 'Uber', '默认首选。', 'Primary.', '如果你只留一个打车入口，就先留它。', 'If you keep one ride app, keep this one.', true, [{ platform: 'official', url: 'https://www.uber.com/ca/en/ride/' }, ...UBER_LINKS]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和日用品先保留一个大而稳的零售入口。', 'For clothing and basics, keep one broad retail app first.', [
        app('the-bay', "Hudson's Bay", '默认首选。', 'Primary.', '如果你想先解决“衣”和日用品补货层，就先装它。', 'If clothing and general replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.thebay.com/' }]),
      ]),
      category('food-discovery', '吃喝层先保留一个本地评价入口。', 'For dining, keep one local review layer first.', [
        app('yelp-ca', 'Yelp', '默认首选。', 'Primary.', '如果你更依赖先看评价和区域筛店，就先装它。', 'If ratings and neighborhood filtering matter first, start here.', true, [{ platform: 'official', url: 'https://www.yelp.com/' }]),
      ]),
      category('food-delivery', '外卖先保留一个成熟主入口即可。', 'For delivery, one mature default is enough.', [
        app('skip-ca', 'Skip', '默认首选。', 'Primary.', '如果外卖会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://www.skipthedishes.com/' }]),
      ]),
      bookingCategory('booking-ca'),
    ],
  },
  {
    slug: 'chile',
    teaser: copy(
      '智利更适合先把打车、外卖、购物和住宿入口准备好，城市内行动会顺很多。',
      'Chile works best when rides, delivery, shopping, and stays are ready before daily city movement starts.',
    ),
    intro: copy(
      '智利更适合围绕打车、地图、购物、餐厅发现、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找吃的和补货都会顺很多。',
      'Chile works best when the app stack is built around rides, maps, shopping, restaurant discovery, delivery, and stays. Once those layers are ready, airport arrivals, food decisions, and replacement shopping become much smoother.',
    ),
    highlights: { 'zh-CN': ['打车', '外卖', '购物'], 'en-US': ['Rides', 'Delivery', 'Shopping'] },
    cautions: {
      'zh-CN': [
        '如果你已经在别国用过 Uber，也可以留着，但本地 ride 层更值得先装。',
        '智利更适合先把吃和住的层准备好。',
      ],
      'en-US': [
        'If Uber is already part of your stack, you can keep it, but the more local ride layer is still worth sorting first.',
        'In Chile, it is usually more valuable to sort the food and stays layers early.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个更本地化的主入口。', 'For rides, keep one more local-first default.', [
        app('cabify-cl', 'Cabify', '默认首选。', 'Primary.', '如果你想先准备一个更本地化的 ride app，就先装它。', 'If you want the more local-first ride app, start here.', true, [{ platform: 'official', url: 'https://cabify.com/cl' }]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和补货先保留一个本地大盘入口。', 'For clothing and replacement shopping, keep one broad local marketplace.', [
        app('mercado-libre-cl', 'Mercado Libre', '默认首选。', 'Primary.', '如果你想先解决“衣”和补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.mercadolibre.cl/' }]),
      ]),
      tripadvisorCategory('tripadvisor-cl'),
      category('food-delivery', '外卖先保留一个成熟主入口即可。', 'For delivery, one mature default is enough.', [
        app('pedidosya-cl', 'PedidosYa', '默认首选。', 'Primary.', '如果 delivery 会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://www.pedidosya.com/' }]),
      ]),
      bookingCategory('booking-cl'),
    ],
  },
  {
    slug: 'colombia',
    teaser: copy(
      '哥伦比亚更适合先把打车、外卖、购物和住宿入口准备好，落地后的动作会快很多。',
      'Colombia works best when rides, delivery, shopping, and stays are sorted before you land.',
    ),
    intro: copy(
      '哥伦比亚更适合围绕打车、地图、购物、探店、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找吃的和临时补货都会顺很多。',
      'Colombia works best when the app stack is built around rides, maps, shopping, food discovery, delivery, and stays. Getting those layers ready early makes airport arrivals, meals, and replacement shopping much smoother.',
    ),
    highlights: { 'zh-CN': ['打车', '外卖', '购物'], 'en-US': ['Rides', 'Delivery', 'Shopping'] },
    cautions: {
      'zh-CN': [
        '哥伦比亚更值得先把 ride 和 delivery 层准备好。',
        '地图层继续保留你最熟悉的主流入口即可。',
      ],
      'en-US': [
        'In Colombia, it is usually more valuable to sort the ride and delivery layers first.',
        'For maps, the mainstream tool you already know is usually enough.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个成熟国际化入口。', 'For rides, keep one mature international default.', [
        app('uber-co', 'Uber', '默认首选。', 'Primary.', '如果你只留一个打车入口，就先留它。', 'If you keep one ride app, keep this one.', true, [{ platform: 'official', url: 'https://www.uber.com/co/en/ride/' }, ...UBER_LINKS]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和补货先保留一个本地大盘入口。', 'For clothing and replacement shopping, keep one broad local marketplace.', [
        app('mercado-libre-co', 'Mercado Libre', '默认首选。', 'Primary.', '如果你想先解决“衣”和补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.mercadolibre.com.co/' }]),
      ]),
      tripadvisorCategory('tripadvisor-co'),
      category('food-delivery', '外卖先保留一个本地强入口即可。', 'For delivery, one strong local app is enough.', [
        app('rappi-co', 'Rappi', '默认首选。', 'Primary.', '如果外卖会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://www.rappi.com.co/' }]),
      ]),
      bookingCategory('booking-co'),
    ],
  },
  {
    slug: 'costa-rica',
    teaser: copy(
      '哥斯达黎加更适合先把打车、外卖和住宿入口准备好，其他层保持轻量即可。',
      'Costa Rica works best when rides, delivery, and stays are ready first while the rest of the stack stays lighter.',
    ),
    intro: copy(
      '哥斯达黎加更适合保持一个轻量但好用的 app 栈。先把打车、地图、购物、探店、外卖和住宿准备好，多数游客的城市和度假场景都能覆盖。',
      'Costa Rica works better with a lighter but usable app stack. Once rides, maps, shopping, food discovery, delivery, and stays are ready, most city and resort travel scenarios are already covered.',
    ),
    highlights: { 'zh-CN': ['打车', '外卖', '住宿'], 'en-US': ['Rides', 'Delivery', 'Stays'] },
    cautions: {
      'zh-CN': [
        '哥斯达黎加不需要很重的 app 栈，先把 ride 和 stay 准备好。',
        '地图层继续保留你最熟悉的主流入口即可。',
      ],
      'en-US': [
        'Costa Rica does not need a heavy app stack. Sort rides and stays first.',
        'For maps, the mainstream tool you already know is usually enough.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个成熟入口。', 'For rides, keep one mature default first.', [
        app('uber-cr', 'Uber', '默认首选。', 'Primary.', '如果你只留一个打车入口，就先留它。', 'If you keep one ride app, keep this one.', true, [{ platform: 'official', url: 'https://www.uber.com/cr/en/ride/' }, ...UBER_LINKS]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和补货先保留一个大盘入口。', 'For clothing and replacement shopping, keep one broad marketplace first.', [
        app('mercado-libre-cr', 'Mercado Libre', '默认首选。', 'Primary.', '如果你想先解决“衣”和补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.mercadolibre.co.cr/' }]),
      ]),
      tripadvisorCategory('tripadvisor-cr'),
      category('food-delivery', '外卖先保留一个成熟主入口即可。', 'For delivery, one mature default is enough.', [
        app('pedidosya-cr', 'PedidosYa', '默认首选。', 'Primary.', '如果 delivery 会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://www.pedidosya.com/' }]),
      ]),
      bookingCategory('booking-cr'),
    ],
  },
  {
    slug: 'peru',
    teaser: copy(
      '秘鲁更适合先把打车、外卖、购物和住宿入口准备好，落地后的动作会顺很多。',
      'Peru works best when rides, delivery, shopping, and stays are sorted before you land.',
    ),
    intro: copy(
      '秘鲁更适合围绕打车、地图、购物、探店、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找饭吃和临时补货都会顺很多。',
      'Peru works best when the app stack is built around rides, maps, shopping, food discovery, delivery, and stays. Getting those layers ready early makes airport arrivals, meals, and replacement shopping much smoother.',
    ),
    highlights: { 'zh-CN': ['打车', '外卖', '购物'], 'en-US': ['Rides', 'Delivery', 'Shopping'] },
    cautions: {
      'zh-CN': [
        '如果你已经在别国用过 Uber，也可以保留它，但本地 ride 层更值得先装。',
        '秘鲁更适合先把购物和外卖层准备好。',
      ],
      'en-US': [
        'If Uber is already in your stack, you can keep it, but the more local ride layer is still worth sorting first.',
        'In Peru, the shopping and delivery layers are often worth preparing early.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个更本地化的主入口。', 'For rides, keep one more local-first default.', [
        app('cabify-pe', 'Cabify', '默认首选。', 'Primary.', '如果你想先准备一个更本地化的 ride app，就先装它。', 'If you want the more local-first ride app, start here.', true, [{ platform: 'official', url: 'https://cabify.com/pe' }]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和补货先保留一个本地大盘入口。', 'For clothing and replacement shopping, keep one broad local marketplace.', [
        app('mercado-libre-pe', 'Mercado Libre', '默认首选。', 'Primary.', '如果你想先解决“衣”和补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.mercadolibre.com.pe/' }]),
      ]),
      tripadvisorCategory('tripadvisor-pe'),
      category('food-delivery', '外卖先保留一个成熟主入口即可。', 'For delivery, one mature default is enough.', [
        app('pedidosya-pe', 'PedidosYa', '默认首选。', 'Primary.', '如果 delivery 会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://www.pedidosya.com/' }]),
      ]),
      bookingCategory('booking-pe'),
    ],
  },
  {
    slug: 'egypt',
    teaser: copy(
      '埃及更适合先把打车、购物、外卖和住宿入口准备好，现场动作会顺很多。',
      'Egypt works best when rides, shopping, delivery, and stays are sorted before you land.',
    ),
    intro: copy(
      '埃及更适合围绕打车、地图、购物、探店、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找饭吃和补货都会顺很多。',
      'Egypt works best when the app stack is built around rides, maps, shopping, food discovery, delivery, and stays. Once those layers are ready, airport arrivals, meals, and replacement shopping become much smoother.',
    ),
    highlights: { 'zh-CN': ['打车', '购物', '外卖'], 'en-US': ['Rides', 'Shopping', 'Delivery'] },
    cautions: {
      'zh-CN': [
        '埃及更值得先把 ride 和 delivery 层准备好。',
        '如果你已经熟悉 Google Maps，就继续保留它即可。',
      ],
      'en-US': [
        'In Egypt, it is usually more valuable to sort the ride and delivery layers first.',
        'If Google Maps is already your default, keep it.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个成熟国际化入口。', 'For rides, keep one mature international default.', [
        app('uber-eg', 'Uber', '默认首选。', 'Primary.', '如果你只留一个打车入口，就先留它。', 'If you keep one ride app, keep this one.', true, [{ platform: 'official', url: 'https://www.uber.com/eg/en/ride/' }, ...UBER_LINKS]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和日用品先保留一个本地大盘入口。', 'For clothing and basics, keep one broad local marketplace first.', [
        app('jumia-eg', 'Jumia', '默认首选。', 'Primary.', '如果你想先解决“衣”和补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.jumia.com.eg/' }]),
      ]),
      category('food-discovery', '吃喝层先保留一个本地发现入口。', 'For dining, keep one local discovery layer first.', [
        app('elmenus', 'elmenus', '默认首选。', 'Primary.', '如果你更依赖先找店和看菜单，就先装它。', 'If restaurant browsing and menu scanning matter first, start here.', true, [{ platform: 'official', url: 'https://elmenus.com/' }]),
      ]),
      category('food-delivery', '外卖先保留一个成熟主入口即可。', 'For delivery, one mature default is enough.', [
        app('talabat-eg', 'talabat', '默认首选。', 'Primary.', '如果外卖会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://www.talabat.com/egypt' }]),
      ]),
      bookingCategory('booking-eg'),
    ],
  },
  {
    slug: 'kenya',
    teaser: copy(
      '肯尼亚更适合先把打车、探店、外卖和住宿入口准备好，落地后的动作会快很多。',
      'Kenya works best when rides, food discovery, delivery, and stays are sorted before you land.',
    ),
    intro: copy(
      '肯尼亚更适合围绕打车、地图、购物、探店、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找店和临时补货都会顺很多。',
      'Kenya works best when the app stack is built around rides, maps, shopping, food discovery, delivery, and stays. Once those layers are ready, airport arrivals, restaurant choices, and replacement shopping become much smoother.',
    ),
    highlights: { 'zh-CN': ['打车', '探店', '外卖'], 'en-US': ['Rides', 'Food discovery', 'Delivery'] },
    cautions: {
      'zh-CN': [
        '肯尼亚更值得先把 ride 和 food 层准备好。',
        '如果你只想保留最小 app 栈，先保证打车、外卖和住宿在线。',
      ],
      'en-US': [
        'In Kenya, it is usually more valuable to sort the ride and food layers first.',
        'If you want the smallest useful stack, make sure rides, delivery, and stays are ready first.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个本地强入口。', 'For rides, keep one strong local default.', [
        app('bolt-ke', 'Bolt', '默认首选。', 'Primary.', '如果你只留一个打车入口，就先装它。', 'If you keep one ride app, start here.', true, [{ platform: 'official', url: 'https://bolt.eu/en-ke/' }]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和补货先保留一个本地大盘入口。', 'For clothing and replacement shopping, keep one broad local marketplace.', [
        app('jumia-ke', 'Jumia', '默认首选。', 'Primary.', '如果你想先解决“衣”和补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.jumia.co.ke/' }]),
      ]),
      category('food-discovery', '吃喝层先保留一个本地餐厅发现入口。', 'For dining, keep one local restaurant-discovery layer first.', [
        app('eatout-ke', 'EatOut', '默认首选。', 'Primary.', '如果你更依赖先找店和看榜单，就先装它。', 'If restaurant discovery and local lists matter first, start here.', true, [{ platform: 'official', url: 'https://eatout.co.ke/' }]),
      ]),
      category('food-delivery', '外卖先保留一个区域强入口即可。', 'For delivery, one strong regional app is enough.', [
        app('glovo-ke', 'Glovo', '默认首选。', 'Primary.', '如果外卖会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://glovoapp.com/ke/en/' }]),
      ]),
      bookingCategory('booking-ke'),
    ],
  },
  {
    slug: 'mauritius',
    teaser: copy(
      '毛里求斯更适合先把叫车、购物、外卖和住宿入口准备好，岛上移动会顺很多。',
      'Mauritius works best when rides, shopping, delivery, and stays are ready before you start moving around the island.',
    ),
    intro: copy(
      '毛里求斯更适合保持一个轻量但明确的 app 栈。先把叫车、地图、购物、探店、外卖和住宿准备好，机场接送、海边酒店往返和日常找吃的都会顺很多。',
      'Mauritius works better with a light but clear app stack. Once rides, maps, shopping, food discovery, delivery, and stays are ready, airport transfers, hotel movement, and everyday food decisions become much easier.',
    ),
    highlights: { 'zh-CN': ['叫车', '外卖', '住宿'], 'en-US': ['Rides', 'Delivery', 'Stays'] },
    cautions: {
      'zh-CN': [
        '毛里求斯更适合保持一个轻量 app 栈，先把 ride 和 delivery 层准备好。',
        '如果你已经熟悉 Google Maps，就继续保留它即可。',
      ],
      'en-US': [
        'Mauritius is usually better with a lighter stack, so sort rides and delivery first.',
        'If Google Maps already fits your flow, keep it.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个岛上本地入口。', 'For rides, keep one island-local default.', [
        app('yugo-mu', 'Yugo', '默认首选。', 'Primary.', '如果你只留一个叫车入口，就先装它。', 'If you keep one ride app, start here.', true, [{ platform: 'official', url: 'https://www.yugo.mu/' }]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和日常补货先保留一个本地商业入口。', 'For clothing and replacement shopping, keep one local commerce app first.', [
        app('fliqo', 'FLIQO', '默认首选。', 'Primary.', '如果你想先解决“衣”和本地购物层，就先装它。', 'If shopping and local commerce come first, start here.', true, [{ platform: 'official', url: 'https://fliqo.site/' }]),
      ]),
      tripadvisorCategory('tripadvisor-mu'),
      category('food-delivery', '外卖先保留一个成熟本地入口即可。', 'For delivery, one mature local default is enough.', [
        app('ordermanzer', 'OrderManzer', '默认首选。', 'Primary.', '如果你会在酒店或住处点餐，就先装它。', 'If you expect to order to your hotel or stay, start here.', true, [{ platform: 'official', url: 'https://www.ordermanzer.mu/' }]),
      ]),
      bookingCategory('booking-mu'),
    ],
  },
  {
    slug: 'morocco',
    teaser: copy(
      '摩洛哥更适合先把打车、购物、外卖和住宿入口准备好，落地后的动作会顺很多。',
      'Morocco works best when rides, shopping, delivery, and stays are sorted before you land.',
    ),
    intro: copy(
      '摩洛哥更适合围绕打车、地图、购物、探店、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找吃的和补货都会顺很多。',
      'Morocco works best when the app stack is built around rides, maps, shopping, food discovery, delivery, and stays. Once those layers are ready, airport arrivals, meals, and replacement shopping become much smoother.',
    ),
    highlights: { 'zh-CN': ['打车', '购物', '外卖'], 'en-US': ['Rides', 'Shopping', 'Delivery'] },
    cautions: {
      'zh-CN': [
        '摩洛哥更值得先把 ride 和 delivery 层准备好。',
        '如果你已经习惯 Google Maps，就继续保留它即可。',
      ],
      'en-US': [
        'In Morocco, it is usually more valuable to sort the ride and delivery layers first.',
        'If Google Maps is already your default, keep it.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个本地更常见的入口。', 'For rides, keep one more locally common default.', [
        app('heetch-ma', 'Heetch', '默认首选。', 'Primary.', '如果你想先装一个更接近本地日常使用的叫车入口，就先装它。', 'If you want the ride app that feels more local-first, start here.', true, [{ platform: 'official', url: 'https://www.heetch.com/' }]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和补货先保留一个本地大盘入口。', 'For clothing and replacement shopping, keep one broad local marketplace.', [
        app('jumia-ma', 'Jumia', '默认首选。', 'Primary.', '如果你想先解决“衣”和补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.jumia.ma/' }]),
      ]),
      tripadvisorCategory('tripadvisor-ma'),
      category('food-delivery', '外卖先保留一个成熟主入口即可。', 'For delivery, one mature default is enough.', [
        app('glovo-ma', 'Glovo', '默认首选。', 'Primary.', '如果外卖会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://glovoapp.com/en/ma/' }]),
      ]),
      bookingCategory('booking-ma'),
    ],
  },
  {
    slug: 'south-africa',
    teaser: copy(
      '南非更适合先把打车、探店、外卖和购物入口准备好，城市旅行会顺很多。',
      'South Africa works best when rides, food discovery, delivery, and shopping are ready before daily city travel starts.',
    ),
    intro: copy(
      '南非更适合围绕打车、地图、购物、探店、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找餐厅和补货都会顺很多。',
      'South Africa works best when the app stack is built around rides, maps, shopping, food discovery, delivery, and stays. Once those layers are ready, airport arrivals, restaurant choices, and replacement shopping become much smoother.',
    ),
    highlights: { 'zh-CN': ['打车', '探店', '购物'], 'en-US': ['Rides', 'Food discovery', 'Shopping'] },
    cautions: {
      'zh-CN': [
        '南非更值得先把 ride 和 delivery 层准备好。',
        '如果你只想保留最小 app 栈，先保证打车、外卖和住宿在线。',
      ],
      'en-US': [
        'In South Africa, it is usually more valuable to sort rides and delivery first.',
        'If you want the smallest useful stack, make sure rides, delivery, and stays are ready first.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个成熟全国入口。', 'For rides, keep one mature nationwide default.', [
        app('uber-za', 'Uber', '默认首选。', 'Primary.', '如果你只留一个打车入口，就先留它。', 'If you keep one ride app, keep this one.', true, [{ platform: 'official', url: 'https://www.uber.com/za/en/ride/' }, ...UBER_LINKS]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和补货先保留一个本地大盘入口。', 'For clothing and replacement shopping, keep one broad local marketplace.', [
        app('takealot', 'Takealot', '默认首选。', 'Primary.', '如果你想先解决“衣”和补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.takealot.com/' }]),
      ]),
      category('food-discovery', '吃喝层先保留一个本地餐厅发现入口。', 'For dining, keep one local restaurant-discovery layer first.', [
        app('dineplan', 'Dineplan', '默认首选。', 'Primary.', '如果你更依赖先找店和看订位层，就先装它。', 'If restaurant discovery and bookings matter first, start here.', true, [{ platform: 'official', url: 'https://www.dineplan.com/' }]),
      ]),
      category('food-delivery', '外卖先保留一个成熟本地入口即可。', 'For delivery, one mature local default is enough.', [
        app('mr-d', 'Mr D', '默认首选。', 'Primary.', '如果外卖会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://www.mrdfood.com/' }]),
      ]),
      bookingCategory('booking-za'),
    ],
  },
  {
    slug: 'tanzania',
    teaser: copy(
      '坦桑尼亚更适合先把打车、外卖和住宿入口准备好，其他层保持轻量即可。',
      'Tanzania works best when rides, delivery, and stays are ready first while the rest of the stack stays lighter.',
    ),
    intro: copy(
      '坦桑尼亚更适合保持一个轻量但好用的 app 栈。先把打车、地图、购物、探店、外卖和住宿准备好，机场进城、叫车和点餐都会顺很多。',
      'Tanzania works better with a lighter but usable app stack. Once rides, maps, shopping, food discovery, delivery, and stays are ready, airport arrivals, ride calls, and meal orders become much easier.',
    ),
    highlights: { 'zh-CN': ['打车', '外卖', '住宿'], 'en-US': ['Rides', 'Delivery', 'Stays'] },
    cautions: {
      'zh-CN': [
        '坦桑尼亚更适合先把 ride 和 delivery 层准备好。',
        '地图层继续保留你最熟悉的主流入口即可。',
      ],
      'en-US': [
        'Tanzania is usually easier when the ride and delivery layers are sorted first.',
        'For maps, the mainstream tool you already know is usually enough.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个在当地运营的主入口。', 'For rides, keep one active local default.', [
        app('bolt-tz', 'Bolt', '默认首选。', 'Primary.', '如果你只留一个打车入口，就先留它。', 'If you keep one ride app, keep this one.', true, [{ platform: 'official', url: 'https://bolt.eu/en/' }]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和补货先保留一个本地二手与交易入口。', 'For clothing and replacement shopping, keep one local marketplace first.', [
        app('jiji-tz', 'Jiji', '默认首选。', 'Primary.', '如果你想先解决“衣”和补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://jiji.co.tz/' }]),
      ]),
      tripadvisorCategory('tripadvisor-tz'),
      category('food-delivery', '外卖先保留一个本地综合入口即可。', 'For delivery, one local all-in-one app is enough.', [
        app('piki', 'Piki', '默认首选。', 'Primary.', '如果你想先把点餐和配送层准备好，就先装它。', 'If you want the delivery layer ready first, start here.', true, [{ platform: 'official', url: 'https://www.piki.africa/' }]),
      ]),
      bookingCategory('booking-tz'),
    ],
  },
  {
    slug: 'new-zealand',
    teaser: copy(
      '新西兰不需要很本地化的 app 栈，但把打车、探店、外卖和住宿层准备好会省很多切换成本。',
      'New Zealand does not need a deeply local stack, but sorting rides, food discovery, delivery, and stays early removes a lot of friction.',
    ),
    intro: copy(
      '新西兰更适合保持一个轻量而稳的 app 栈。先把打车、地图、购物、探店、外卖和住宿准备好，大多数城市旅行的高频动作就都能覆盖。',
      'New Zealand works best with a light but reliable app stack. Once rides, maps, shopping, food discovery, delivery, and stays are ready, most common city-travel actions are already covered.',
    ),
    highlights: { 'zh-CN': ['打车', '探店', '住宿'], 'en-US': ['Rides', 'Food discovery', 'Stays'] },
    cautions: {
      'zh-CN': [
        '新西兰很多层面不必追求更“本地”的替代，保留你已经熟的主流 app 往往更高效。',
        '如果你只想保留最小 app 栈，先保证打车、外卖和住宿在线。',
      ],
      'en-US': [
        'In New Zealand, you often do not need a more local substitute for every layer. The mainstream apps you already know are usually more efficient.',
        'If you want the smallest useful stack, make sure rides, delivery, and stays are ready first.',
      ],
    },
    categories: [
      category('ride-hailing', '打车先保留一个全国通用主入口。', 'For rides, keep one nationwide default first.', [
        app('uber-nz', 'Uber', '默认首选。', 'Primary.', '如果你只留一个打车入口，就先留它。', 'If you keep one ride app, keep this one.', true, [{ platform: 'official', url: 'https://www.uber.com/nz/en/ride/' }, ...UBER_LINKS]),
      ]),
      mapCategory(),
      category('shopping', '买衣服和补货先保留一个本地购物入口。', 'For clothing and replacement shopping, keep one local marketplace first.', [
        app('the-market', 'TheMarket', '默认首选。', 'Primary.', '如果你想先解决“衣”和补货层，就先装它。', 'If clothing and replacement shopping come first, start here.', true, [{ platform: 'official', url: 'https://www.themarket.com/nz/' }]),
      ]),
      category('food-discovery', '吃喝层先保留一个订位和发现入口。', 'For dining, keep one booking-and-discovery layer first.', [
        app('first-table', 'First Table', '默认首选。', 'Primary.', '如果你更依赖先找店和看可订时段，就先装它。', 'If restaurant discovery and booking slots matter first, start here.', true, [{ platform: 'official', url: 'https://www.firsttable.co.nz/' }]),
      ]),
      category('food-delivery', '外卖先保留一个成熟主入口即可。', 'For delivery, one mature default is enough.', [
        app('menulog-nz', 'Menulog', '默认首选。', 'Primary.', '如果外卖会成为高频动作，就先装它。', 'If delivery will be frequent, start here.', true, [{ platform: 'official', url: 'https://www.menulog.co.nz/' }]),
      ]),
      bookingCategory('booking-nz'),
    ],
  },
]
