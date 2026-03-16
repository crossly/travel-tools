import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "united-arab-emirates",
  "teaser": {
    "zh-CN": "阿联酋先把 Careem 装好，再保留熟悉的地图 app，城市移动会轻松很多。",
    "en-US": "In the UAE, set up Careem first and keep a familiar map app. City movement gets easier fast."
  },
  "intro": {
    "zh-CN": "阿联酋更适合先准备叫车入口，再决定是否补第二个服务。多数游客里，Careem 是最值得先装的一款，地图则继续保留 Google Maps 或 Apple Maps 即可。",
    "en-US": "The UAE is best approached by preparing rides first and only then adding a second service if needed. For most visitors, Careem is the main app worth setting up, while Google Maps or Apple Maps handles navigation well."
  },
  "highlights": {
    "zh-CN": [
      "叫车",
      "地图",
      "机场到市区"
    ],
    "en-US": [
      "Rides",
      "Maps",
      "Airport-to-city"
    ]
  },
  "cautions": {
    "zh-CN": [
      "先把叫车入口准备好，价值通常高于继续找第三个备选。",
      "地图层面 Google Maps 通常更像默认首选，Apple Maps 则更适合留作轻量备份。"
    ],
    "en-US": [
      "Getting the main ride app ready matters more than hunting for a third backup.",
      "Google Maps is the better default map, while Apple Maps works as a lighter backup."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先有一个可靠的叫车入口，现场会安心很多。",
        "en-US": "Having one dependable ride app changes the trip immediately."
      },
      "apps": [
        {
          "id": "careem",
          "name": "Careem",
          "summary": {
            "zh-CN": "默认首选，更值得先装。",
            "en-US": "Primary recommendation and the app worth setting up first."
          },
          "reason": {
            "zh-CN": "如果你只准备一个本地叫车 app，就先装它。",
            "en-US": "If you only prepare one local ride app, make it this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.careem.com/en-AE/download/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/careem-everything-app/id592978487"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.careem.acma"
            }
          ]
        },
        {
          "id": "uber",
          "name": "Uber",
          "summary": {
            "zh-CN": "可作为备选国际化入口。",
            "en-US": "A workable international backup option."
          },
          "reason": {
            "zh-CN": "如果你本来就重度依赖 Uber，可以保留它作为第二选择。",
            "en-US": "Keep it as a second option if Uber is already part of your default stack."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.uber.com/"
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
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图继续用你熟悉的主流工具即可。",
        "en-US": "Keep navigation simple with the mainstream map tools you already know."
      },
      "apps": [
        {
          "id": "google-maps",
          "name": "Google Maps",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Default first pick."
          },
          "reason": {
            "zh-CN": "跨平台和跨城市都更稳。",
            "en-US": "It remains the safer cross-city and cross-platform default."
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
            "en-US": "A natural iPhone-native fallback."
          },
          "reason": {
            "zh-CN": "如果你平时就在用它，不必额外折腾。",
            "en-US": "If it is already your daily map, there is no need to force a different flow."
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
        "zh-CN": "买衣服和生活补货更适合先看中东本地购物入口。",
        "en-US": "For shopping, start with a Gulf-facing platform before adding more."
      },
      "apps": [
        {
          "id": "namshi",
          "name": "Namshi",
          "summary": {
            "zh-CN": "默认首选，更适合衣服和鞋包。",
            "en-US": "Primary pick for fashion and everyday apparel shopping."
          },
          "reason": {
            "zh-CN": "如果你想解决“衣”的层面，就先装它。",
            "en-US": "If fashion is the main shopping problem to solve, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.namshi.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层面先看本地餐厅发现入口。",
        "en-US": "For food, begin with the local restaurant-discovery layer."
      },
      "apps": [
        {
          "id": "zomato-uae",
          "name": "Zomato",
          "summary": {
            "zh-CN": "默认首选，找店和看评价都更方便。",
            "en-US": "Primary pick for restaurant discovery and ratings."
          },
          "reason": {
            "zh-CN": "如果你想先知道哪里值得去吃，就先看它。",
            "en-US": "If the first question is where to eat next, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.zomato.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖层面更适合先装本地超级入口。",
        "en-US": "For delivery, one strong local default works best."
      },
      "apps": [
        {
          "id": "talabat",
          "name": "talabat",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你要点餐、买点小东西，它通常更值得先装。",
            "en-US": "If you expect to order meals or quick local items, it is usually the better first install."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.talabat.com/uae"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "酒店预订先保留一个国际成熟入口就够。",
        "en-US": "For stays, keep one mature international booking app and stop there first."
      },
      "apps": [
        {
          "id": "booking-uae",
          "name": "Booking.com",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只保留一个酒店入口，先留它。",
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
