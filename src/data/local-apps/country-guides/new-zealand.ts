import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "new-zealand",
  "teaser": {
    "zh-CN": "新西兰不需要很本地化的 app 栈，但把打车、探店、外卖和住宿层准备好会省很多切换成本。",
    "en-US": "New Zealand does not need a deeply local stack, but sorting rides, food discovery, delivery, and stays early removes a lot of friction."
  },
  "intro": {
    "zh-CN": "新西兰更适合保持一个轻量而稳的 app 栈。先把打车、地图、购物、探店、外卖和住宿准备好，大多数城市旅行的高频动作就都能覆盖。",
    "en-US": "New Zealand works best with a light but reliable app stack. Once rides, maps, shopping, food discovery, delivery, and stays are ready, most common city-travel actions are already covered."
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
      "新西兰很多层面不必追求更“本地”的替代，保留你已经熟的主流 app 往往更高效。",
      "如果你只想保留最小 app 栈，先保证打车、外卖和住宿在线。"
    ],
    "en-US": [
      "In New Zealand, you often do not need a more local substitute for every layer. The mainstream apps you already know are usually more efficient.",
      "If you want the smallest useful stack, make sure rides, delivery, and stays are ready first."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个全国通用主入口。",
        "en-US": "For rides, keep one nationwide default first."
      },
      "apps": [
        {
          "id": "uber-nz",
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
              "url": "https://www.uber.com/nz/en/ride/"
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
        "zh-CN": "买衣服和补货先保留一个本地购物入口。",
        "en-US": "For clothing and replacement shopping, keep one local marketplace first."
      },
      "apps": [
        {
          "id": "the-market",
          "name": "TheMarket",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你想先解决“衣”和补货层，就先装它。",
            "en-US": "If clothing and replacement shopping come first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.themarket.com/nz/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个订位和发现入口。",
        "en-US": "For dining, keep one booking-and-discovery layer first."
      },
      "apps": [
        {
          "id": "first-table",
          "name": "First Table",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你更依赖先找店和看可订时段，就先装它。",
            "en-US": "If restaurant discovery and booking slots matter first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.firsttable.co.nz/"
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
          "id": "menulog-nz",
          "name": "Menulog",
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
              "url": "https://www.menulog.co.nz/"
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
          "id": "booking-nz",
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
