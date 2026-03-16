import type { Locale, LocalAppCategoryId, LocalAppPlatformId } from '@/lib/types'
import { LOCAL_APP_GUIDE_ADDITIONS_EXTRA } from './guide-expansions-extra'
import { LOCAL_APP_GUIDE_ADDITIONS_REMAINING } from './guide-expansions-remaining'

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

export const LOCAL_APP_CATEGORY_EXPANSIONS: Record<string, RawLocalAppCategory[]> = {
  china: [
    {
      id: 'shopping',
      summary: {
        'zh-CN': '买衣服和临时补货，先装电商入口比到店现找更省时间。',
        'en-US': 'For clothes and quick replacement buys, shopping apps save more time than hunting in person first.',
      },
      apps: [
        {
          id: 'taobao',
          name: 'Taobao',
          summary: {
            'zh-CN': '默认首选，买衣服和日用品都够全。',
            'en-US': 'Primary pick for clothing, accessories, and general replacement shopping.',
          },
          reason: {
            'zh-CN': '如果你只装一个购物 app，就先装它。',
            'en-US': 'If you only keep one shopping app in China, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.taobao.com/' },
          ],
        },
        {
          id: 'jd',
          name: 'JD',
          summary: {
            'zh-CN': '适合作为次选，临时补货效率也不错。',
            'en-US': 'A strong backup when you want another large, reliable shopping catalog.',
          },
          reason: {
            'zh-CN': '需要第二个购物入口时再补它。',
            'en-US': 'Add it only when you want a second shopping path.',
          },
          recommended: false,
          links: [
            { platform: 'official', url: 'https://www.jd.com/' },
          ],
        },
      ],
    },
    {
      id: 'food-discovery',
      summary: {
        'zh-CN': '吃喝玩乐最值得先看点评和团购入口。',
        'en-US': 'Food discovery starts with local review and deal layers.',
      },
      apps: [
        {
          id: 'dianping',
          name: 'Dianping',
          summary: {
            'zh-CN': '默认首选，探店、看评价、找热门餐厅都更直接。',
            'en-US': 'Primary pick for ratings, neighborhood discovery, and restaurant shortlists.',
          },
          reason: {
            'zh-CN': '如果你想要“大众点评型”能力，就先用它。',
            'en-US': 'If you want the closest local equivalent to a deep review-and-ranking app, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.dianping.com/' },
          ],
        },
      ],
    },
    {
      id: 'food-delivery',
      summary: {
        'zh-CN': '外卖层面先有一个主力入口就够。',
        'en-US': 'One strong delivery app is usually enough.',
      },
      apps: [
        {
          id: 'meituan',
          name: 'Meituan',
          summary: {
            'zh-CN': '默认首选，外卖和本地生活都更完整。',
            'en-US': 'Primary pick for food delivery and the broader local-life layer.',
          },
          reason: {
            'zh-CN': '如果你只装一个吃喝玩乐 app，就优先它。',
            'en-US': 'If you only install one food-and-local-life app, make it this one.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.meituan.com/' },
          ],
        },
        {
          id: 'eleme',
          name: 'Ele.me',
          summary: {
            'zh-CN': '可作为外卖备选。',
            'en-US': 'A reasonable delivery backup.',
          },
          reason: {
            'zh-CN': '需要第二个外卖入口时再补。',
            'en-US': 'Add it only when you want a second delivery option.',
          },
          recommended: false,
          links: [
            { platform: 'official', url: 'https://www.ele.me/' },
          ],
        },
      ],
    },
    {
      id: 'stays',
      summary: {
        'zh-CN': '住的层面更适合先装订酒店和连锁会员入口。',
        'en-US': 'For stays, start with one booking app and one local chain option.',
      },
      apps: [
        {
          id: 'ctrip',
          name: 'Trip.com / Ctrip',
          summary: {
            'zh-CN': '默认首选，订酒店和改订单更顺。',
            'en-US': 'Primary pick for hotel booking and booking changes.',
          },
          reason: {
            'zh-CN': '如果你只想先装一个订酒店 app，就先装它。',
            'en-US': 'If you only want one hotel-booking app in China, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.trip.com/' },
          ],
        },
        {
          id: 'huazhu',
          name: 'Huazhu',
          summary: {
            'zh-CN': '适合住连锁酒店较多时补充。',
            'en-US': 'Useful when your trip leans heavily on local chain hotels.',
          },
          reason: {
            'zh-CN': '如果你会多次住华住系酒店，再装它。',
            'en-US': 'Add it when you expect repeated stays in Huazhu properties.',
          },
          recommended: false,
          links: [
            { platform: 'official', url: 'https://www.huazhu.com/' },
          ],
        },
      ],
    },
  ],
  japan: [
    {
      id: 'shopping',
      summary: {
        'zh-CN': '日本买衣服更适合先装品牌和时尚平台，不必全靠线下现逛。',
        'en-US': 'In Japan, fashion-platform and brand apps save time before you fall back to in-store browsing.',
      },
      apps: [
        {
          id: 'zozotown',
          name: 'ZOZOTOWN',
          summary: {
            'zh-CN': '默认首选，时尚和品牌密度更高。',
            'en-US': 'Primary pick for local fashion discovery and brand coverage.',
          },
          reason: {
            'zh-CN': '如果你想先看日本本地时尚平台，就从它开始。',
            'en-US': 'If you want one Japan-first fashion app, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://zozo.jp/' },
          ],
        },
        {
          id: 'uniqlo-jp',
          name: 'UNIQLO',
          summary: {
            'zh-CN': '临时补衣服时很好用。',
            'en-US': 'Useful when you need a quick clothing fallback rather than fashion discovery.',
          },
          reason: {
            'zh-CN': '缺基础衣物时，它往往是最快补位。',
            'en-US': 'It is often the fastest recovery option for basics.',
          },
          recommended: false,
          links: [
            { platform: 'official', url: 'https://www.uniqlo.com/jp/' },
          ],
        },
      ],
    },
    {
      id: 'food-discovery',
      summary: {
        'zh-CN': '吃的层面先看本地评分和排队价值。',
        'en-US': 'Food discovery works best with local ratings before you decide what is worth the line.',
      },
      apps: [
        {
          id: 'tabelog',
          name: 'Tabelog',
          summary: {
            'zh-CN': '默认首选，更像日本本地的餐厅评分入口。',
            'en-US': 'Primary pick and the strongest local restaurant ranking layer in Japan.',
          },
          reason: {
            'zh-CN': '如果你要找“日本版大众点评”，就先看它。',
            'en-US': 'If you want the Japan-equivalent of a true local restaurant ranking app, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://tabelog.com/en/' },
          ],
        },
      ],
    },
    {
      id: 'food-delivery',
      summary: {
        'zh-CN': '外卖不是所有行程都必要，但下雨、晚到或住远时很值。',
        'en-US': 'Delivery is not essential for every trip, but it is valuable on rainy, late, or far-from-center nights.',
      },
      apps: [
        {
          id: 'ubereats-jp',
          name: 'Uber Eats',
          summary: {
            'zh-CN': '默认首选，游客理解成本最低。',
            'en-US': 'Primary pick with the lowest setup friction for most travelers.',
          },
          reason: {
            'zh-CN': '如果你已经在别的国家用过 Uber 系列，就继续用它。',
            'en-US': 'Keep it if Uber is already part of your default stack elsewhere.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.ubereats.com/jp' },
          ],
        },
        {
          id: 'demae-can',
          name: 'Demae-can',
          summary: {
            'zh-CN': '可作为本地外卖备选。',
            'en-US': 'A local delivery backup worth adding later.',
          },
          reason: {
            'zh-CN': '需要第二个外卖入口时再补。',
            'en-US': 'Add it only when you want a second delivery option.',
          },
          recommended: false,
          links: [
            { platform: 'official', url: 'https://demae-can.com/' },
          ],
        },
      ],
    },
    {
      id: 'stays',
      summary: {
        'zh-CN': '订酒店更适合先用日本本地预订入口。',
        'en-US': 'For stays, Japan-first booking tools are often worth checking before global hotel apps.',
      },
      apps: [
        {
          id: 'rakuten-travel',
          name: 'Rakuten Travel',
          summary: {
            'zh-CN': '默认首选，更适合先看日本本地住宿盘子。',
            'en-US': 'Primary pick for local inventory and Japan-first booking flow.',
          },
          reason: {
            'zh-CN': '如果你主要在日本境内订酒店，就先装它。',
            'en-US': 'If most of your stay decisions are inside Japan, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://travel.rakuten.com/' },
          ],
        },
        {
          id: 'jalan',
          name: 'Jalan',
          summary: {
            'zh-CN': '适合作为备选本地订房入口。',
            'en-US': 'A strong local backup for hotel searches.',
          },
          reason: {
            'zh-CN': '想多看一个日本本地住宿平台时再补。',
            'en-US': 'Add it when you want a second local hotel-search layer.',
          },
          recommended: false,
          links: [
            { platform: 'official', url: 'https://www.jalan.net/en/japan_hotels_ryokan/' },
          ],
        },
      ],
    },
  ],
  'south-korea': [
    {
      id: 'shopping',
      summary: {
        'zh-CN': '韩国买衣服更值得先装本地时尚平台。',
        'en-US': 'For fashion in South Korea, local style platforms matter more than generic global shopping apps.',
      },
      apps: [
        {
          id: 'musinsa',
          name: 'MUSINSA',
          summary: {
            'zh-CN': '默认首选，更适合作为韩国本地潮流购物入口。',
            'en-US': 'Primary pick for local fashion and streetwear discovery.',
          },
          reason: {
            'zh-CN': '如果你想找“韩国本地时尚 app”，就先装它。',
            'en-US': 'If you want one Korea-first fashion app, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://global.musinsa.com/' },
          ],
        },
      ],
    },
    {
      id: 'food-discovery',
      summary: {
        'zh-CN': '韩国吃喝玩乐更适合先用本地地图和餐厅发现层。',
        'en-US': 'Food discovery in South Korea works best through local map-and-restaurant layers.',
      },
      apps: [
        {
          id: 'naver-map-food',
          name: 'Naver Map',
          summary: {
            'zh-CN': '默认首选，探店和找餐厅都更实用。',
            'en-US': 'Primary pick for restaurant discovery as well as navigation.',
          },
          reason: {
            'zh-CN': '在韩国，地图和探店经常就是同一个入口。',
            'en-US': 'In South Korea, maps and local food discovery are often the same workflow.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://map.naver.com/' },
          ],
        },
        {
          id: 'catchtable',
          name: 'Catchtable',
          summary: {
            'zh-CN': '适合想提前看热门店和订位时补充。',
            'en-US': 'Useful when reservations and popular-spot planning matter.',
          },
          reason: {
            'zh-CN': '如果你很在意热门餐厅排队和订位，再补它。',
            'en-US': 'Add it if you care about reservation-heavy dining plans.',
          },
          recommended: false,
          links: [
            { platform: 'official', url: 'https://www.catchtable.net/' },
          ],
        },
      ],
    },
    {
      id: 'food-delivery',
      summary: {
        'zh-CN': '外卖先有一个主入口，再决定要不要补第二个。',
        'en-US': 'Get one delivery default first, then decide if you need a backup.',
      },
      apps: [
        {
          id: 'baemin',
          name: 'Baemin',
          summary: {
            'zh-CN': '默认首选，本地化最强。',
            'en-US': 'Primary local pick and the strongest Korea-first default.',
          },
          reason: {
            'zh-CN': '如果你会频繁点外卖，就先装它。',
            'en-US': 'If delivery matters repeatedly on the trip, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.baemin.com/' },
          ],
        },
      ],
    },
    {
      id: 'stays',
      summary: {
        'zh-CN': '订酒店更适合加一个韩国本地住宿入口。',
        'en-US': 'For stays, one Korea-first booking layer is worth adding.',
      },
      apps: [
        {
          id: 'yanolja',
          name: 'Yanolja',
          summary: {
            'zh-CN': '默认首选，本地住宿选择更直接。',
            'en-US': 'Primary pick for local accommodation browsing.',
          },
          reason: {
            'zh-CN': '如果你会在韩国境内多城市移动，先看它。',
            'en-US': 'If your trip moves between Korean cities, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.yanolja.com/' },
          ],
        },
      ],
    },
  ],
  malaysia: [
    {
      id: 'shopping',
      summary: {
        'zh-CN': '买衣服和生活补货更适合先看电商和时尚平台。',
        'en-US': 'For fashion and quick replacement buys, start with one shopping platform and one fashion option.',
      },
      apps: [
        {
          id: 'zalora-my',
          name: 'ZALORA',
          summary: {
            'zh-CN': '默认首选，更适合衣服和鞋包。',
            'en-US': 'Primary pick for clothes, footwear, and fashion basics.',
          },
          reason: {
            'zh-CN': '如果你要先补一个“衣”的入口，就先装它。',
            'en-US': 'If you want one fashion-first app, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.zalora.com.my/' },
          ],
        },
      ],
    },
    {
      id: 'food-discovery',
      summary: {
        'zh-CN': '吃喝层面更适合先看本地餐厅发现入口。',
        'en-US': 'For dining, start with one local discovery layer before you decide on reservations or delivery.',
      },
      apps: [
        {
          id: 'openrice-my',
          name: 'OpenRice',
          summary: {
            'zh-CN': '默认首选，适合作为马来西亚探店入口。',
            'en-US': 'Primary pick for restaurant browsing and local discovery in Malaysia.',
          },
          reason: {
            'zh-CN': '如果你想先找店、看评价，再决定去不去，就先看它。',
            'en-US': 'Use it first when you want ratings and local browsing before committing.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.openrice.com/en/malaysia' },
          ],
        },
      ],
    },
    {
      id: 'food-delivery',
      summary: {
        'zh-CN': '外卖直接在已经装好的超级 app 里解决最省心。',
        'en-US': 'The easiest delivery default is often the super app you already installed for rides.',
      },
      apps: [
        {
          id: 'grabfood-my',
          name: 'GrabFood',
          summary: {
            'zh-CN': '默认首选，和打车入口复用最好。',
            'en-US': 'Primary pick because it builds on the same app you already use for rides.',
          },
          reason: {
            'zh-CN': '已经装了 Grab，就别再额外增加太多切换成本。',
            'en-US': 'If Grab is already installed for rides, keep the stack simple and use it here too.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.grab.com/my/food/' },
          ],
        },
        {
          id: 'foodpanda-my',
          name: 'foodpanda',
          summary: {
            'zh-CN': '适合作为外卖备选。',
            'en-US': 'A reasonable delivery backup.',
          },
          reason: {
            'zh-CN': '需要第二个外卖入口时再补它。',
            'en-US': 'Add it later if you want a second delivery option.',
          },
          recommended: false,
          links: [
            { platform: 'official', url: 'https://www.foodpanda.my/' },
          ],
        },
      ],
    },
    {
      id: 'stays',
      summary: {
        'zh-CN': '住的层面更适合先用东南亚常用预订入口。',
        'en-US': 'For stays, one Southeast Asia-friendly booking layer is usually enough.',
      },
      apps: [
        {
          id: 'agoda-my',
          name: 'Agoda',
          summary: {
            'zh-CN': '默认首选，游客使用成本最低。',
            'en-US': 'Primary pick with the lowest friction for most travelers.',
          },
          reason: {
            'zh-CN': '如果你只装一个订酒店 app，就先装它。',
            'en-US': 'If you only install one hotel app, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.agoda.com/' },
          ],
        },
      ],
    },
  ],
  singapore: [
    {
      id: 'shopping',
      summary: {
        'zh-CN': '买衣服保持一个时尚平台就够。',
        'en-US': 'For fashion, one regional platform is enough here.',
      },
      apps: [
        {
          id: 'zalora-sg',
          name: 'ZALORA',
          summary: {
            'zh-CN': '默认首选，买衣服最省心。',
            'en-US': 'Primary pick for straightforward clothing and fashion shopping.',
          },
          reason: {
            'zh-CN': '如果你只补一个“衣”的入口，就先装它。',
            'en-US': 'If you add only one shopping app, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.zalora.sg/' },
          ],
        },
      ],
    },
    {
      id: 'food-discovery',
      summary: {
        'zh-CN': '吃喝玩乐层面先看本地餐厅发现入口。',
        'en-US': 'For dining, start with the local discovery layer before you optimize the rest of the stack.',
      },
      apps: [
        {
          id: 'burpple',
          name: 'Burpple',
          summary: {
            'zh-CN': '默认首选，更像新加坡本地探店入口。',
            'en-US': 'Primary pick and the closest local food-discovery default.',
          },
          reason: {
            'zh-CN': '如果你要先找“去哪吃”，就从它开始。',
            'en-US': 'If your first question is where to eat next, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.burpple.com/' },
          ],
        },
        {
          id: 'chope',
          name: 'Chope',
          summary: {
            'zh-CN': '适合需要订位时补充。',
            'en-US': 'Useful when reservations matter.',
          },
          reason: {
            'zh-CN': '如果你的用餐计划更偏订位，再补它。',
            'en-US': 'Add it when bookings and timing matter more than discovery.',
          },
          recommended: false,
          links: [
            { platform: 'official', url: 'https://www.chope.co/singapore-restaurants' },
          ],
        },
      ],
    },
    {
      id: 'food-delivery',
      summary: {
        'zh-CN': '外卖层面优先走已经装好的 Grab。',
        'en-US': 'Use the Grab stack first before adding extra delivery apps.',
      },
      apps: [
        {
          id: 'grabfood-sg',
          name: 'GrabFood',
          summary: {
            'zh-CN': '默认首选。',
            'en-US': 'Primary pick.',
          },
          reason: {
            'zh-CN': '同一套 app 解决打车和外卖，切换最少。',
            'en-US': 'The same app handles rides and delivery, which keeps the stack lighter.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.grab.com/sg/food/' },
          ],
        },
      ],
    },
    {
      id: 'stays',
      summary: {
        'zh-CN': '订酒店不需要太复杂，保留一个成熟入口就够。',
        'en-US': 'Hotel booking can stay simple here with one mature app.',
      },
      apps: [
        {
          id: 'agoda-sg',
          name: 'Agoda',
          summary: {
            'zh-CN': '默认首选。',
            'en-US': 'Primary pick.',
          },
          reason: {
            'zh-CN': '如果你不想把住的层面做复杂，就先留它。',
            'en-US': 'Keep this if you want the stays layer to remain simple.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.agoda.com/' },
          ],
        },
      ],
    },
  ],
  thailand: [
    {
      id: 'shopping',
      summary: {
        'zh-CN': '买衣服优先保留一个品牌平台。',
        'en-US': 'For fashion, one focused shopping platform is enough.',
      },
      apps: [
        {
          id: 'pomelo',
          name: 'Pomelo',
          summary: {
            'zh-CN': '默认首选，更适合衣服和风格化购物。',
            'en-US': 'Primary pick for style-led fashion shopping.',
          },
          reason: {
            'zh-CN': '如果你想先解决“衣”的层面，就先装它。',
            'en-US': 'If fashion is the main shopping need, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.pomelofashion.com/th/en/' },
          ],
        },
      ],
    },
    {
      id: 'food-discovery',
      summary: {
        'zh-CN': '探店和看评价最值得先看本地餐饮入口。',
        'en-US': 'Local food discovery matters more than a generic review layer here.',
      },
      apps: [
        {
          id: 'wongnai',
          name: 'Wongnai',
          summary: {
            'zh-CN': '默认首选，更像泰国本地版探店入口。',
            'en-US': 'Primary pick and the strongest local restaurant-discovery default in Thailand.',
          },
          reason: {
            'zh-CN': '如果你要找“泰国版大众点评”，就先看它。',
            'en-US': 'If you want the closest Thailand-equivalent to a local review app, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.wongnai.com/' },
          ],
        },
      ],
    },
    {
      id: 'food-delivery',
      summary: {
        'zh-CN': '外卖层面先有 GrabFood 就够。',
        'en-US': 'GrabFood is usually enough as the first delivery layer.',
      },
      apps: [
        {
          id: 'grabfood-th',
          name: 'GrabFood',
          summary: {
            'zh-CN': '默认首选。',
            'en-US': 'Primary pick.',
          },
          reason: {
            'zh-CN': '已经装了 Grab，就继续复用它。',
            'en-US': 'If Grab is already part of the trip, keep the stack simple and use it here too.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.grab.com/th/food/' },
          ],
        },
        {
          id: 'line-man',
          name: 'LINE MAN',
          summary: {
            'zh-CN': '适合作为本地备选。',
            'en-US': 'A local backup worth adding later.',
          },
          reason: {
            'zh-CN': '想补第二个外卖入口时再装。',
            'en-US': 'Add it only when you want a second local delivery option.',
          },
          recommended: false,
          links: [
            { platform: 'official', url: 'https://lineman.line.me/' },
          ],
        },
      ],
    },
    {
      id: 'stays',
      summary: {
        'zh-CN': '订酒店更适合保留一个东南亚常用入口。',
        'en-US': 'For hotels, one Southeast Asia-friendly booking app is enough.',
      },
      apps: [
        {
          id: 'agoda-th',
          name: 'Agoda',
          summary: {
            'zh-CN': '默认首选。',
            'en-US': 'Primary pick.',
          },
          reason: {
            'zh-CN': '如果你只保留一个住的入口，就先装它。',
            'en-US': 'If you keep just one hotel-booking app, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.agoda.com/' },
          ],
        },
      ],
    },
  ],
  france: [
    {
      id: 'shopping',
      summary: {
        'zh-CN': '买衣服层面更适合先装一个本地化购物入口。',
        'en-US': 'For shopping, one France-facing app is enough before you complicate the stack.',
      },
      apps: [
        {
          id: 'vinted-fr',
          name: 'Vinted',
          summary: {
            'zh-CN': '默认首选，买衣服和二手时很实用。',
            'en-US': 'Primary pick for fashion browsing and second-hand finds.',
          },
          reason: {
            'zh-CN': '如果你想用 app 补衣服，而不是只逛线下，就先看它。',
            'en-US': 'If you want an app-first clothing layer instead of relying only on stores, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.vinted.fr/' },
          ],
        },
      ],
    },
    {
      id: 'food-discovery',
      summary: {
        'zh-CN': '吃喝层面先看预订和评分入口。',
        'en-US': 'Dining works best when you start with reservation and review layers.',
      },
      apps: [
        {
          id: 'thefork',
          name: 'TheFork',
          summary: {
            'zh-CN': '默认首选，更适合找店和订位。',
            'en-US': 'Primary pick for restaurant discovery and reservations.',
          },
          reason: {
            'zh-CN': '如果你更在意餐厅选择和订位，就先用它。',
            'en-US': 'If restaurant choice and bookings matter first, start here.',
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
        'zh-CN': '外卖层面保留一个国际化入口就够。',
        'en-US': 'For delivery, one international app is usually enough.',
      },
      apps: [
        {
          id: 'ubereats-fr',
          name: 'Uber Eats',
          summary: {
            'zh-CN': '默认首选。',
            'en-US': 'Primary pick.',
          },
          reason: {
            'zh-CN': '如果你本来就在用 Uber 系列，就继续用它。',
            'en-US': 'If Uber is already part of your broader stack, keep it here too.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.ubereats.com/fr' },
          ],
        },
      ],
    },
    {
      id: 'stays',
      summary: {
        'zh-CN': '住的层面先装一个连锁或成熟预订入口。',
        'en-US': 'For stays, begin with one chain-friendly or mature booking layer.',
      },
      apps: [
        {
          id: 'accor',
          name: 'Accor',
          summary: {
            'zh-CN': '默认首选，更适合看法国常见连锁酒店。',
            'en-US': 'Primary pick when you want a France-relevant chain-hotel layer.',
          },
          reason: {
            'zh-CN': '如果你更偏向酒店链路，就先装它。',
            'en-US': 'If the trip leans toward chain hotels, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://all.accor.com/' },
          ],
        },
      ],
    },
  ],
  'united-arab-emirates': [
    {
      id: 'shopping',
      summary: {
        'zh-CN': '买衣服和生活补货更适合先看中东本地购物入口。',
        'en-US': 'For shopping, start with a Gulf-facing platform before adding more.',
      },
      apps: [
        {
          id: 'namshi',
          name: 'Namshi',
          summary: {
            'zh-CN': '默认首选，更适合衣服和鞋包。',
            'en-US': 'Primary pick for fashion and everyday apparel shopping.',
          },
          reason: {
            'zh-CN': '如果你想解决“衣”的层面，就先装它。',
            'en-US': 'If fashion is the main shopping problem to solve, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.namshi.com/' },
          ],
        },
      ],
    },
    {
      id: 'food-discovery',
      summary: {
        'zh-CN': '吃喝层面先看本地餐厅发现入口。',
        'en-US': 'For food, begin with the local restaurant-discovery layer.',
      },
      apps: [
        {
          id: 'zomato-uae',
          name: 'Zomato',
          summary: {
            'zh-CN': '默认首选，找店和看评价都更方便。',
            'en-US': 'Primary pick for restaurant discovery and ratings.',
          },
          reason: {
            'zh-CN': '如果你想先知道哪里值得去吃，就先看它。',
            'en-US': 'If the first question is where to eat next, start here.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.zomato.com/' },
          ],
        },
      ],
    },
    {
      id: 'food-delivery',
      summary: {
        'zh-CN': '外卖层面更适合先装本地超级入口。',
        'en-US': 'For delivery, one strong local default works best.',
      },
      apps: [
        {
          id: 'talabat',
          name: 'talabat',
          summary: {
            'zh-CN': '默认首选。',
            'en-US': 'Primary pick.',
          },
          reason: {
            'zh-CN': '如果你要点餐、买点小东西，它通常更值得先装。',
            'en-US': 'If you expect to order meals or quick local items, it is usually the better first install.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.talabat.com/uae' },
          ],
        },
      ],
    },
    {
      id: 'stays',
      summary: {
        'zh-CN': '酒店预订先保留一个国际成熟入口就够。',
        'en-US': 'For stays, keep one mature international booking app and stop there first.',
      },
      apps: [
        {
          id: 'booking-uae',
          name: 'Booking.com',
          summary: {
            'zh-CN': '默认首选。',
            'en-US': 'Primary pick.',
          },
          reason: {
            'zh-CN': '如果你只保留一个酒店入口，先留它。',
            'en-US': 'If you keep one hotel-booking app, keep this one.',
          },
          recommended: true,
          links: [
            { platform: 'official', url: 'https://www.booking.com/' },
          ],
        },
      ],
    },
  ],
}

