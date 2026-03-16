import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "italy",
  "teaser": {
    "zh-CN": "意大利更适合先把打车、探店和酒店入口装好，再补购物和外卖层。",
    "en-US": "Italy works best when rides, restaurant discovery, and hotel booking are ready before you add more layers."
  },
  "intro": {
    "zh-CN": "意大利的 app 栈更适合围绕 ride、地图、购物、探店、delivery 和酒店来搭。先把这些准备好，城市间切换和每天的吃住决策都会更稳。",
    "en-US": "Italy works well when the app stack is built around rides, maps, shopping, restaurant discovery, delivery, and hotel booking. With those ready, city switches and daily food-and-stay decisions become much smoother."
  },
  "highlights": {
    "zh-CN": [
      "探店",
      "打车",
      "酒店"
    ],
    "en-US": [
      "Food discovery",
      "Rides",
      "Hotels"
    ]
  },
  "cautions": {
    "zh-CN": [
      "本地餐厅发现层往往比继续多装一个 ride 备选更值。",
      "住的层面先保留一个成熟入口即可。"
    ],
    "en-US": [
      "The local restaurant-discovery layer often adds more value than a second ride backup.",
      "For stays, one mature booking app is enough to start with."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先保留一个欧洲 ride 入口。",
        "en-US": "Keep one Europe-friendly ride default."
      },
      "apps": [
        {
          "id": "freenow-it",
          "name": "FREENOW",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只装一个意大利 ride app，就先装它。",
            "en-US": "If you install one Italy ride app, make it this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.free-now.com/it-en/"
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
          "id": "google-maps-it",
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
        "zh-CN": "买衣服保留一个成熟时尚入口即可。",
        "en-US": "For fashion, one mature shopping platform is enough."
      },
      "apps": [
        {
          "id": "zalando-it",
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
              "url": "https://www.zalando.it/"
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
          "id": "thefork-it",
          "name": "TheFork",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你先想找店和看订位层，就先看它。",
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
        "zh-CN": "delivery 保留一个国际化入口即可。",
        "en-US": "For delivery, one international app is enough."
      },
      "apps": [
        {
          "id": "deliveroo-it",
          "name": "Deliveroo",
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
              "url": "https://deliveroo.it/"
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
          "id": "booking-it",
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
