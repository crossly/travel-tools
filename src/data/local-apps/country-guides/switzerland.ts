import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "switzerland",
  "teaser": {
    "zh-CN": "瑞士更适合先把打车、探店和住宿入口准备好，其他层保持克制即可。",
    "en-US": "Switzerland works best when rides, dining discovery, and stays are ready first while the rest of the stack stays restrained."
  },
  "intro": {
    "zh-CN": "瑞士不需要一个很重的本地 app 栈。先把打车、地图、购物、探店、外卖和住宿准备好，大部分游客的日常决策都能覆盖。",
    "en-US": "Switzerland does not need a very heavy local app stack. Once rides, maps, shopping, food discovery, delivery, and stays are ready, most common traveler decisions are already covered."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "探店",
      "住宿"
    ],
    "en-US": [
      "Rides",
      "Food discovery",
      "Stays"
    ]
  },
  "cautions": {
    "zh-CN": [
      "瑞士更适合保持一个轻量 app 栈，先把住和吃的层准备好。",
      "如果你已经熟悉 Google Maps，就继续留它即可。"
    ],
    "en-US": [
      "Switzerland is usually better with a lighter stack, so sort stays and food first.",
      "If Google Maps is already your default, keep it."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个国际化主入口。",
        "en-US": "For rides, keep one international default first."
      },
      "apps": [
        {
          "id": "uber-ch",
          "name": "Uber",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你只留一个打车入口，就先留它。",
            "en-US": "If you keep one ride app, keep this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.uber.com/ch/en/ride/"
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
        "zh-CN": "地图层继续保留主流入口即可。",
        "en-US": "The maps layer can stay on the mainstream tool you already know."
      },
      "apps": [
        {
          "id": "google-maps",
          "name": "Google Maps",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
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
        "zh-CN": "买衣服先保留一个成熟时尚平台。",
        "en-US": "For fashion and basics, keep one mature shopping platform."
      },
      "apps": [
        {
          "id": "zalando-ch",
          "name": "Zalando",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你只补一个“衣”的入口，就先装它。",
            "en-US": "If you add only one clothing-focused app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.zalando.ch/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个订位和发现入口。",
        "en-US": "For dining, keep one reservation-and-discovery layer first."
      },
      "apps": [
        {
          "id": "thefork-ch",
          "name": "TheFork",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你更依赖先找店和看订位层，就先用它。",
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
        "zh-CN": "外卖先保留一个成熟本地入口。",
        "en-US": "For delivery, keep one mature local default."
      },
      "apps": [
        {
          "id": "just-eat-ch",
          "name": "Just Eat",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果外卖会成为高频动作，就先装它。",
            "en-US": "If delivery will be frequent, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.just-eat.ch/en/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "住的层面先保留一个成熟酒店入口。",
        "en-US": "For stays, begin with one mature hotel-booking app."
      },
      "apps": [
        {
          "id": "booking-ch",
          "name": "Booking.com",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
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
