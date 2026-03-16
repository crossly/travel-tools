import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "canada",
  "teaser": {
    "zh-CN": "加拿大不需要很本地化的 app 栈，但把打车、探店、外卖和住宿层准备好会省很多切换成本。",
    "en-US": "Canada does not need a deeply local stack, but sorting rides, dining discovery, delivery, and stays early removes a lot of friction."
  },
  "intro": {
    "zh-CN": "加拿大更适合保持一个轻量而稳的 app 栈。先把打车、地图、购物、探店、外卖和住宿准备好，大多数城市里的高频动作就都能覆盖。",
    "en-US": "Canada works best with a light but reliable app stack. Once rides, maps, shopping, food discovery, delivery, and stays are ready, most common city-travel actions are already covered."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "探店",
      "外卖"
    ],
    "en-US": [
      "Rides",
      "Food discovery",
      "Delivery"
    ]
  },
  "cautions": {
    "zh-CN": [
      "加拿大很多层面不必追求更“本地”的替代，保留你已经熟的主流 app 往往更高效。",
      "如果你的行程以城市为主，先把外卖和住的层准备好就够了。"
    ],
    "en-US": [
      "In Canada, you often do not need a more local substitute for every layer. The mainstream apps you already know are usually efficient enough.",
      "If the trip is city-heavy, sorting delivery and stays first is usually enough."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个全国通用入口。",
        "en-US": "For rides, keep one nationwide default first."
      },
      "apps": [
        {
          "id": "uber-ca",
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
              "url": "https://www.uber.com/ca/en/ride/"
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
        "zh-CN": "买衣服和日用品先保留一个大而稳的零售入口。",
        "en-US": "For clothing and basics, keep one broad retail app first."
      },
      "apps": [
        {
          "id": "the-bay",
          "name": "Hudson's Bay",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你想先解决“衣”和日用品补货层，就先装它。",
            "en-US": "If clothing and general replacement shopping come first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.thebay.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个本地评价入口。",
        "en-US": "For dining, keep one local review layer first."
      },
      "apps": [
        {
          "id": "yelp-ca",
          "name": "Yelp",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你更依赖先看评价和区域筛店，就先装它。",
            "en-US": "If ratings and neighborhood filtering matter first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.yelp.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖先保留一个成熟主入口即可。",
        "en-US": "For delivery, one mature default is enough."
      },
      "apps": [
        {
          "id": "skip-ca",
          "name": "Skip",
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
              "url": "https://www.skipthedishes.com/"
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
          "id": "booking-ca",
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
