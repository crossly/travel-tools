import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "thailand",
  "teaser": {
    "zh-CN": "泰国先把 Grab 装好，再保留一个熟悉的地图 app，现场已经能解决大部分问题。",
    "en-US": "In Thailand, install Grab first and keep one familiar map app. That already solves most on-the-ground needs."
  },
  "intro": {
    "zh-CN": "泰国对游客来说，不需要太多工具。Grab 先解决叫车和部分本地生活，再配 Google Maps 或 Apple Maps 处理导航，已经很够用。",
    "en-US": "Thailand does not require a large stack for travelers. Grab covers rides and some local-life tasks, while Google Maps or Apple Maps handles the navigation layer well enough."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "地图",
      "轻量组合"
    ],
    "en-US": [
      "Rides",
      "Maps",
      "Lean stack"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果你已经有熟悉的地图 app，不需要为了“更本地”强行换一套。",
      "优先把 Grab 设好，价值通常比多装几个备选 app 更高。"
    ],
    "en-US": [
      "If you already have a trusted map app, do not switch just to chase local flavor.",
      "Getting Grab ready usually matters more than adding multiple backups."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先解决叫车，收益最大。",
        "en-US": "Solve ride-hailing first. That is the biggest win."
      },
      "apps": [
        {
          "id": "grab",
          "name": "Grab",
          "summary": {
            "zh-CN": "默认首选，游客最省心。",
            "en-US": "Primary recommendation and the lowest-friction choice for most visitors."
          },
          "reason": {
            "zh-CN": "如果你只装一个本地 app，就先装它。",
            "en-US": "If you only install one local app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.grab.com/th/download/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/grab-superapp/id647268330"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.grabtaxi.passenger"
            }
          ]
        },
        {
          "id": "bolt",
          "name": "Bolt",
          "summary": {
            "zh-CN": "可留作备选，但不要本末倒置。",
            "en-US": "Useful as backup, but do not make it your setup priority."
          },
          "reason": {
            "zh-CN": "有额外精力再补它，不必第一时间装。",
            "en-US": "Add it only if you want extra optionality after the core setup is done."
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
        "zh-CN": "地图选一个顺手的即可。",
        "en-US": "One familiar map app is enough here."
      },
      "apps": [
        {
          "id": "google-maps",
          "name": "Google Maps",
          "summary": {
            "zh-CN": "默认首选，跨平台最稳。",
            "en-US": "Best default and the safest cross-platform option."
          },
          "reason": {
            "zh-CN": "不确定时直接选它。",
            "en-US": "Pick this first when in doubt."
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
          "id": "apple-maps",
          "name": "Apple Maps",
          "summary": {
            "zh-CN": "iPhone 用户的自然备选。",
            "en-US": "A natural fallback for iPhone users."
          },
          "reason": {
            "zh-CN": "如果你已经习惯系统地图，就保留它。",
            "en-US": "If the default iPhone map already fits your flow, keep it."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.apple.com/maps/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/apple-maps/id915056765"
            }
          ]
        }
      ]
    },
    {
      "id": "shopping",
      "summary": {
        "zh-CN": "买衣服优先保留一个品牌平台。",
        "en-US": "For fashion, one focused shopping platform is enough."
      },
      "apps": [
        {
          "id": "pomelo",
          "name": "Pomelo",
          "summary": {
            "zh-CN": "默认首选，更适合衣服和风格化购物。",
            "en-US": "Primary pick for style-led fashion shopping."
          },
          "reason": {
            "zh-CN": "如果你想先解决“衣”的层面，就先装它。",
            "en-US": "If fashion is the main shopping need, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.pomelofashion.com/th/en/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "探店和看评价最值得先看本地餐饮入口。",
        "en-US": "Local food discovery matters more than a generic review layer here."
      },
      "apps": [
        {
          "id": "wongnai",
          "name": "Wongnai",
          "summary": {
            "zh-CN": "默认首选，更像泰国本地版探店入口。",
            "en-US": "Primary pick and the strongest local restaurant-discovery default in Thailand."
          },
          "reason": {
            "zh-CN": "如果你要找“泰国版大众点评”，就先看它。",
            "en-US": "If you want the closest Thailand-equivalent to a local review app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.wongnai.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖层面先有 GrabFood 就够。",
        "en-US": "GrabFood is usually enough as the first delivery layer."
      },
      "apps": [
        {
          "id": "grabfood-th",
          "name": "GrabFood",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "已经装了 Grab，就继续复用它。",
            "en-US": "If Grab is already part of the trip, keep the stack simple and use it here too."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.grab.com/th/food/"
            }
          ]
        },
        {
          "id": "line-man",
          "name": "LINE MAN",
          "summary": {
            "zh-CN": "适合作为本地备选。",
            "en-US": "A local backup worth adding later."
          },
          "reason": {
            "zh-CN": "想补第二个外卖入口时再装。",
            "en-US": "Add it only when you want a second local delivery option."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://lineman.line.me/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "订酒店更适合保留一个东南亚常用入口。",
        "en-US": "For hotels, one Southeast Asia-friendly booking app is enough."
      },
      "apps": [
        {
          "id": "agoda-th",
          "name": "Agoda",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只保留一个住的入口，就先装它。",
            "en-US": "If you keep just one hotel-booking app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.agoda.com/"
            }
          ]
        }
      ]
    }
  ]
}
