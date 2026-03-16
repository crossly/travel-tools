import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "hong-kong",
  "teaser": {
    "zh-CN": "香港更适合先准备叫车、探店和酒店入口，城市切换会快很多。",
    "en-US": "Hong Kong works best when rides, food discovery, and hotel booking are ready before you land."
  },
  "intro": {
    "zh-CN": "香港不需要太重的 app 栈，但值得先把叫车、地图、探店和订酒店这几层准备好。这样机场进城、找吃的和临时改住宿都会更顺。",
    "en-US": "Hong Kong does not need a very heavy app stack, but rides, maps, food discovery, and hotel booking are worth setting up first. That makes airport arrivals, dining decisions, and last-minute stay changes much easier."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "探店",
      "酒店"
    ],
    "en-US": [
      "Rides",
      "Food discovery",
      "Hotels"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果你已经习惯 Google Maps，就保留它，没必要为了本地化强行切换太多工具。",
      "吃喝层面 OpenRice 的价值往往比再加第三个 delivery app 更高。"
    ],
    "en-US": [
      "If Google Maps is already your default, keep it rather than over-rotating into too many local tools.",
      "For food, OpenRice usually adds more value than a third delivery app."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个最熟的入口。",
        "en-US": "Keep the ride layer simple with one familiar app."
      },
      "apps": [
        {
          "id": "uber-hk",
          "name": "Uber",
          "summary": {
            "zh-CN": "默认首选，游客最容易上手。",
            "en-US": "Primary pick and the easiest ride app for most visitors."
          },
          "reason": {
            "zh-CN": "如果你已经在别的国家用 Uber，就继续用它。",
            "en-US": "If Uber is already part of your default travel stack, keep it here too."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.uber.com/hk/en/ride/"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图层面不必太复杂。",
        "en-US": "The maps layer does not need to be complicated."
      },
      "apps": [
        {
          "id": "google-maps-hk",
          "name": "Google Maps",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只留一个地图 app，就先留它。",
            "en-US": "If you only keep one map app, start here."
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
        "zh-CN": "买衣服和生活补货先装一个本地购物入口。",
        "en-US": "For shopping, keep one local marketplace on hand."
      },
      "apps": [
        {
          "id": "hktvmall",
          "name": "HKTVmall",
          "summary": {
            "zh-CN": "默认首选，本地购物覆盖更广。",
            "en-US": "Primary pick for broader local shopping coverage."
          },
          "reason": {
            "zh-CN": "如果你临时要补衣服或生活用品，先看它。",
            "en-US": "Use this first for replacement buys or local essentials."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.hktvmall.com/hktv/en/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层面最值得先装 OpenRice。",
        "en-US": "For dining, OpenRice is the local layer worth installing first."
      },
      "apps": [
        {
          "id": "openrice-hk",
          "name": "OpenRice",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你想先找店、看评分，再决定去哪里，就先装它。",
            "en-US": "Install this first when you want restaurant discovery before deciding where to go."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.openrice.com/en/hongkong"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖层面保留一个主力 app 就够。",
        "en-US": "One delivery default is enough here."
      },
      "apps": [
        {
          "id": "foodpanda-hk",
          "name": "foodpanda",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只装一个 delivery app，就先装它。",
            "en-US": "If you only keep one delivery app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.foodpanda.hk/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "订酒店先保留一个成熟入口。",
        "en-US": "Keep the hotel layer simple with one mature booking app."
      },
      "apps": [
        {
          "id": "trip-hk",
          "name": "Trip.com",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只保留一个住的入口，就先装它。",
            "en-US": "If you keep just one hotel app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.trip.com/hotels/"
            }
          ]
        }
      ]
    }
  ]
}
