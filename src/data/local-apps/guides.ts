import type { Locale, LocalAppCategoryId, LocalAppPlatformId } from '@/lib/types'
import { LOCAL_APP_CATEGORY_EXPANSIONS, LOCAL_APP_GUIDE_ADDITIONS } from './guide-expansions'

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

export type RawLocalAppGuideDefinition = {
  slug: string
  teaser: LocalizedCopy
  intro: LocalizedCopy
  highlights: Record<Locale, string[]>
  cautions: Record<Locale, string[]>
  categories: RawLocalAppCategory[]
}

const BASE_LOCAL_APP_GUIDE_DEFINITIONS: RawLocalAppGuideDefinition[] = [
  {
    slug: 'china',
    teaser: {
      'zh-CN': '先把打车、地图和支付入口装好。中国大陆很多现场动作默认围绕本地 app 展开。',
      'en-US': 'Sort ride-hailing, maps, and payments first. Many on-the-ground actions in mainland China assume local apps.',
    },
    intro: {
      'zh-CN': '中国大陆更适合先装一个稳定的打车 app、一个偏游客友好的地图 app，再准备支付入口。先把这三件事做完，后面的机场进城、叫车、找路和付款都会顺很多。',
      'en-US': 'For mainland China, start with one dependable ride-hailing app, one visitor-friendly map app, and a payment app before you land. That covers the first wave of airport rides, directions, and checkout moments.',
    },
    highlights: {
      'zh-CN': ['打车', '地图', '支付'],
      'en-US': ['Ride-hailing', 'Maps', 'Payments'],
    },
    cautions: {
      'zh-CN': [
        '很多商户默认扫码支付，提前准备好支付 app 会省掉很多解释成本。',
        '如果你不习惯纯中文地图，优先试 AMap Global，再保留百度地图做备选。',
      ],
      'en-US': [
        'Many merchants default to QR payments, so setting up a payment app early reduces friction.',
        'If you do not want a map app that leans fully Chinese-first, start with AMap Global and keep Baidu Maps as backup.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先装一个能直接叫车的入口，机场和高峰时段会最明显。',
          'en-US': 'Install one direct ride-hailing option first. The benefit is largest at airports and during rush hours.',
        },
        apps: [
          {
            id: 'didi',
            name: 'DiDi',
            summary: {
              'zh-CN': '默认首选，覆盖机场、市内和常见叫车场景。',
              'en-US': 'Primary pick for airport pickups, city rides, and everyday ride-hailing in China.',
            },
            reason: {
              'zh-CN': '如果你只准备一个打车 app，就先装它。',
              'en-US': 'If you only set up one ride app for China, make it this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.didiglobal.com/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/didi-china-ride-hailing/id554499054' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.sdu.didi.psnger' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图不要只装一个。游客友好和本地信息密度通常不是同一款。',
          'en-US': 'Do not stop at one map app. Tourist-friendly UI and local data density are not always the same app.',
        },
        apps: [
          {
            id: 'amap-global',
            name: 'AMap Global',
            summary: {
              'zh-CN': '更适合作为默认地图入口，界面对海外用户更友好。',
              'en-US': 'Best default map pick for visitors because the experience is friendlier for international users.',
            },
            reason: {
              'zh-CN': '先用它处理步行、驾车和常见 POI 搜索。',
              'en-US': 'Use this first for walking, driving, and common point-of-interest searches.',
            },
            recommended: true,
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/amap-global/id461703208' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.autonavi.minimap' },
            ],
          },
          {
            id: 'baidu-maps',
            name: 'Baidu Maps',
            summary: {
              'zh-CN': '当你需要更本地化的地点信息时，用它做备选。',
              'en-US': 'Keep it as backup when you need denser local place data.',
            },
            reason: {
              'zh-CN': '某些本地商户和 POI 信息会更完整。',
              'en-US': 'Some local listings and POI details can be more complete here.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://map.baidu.com/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/%E7%99%BE%E5%BA%A6%E5%9C%B0%E5%9B%BE-%E8%B7%AF%E7%BA%BF%E8%A7%84%E5%88%92-%E5%87%BA%E8%A1%8C%E5%BF%85%E5%A4%87/id452186370' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.baidu.BaiduMap' },
            ],
          },
        ],
      },
      {
        id: 'payments',
        summary: {
          'zh-CN': '很多线下场景最先卡住的是支付，不是语言。',
          'en-US': 'Payments often break before language does in everyday offline moments.',
        },
        apps: [
          {
            id: 'alipay',
            name: 'Alipay',
            summary: {
              'zh-CN': '更适合作为游客的第一支付入口。',
              'en-US': 'Best first payment app for most visitors.',
            },
            reason: {
              'zh-CN': '先装好它，付款时会更顺。',
              'en-US': 'Set this up early to avoid checkout friction.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.alipay.com/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/alipay-simplify-your-life/id333206289' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.eg.android.AlipayGphone' },
            ],
          },
          {
            id: 'wechat',
            name: 'WeChat',
            summary: {
              'zh-CN': '如果同行和商家大量用微信，再补它。',
              'en-US': 'Add it if your contacts or merchants lean heavily on WeChat.',
            },
            reason: {
              'zh-CN': '适合作为沟通和补充支付入口。',
              'en-US': 'Useful as a communication layer and secondary payment path.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://www.wechat.com/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/wechat/id414478124' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.tencent.mm' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'japan',
    teaser: {
      'zh-CN': '日本先解决叫车和导航。多数游客一套 GO + Google Maps 就够用。',
      'en-US': 'In Japan, solve rides and navigation first. For most visitors, GO plus Google Maps covers the trip.',
    },
    intro: {
      'zh-CN': '日本不需要一次装太多 app。先把叫车和路线规划稳定下来，再看是否要补餐饮或票务工具。多数城市旅行里，GO、Google Maps 和 Apple Maps 已经够用。',
      'en-US': 'You do not need a long app stack for Japan. Lock in rides and route planning first, then add food or booking tools only if the trip needs them. GO, Google Maps, and Apple Maps cover most city trips.',
    },
    highlights: {
      'zh-CN': ['叫车', '路线规划', '步行导航'],
      'en-US': ['Taxi calls', 'Route planning', 'Walking directions'],
    },
    cautions: {
      'zh-CN': [
        '城市内多数时候公共交通优先，叫车更适合赶时间、下雨或带大件行李。',
        'Apple Maps 可以做备选，但 Google Maps 仍然更适合作为第一路线入口。',
      ],
      'en-US': [
        'Public transport still handles most city movement, while ride-hailing matters more in rain, with luggage, or late at night.',
        'Apple Maps is fine as backup, but Google Maps remains the stronger first route-planning choice.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '叫车场景没有中国那么频繁，但要用时最好提前装好。',
          'en-US': 'You may not hail rides as often as in China, but it is better to be ready before you need one.',
        },
        apps: [
          {
            id: 'go',
            name: 'GO',
            summary: {
              'zh-CN': '日本本地最值得先装的打车入口。',
              'en-US': 'The local ride app most worth setting up first in Japan.',
            },
            reason: {
              'zh-CN': '更适合处理日本本地叫车需求。',
              'en-US': 'Built around the local taxi flow you will actually use in Japan.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://go.goinc.jp/' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '路线规划优先，地图细节其次。',
          'en-US': 'Route planning comes first, then local map detail.',
        },
        apps: [
          {
            id: 'google-maps',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选，适合步行、换乘和地点搜索。',
              'en-US': 'Primary pick for walking, transfers, and place search.',
            },
            reason: {
              'zh-CN': '如果你只装一个导航 app，就先装它。',
              'en-US': 'If you only keep one navigation app, start here.',
            },
            recommended: true,
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
          {
            id: 'apple-maps',
            name: 'Apple Maps',
            summary: {
              'zh-CN': 'iPhone 用户可留作备选。',
              'en-US': 'A sensible backup for iPhone users.',
            },
            reason: {
              'zh-CN': '不想切 app 时，它是最顺手的备用路线入口。',
              'en-US': 'It is the easiest fallback if you do not want to leave the default iPhone stack.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://www.apple.com/maps/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/apple-maps/id915056765' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'malaysia',
    teaser: {
      'zh-CN': '马来西亚先装 Grab，再配一个熟悉的地图 app，就已经覆盖大部分游客动作。',
      'en-US': 'In Malaysia, install Grab first, then pair it with a familiar map app. That already covers most tourist moments.',
    },
    intro: {
      'zh-CN': '马来西亚不需要很复杂的 app 组合。大部分游客先装 Grab 解决打车和部分本地生活，再保留 Google Maps 或 Apple Maps 处理路线就够用。',
      'en-US': 'Malaysia does not need a complicated stack. Grab handles rides and a lot of local-life use cases, while Google Maps or Apple Maps covers the navigation side.',
    },
    highlights: {
      'zh-CN': ['打车', '本地生活', '地图'],
      'en-US': ['Ride-hailing', 'Local life', 'Maps'],
    },
    cautions: {
      'zh-CN': [
        '如果你只准备一个本地 app，优先 Grab。',
        '地图层面 Google Maps 通常更稳，Apple Maps 适合不想跳出系统默认体验的 iPhone 用户。',
      ],
      'en-US': [
        'If you only set up one local app, make it Grab.',
        'Google Maps is usually the safer first map choice, while Apple Maps fits iPhone-first travelers who want to stay in the default stack.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '一个 Grab 基本就能覆盖大部分日常叫车。',
          'en-US': 'Grab alone covers most everyday ride-hailing needs.',
        },
        apps: [
          {
            id: 'grab',
            name: 'Grab',
            summary: {
              'zh-CN': '默认首选，打车和部分本地生活都能在里面完成。',
              'en-US': 'Primary pick for rides and a chunk of everyday local-life tasks.',
            },
            reason: {
              'zh-CN': '落地前就装好它，现场效率会高很多。',
              'en-US': 'Install it before landing and the first local decisions become much easier.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.grab.com/my/download/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/grab-superapp/id647268330' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图层面不用太复杂，选一个你最顺手的就行。',
          'en-US': 'Keep maps simple. Choose the one you already move fastest in.',
        },
        apps: [
          {
            id: 'google-maps',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选，游客使用门槛最低。',
              'en-US': 'Best default choice and easiest for most travelers.',
            },
            reason: {
              'zh-CN': '如果你不确定装哪个地图，就先装它。',
              'en-US': 'If you are unsure which map app to keep, start here.',
            },
            recommended: true,
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
          {
            id: 'apple-maps',
            name: 'Apple Maps',
            summary: {
              'zh-CN': 'iPhone 用户可作为轻量备选。',
              'en-US': 'A light backup option for iPhone users.',
            },
            reason: {
              'zh-CN': '如果你已经习惯系统地图，它足够应付多数基础导航。',
              'en-US': 'If you already rely on the system map, it is enough for most basic navigation.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://www.apple.com/maps/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/apple-maps/id915056765' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'singapore',
    teaser: {
      'zh-CN': '新加坡的 app 组合可以非常克制：Grab 加熟悉的地图 app 就够。',
      'en-US': 'Singapore can stay lean: Grab plus the map app you already trust is usually enough.',
    },
    intro: {
      'zh-CN': '新加坡的游客端 app 选择非常清晰。大多数时候一个 Grab 解决打车，再配 Google Maps 或 Apple Maps 处理步行和地址，就足够顺手。',
      'en-US': 'The tourist-facing app stack in Singapore is straightforward. Grab handles rides, and Google Maps or Apple Maps covers walking and address lookup without much extra setup.',
    },
    highlights: {
      'zh-CN': ['打车', '导航', '简单组合'],
      'en-US': ['Rides', 'Navigation', 'Simple stack'],
    },
    cautions: {
      'zh-CN': [
        '这个国家不需要堆很多 app，少而准更好。',
        '如果你本来就熟悉 Apple Maps，完全可以把它留作备选而不是强行换工具。',
      ],
      'en-US': [
        'You do not need a long stack here. Fewer, more certain tools work better.',
        'If you already know Apple Maps well, keep it as backup rather than forcing a switch.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': 'Grab 是最值得先装的单一入口。',
          'en-US': 'Grab is the single app most worth setting up first.',
        },
        apps: [
          {
            id: 'grab',
            name: 'Grab',
            summary: {
              'zh-CN': '默认首选，游客使用成本最低。',
              'en-US': 'Primary recommendation with the lowest setup friction for visitors.',
            },
            reason: {
              'zh-CN': '到机场或酒店前把它准备好，现场动作会更顺。',
              'en-US': 'Set it up before the airport or hotel leg and the first local moves get smoother.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.grab.com/sg/download/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/grab-superapp/id647268330' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '保留你最熟的地图 app，别为了本地化强行换。',
          'en-US': 'Keep the map app you already move fastest in. No need to switch just for localization.',
        },
        apps: [
          {
            id: 'google-maps',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选，跨平台最稳。',
              'en-US': 'Best default and the most dependable across platforms.',
            },
            reason: {
              'zh-CN': '如果你跨 Android / iPhone 切换，它最省心。',
              'en-US': 'It is the easiest default if you switch between Android and iPhone.',
            },
            recommended: true,
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
          {
            id: 'apple-maps',
            name: 'Apple Maps',
            summary: {
              'zh-CN': 'iPhone 用户的轻量备选。',
              'en-US': 'A light iPhone-native backup.',
            },
            reason: {
              'zh-CN': '如果你已经习惯它，不必特意换掉。',
              'en-US': 'If it already fits your flow, there is no reason to force a switch.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://www.apple.com/maps/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/apple-maps/id915056765' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'south-korea',
    teaser: {
      'zh-CN': '韩国更值得先解决地图 app，再补叫车。游客最容易踩坑的是继续只用全球地图。',
      'en-US': 'South Korea is more about solving maps first, then rides. The usual mistake is relying only on a global map app.',
    },
    intro: {
      'zh-CN': '韩国是少数需要认真换地图 app 的国家。先把本地地图装好，再补 Kakao T 叫车入口，现场体验会明显更稳。',
      'en-US': 'South Korea is one of the few countries where switching map apps actually matters. Install a local map app first, then add Kakao T for rides and the day gets much easier.',
    },
    highlights: {
      'zh-CN': ['本地地图', '叫车', '游客避坑'],
      'en-US': ['Local maps', 'Ride-hailing', 'Visitor traps'],
    },
    cautions: {
      'zh-CN': [
        '如果你只依赖 Google Maps，很容易在现场找路时掉速。',
        '先把 Naver Map 或 KakaoMap 准备好，再谈备选。',
      ],
      'en-US': [
        'If you rely only on Google Maps, you can lose time fast when navigating on the ground.',
        'Set up Naver Map or KakaoMap before worrying about secondary tools.',
      ],
    },
    categories: [
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图是韩国最关键的第一入口。',
          'en-US': 'Maps are the most important first app category in South Korea.',
        },
        apps: [
          {
            id: 'naver-map',
            name: 'Naver Map',
            summary: {
              'zh-CN': '默认首选，先装它。',
              'en-US': 'Primary pick. Install this first.',
            },
            reason: {
              'zh-CN': '如果你只愿意装一个本地地图，就先装它。',
              'en-US': 'If you only want one local map app, start here.',
            },
            recommended: true,
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/naver-map-navigation/id311867728' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.nhn.android.nmap' },
            ],
          },
          {
            id: 'kakao-map',
            name: 'KakaoMap',
            summary: {
              'zh-CN': '适合作为备选本地地图。',
              'en-US': 'A solid secondary local map option.',
            },
            reason: {
              'zh-CN': '保留它能在某些地址和本地搜索场景里更从容。',
              'en-US': 'Keeping it as backup helps when an address or local search behaves better here.',
            },
            recommended: false,
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/kakaomap-korea-no-1-map/id304608425' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=net.daum.android.map' },
            ],
          },
        ],
      },
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '叫车层面先补 Kakao T 就够。',
          'en-US': 'For rides, Kakao T is the one to add first.',
        },
        apps: [
          {
            id: 'kakao-t',
            name: 'Kakao T',
            summary: {
              'zh-CN': '韩国本地最值得先装的叫车入口。',
              'en-US': 'The local ride app most worth setting up first.',
            },
            reason: {
              'zh-CN': '当你带行李、赶时间或夜间移动时，它会很值。',
              'en-US': 'It pays off most when you have luggage, are short on time, or move late at night.',
            },
            recommended: true,
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/kakao-t/id981110422' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.kakao.taxi' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'thailand',
    teaser: {
      'zh-CN': '泰国先把 Grab 装好，再保留一个熟悉的地图 app，现场已经能解决大部分问题。',
      'en-US': 'In Thailand, install Grab first and keep one familiar map app. That already solves most on-the-ground needs.',
    },
    intro: {
      'zh-CN': '泰国对游客来说，不需要太多工具。Grab 先解决叫车和部分本地生活，再配 Google Maps 或 Apple Maps 处理导航，已经很够用。',
      'en-US': 'Thailand does not require a large stack for travelers. Grab covers rides and some local-life tasks, while Google Maps or Apple Maps handles the navigation layer well enough.',
    },
    highlights: {
      'zh-CN': ['打车', '地图', '轻量组合'],
      'en-US': ['Rides', 'Maps', 'Lean stack'],
    },
    cautions: {
      'zh-CN': [
        '如果你已经有熟悉的地图 app，不需要为了“更本地”强行换一套。',
        '优先把 Grab 设好，价值通常比多装几个备选 app 更高。',
      ],
      'en-US': [
        'If you already have a trusted map app, do not switch just to chase local flavor.',
        'Getting Grab ready usually matters more than adding multiple backups.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先解决叫车，收益最大。',
          'en-US': 'Solve ride-hailing first. That is the biggest win.',
        },
        apps: [
          {
            id: 'grab',
            name: 'Grab',
            summary: {
              'zh-CN': '默认首选，游客最省心。',
              'en-US': 'Primary recommendation and the lowest-friction choice for most visitors.',
            },
            reason: {
              'zh-CN': '如果你只装一个本地 app，就先装它。',
              'en-US': 'If you only install one local app, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.grab.com/th/download/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/grab-superapp/id647268330' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger' },
            ],
          },
          {
            id: 'bolt',
            name: 'Bolt',
            summary: {
              'zh-CN': '可留作备选，但不要本末倒置。',
              'en-US': 'Useful as backup, but do not make it your setup priority.',
            },
            reason: {
              'zh-CN': '有额外精力再补它，不必第一时间装。',
              'en-US': 'Add it only if you want extra optionality after the core setup is done.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://bolt.eu/en/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/bolt-request-a-ride/id675033630' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=ee.mtakso.client' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图选一个顺手的即可。',
          'en-US': 'One familiar map app is enough here.',
        },
        apps: [
          {
            id: 'google-maps',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选，跨平台最稳。',
              'en-US': 'Best default and the safest cross-platform option.',
            },
            reason: {
              'zh-CN': '不确定时直接选它。',
              'en-US': 'Pick this first when in doubt.',
            },
            recommended: true,
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
          {
            id: 'apple-maps',
            name: 'Apple Maps',
            summary: {
              'zh-CN': 'iPhone 用户的自然备选。',
              'en-US': 'A natural fallback for iPhone users.',
            },
            reason: {
              'zh-CN': '如果你已经习惯系统地图，就保留它。',
              'en-US': 'If the default iPhone map already fits your flow, keep it.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://www.apple.com/maps/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/apple-maps/id915056765' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'france',
    teaser: {
      'zh-CN': '法国先把叫车和城市导航装好，别在落地后才开始比 app。',
      'en-US': 'In France, set up rides and city navigation before arrival instead of comparing apps on the curb.',
    },
    intro: {
      'zh-CN': '法国更适合用一个国际化的打车入口，再配一套你熟悉的城市导航。大多数游客不需要太深的本地 app 栈，先把这两层解决就够。',
      'en-US': 'France works well with one international ride app and a navigation stack you already know. Most visitors do not need a deep local stack as long as these two layers are ready.',
    },
    highlights: {
      'zh-CN': ['叫车', '城市导航', '国际化工具'],
      'en-US': ['Rides', 'City navigation', 'International tools'],
    },
    cautions: {
      'zh-CN': [
        '先用你熟悉的国际化 app，不要为了“更本地”把自己搞复杂。',
        '如果你会频繁步行和换乘，Google Maps 通常比临时折腾其他工具更划算。',
      ],
      'en-US': [
        'Start with international apps you already know instead of over-optimizing for local flavor.',
        'If you expect lots of walking and transfers, Google Maps usually pays off more than trying unfamiliar tools.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '默认先解决叫车，再谈备选。',
          'en-US': 'Solve ride-hailing first, then think about backups.',
        },
        apps: [
          {
            id: 'uber',
            name: 'Uber',
            summary: {
              'zh-CN': '默认首选，游客最容易直接上手。',
              'en-US': 'Primary recommendation and the easiest first pickup for most visitors.',
            },
            reason: {
              'zh-CN': '如果你本来就在用 Uber，法国不需要另起一套。',
              'en-US': 'If you already use Uber elsewhere, there is no need to reinvent your stack in France.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.uber.com/fr/en/ride/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/uber-request-a-ride/id368677368' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.ubercab' },
            ],
          },
          {
            id: 'bolt',
            name: 'Bolt',
            summary: {
              'zh-CN': '可作为备选叫车入口。',
              'en-US': 'A reasonable secondary ride option.',
            },
            reason: {
              'zh-CN': '需要备选时再补，不必抢在 Uber 前面。',
              'en-US': 'Add it when you want a backup, not before your primary ride app is sorted.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://bolt.eu/en/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/bolt-request-a-ride/id675033630' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=ee.mtakso.client' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '城市导航优先用成熟工具。',
          'en-US': 'Use mature tools first for city navigation.',
        },
        apps: [
          {
            id: 'google-maps',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选，游客最稳。',
              'en-US': 'Best default and the safest first map app for visitors.',
            },
            reason: {
              'zh-CN': '跨城市和日常找路都更省心。',
              'en-US': 'It stays low-friction across cities and everyday route checks.',
            },
            recommended: true,
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
          {
            id: 'citymapper',
            name: 'Citymapper',
            summary: {
              'zh-CN': '适合重度城市内移动时作为补充。',
              'en-US': 'Useful as a supplement when you expect dense city movement.',
            },
            reason: {
              'zh-CN': '如果你的旅行高度依赖城市内路线，可以把它当补充层。',
              'en-US': 'Treat it as an extra layer only if your trip is heavily centered on city navigation.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://citymapper.com/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/citymapper-all-your-transit/id469463298' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.citymapper.app.release' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'united-arab-emirates',
    teaser: {
      'zh-CN': '阿联酋先把 Careem 装好，再保留熟悉的地图 app，城市移动会轻松很多。',
      'en-US': 'In the UAE, set up Careem first and keep a familiar map app. City movement gets easier fast.',
    },
    intro: {
      'zh-CN': '阿联酋更适合先准备叫车入口，再决定是否补第二个服务。多数游客里，Careem 是最值得先装的一款，地图则继续保留 Google Maps 或 Apple Maps 即可。',
      'en-US': 'The UAE is best approached by preparing rides first and only then adding a second service if needed. For most visitors, Careem is the main app worth setting up, while Google Maps or Apple Maps handles navigation well.',
    },
    highlights: {
      'zh-CN': ['叫车', '地图', '机场到市区'],
      'en-US': ['Rides', 'Maps', 'Airport-to-city'],
    },
    cautions: {
      'zh-CN': [
        '先把叫车入口准备好，价值通常高于继续找第三个备选。',
        '地图层面 Google Maps 通常更像默认首选，Apple Maps 则更适合留作轻量备份。',
      ],
      'en-US': [
        'Getting the main ride app ready matters more than hunting for a third backup.',
        'Google Maps is the better default map, while Apple Maps works as a lighter backup.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先有一个可靠的叫车入口，现场会安心很多。',
          'en-US': 'Having one dependable ride app changes the trip immediately.',
        },
        apps: [
          {
            id: 'careem',
            name: 'Careem',
            summary: {
              'zh-CN': '默认首选，更值得先装。',
              'en-US': 'Primary recommendation and the app worth setting up first.',
            },
            reason: {
              'zh-CN': '如果你只准备一个本地叫车 app，就先装它。',
              'en-US': 'If you only prepare one local ride app, make it this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.careem.com/en-AE/download/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/careem-everything-app/id592978487' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.careem.acma' },
            ],
          },
          {
            id: 'uber',
            name: 'Uber',
            summary: {
              'zh-CN': '可作为备选国际化入口。',
              'en-US': 'A workable international backup option.',
            },
            reason: {
              'zh-CN': '如果你本来就重度依赖 Uber，可以保留它作为第二选择。',
              'en-US': 'Keep it as a second option if Uber is already part of your default stack.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://www.uber.com/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/uber-request-a-ride/id368677368' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.ubercab' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图继续用你熟悉的主流工具即可。',
          'en-US': 'Keep navigation simple with the mainstream map tools you already know.',
        },
        apps: [
          {
            id: 'google-maps',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Default first pick.',
            },
            reason: {
              'zh-CN': '跨平台和跨城市都更稳。',
              'en-US': 'It remains the safer cross-city and cross-platform default.',
            },
            recommended: true,
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
          {
            id: 'apple-maps',
            name: 'Apple Maps',
            summary: {
              'zh-CN': 'iPhone 用户的自然备选。',
              'en-US': 'A natural iPhone-native fallback.',
            },
            reason: {
              'zh-CN': '如果你平时就在用它，不必额外折腾。',
              'en-US': 'If it is already your daily map, there is no need to force a different flow.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://www.apple.com/maps/' },
              { platform: 'ios', url: 'https://apps.apple.com/us/app/apple-maps/id915056765' },
            ],
          },
        ],
      },
    ],
  },
]

export const LOCAL_APP_GUIDE_DEFINITIONS: RawLocalAppGuideDefinition[] = [
  ...BASE_LOCAL_APP_GUIDE_DEFINITIONS.map((guide) => ({
    ...guide,
    categories: [...guide.categories, ...(LOCAL_APP_CATEGORY_EXPANSIONS[guide.slug] ?? [])],
  })),
  ...LOCAL_APP_GUIDE_ADDITIONS,
]
