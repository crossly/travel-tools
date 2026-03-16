import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "netherlands",
  "teaser": {
    "zh-CN": "荷兰更适合先把 ride、餐厅发现、delivery 和酒店入口准备好，购物层保持轻量即可。",
    "en-US": "The Netherlands works best when rides, restaurant discovery, delivery, and hotel booking are already sorted."
  },
  "intro": {
    "zh-CN": "荷兰的 app 栈不需要太重。先把 ride、地图、购物、探店、外卖和酒店入口准备好，日常城市旅行就够用了。",
    "en-US": "The Netherlands does not need a very heavy app stack. Once rides, maps, shopping, food discovery, delivery, and hotel booking are ready, everyday city travel is covered."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "外卖",
      "酒店"
    ],
    "en-US": [
      "Rides",
      "Delivery",
      "Hotels"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果你已经有熟悉的国际地图 app，就继续保留它。",
      "吃和住的层先各保留一个成熟入口即可。"
    ],
    "en-US": [
      "If you already have a trusted global map app, keep it.",
      "For food and stays, one mature app per category is enough to start with."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先保留一个最熟悉的 ride 入口。",
        "en-US": "Keep the ride layer simple with the app you already know best."
      },
      "apps": [
        {
          "id": "uber-nl",
          "name": "Uber",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你已经在别的国家用 Uber，就继续用它。",
            "en-US": "If Uber is already part of your stack elsewhere, keep it here too."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.uber.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图层继续保留主流入口即可。",
        "en-US": "The maps layer can stay on the mainstream tool you already know."
      },
      "apps": [
        {
          "id": "google-maps-nl",
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
        "zh-CN": "购物先保留一个成熟时尚入口。",
        "en-US": "For shopping, one mature fashion platform is enough."
      },
      "apps": [
        {
          "id": "zalando-nl",
          "name": "Zalando",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果要先解决“衣”的层面，就先装它。",
            "en-US": "If fashion is the first shopping layer to solve, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.zalando.nl/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个餐厅发现入口。",
        "en-US": "For dining, keep one restaurant-discovery app first."
      },
      "apps": [
        {
          "id": "thefork-nl",
          "name": "TheFork",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果 discovery 和订位更重要，就先看它。",
            "en-US": "If discovery and reservations matter first, start here."
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
        "zh-CN": "外卖保留一个本地强入口即可。",
        "en-US": "One strong local delivery app is enough."
      },
      "apps": [
        {
          "id": "thuisbezorgd",
          "name": "Thuisbezorgd",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果 delivery 会成为高频动作，就先装它。",
            "en-US": "If delivery will be frequent, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.thuisbezorgd.nl/en/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "订酒店层先保留一个成熟入口。",
        "en-US": "For stays, one mature booking app is enough."
      },
      "apps": [
        {
          "id": "booking-nl",
          "name": "Booking.com",
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
              "url": "https://www.booking.com/"
            }
          ]
        }
      ]
    }
  ]
}
