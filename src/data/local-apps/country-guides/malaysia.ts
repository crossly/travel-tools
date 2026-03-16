import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "malaysia",
  "teaser": {
    "zh-CN": "马来西亚先装 Grab，再配一个熟悉的地图 app，就已经覆盖大部分游客动作。",
    "en-US": "In Malaysia, install Grab first, then pair it with a familiar map app. That already covers most tourist moments."
  },
  "intro": {
    "zh-CN": "马来西亚不需要很复杂的 app 组合。大部分游客先装 Grab 解决打车和部分本地生活，再保留 Google Maps 或 Apple Maps 处理路线就够用。",
    "en-US": "Malaysia does not need a complicated stack. Grab handles rides and a lot of local-life use cases, while Google Maps or Apple Maps covers the navigation side."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "本地生活",
      "地图"
    ],
    "en-US": [
      "Ride-hailing",
      "Local life",
      "Maps"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果你只准备一个本地 app，优先 Grab。",
      "地图层面 Google Maps 通常更稳，Apple Maps 适合不想跳出系统默认体验的 iPhone 用户。"
    ],
    "en-US": [
      "If you only set up one local app, make it Grab.",
      "Google Maps is usually the safer first map choice, while Apple Maps fits iPhone-first travelers who want to stay in the default stack."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "一个 Grab 基本就能覆盖大部分日常叫车。",
        "en-US": "Grab alone covers most everyday ride-hailing needs."
      },
      "apps": [
        {
          "id": "grab",
          "name": "Grab",
          "summary": {
            "zh-CN": "默认首选，打车和部分本地生活都能在里面完成。",
            "en-US": "Primary pick for rides and a chunk of everyday local-life tasks."
          },
          "reason": {
            "zh-CN": "落地前就装好它，现场效率会高很多。",
            "en-US": "Install it before landing and the first local decisions become much easier."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.grab.com/my/download/"
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
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图层面不用太复杂，选一个你最顺手的就行。",
        "en-US": "Keep maps simple. Choose the one you already move fastest in."
      },
      "apps": [
        {
          "id": "google-maps",
          "name": "Google Maps",
          "summary": {
            "zh-CN": "默认首选，游客使用门槛最低。",
            "en-US": "Best default choice and easiest for most travelers."
          },
          "reason": {
            "zh-CN": "如果你不确定装哪个地图，就先装它。",
            "en-US": "If you are unsure which map app to keep, start here."
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
            "zh-CN": "iPhone 用户可作为轻量备选。",
            "en-US": "A light backup option for iPhone users."
          },
          "reason": {
            "zh-CN": "如果你已经习惯系统地图，它足够应付多数基础导航。",
            "en-US": "If you already rely on the system map, it is enough for most basic navigation."
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
        "zh-CN": "买衣服和生活补货更适合先看电商和时尚平台。",
        "en-US": "For fashion and quick replacement buys, start with one shopping platform and one fashion option."
      },
      "apps": [
        {
          "id": "zalora-my",
          "name": "ZALORA",
          "summary": {
            "zh-CN": "默认首选，更适合衣服和鞋包。",
            "en-US": "Primary pick for clothes, footwear, and fashion basics."
          },
          "reason": {
            "zh-CN": "如果你要先补一个“衣”的入口，就先装它。",
            "en-US": "If you want one fashion-first app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.zalora.com.my/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层面更适合先看本地餐厅发现入口。",
        "en-US": "For dining, start with one local discovery layer before you decide on reservations or delivery."
      },
      "apps": [
        {
          "id": "openrice-my",
          "name": "OpenRice",
          "summary": {
            "zh-CN": "默认首选，适合作为马来西亚探店入口。",
            "en-US": "Primary pick for restaurant browsing and local discovery in Malaysia."
          },
          "reason": {
            "zh-CN": "如果你想先找店、看评价，再决定去不去，就先看它。",
            "en-US": "Use it first when you want ratings and local browsing before committing."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.openrice.com/en/malaysia"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖直接在已经装好的超级 app 里解决最省心。",
        "en-US": "The easiest delivery default is often the super app you already installed for rides."
      },
      "apps": [
        {
          "id": "grabfood-my",
          "name": "GrabFood",
          "summary": {
            "zh-CN": "默认首选，和打车入口复用最好。",
            "en-US": "Primary pick because it builds on the same app you already use for rides."
          },
          "reason": {
            "zh-CN": "已经装了 Grab，就别再额外增加太多切换成本。",
            "en-US": "If Grab is already installed for rides, keep the stack simple and use it here too."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.grab.com/my/food/"
            }
          ]
        },
        {
          "id": "foodpanda-my",
          "name": "foodpanda",
          "summary": {
            "zh-CN": "适合作为外卖备选。",
            "en-US": "A reasonable delivery backup."
          },
          "reason": {
            "zh-CN": "需要第二个外卖入口时再补它。",
            "en-US": "Add it later if you want a second delivery option."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.foodpanda.my/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "住的层面更适合先用东南亚常用预订入口。",
        "en-US": "For stays, one Southeast Asia-friendly booking layer is usually enough."
      },
      "apps": [
        {
          "id": "agoda-my",
          "name": "Agoda",
          "summary": {
            "zh-CN": "默认首选，游客使用成本最低。",
            "en-US": "Primary pick with the lowest friction for most travelers."
          },
          "reason": {
            "zh-CN": "如果你只装一个订酒店 app，就先装它。",
            "en-US": "If you only install one hotel app, start here."
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
