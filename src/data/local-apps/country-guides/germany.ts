import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "germany",
  "teaser": {
    "zh-CN": "德国更适合先装打车、餐厅发现、外卖和酒店入口，生活层 app 不需要一次铺太多。",
    "en-US": "Germany works best when rides, restaurant discovery, delivery, and hotel booking are set up before the trip."
  },
  "intro": {
    "zh-CN": "德国的 app 栈更适合保持克制。先把 ride、地图、买衣服、探店、外卖和酒店入口准备好，多数高频决策都能覆盖。",
    "en-US": "Germany works best with a restrained app stack. Once rides, maps, shopping, food discovery, delivery, and hotel booking are ready, most common traveler decisions are covered."
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
      "如果你已经有熟悉的国际地图 app，不必继续在地图层堆太多工具。",
      "本地 food 和 stay 各保留一个主入口就够。"
    ],
    "en-US": [
      "If you already have a trusted global map app, do not overbuild the maps layer.",
      "For food and stays, one strong default per category is enough."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先保留一个欧洲常用 ride 入口。",
        "en-US": "Keep one Europe-friendly ride app first."
      },
      "apps": [
        {
          "id": "freenow-de",
          "name": "FREENOW",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只装一个德国 ride app，就先装它。",
            "en-US": "If you install one Germany ride app, make it this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.free-now.com/de-en/"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图继续保留熟悉的主流入口即可。",
        "en-US": "The maps layer can stay on the mainstream tool you already know."
      },
      "apps": [
        {
          "id": "google-maps-de",
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
        "zh-CN": "买衣服先保留一个成熟时尚入口。",
        "en-US": "For fashion, keep one mature shopping platform."
      },
      "apps": [
        {
          "id": "zalando-de",
          "name": "Zalando",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你先要解决“衣”的层面，就先装它。",
            "en-US": "If fashion is the first shopping layer to solve, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.zalando.de/"
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
          "id": "thefork-de",
          "name": "TheFork",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你先想找店、看订位层，就先看它。",
            "en-US": "If discovery and reservations come first, start here."
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
          "id": "lieferando",
          "name": "Lieferando",
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
              "url": "https://www.lieferando.de/en/"
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
          "id": "booking-de",
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