export const LOCAL_APP_GUIDE_ADDITIONS: RawLocalAppGuideDefinition[] = [
  {
    slug: 'hong-kong',
    teaser: {
      'zh-CN': '香港更适合先准备叫车、探店和酒店入口，城市切换会快很多。',
      'en-US': 'Hong Kong works best when rides, food discovery, and hotel booking are ready before you land.',
    },
    intro: {
      'zh-CN': '香港不需要太重的 app 栈，但值得先把叫车、地图、探店和订酒店这几层准备好。这样机场进城、找吃的和临时改住宿都会更顺。',
      'en-US': 'Hong Kong does not need a very heavy app stack, but rides, maps, food discovery, and hotel booking are worth setting up first. That makes airport arrivals, dining decisions, and last-minute stay changes much easier.',
    },
    highlights: {
      'zh-CN': ['打车', '探店', '酒店'],
      'en-US': ['Rides', 'Food discovery', 'Hotels'],
    },
    cautions: {
      'zh-CN': [
        '如果你已经习惯 Google Maps，就保留它，没必要为了本地化强行切换太多工具。',
        '吃喝层面 OpenRice 的价值往往比再加第三个 delivery app 更高。',
      ],
      'en-US': [
        'If Google Maps is already your default, keep it rather than over-rotating into too many local tools.',
        'For food, OpenRice usually adds more value than a third delivery app.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '打车先保留一个最熟的入口。',
          'en-US': 'Keep the ride layer simple with one familiar app.',
        },
        apps: [
          {
            id: 'uber-hk',
            name: 'Uber',
            summary: {
              'zh-CN': '默认首选，游客最容易上手。',
              'en-US': 'Primary pick and the easiest ride app for most visitors.',
            },
            reason: {
              'zh-CN': '如果你已经在别的国家用 Uber，就继续用它。',
              'en-US': 'If Uber is already part of your default travel stack, keep it here too.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.uber.com/hk/en/ride/' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图层面不必太复杂。',
          'en-US': 'The maps layer does not need to be complicated.',
        },
        apps: [
          {
            id: 'google-maps-hk',
            name: 'Google Maps',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个地图 app，就先留它。',
              'en-US': 'If you only keep one map app, start here.',
            },
            recommended: true,
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '买衣服和生活补货先装一个本地购物入口。',
          'en-US': 'For shopping, keep one local marketplace on hand.',
        },
        apps: [
          {
            id: 'hktvmall',
            name: 'HKTVmall',
            summary: {
              'zh-CN': '默认首选，本地购物覆盖更广。',
              'en-US': 'Primary pick for broader local shopping coverage.',
            },
            reason: {
              'zh-CN': '如果你临时要补衣服或生活用品，先看它。',
              'en-US': 'Use this first for replacement buys or local essentials.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.hktvmall.com/hktv/en/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层面最值得先装 OpenRice。',
          'en-US': 'For dining, OpenRice is the local layer worth installing first.',
        },
        apps: [
          {
            id: 'openrice-hk',
            name: 'OpenRice',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你想先找店、看评分，再决定去哪里，就先装它。',
              'en-US': 'Install this first when you want restaurant discovery before deciding where to go.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.openrice.com/en/hongkong' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖层面保留一个主力 app 就够。',
          'en-US': 'One delivery default is enough here.',
        },
        apps: [
          {
            id: 'foodpanda-hk',
            name: 'foodpanda',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只装一个 delivery app，就先装它。',
              'en-US': 'If you only keep one delivery app, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.foodpanda.hk/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '订酒店先保留一个成熟入口。',
          'en-US': 'Keep the hotel layer simple with one mature booking app.',
        },
        apps: [
          {
            id: 'trip-hk',
            name: 'Trip.com',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只保留一个住的入口，就先装它。',
              'en-US': 'If you keep just one hotel app, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.trip.com/hotels/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'taiwan',
    teaser: {
      'zh-CN': '台湾先把打车、外卖和订酒店解决好，游客常见动作就覆盖得差不多了。',
      'en-US': 'In Taiwan, rides, delivery, and hotel booking cover most common traveler decisions first.',
    },
    intro: {
      'zh-CN': '台湾的 app 组合更适合保持克制。先准备打车、地图、购物和外卖，再保留一个成熟的酒店入口，就足够日常旅行使用。',
      'en-US': 'Taiwan works best with a restrained stack. Prepare rides, maps, shopping, and delivery first, then keep one mature hotel app for the stays layer.',
    },
    highlights: {
      'zh-CN': ['打车', '外卖', '购物'],
      'en-US': ['Rides', 'Delivery', 'Shopping'],
    },
    cautions: {
      'zh-CN': [
        '如果你已经习惯 Google Maps，不必为了本地化额外增加太多地图工具。',
        '外卖层面 foodpanda 和 Uber Eats 二选一就够。',
      ],
      'en-US': [
        'If Google Maps already fits your flow, do not overcomplicate the maps layer.',
        'For delivery, one of foodpanda or Uber Eats is usually enough.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先保留一个游客最熟的打车入口。',
          'en-US': 'Keep the ride layer simple with the app visitors already know best.',
        },
        apps: [
          {
            id: 'uber-tw',
            name: 'Uber',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你已经用惯 Uber，就继续用它。',
              'en-US': 'If Uber is already in your travel stack, keep it here too.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.uber.com/global/en/cities/taipei/' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图继续保留一个主流入口就够。',
          'en-US': 'One mainstream map app is enough here.',
        },
        apps: [
          {
            id: 'google-maps-tw',
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
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '购物层面先保留一个本地电商入口。',
          'en-US': 'For shopping, keep one Taiwan-first marketplace ready.',
        },
        apps: [
          {
            id: 'momo',
            name: 'momo',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '买衣服和生活用品都更方便。',
              'en-US': 'Useful for both clothing and everyday replacement buys.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.momoshop.com.tw/main/Main.jsp' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖保留一个主力入口即可。',
          'en-US': 'One delivery default is enough.',
        },
        apps: [
          {
            id: 'foodpanda-tw',
            name: 'foodpanda',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只想保留一个 delivery app，就先装它。',
              'en-US': 'If you keep one delivery app, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.foodpanda.com.tw/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '订酒店先保留一个成熟入口。',
          'en-US': 'For stays, one mature booking app is enough.',
        },
        apps: [
          {
            id: 'agoda-tw',
            name: 'Agoda',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个酒店入口，就先留它。',
              'en-US': 'If you keep one hotel-booking app, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.agoda.com/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'indonesia',
    teaser: {
      'zh-CN': '印尼更适合先把打车、外卖和酒店入口装好，本地超 app 的价值会很高。',
      'en-US': 'Indonesia is a strong local-super-app market, so rides, delivery, and stays are worth setting up first.',
    },
    intro: {
      'zh-CN': '印尼更适合围绕 Gojek、Google Maps、购物入口和酒店入口来搭栈。先把这几层准备好，落地后的移动、吃饭和临时补货都会更顺。',
      'en-US': 'Indonesia works well around Gojek, Google Maps, one shopping marketplace, and one hotel-booking layer. With those ready, movement, meals, and replacement shopping become much easier after landing.',
    },
    highlights: {
      'zh-CN': ['超级 app', '外卖', '酒店'],
      'en-US': ['Super app', 'Delivery', 'Hotels'],
    },
    cautions: {
      'zh-CN': [
        '如果你已经装了 Gojek，就优先复用它处理 ride 和 food 两层。',
        '住的层面 Traveloka 往往比继续找第三个备选更值。',
      ],
      'en-US': [
        'If Gojek is already installed, reuse it across rides and food before adding more apps.',
        'For stays, Traveloka often adds more value than searching for a third backup app.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先有一个本地强势入口。',
          'en-US': 'Start with one strong local ride default.',
        },
        apps: [
          {
            id: 'gojek',
            name: 'Gojek',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只装一个印尼本地 app，就先装它。',
              'en-US': 'If you install one Indonesia-first app, make it this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.gojek.com/id-id/' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图保持一个主流入口就够。',
          'en-US': 'One mainstream map app is enough here.',
        },
        apps: [
          {
            id: 'google-maps-id',
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
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '购物层面保留一个本地电商入口就够。',
          'en-US': 'For shopping, one local marketplace is enough.',
        },
        apps: [
          {
            id: 'tokopedia',
            name: 'Tokopedia',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '临时补货和生活用品都更顺手。',
              'en-US': 'Useful for both replacement shopping and local essentials.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.tokopedia.com/' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖直接复用 Gojek 会更轻。',
          'en-US': 'The lightest move is reusing Gojek for delivery.',
        },
        apps: [
          {
            id: 'gofood',
            name: 'GoFood',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '同一个超级 app 解决 ride 和 food，切换最少。',
              'en-US': 'The same super app handles rides and food, which keeps the stack simpler.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://gofood.co.id/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '订酒店先保留一个本地强势入口。',
          'en-US': 'For stays, start with one strong local booking layer.',
        },
        apps: [
          {
            id: 'traveloka-id',
            name: 'Traveloka',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个酒店入口，就先装它。',
              'en-US': 'If you keep one hotel-booking app, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.traveloka.com/en-id/hotel' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'vietnam',
    teaser: {
      'zh-CN': '越南先把打车、外卖和酒店入口装好，现场最常用的动作就比较稳了。',
      'en-US': 'In Vietnam, setting up rides, delivery, and hotels first makes the most common on-the-ground decisions much easier.',
    },
    intro: {
      'zh-CN': '越南对游客来说，先把 Grab、地图、购物和外卖层解决，已经能覆盖多数高频需求。再保留一个酒店入口，整个 app 栈就够用了。',
      'en-US': 'For most visitors, Vietnam becomes much easier once Grab, maps, shopping, and delivery are sorted. Add one hotel-booking app and the stack is already enough for most trips.',
    },
    highlights: {
      'zh-CN': ['打车', '外卖', '购物'],
      'en-US': ['Rides', 'Delivery', 'Shopping'],
    },
    cautions: {
      'zh-CN': [
        '如果已经装了 Grab，就先复用它，不必同时追太多 ride app。',
        '外卖和酒店层面先各保留一个主入口就够。',
      ],
      'en-US': [
        'If Grab is already installed, reuse it instead of chasing too many ride apps.',
        'One strong delivery app and one hotel app are usually enough here.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先有一个最稳的叫车入口。',
          'en-US': 'Start with the most dependable ride app.',
        },
        apps: [
          {
            id: 'grab-vn',
            name: 'Grab',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只装一个越南本地 app，就先装它。',
              'en-US': 'If you install one Vietnam-first app, make it this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.grab.com/vn/download/' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图继续用你熟悉的主流工具即可。',
          'en-US': 'The maps layer can stay on the mainstream tool you already know.',
        },
        apps: [
          {
            id: 'google-maps-vn',
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
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '购物保留一个本地电商入口就够。',
          'en-US': 'One local marketplace is enough for the shopping layer.',
        },
        apps: [
          {
            id: 'tiki',
            name: 'Tiki',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '买生活用品和临时补货都更方便。',
              'en-US': 'Useful for essentials and replacement shopping.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://tiki.vn/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层面先看本地餐厅发现入口。',
          'en-US': 'For food, start with the local restaurant-discovery layer.',
        },
        apps: [
          {
            id: 'foody',
            name: 'Foody',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你想先找店、看评分，再决定去哪吃，就先装它。',
              'en-US': 'Install it first when you want restaurant discovery before deciding where to eat.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.foody.vn/' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖优先复用 Grab。',
          'en-US': 'The lightest move is reusing Grab for delivery.',
        },
        apps: [
          {
            id: 'grabfood-vn',
            name: 'GrabFood',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '同一套 app 解决 ride 和 food，切换最少。',
              'en-US': 'The same app handles rides and food, which keeps the stack lighter.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.grab.com/vn/food/' },
            ],
          },
          {
            id: 'shopeefood-vn',
            name: 'ShopeeFood',
            summary: {
              'zh-CN': '适合作为本地备选。',
              'en-US': 'A local delivery backup worth adding later.',
            },
            reason: {
              'zh-CN': '想补第二个外卖入口时再装。',
              'en-US': 'Add it only if you want a second delivery layer.',
            },
            recommended: false,
            links: [
              { platform: 'official', url: 'https://shopeefood.vn/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '酒店层先保留一个成熟入口。',
          'en-US': 'For stays, keep one mature booking app first.',
        },
        apps: [
          {
            id: 'agoda-vn',
            name: 'Agoda',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个住的入口，就先留它。',
              'en-US': 'If you keep one hotel-booking app, keep this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.agoda.com/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'india',
    teaser: {
      'zh-CN': '印度更适合先把打车、点外卖和订酒店入口准备好，游客常见动作会轻松很多。',
      'en-US': 'India gets easier fast once rides, delivery, and hotel booking are set up before the trip.',
    },
    intro: {
      'zh-CN': '印度的本地 app 层更适合围绕打车、地图、购物、餐饮和住宿来搭。先把这几层准备好，落地后的移动、吃饭和临时补货都会更顺。',
      'en-US': 'India works best when the app stack is built around rides, maps, shopping, food, and stays. With those layers ready, movement, meals, and replacement shopping become much smoother on the ground.',
    },
    highlights: {
      'zh-CN': ['打车', '外卖', '酒店'],
      'en-US': ['Rides', 'Delivery', 'Hotels'],
    },
    cautions: {
      'zh-CN': [
        '如果你已经装了 Uber，可以保留，但本地 ride 入口更值得提早准备。',
        '食和住的层面都不需要堆太多 app，一类先保留一个强入口就够。',
      ],
      'en-US': [
        'If Uber is already installed, keep it, but a local ride app is still worth setting up early.',
        'For food and stays, one strong default per category is usually enough.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先有一个本地 ride 入口。',
          'en-US': 'Start with one local ride default.',
        },
        apps: [
          {
            id: 'ola',
            name: 'Ola',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只装一个印度本地打车 app，就先装它。',
              'en-US': 'If you install one India-first ride app, make it this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.olacabs.com/' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图继续保留一个主流入口即可。',
          'en-US': 'The maps layer can stay on one mainstream tool.',
        },
        apps: [
          {
            id: 'google-maps-in',
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
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '购物层面先保留一个服饰入口。',
          'en-US': 'For shopping, one fashion-first marketplace is enough.',
        },
        apps: [
          {
            id: 'myntra',
            name: 'Myntra',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你要先解决“衣”的层面，就先装它。',
              'en-US': 'If fashion is the first shopping problem to solve, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.myntra.com/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层面先看本地餐厅发现入口。',
          'en-US': 'For dining, start with one strong local discovery layer.',
        },
        apps: [
          {
            id: 'zomato-in',
            name: 'Zomato',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你想先找店、看评价，再决定去哪吃，就先看它。',
              'en-US': 'Install it first when you want ratings and restaurant discovery before deciding where to eat.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.zomato.com/' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖层先保留一个强入口就够。',
          'en-US': 'One strong delivery app is enough here.',
        },
        apps: [
          {
            id: 'swiggy',
            name: 'Swiggy',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果 delivery 会成为高频动作，就先装它。',
              'en-US': 'If delivery will be a frequent need, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.swiggy.com/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '订酒店层保留一个成熟入口就够。',
          'en-US': 'For stays, one mature booking layer is enough.',
        },
        apps: [
          {
            id: 'makemytrip',
            name: 'MakeMyTrip',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个酒店入口，就先装它。',
              'en-US': 'If you keep one hotel-booking app, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.makemytrip.com/hotels/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'philippines',
    teaser: {
      'zh-CN': '菲律宾更适合先把 Grab、外卖和酒店入口准备好，城市旅行会更稳。',
      'en-US': 'The Philippines becomes much easier once Grab, delivery, and hotel booking are already in place.',
    },
    intro: {
      'zh-CN': '菲律宾的 app 栈不需要太重。先把 ride、地图、购物、餐饮和酒店入口准备好，多数游客高频动作就都覆盖了。',
      'en-US': 'The Philippines does not need a very heavy app stack. Once rides, maps, shopping, food, and hotel booking are ready, most common traveler actions are covered.',
    },
    highlights: {
      'zh-CN': ['Grab', '外卖', '酒店'],
      'en-US': ['Grab', 'Delivery', 'Hotels'],
    },
    cautions: {
      'zh-CN': [
        '如果你已经装了 Grab，就尽量复用它处理 ride 和 food。',
        '酒店层先保留一个成熟入口即可，不必一开始堆太多备选。',
      ],
      'en-US': [
        'If Grab is already installed, reuse it across rides and food first.',
        'For stays, one mature booking app is enough to start with.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先保留一个你最熟的 ride 入口。',
          'en-US': 'Keep the ride layer simple with the app visitors already know best.',
        },
        apps: [
          {
            id: 'grab-ph',
            name: 'Grab',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只装一个菲律宾本地 app，就先装它。',
              'en-US': 'If you install one Philippines-first app, make it this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.grab.com/ph/download/' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图继续用熟悉的主流入口即可。',
          'en-US': 'The maps layer can stay on the mainstream tool you already know.',
        },
        apps: [
          {
            id: 'google-maps-ph',
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
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '购物先保留一个服饰入口。',
          'en-US': 'For shopping, keep one fashion-first app.',
        },
        apps: [
          {
            id: 'zalora-ph',
            name: 'ZALORA',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你要先补“衣”的层面，就先装它。',
              'en-US': 'If fashion is the first shopping need to solve, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.zalora.com.ph/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层先有一个本地发现入口。',
          'en-US': 'For dining, keep one local discovery layer.',
        },
        apps: [
          {
            id: 'booky',
            name: 'Booky',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你想先看店、看餐厅信息，再决定去哪吃，就先装它。',
              'en-US': 'Install it first when you want restaurant discovery before deciding where to eat.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://booky.ph/' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖优先复用 Grab 或 foodpanda 之一。',
          'en-US': 'Delivery is easiest when you keep just one of Grab or foodpanda.',
        },
        apps: [
          {
            id: 'foodpanda-ph',
            name: 'foodpanda',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你想把 delivery 层单独做强，就先装它。',
              'en-US': 'If you want the delivery layer to be its own strong default, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.foodpanda.ph/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '订酒店先保留一个成熟入口。',
          'en-US': 'For stays, one mature booking app is enough.',
        },
        apps: [
          {
            id: 'agoda-ph',
            name: 'Agoda',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个酒店入口，就先留它。',
              'en-US': 'If you keep one hotel-booking app, keep this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.agoda.com/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'turkey',
    teaser: {
      'zh-CN': '土耳其更适合先装本地打车、外卖和酒店入口，再补购物和餐厅发现。',
      'en-US': 'Turkey works best when local rides, food delivery, and hotel booking are ready before you add more.',
    },
    intro: {
      'zh-CN': '土耳其更适合围绕本地 ride、地图、购物、探店、外卖和酒店入口来搭 app 栈。先把这些准备好，城市内移动和吃住的决策都会更快。',
      'en-US': 'Turkey works well when the app stack is built around local rides, maps, shopping, restaurant discovery, delivery, and hotel booking. With those ready, city movement and stay decisions become much faster.',
    },
    highlights: {
      'zh-CN': ['本地打车', '外卖', '酒店'],
      'en-US': ['Local rides', 'Delivery', 'Hotels'],
    },
    cautions: {
      'zh-CN': [
        '本地 ride 入口比继续多装一个地图 app 更值。',
        '住和食的层面都不需要一开始就堆太多备选。',
      ],
      'en-US': [
        'A local ride app adds more value than a second map app here.',
        'For food and stays, you do not need too many backups on day one.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先有一个本地 ride 入口。',
          'en-US': 'Start with a local ride default.',
        },
        apps: [
          {
            id: 'bitaksi',
            name: 'BiTaksi',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只装一个土耳其本地打车 app，就先装它。',
              'en-US': 'If you install one Turkey-first ride app, make it this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.bitaksi.com/en/' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图继续用熟悉的主流入口即可。',
          'en-US': 'The maps layer can stay on the mainstream tool you already know.',
        },
        apps: [
          {
            id: 'google-maps-tr',
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
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '购物先保留一个本地大平台。',
          'en-US': 'For shopping, keep one large local marketplace.',
        },
        apps: [
          {
            id: 'trendyol',
            name: 'Trendyol',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你要先补“衣”的层面，就先装它。',
              'en-US': 'If fashion is the first shopping layer to solve, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.trendyol.com/en' },
            ],
          },
        ],
      },
      {
        id: 'food-delivery',
        summary: {
          'zh-CN': '外卖层先保留一个本地强入口。',
          'en-US': 'For delivery, keep one strong local default.',
        },
        apps: [
          {
            id: 'yemeksepeti',
            name: 'Yemeksepeti',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果 delivery 是高频动作，就先装它。',
              'en-US': 'If delivery will be frequent, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.yemeksepeti.com/en' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '订酒店先保留一个本地订房入口。',
          'en-US': 'For stays, keep one local hotel-booking layer.',
        },
        apps: [
          {
            id: 'otelz',
            name: 'Otelz',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只留一个土耳其订酒店入口，就先装它。',
              'en-US': 'If you keep one Turkey-first hotel app, make it this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.otelz.com/en' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'germany',
    teaser: {
      'zh-CN': '德国更适合先装打车、餐厅发现、外卖和酒店入口，生活层 app 不需要一次铺太多。',
      'en-US': 'Germany works best when rides, restaurant discovery, delivery, and hotel booking are set up before the trip.',
    },
    intro: {
      'zh-CN': '德国的 app 栈更适合保持克制。先把 ride、地图、买衣服、探店、外卖和酒店入口准备好，多数高频决策都能覆盖。',
      'en-US': 'Germany works best with a restrained app stack. Once rides, maps, shopping, food discovery, delivery, and hotel booking are ready, most common traveler decisions are covered.',
    },
    highlights: {
      'zh-CN': ['打车', '外卖', '酒店'],
      'en-US': ['Rides', 'Delivery', 'Hotels'],
    },
    cautions: {
      'zh-CN': [
        '如果你已经有熟悉的国际地图 app，不必继续在地图层堆太多工具。',
        '本地 food 和 stay 各保留一个主入口就够。',
      ],
      'en-US': [
        'If you already have a trusted global map app, do not overbuild the maps layer.',
        'For food and stays, one strong default per category is enough.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先保留一个欧洲常用 ride 入口。',
          'en-US': 'Keep one Europe-friendly ride app first.',
        },
        apps: [
          {
            id: 'freenow-de',
            name: 'FREENOW',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只装一个德国 ride app，就先装它。',
              'en-US': 'If you install one Germany ride app, make it this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.free-now.com/de-en/' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图继续保留熟悉的主流入口即可。',
          'en-US': 'The maps layer can stay on the mainstream tool you already know.',
        },
        apps: [
          {
            id: 'google-maps-de',
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
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '买衣服先保留一个成熟时尚入口。',
          'en-US': 'For fashion, keep one mature shopping platform.',
        },
        apps: [
          {
            id: 'zalando-de',
            name: 'Zalando',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你先要解决“衣”的层面，就先装它。',
              'en-US': 'If fashion is the first shopping layer to solve, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.zalando.de/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层先保留一个餐厅发现入口。',
          'en-US': 'For dining, keep one restaurant-discovery app first.',
        },
        apps: [
          {
            id: 'thefork-de',
            name: 'TheFork',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你先想找店、看订位层，就先看它。',
              'en-US': 'If discovery and reservations come first, start here.',
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
          'zh-CN': '外卖保留一个本地强入口即可。',
          'en-US': 'One strong local delivery app is enough.',
        },
        apps: [
          {
            id: 'lieferando',
            name: 'Lieferando',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果 delivery 会成为高频动作，就先装它。',
              'en-US': 'If delivery will be frequent, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.lieferando.de/en/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '订酒店层先保留一个成熟入口。',
          'en-US': 'For stays, one mature booking app is enough.',
        },
        apps: [
          {
            id: 'booking-de',
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
            links: [
              { platform: 'official', url: 'https://www.booking.com/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'italy',
    teaser: {
      'zh-CN': '意大利更适合先把打车、探店和酒店入口装好，再补购物和外卖层。',
      'en-US': 'Italy works best when rides, restaurant discovery, and hotel booking are ready before you add more layers.',
    },
    intro: {
      'zh-CN': '意大利的 app 栈更适合围绕 ride、地图、购物、探店、delivery 和酒店来搭。先把这些准备好，城市间切换和每天的吃住决策都会更稳。',
      'en-US': 'Italy works well when the app stack is built around rides, maps, shopping, restaurant discovery, delivery, and hotel booking. With those ready, city switches and daily food-and-stay decisions become much smoother.',
    },
    highlights: {
      'zh-CN': ['探店', '打车', '酒店'],
      'en-US': ['Food discovery', 'Rides', 'Hotels'],
    },
    cautions: {
      'zh-CN': [
        '本地餐厅发现层往往比继续多装一个 ride 备选更值。',
        '住的层面先保留一个成熟入口即可。',
      ],
      'en-US': [
        'The local restaurant-discovery layer often adds more value than a second ride backup.',
        'For stays, one mature booking app is enough to start with.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先保留一个欧洲 ride 入口。',
          'en-US': 'Keep one Europe-friendly ride default.',
        },
        apps: [
          {
            id: 'freenow-it',
            name: 'FREENOW',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你只装一个意大利 ride app，就先装它。',
              'en-US': 'If you install one Italy ride app, make it this one.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.free-now.com/it-en/' },
            ],
          },
        ],
      },
      {
        id: 'maps',
        summary: {
          'zh-CN': '地图继续保留熟悉的主流入口即可。',
          'en-US': 'The maps layer can stay on the mainstream tool you already know.',
        },
        apps: [
          {
            id: 'google-maps-it',
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
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '买衣服保留一个成熟时尚入口即可。',
          'en-US': 'For fashion, one mature shopping platform is enough.',
        },
        apps: [
          {
            id: 'zalando-it',
            name: 'Zalando',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你先要解决“衣”的层面，就先装它。',
              'en-US': 'If fashion is the first shopping layer to solve, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.zalando.it/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层先保留一个餐厅发现入口。',
          'en-US': 'For dining, keep one restaurant-discovery app first.',
        },
        apps: [
          {
            id: 'thefork-it',
            name: 'TheFork',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你先想找店和看订位层，就先看它。',
              'en-US': 'If discovery and reservations come first, start here.',
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
          'zh-CN': 'delivery 保留一个国际化入口即可。',
          'en-US': 'For delivery, one international app is enough.',
        },
        apps: [
          {
            id: 'deliveroo-it',
            name: 'Deliveroo',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果 delivery 会成为高频动作，就先装它。',
              'en-US': 'If delivery will be frequent, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://deliveroo.it/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '订酒店层先保留一个成熟入口。',
          'en-US': 'For stays, one mature booking app is enough.',
        },
        apps: [
          {
            id: 'booking-it',
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
            links: [
              { platform: 'official', url: 'https://www.booking.com/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'netherlands',
    teaser: {
      'zh-CN': '荷兰更适合先把 ride、餐厅发现、delivery 和酒店入口准备好，购物层保持轻量即可。',
      'en-US': 'The Netherlands works best when rides, restaurant discovery, delivery, and hotel booking are already sorted.',
    },
    intro: {
      'zh-CN': '荷兰的 app 栈不需要太重。先把 ride、地图、购物、探店、外卖和酒店入口准备好，日常城市旅行就够用了。',
      'en-US': 'The Netherlands does not need a very heavy app stack. Once rides, maps, shopping, food discovery, delivery, and hotel booking are ready, everyday city travel is covered.',
    },
    highlights: {
      'zh-CN': ['打车', '外卖', '酒店'],
      'en-US': ['Rides', 'Delivery', 'Hotels'],
    },
    cautions: {
      'zh-CN': [
        '如果你已经有熟悉的国际地图 app，就继续保留它。',
        '吃和住的层先各保留一个成熟入口即可。',
      ],
      'en-US': [
        'If you already have a trusted global map app, keep it.',
        'For food and stays, one mature app per category is enough to start with.',
      ],
    },
    categories: [
      {
        id: 'ride-hailing',
        summary: {
          'zh-CN': '先保留一个最熟悉的 ride 入口。',
          'en-US': 'Keep the ride layer simple with the app you already know best.',
        },
        apps: [
          {
            id: 'uber-nl',
            name: 'Uber',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果你已经在别的国家用 Uber，就继续用它。',
              'en-US': 'If Uber is already part of your stack elsewhere, keep it here too.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.uber.com/' },
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
            id: 'google-maps-nl',
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
            links: [
              { platform: 'ios', url: 'https://apps.apple.com/us/app/google-maps/id585027354' },
              { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps' },
            ],
          },
        ],
      },
      {
        id: 'shopping',
        summary: {
          'zh-CN': '购物先保留一个成熟时尚入口。',
          'en-US': 'For shopping, one mature fashion platform is enough.',
        },
        apps: [
          {
            id: 'zalando-nl',
            name: 'Zalando',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果要先解决“衣”的层面，就先装它。',
              'en-US': 'If fashion is the first shopping layer to solve, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.zalando.nl/' },
            ],
          },
        ],
      },
      {
        id: 'food-discovery',
        summary: {
          'zh-CN': '吃喝层先保留一个餐厅发现入口。',
          'en-US': 'For dining, keep one restaurant-discovery app first.',
        },
        apps: [
          {
            id: 'thefork-nl',
            name: 'TheFork',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果 discovery 和订位更重要，就先看它。',
              'en-US': 'If discovery and reservations matter first, start here.',
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
          'zh-CN': '外卖保留一个本地强入口即可。',
          'en-US': 'One strong local delivery app is enough.',
        },
        apps: [
          {
            id: 'thuisbezorgd',
            name: 'Thuisbezorgd',
            summary: {
              'zh-CN': '默认首选。',
              'en-US': 'Primary pick.',
            },
            reason: {
              'zh-CN': '如果 delivery 会成为高频动作，就先装它。',
              'en-US': 'If delivery will be frequent, start here.',
            },
            recommended: true,
            links: [
              { platform: 'official', url: 'https://www.thuisbezorgd.nl/en/' },
            ],
          },
        ],
      },
      {
        id: 'stays',
        summary: {
          'zh-CN': '订酒店层先保留一个成熟入口。',
          'en-US': 'For stays, one mature booking app is enough.',
        },
        apps: [
          {
            id: 'booking-nl',
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
            links: [
              { platform: 'official', url: 'https://www.booking.com/' },
            ],
          },
        ],
      },
    ],
  },
  ...LOCAL_APP_GUIDE_ADDITIONS_EXTRA,
  ...LOCAL_APP_GUIDE_ADDITIONS_REMAINING,
]
