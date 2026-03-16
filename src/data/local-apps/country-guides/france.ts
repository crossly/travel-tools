import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "france",
  "teaser": {
    "zh-CN": "法国先把叫车和城市导航装好，别在落地后才开始比 app。",
    "en-US": "In France, set up rides and city navigation before arrival instead of comparing apps on the curb."
  },
  "intro": {
    "zh-CN": "法国更适合用一个国际化的打车入口，再配一套你熟悉的城市导航。大多数游客不需要太深的本地 app 栈，先把这两层解决就够。",
    "en-US": "France works well with one international ride app and a navigation stack you already know. Most visitors do not need a deep local stack as long as these two layers are ready."
  },
  "highlights": {
    "zh-CN": [
      "叫车",
      "城市导航",
      "国际化工具"
    ],
    "en-US": [
      "Rides",
      "City navigation",
      "International tools"
    ]
  },
  "cautions": {
    "zh-CN": [
      "先用你熟悉的国际化 app，不要为了“更本地”把自己搞复杂。",
      "如果你会频繁步行和换乘，Google Maps 通常比临时折腾其他工具更划算。"
    ],
    "en-US": [
      "Start with international apps you already know instead of over-optimizing for local flavor.",
      "If you expect lots of walking and transfers, Google Maps usually pays off more than trying unfamiliar tools."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "默认先解决叫车，再谈备选。",
        "en-US": "Solve ride-hailing first, then think about backups."
      },
      "apps": [
        {
          "id": "uber",
          "name": "Uber",
          "summary": {
            "zh-CN": "默认首选，游客最容易直接上手。",
            "en-US": "Primary recommendation and the easiest first pickup for most visitors."
          },
          "reason": {
            "zh-CN": "如果你本来就在用 Uber，法国不需要另起一套。",
            "en-US": "If you already use Uber elsewhere, there is no need to reinvent your stack in France."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.uber.com/fr/en/ride/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/uber-request-a-ride/id368677368"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.ubercab"
            }
          ]
        },
        {
          "id": "bolt",
          "name": "Bolt",
          "summary": {
            "zh-CN": "可作为备选叫车入口。",
            "en-US": "A reasonable secondary ride option."
          },
          "reason": {
            "zh-CN": "需要备选时再补，不必抢在 Uber 前面。",
            "en-US": "Add it when you want a backup, not before your primary ride app is sorted."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://bolt.eu/en/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/bolt-request-a-ride/id675033630"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=ee.mtakso.client"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "城市导航优先用成熟工具。",
        "en-US": "Use mature tools first for city navigation."
      },
      "apps": [
        {
          "id": "google-maps",
          "name": "Google Maps",
          "summary": {
            "zh-CN": "默认首选，游客最稳。",
            "en-US": "Best default and the safest first map app for visitors."
          },
          "reason": {
            "zh-CN": "跨城市和日常找路都更省心。",
            "en-US": "It stays low-friction across cities and everyday route checks."
          },
          "recommended": true,
          "links": [
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/google-maps/id585027354"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.google.android.apps.maps"
            }
          ]
        },
        {
          "id": "citymapper",
          "name": "Citymapper",
          "summary": {
            "zh-CN": "适合重度城市内移动时作为补充。",
            "en-US": "Useful as a supplement when you expect dense city movement."
          },
          "reason": {
            "zh-CN": "如果你的旅行高度依赖城市内路线，可以把它当补充层。",
            "en-US": "Treat it as an extra layer only if your trip is heavily centered on city navigation."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://citymapper.com/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/citymapper-all-your-transit/id469463298"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.citymapper.app.release"
            }
          ]
        }
      ]
    },
    {
      "id": "shopping",
      "summary": {
        "zh-CN": "买衣服层面更适合先装一个本地化购物入口。",
        "en-US": "For shopping, one France-facing app is enough before you complicate the stack."
      },
      "apps": [
        {
          "id": "vinted-fr",
          "name": "Vinted",
          "summary": {
            "zh-CN": "默认首选，买衣服和二手时很实用。",
            "en-US": "Primary pick for fashion browsing and second-hand finds."
          },
          "reason": {
            "zh-CN": "如果你想用 app 补衣服，而不是只逛线下，就先看它。",
            "en-US": "If you want an app-first clothing layer instead of relying only on stores, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.vinted.fr/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层面先看预订和评分入口。",
        "en-US": "Dining works best when you start with reservation and review layers."
      },
      "apps": [
        {
          "id": "thefork",
          "name": "TheFork",
          "summary": {
            "zh-CN": "默认首选，更适合找店和订位。",
            "en-US": "Primary pick for restaurant discovery and reservations."
          },
          "reason": {
            "zh-CN": "如果你更在意餐厅选择和订位，就先用它。",
            "en-US": "If restaurant choice and bookings matter first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.thefork.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖层面保留一个国际化入口就够。",
        "en-US": "For delivery, one international app is usually enough."
      },
      "apps": [
        {
          "id": "ubereats-fr",
          "name": "Uber Eats",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你本来就在用 Uber 系列，就继续用它。",
            "en-US": "If Uber is already part of your broader stack, keep it here too."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.ubereats.com/fr"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "住的层面先装一个连锁或成熟预订入口。",
        "en-US": "For stays, begin with one chain-friendly or mature booking layer."
      },
      "apps": [
        {
          "id": "accor",
          "name": "Accor",
          "summary": {
            "zh-CN": "默认首选，更适合看法国常见连锁酒店。",
            "en-US": "Primary pick when you want a France-relevant chain-hotel layer."
          },
          "reason": {
            "zh-CN": "如果你更偏向酒店链路，就先装它。",
            "en-US": "If the trip leans toward chain hotels, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://all.accor.com/"
            }
          ]
        }
      ]
    }
  ]
}
