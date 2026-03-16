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

export const LOCAL_APP_GUIDE_ADDITIONS_EXTRA: RawLocalAppGuideDefinition[] = [
  {
    slug: 'spain',
    teaser: {
      'zh-CN': '西班牙更适合先把打车、餐厅发现、外卖和酒店入口准备好，城市切换会顺很多。',
      'en-US': 'Spain works best when rides, restaurant discovery, delivery, and hotel booking are ready before you start moving between cities.',
    },
    intro: {
      'zh-CN': '西班牙不需要很重的 app 栈，但值得先把打车、地图、购物、找餐厅、外卖和酒店这几层准备好。这样从机场进城、找店订位到回酒店都会更顺。',
      'en-US': 'Spain does not need a very heavy app stack, but rides, maps, shopping, restaurant discovery, delivery, and hotels are worth sorting early. That makes airport arrivals, meal decisions, and hotel changes much easier on the ground.',
    },
    highlights: {
      'zh-CN': ['打车', '探店', '外卖'],
      'en-US': ['Rides', 'Food discovery', 'Delivery'],
    },
    cautions: {
      'zh-CN': [
        '如果你的主要问题是找店和订位，优先把餐厅发现层准备好，比多装一个地图备份更值。',
        '住和行先各保留一个主入口，别一上来装太多同类 app。',
      ],
      'en-US': [
        'If restaurant choice and bookings matter first, prioritizing the dining layer adds more value than a second map app.',
        'For rides and stays, start with one main app each before adding backups.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '打车先保留一个本地强入口，再视情况补国际备选。',
          'en-US': 'Start with one strong local ride app, then add an international backup only if needed.',
        },
        apps: [
          {
            id: 'cabify-es',
            name: 'Cabify',
            summary: {
              'zh-CN': '默认首选，更像西班牙本地化的叫车入口。',
              'en-US': 'Primary pick and the more Spain-native ride layer to sort first.',
            },
            reason: {
              'zh-CN': '如果你想先准备一个更本地化的打车 app，就先装它。',
              'en-US': 'If you want the more local ride layer first, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://cabify.com/es' },
            ],
          },
          {
            id: 'uber-es',
            name: 'Uber',
            summary: {
              'zh-CN': '适合作为国际化备选。',
              'en-US': 'A useful international backup.',
            },
            reason: {
              'zh-CN': '如果 Uber 已经在你的旅行栈里，就继续保留它。',
              'en-US': 'Keep it if Uber is already part of your broader travel stack.',
            },
            recommended: false,
            links: UBER_LINKS,
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图层保持主流入口即可。',
          'en-US': 'The maps layer can stay on the mainstream app you already know.',
        },
        apps: [
          {
            id: 'google-maps-es',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只保留一个地图 app，就先留它。',
              'en-US': 'If you keep one map app, keep this one.',
            },
            recommended: true,
            links: GOOGLE_MAPS_LINKS,
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '买衣服先保留一个本地百货入口。',
          'en-US': 'For clothing and essentials, start with one local retail app.',
        },
        apps: [
          {
            id: 'el-corte-ingles',
            name: 'El Corte Ingles',
            summary: {
              'zh-CN': '默认首选，衣服和临时补货都更直观。',
              'en-US': 'Primary pick for clothing, basics, and general replacement shopping.',
            },
            reason: {
              'zh-CN': '如果你想要一个更“西班牙本地”的购物入口，就先装它。',
              'en-US': 'If you want the more Spain-first shopping layer, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.elcorteingles.es/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层先保留一个餐厅发现和订位入口。',
          'en-US': 'For dining, keep one restaurant-discovery and reservation layer first.',
        },
        apps: [
          {
            id: 'thefork-es',
            name: 'TheFork',
            summary: {
              'zh-CN': '默认首选，找店和订位都更顺。',
              'en-US': 'Primary pick for restaurant discovery and reservations.',
            },
            reason: {
              'zh-CN': '如果吃饭更依赖看评分和订位，就先装它。',
              'en-US': 'If ratings and reservations drive the dining plan, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.thefork.com/' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖先保留一个本地强入口即可。',
          'en-US': 'For delivery, one strong local app is enough.',
        },
        apps: [
          {
            id: 'glovo-es',
            name: 'Glovo',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果外卖会成为高频动作，就先装它。',
              'en-US': 'If delivery will be a repeated part of the trip, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://glovoapp.com/es/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '住的层面先保留一个成熟酒店入口。',
          'en-US': 'For stays, begin with one mature hotel-booking app.',
        },
        apps: [
          {
            id: 'booking-es',
            name: 'Booking.com',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个住的入口，就先留它。',
              'en-US': 'If you keep one hotel-booking app, keep this one.',
            },
            recommended: true,
            links: BOOKING_LINKS,
          },
        ],
      },
    ],
  },
  {
    slug: 'portugal',
    teaser: {
      'zh-CN': '葡萄牙更适合先把打车、餐厅发现、外卖和酒店入口准备好，城市内行动会更轻松。',
      'en-US': 'Portugal works best when rides, restaurant discovery, delivery, and hotel booking are ready before daily city movement starts.',
    },
    intro: {
      'zh-CN': '葡萄牙的 app 栈可以保持轻量，但值得先把打车、地图、购物、找餐厅、外卖和酒店入口准备好。这样从机场到市区、找餐厅到补住宿都更顺。',
      'en-US': 'Portugal can stay lean, but rides, maps, shopping, restaurant discovery, delivery, and hotel booking are worth preparing early. That keeps airport arrivals, meal choices, and stay changes much smoother.',
    },
    highlights: {
      'zh-CN': ['打车', '探店', '酒店'],
      'en-US': ['Rides', 'Food discovery', 'Hotels'],
    },
    cautions: {
      'zh-CN': [
        '如果你的地图习惯已经固定，别为了本地化强行切换太多导航工具。',
        '葡萄牙不需要很重的购物层，先把吃和住做好更值。',
      ],
      'en-US': [
        'If your mapping flow is already stable, do not over-rotate into too many navigation apps just for localization.',
        'Portugal does not need a heavy shopping layer. Food and stays usually matter more first.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '打车先保留一个主力入口，再决定要不要补第二个。',
          'en-US': 'Keep one main ride app first, then decide if a backup is worth it.',
        },
        apps: [
          {
            id: 'bolt-pt',
            name: 'Bolt',
            summary: {
              'zh-CN': '默认首选，更适合作为葡萄牙的第一叫车入口。',
              'en-US': 'Primary pick and the best first ride layer to sort in Portugal.',
            },
            reason: {
              'zh-CN': '如果你想先装一个本地更常见的叫车 app，就先装它。',
              'en-US': 'If you want the more locally common ride app first, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://bolt.eu/en-pt/' },
            ],
          },
          {
            id: 'uber-pt',
            name: 'Uber',
            summary: {
              'zh-CN': '适合作为国际化备选。',
              'en-US': 'A useful international backup.',
            },
            reason: {
              'zh-CN': '如果 Uber 已经在你的旅行栈里，就继续保留它。',
              'en-US': 'Keep it if Uber is already part of your broader travel stack.',
            },
            recommended: false,
            links: UBER_LINKS,
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图层继续保留主流入口即可。',
          'en-US': 'The maps layer can stay on the mainstream tool you already know.',
        },
        apps: [
          {
            id: 'google-maps-pt',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个地图 app，就先留它。',
              'en-US': 'If you keep one map app, keep this one.',
            },
            recommended: true,
            links: GOOGLE_MAPS_LINKS,
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '买衣服先保留一个成熟时尚平台。',
          'en-US': 'For fashion and basics, keep one mature shopping platform.',
        },
        apps: [
          {
            id: 'zalando-pt',
            name: 'Zalando',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只补一个“衣”的入口，就先装它。',
              'en-US': 'If you add only one clothing-focused app, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.zalando.pt/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层先保留一个餐厅发现和订位入口。',
          'en-US': 'For dining, keep one restaurant-discovery and reservation app first.',
        },
        apps: [
          {
            id: 'thefork-pt',
            name: 'TheFork',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果餐厅选择和订位更重要，就先看它。',
              'en-US': 'If restaurant choice and reservations matter first, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.thefork.com/' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖保留一个本地强入口就够。',
          'en-US': 'For delivery, one strong local app is enough.',
        },
        apps: [
          {
            id: 'glovo-pt',
            name: 'Glovo',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果 delivery 会变成高频动作，就先装它。',
              'en-US': 'If delivery will become a repeat action on the trip, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://glovoapp.com/pt/en/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '住的层面先保留一个成熟酒店入口。',
          'en-US': 'For stays, keep one mature hotel-booking app first.',
        },
        apps: [
          {
            id: 'booking-pt',
            name: 'Booking.com',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个住的入口，就先留它。',
              'en-US': 'If you keep one hotel-booking app, keep this one.',
            },
            recommended: true,
            links: BOOKING_LINKS,
          },
        ],
      },
    ],
  },
  {
    slug: 'mexico',
    teaser: {
      'zh-CN': '墨西哥更适合先把打车、外卖、酒店和购物入口准备好，日常动作会更顺。',
      'en-US': 'Mexico works best when rides, delivery, hotels, and shopping are already sorted before daily movement starts.',
    },
    intro: {
      'zh-CN': '墨西哥值得先把打车、地图、购物、找餐厅、外卖和酒店这几层准备好。这样从机场进城、找饭吃到临时补货和改住宿都会更顺。',
      'en-US': 'Mexico is easier when rides, maps, shopping, restaurant discovery, delivery, and hotel booking are ready before you land. That smooths out airport arrivals, meal decisions, replacement shopping, and stay changes.',
    },
    highlights: {
      'zh-CN': ['打车', '外卖', '酒店'],
      'en-US': ['Rides', 'Delivery', 'Hotels'],
    },
    cautions: {
      'zh-CN': [
        '如果你已经准备了 Uber，可以保留它，但本地更常见的打车层也值得先装。',
        '吃的层面先把 delivery 准备好，往往比再补第二个地图 app 更值。',
      ],
      'en-US': [
        'If you already have Uber installed, keep it, but a more local-first ride layer is still worth setting up early.',
        'For food, sorting delivery early often adds more value than a second map app.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '打车先保留一个本地强入口，再决定要不要补国际备选。',
          'en-US': 'Start with one strong local ride app, then decide if an international backup is worth adding.',
        },
        apps: [
          {
            id: 'didi-mx',
            name: 'DiDi',
            summary: {
              'zh-CN': '默认首选，更适合作为墨西哥的第一叫车入口。',
              'en-US': 'Primary pick and the better first ride layer to sort in Mexico.',
            },
            reason: {
              'zh-CN': '如果你想先准备一个更本地化的打车 app，就先装它。',
              'en-US': 'If you want the more local-first ride layer early, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://mexico.didiglobal.com/mx/' },
            ],
          },
          {
            id: 'uber-mx',
            name: 'Uber',
            summary: {
              'zh-CN': '适合作为国际化备选。',
              'en-US': 'A useful international backup.',
            },
            reason: {
              'zh-CN': '如果 Uber 已经在你的旅行栈里，就继续保留它。',
              'en-US': 'Keep it if Uber is already part of your broader travel stack.',
            },
            recommended: false,
            links: UBER_LINKS,
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图层继续保留主流入口即可。',
          'en-US': 'The maps layer can stay on the mainstream tool you already know.',
        },
        apps: [
          {
            id: 'google-maps-mx',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个地图 app，就先留它。',
              'en-US': 'If you keep one map app, keep this one.',
            },
            recommended: true,
            links: GOOGLE_MAPS_LINKS,
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '买衣服和临时补货先保留一个大型本地电商入口。',
          'en-US': 'For clothing and quick replacement buys, keep one large local marketplace first.',
        },
        apps: [
          {
            id: 'mercado-libre-mx',
            name: 'Mercado Libre',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你想先解决“衣”和补货层，就先装它。',
              'en-US': 'If clothing and general replacement shopping are the first needs to solve, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.mercadolibre.com.mx/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层先保留一个点评和订位入口。',
          'en-US': 'For dining, keep one review-and-booking app first.',
        },
        apps: [
          {
            id: 'opentable-mx',
            name: 'OpenTable',
            summary: {
              'zh-CN': '默认首选，适合先找店和看订位层。',
              'en-US': 'Primary pick for restaurant discovery and booking flow.',
            },
            reason: {
              'zh-CN': '如果你想先知道哪里值得吃、能不能订位，就先看它。',
              'en-US': 'If you want to know what is worth eating next and whether it can be booked, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.opentable.com/' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖先保留一个本地强入口。',
          'en-US': 'For delivery, start with one strong local default.',
        },
        apps: [
          {
            id: 'rappi-mx',
            name: 'Rappi',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你会高频点餐或买些小东西，就先装它。',
              'en-US': 'If you expect repeated food or quick-item orders, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.rappi.com.mx/' },
            ],
          },
          {
            id: 'ubereats-mx',
            name: 'Uber Eats',
            summary: {
              'zh-CN': '适合作为国际化备选。',
              'en-US': 'A useful international backup.',
            },
            reason: {
              'zh-CN': '如果 Uber 系列已经在你的旅行栈里，就继续保留它。',
              'en-US': 'Keep it if the Uber stack is already part of your broader travel flow.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://www.ubereats.com/mx' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '住的层面先保留一个成熟酒店入口。',
          'en-US': 'For stays, start with one mature hotel-booking app.',
        },
        apps: [
          {
            id: 'booking-mx',
            name: 'Booking.com',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个住的入口，就先留它。',
              'en-US': 'If you keep one hotel-booking app, keep this one.',
            },
            recommended: true,
            links: BOOKING_LINKS,
          },
        ],
      },
    ],
  },
  {
    slug: 'brazil',
    teaser: {
      'zh-CN': '巴西更适合先把打车、外卖、酒店和购物入口准备好，落地后的动作会快很多。',
      'en-US': 'Brazil works best when rides, delivery, hotel booking, and shopping are already sorted before you land.',
    },
    intro: {
      'zh-CN': '巴西的 app 栈更适合围绕打车、地图、购物、找餐厅、外卖和酒店来搭。先把这几层准备好，城市切换、找吃的和临时补货都会更顺。',
      'en-US': 'Brazil works best when the app stack is built around rides, maps, shopping, restaurant discovery, delivery, and hotels. Getting those layers ready early makes city changes, meal decisions, and replacement shopping much smoother.',
    },
    highlights: {
      'zh-CN': ['打车', '外卖', '购物'],
      'en-US': ['Rides', 'Delivery', 'Shopping'],
    },
    cautions: {
      'zh-CN': [
        '如果你已经有 Uber，可以继续保留，但本地 ride 层也值得先装。',
        '吃喝层不一定要拆得很重，先把探店和外卖各保留一个入口即可。',
      ],
      'en-US': [
        'If Uber is already installed, keep it, but a Brazil-first ride app is still worth sorting early.',
        'The food layer does not need to get heavy. One discovery app and one delivery app are enough to start.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '打车先保留一个本地强入口，再决定要不要补国际备选。',
          'en-US': 'Start with one strong local ride app, then decide if an international backup is worth keeping.',
        },
        apps: [
          {
            id: '99-br',
            name: '99',
            summary: {
              'zh-CN': '默认首选，更适合作为巴西的第一 ride app。',
              'en-US': 'Primary pick and the better first ride app to sort in Brazil.',
            },
            reason: {
              'zh-CN': '如果你想先准备一个更本地化的打车入口，就先装它。',
              'en-US': 'If you want a more Brazil-first ride layer, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://99app.com/' },
            ],
          },
          {
            id: 'uber-br',
            name: 'Uber',
            summary: {
              'zh-CN': '适合作为国际化备选。',
              'en-US': 'A useful international backup.',
            },
            reason: {
              'zh-CN': '如果 Uber 已经在你的旅行栈里，就继续保留它。',
              'en-US': 'Keep it if Uber is already part of your broader travel stack.',
            },
            recommended: false,
            links: UBER_LINKS,
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图层继续保留主流入口即可。',
          'en-US': 'The maps layer can stay on the mainstream tool you already know.',
        },
        apps: [
          {
            id: 'google-maps-br',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个地图 app，就先留它。',
              'en-US': 'If you keep one map app, keep this one.',
            },
            recommended: true,
            links: GOOGLE_MAPS_LINKS,
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '买衣服和临时补货先保留一个大型本地购物入口。',
          'en-US': 'For clothing and quick replacement buys, keep one large local marketplace first.',
        },
        apps: [
          {
            id: 'mercado-livre-br',
            name: 'Mercado Livre',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你想先解决“衣”和补货层，就先装它。',
              'en-US': 'If fashion and general replacement shopping come first, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.mercadolivre.com.br/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层先保留一个点评型发现入口。',
          'en-US': 'For dining, keep one review-first discovery app.',
        },
        apps: [
          {
            id: 'tripadvisor-br',
            name: 'Tripadvisor',
            summary: {
              'zh-CN': '默认首选，更适合作为先看评价和区域选择的入口。',
              'en-US': 'Primary pick for ratings, neighborhood scanning, and shortlisting.',
            },
            reason: {
              'zh-CN': '如果你更在意先看评价和筛店，就先用它。',
              'en-US': 'If ratings and filtering matter first, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.tripadvisor.com/' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖先保留一个本地强入口即可。',
          'en-US': 'For delivery, one strong local app is enough.',
        },
        apps: [
          {
            id: 'ifood-br',
            name: 'iFood',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果 delivery 会成为高频动作，就先装它。',
              'en-US': 'If delivery will become a repeat habit on the trip, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.ifood.com.br/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '住的层面先保留一个成熟酒店入口。',
          'en-US': 'For stays, begin with one mature hotel-booking app.',
        },
        apps: [
          {
            id: 'booking-br',
            name: 'Booking.com',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个住的入口，就先留它。',
              'en-US': 'If you keep one hotel-booking app, keep this one.',
            },
            recommended: true,
            links: BOOKING_LINKS,
          },
        ],
      },
    ],
  },
  {
    slug: 'united-states',
    teaser: {
      'zh-CN': '美国不一定需要很本地化的 app 栈，但把打车、探店、外卖和酒店层先准备好会省很多切换成本。',
      'en-US': 'The United States does not need a deeply local stack, but sorting rides, dining discovery, delivery, and hotels early removes a lot of friction.',
    },
    intro: {
      'zh-CN': '美国更适合保持一个轻而稳的 app 栈。先把打车、地图、购物、找餐厅、外卖和酒店层准备好，大多数城市里的高频动作就都能覆盖。',
      'en-US': 'The United States works best with a light but reliable app stack. Once rides, maps, shopping, restaurant discovery, delivery, and hotels are ready, most common city-travel actions are covered.',
    },
    highlights: {
      'zh-CN': ['打车', '探店', '外卖'],
      'en-US': ['Rides', 'Food discovery', 'Delivery'],
    },
    cautions: {
      'zh-CN': [
        '美国很多层面不一定要追求“本地替代”，保留你已经熟悉的主流 app 往往更高效。',
        '如果你是链路型酒店用户，住的层面可以再补酒店集团 app。',
      ],
      'en-US': [
        'In the US, you often do not need a local substitute for everything. Keeping the mainstream apps you already know is usually more efficient.',
        'If your trip leans toward chain hotels, the stays layer may be worth deepening with a hotel-group app later.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '打车先保留一个全国通用的主入口，再决定要不要补第二个。',
          'en-US': 'For rides, start with one nationwide default, then decide if a second app is worth it.',
        },
        apps: [
          {
            id: 'uber-us',
            name: 'Uber',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个打车 app，就先留它。',
              'en-US': 'If you keep only one ride app, keep this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.uber.com/us/en/ride/' },
              ...UBER_LINKS,
            ],
          },
          {
            id: 'lyft-us',
            name: 'Lyft',
            summary: {
              'zh-CN': '适合作为本地备选。',
              'en-US': 'A useful local backup.',
            },
            reason: {
              'zh-CN': '如果你想补第二个 ride 入口，再装它。',
              'en-US': 'Add it when you want a second ride option in the US.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://www.lyft.com/' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图层继续保留主流入口即可。',
          'en-US': 'The maps layer can stay on the mainstream tool you already know.',
        },
        apps: [
          {
            id: 'google-maps-us',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个地图 app，就先留它。',
              'en-US': 'If you keep one map app, keep this one.',
            },
            recommended: true,
            links: GOOGLE_MAPS_LINKS,
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '买衣服和应急补货，先保留一个大而稳的零售入口。',
          'en-US': 'For clothing and emergency replacement buys, keep one broad retail app first.',
        },
        apps: [
          {
            id: 'target-us',
            name: 'Target',
            summary: {
              'zh-CN': '默认首选，适合衣服、日用品和临时补货。',
              'en-US': 'Primary pick for clothes, basics, and general replacement shopping.',
            },
            reason: {
              'zh-CN': '如果你想先解决“衣”和临时补货层，就先装它。',
              'en-US': 'If clothing and quick replacement shopping come first, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.target.com/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层先保留一个本地评价和发现入口。',
          'en-US': 'For dining, keep one local review-and-discovery layer first.',
        },
        apps: [
          {
            id: 'yelp-us',
            name: 'Yelp',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你更依赖看评价和区域筛店，就先装它。',
              'en-US': 'If ratings, neighborhood scanning, and quick filtering matter first, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.yelp.com/' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖先保留一个成熟主入口即可。',
          'en-US': 'For delivery, one mature default is enough to start with.',
        },
        apps: [
          {
            id: 'doordash-us',
            name: 'DoorDash',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果外卖会成为高频动作，就先装它。',
              'en-US': 'If delivery will be a repeat habit on the trip, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.doordash.com/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '住的层面先保留一个成熟酒店入口。',
          'en-US': 'For stays, begin with one mature hotel-booking app.',
        },
        apps: [
          {
            id: 'booking-us',
            name: 'Booking.com',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个住的入口，就先留它。',
              'en-US': 'If you keep one hotel-booking app, keep this one.',
            },
            recommended: true,
            links: BOOKING_LINKS,
          },
        ],
      },
    ],
  },
  {
    slug: 'australia',
    teaser: {
      'zh-CN': '澳大利亚更适合先把打车、外卖、购物和酒店入口准备好，城市旅行会顺很多。',
      'en-US': 'Australia works best when rides, delivery, shopping, and hotel booking are already sorted before daily city movement starts.',
    },
    intro: {
      'zh-CN': '澳大利亚不需要很重的本地 app 栈，但值得先把打车、地图、购物、找餐厅、外卖和酒店这几层准备好。这样机场进城、找饭吃、补衣服和改住宿都会更顺。',
      'en-US': 'Australia does not need a very heavy local stack, but rides, maps, shopping, restaurant discovery, delivery, and hotels are worth sorting early. That makes airport arrivals, meals, replacement shopping, and stay changes much smoother.',
    },
    highlights: {
      'zh-CN': ['打车', '外卖', '购物'],
      'en-US': ['Rides', 'Delivery', 'Shopping'],
    },
    cautions: {
      'zh-CN': [
        '澳大利亚很多层面不必追求太本地化，保留你已经熟的主流 app 往往就够了。',
        '如果你只想把 app 栈做轻，先保证打车、外卖和住宿三层在线。',
      ],
      'en-US': [
        'In Australia, you do not need to localize every layer. Keeping the mainstream tools you already know is often enough.',
        'If you want the stack to stay light, make sure rides, delivery, and stays are ready first.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '打车先保留一个全国通用主入口，再决定要不要补第二个。',
          'en-US': 'Start with one nationwide ride default, then decide if a second app is worth adding.',
        },
        apps: [
          {
            id: 'uber-au',
            name: 'Uber',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个 ride app，就先留它。',
              'en-US': 'If you keep one ride app, keep this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.uber.com/au/en/ride/' },
              ...UBER_LINKS,
            ],
          },
          {
            id: 'didi-au',
            name: 'DiDi',
            summary: {
              'zh-CN': '适合作为本地备选。',
              'en-US': 'A useful local backup.',
            },
            reason: {
              'zh-CN': '如果你想补第二个打车入口，再装它。',
              'en-US': 'Add it when you want a second ride option in Australia.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://www.didiglobal.com/au-en' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图层继续保留主流入口即可。',
          'en-US': 'The maps layer can stay on the mainstream tool you already know.',
        },
        apps: [
          {
            id: 'google-maps-au',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个地图 app，就先留它。',
              'en-US': 'If you keep one map app, keep this one.',
            },
            recommended: true,
            links: GOOGLE_MAPS_LINKS,
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '买衣服先保留一个澳洲本地时尚入口。',
          'en-US': 'For fashion and replacement shopping, keep one Australia-first platform.',
        },
        apps: [
          {
            id: 'the-iconic',
            name: 'THE ICONIC',
            summary: {
              'zh-CN': '默认首选，更适合作为澳洲的时尚和衣物入口。',
              'en-US': 'Primary pick and the stronger Australia-first fashion layer.',
            },
            reason: {
              'zh-CN': '如果你要先解决“衣”的层面，就先装它。',
              'en-US': 'If fashion is the first shopping layer to solve, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.theiconic.com.au/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层先保留一个订位和发现入口。',
          'en-US': 'For dining, keep one discovery-and-booking app first.',
        },
        apps: [
          {
            id: 'opentable-au',
            name: 'OpenTable',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你更依赖找店和订位，就先装它。',
              'en-US': 'If restaurant discovery and bookings matter first, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.opentable.com/' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖先保留一个成熟入口即可。',
          'en-US': 'For delivery, one mature default is enough.',
        },
        apps: [
          {
            id: 'menulog-au',
            name: 'Menulog',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果 delivery 会成为高频动作，就先装它。',
              'en-US': 'If delivery will become a repeat habit on the trip, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.menulog.com.au/' },
            ],
          },
          {
            id: 'ubereats-au',
            name: 'Uber Eats',
            summary: {
              'zh-CN': '适合作为国际化备选。',
              'en-US': 'A useful international backup.',
            },
            reason: {
              'zh-CN': '如果 Uber 系列已经在你的旅行栈里，就继续保留它。',
              'en-US': 'Keep it if the Uber stack is already part of your broader travel flow.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://www.ubereats.com/au' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '住的层面先保留一个成熟酒店入口。',
          'en-US': 'For stays, begin with one mature hotel-booking app.',
        },
        apps: [
          {
            id: 'booking-au',
            name: 'Booking.com',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个住的入口，就先留它。',
              'en-US': 'If you keep one hotel-booking app, keep this one.',
            },
            recommended: true,
            links: BOOKING_LINKS,
          },
        ],
      },
    ],
  },
]
