import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "vietnam",
  "teaser": {
    "zh-CN": "越南先把打车、外卖和酒店入口装好，现场最常用的动作就比较稳了。",
    "en-US": "In Vietnam, setting up rides, delivery, and hotels first makes the most common on-the-ground decisions much easier."
  },
  "intro": {
    "zh-CN": "越南对游客来说，先把 Grab、地图、购物和外卖层解决，已经能覆盖多数高频需求。再保留一个酒店入口，整个 app 栈就够用了。",
    "en-US": "For most visitors, Vietnam becomes much easier once Grab, maps, shopping, and delivery are sorted. Add one hotel-booking app and the stack is already enough for most trips."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "外卖",
      "购物"
    ],
    "en-US": [
      "Rides",
      "Delivery",
      "Shopping"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果已经装了 Grab，就先复用它，不必同时追太多 ride app。",
      "外卖和酒店层面先各保留一个主入口就够。"
    ],
    "en-US": [
      "If Grab is already installed, reuse it instead of chasing too many ride apps.",
      "One strong delivery app and one hotel app are usually enough here."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先有一个最稳的叫车入口。",
        "en-US": "Start with the most dependable ride app."
      },
      "apps": [
        {
          "id": "grab-vn",
          "name": "Grab",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只装一个越南本地 app，就先装它。",
            "en-US": "If you install one Vietnam-first app, make it this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.grab.com/vn/download/"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图继续用你熟悉的主流工具即可。",
        "en-US": "The maps layer can stay on the mainstream tool you already know."
      },
      "apps": [
        {
          "id": "google-maps-vn",
          "name": "Google Maps",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只留一个地图 app，就先留它。",
            "en-US": "If you keep one map app, keep this one."
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
        }
      ]
    },
    {
      "id": "shopping",
      "summary": {
        "zh-CN": "购物保留一个本地电商入口就够。",
        "en-US": "One local marketplace is enough for the shopping layer."
      },
      "apps": [
        {
          "id": "tiki",
          "name": "Tiki",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "买生活用品和临时补货都更方便。",
            "en-US": "Useful for essentials and replacement shopping."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://tiki.vn/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层面先看本地餐厅发现入口。",
        "en-US": "For food, start with the local restaurant-discovery layer."
      },
      "apps": [
        {
          "id": "foody",
          "name": "Foody",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你想先找店、看评分，再决定去哪吃，就先装它。",
            "en-US": "Install it first when you want restaurant discovery before deciding where to eat."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.foody.vn/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖优先复用 Grab。",
        "en-US": "The lightest move is reusing Grab for delivery."
      },
      "apps": [
        {
          "id": "grabfood-vn",
          "name": "GrabFood",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "同一套 app 解决 ride 和 food，切换最少。",
            "en-US": "The same app handles rides and food, which keeps the stack lighter."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.grab.com/vn/food/"
            }
          ]
        },
        {
          "id": "shopeefood-vn",
          "name": "ShopeeFood",
          "summary": {
            "zh-CN": "适合作为本地备选。",
            "en-US": "A local delivery backup worth adding later."
          },
          "reason": {
            "zh-CN": "想补第二个外卖入口时再装。",
            "en-US": "Add it only if you want a second delivery layer."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://shopeefood.vn/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "酒店层先保留一个成熟入口。",
        "en-US": "For stays, keep one mature booking app first."
      },
      "apps": [
        {
          "id": "agoda-vn",
          "name": "Agoda",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只留一个住的入口，就先留它。",
            "en-US": "If you keep one hotel-booking app, keep this one."
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
