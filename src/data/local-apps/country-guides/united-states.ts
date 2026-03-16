import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "united-states",
  "teaser": {
    "zh-CN": "美国不一定需要很本地化的 app 栈，但把打车、探店、外卖和酒店层先准备好会省很多切换成本。",
    "en-US": "The United States does not need a deeply local stack, but sorting rides, dining discovery, delivery, and hotels early removes a lot of friction."
  },
  "intro": {
    "zh-CN": "美国更适合保持一个轻而稳的 app 栈。先把打车、地图、购物、找餐厅、外卖和酒店层准备好，大多数城市里的高频动作就都能覆盖。",
    "en-US": "The United States works best with a light but reliable app stack. Once rides, maps, shopping, restaurant discovery, delivery, and hotels are ready, most common city-travel actions are covered."
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
      "美国很多层面不一定要追求“本地替代”，保留你已经熟悉的主流 app 往往更高效。",
      "如果你是链路型酒店用户，住的层面可以再补酒店集团 app。"
    ],
    "en-US": [
      "In the US, you often do not need a local substitute for everything. Keeping the mainstream apps you already know is usually more efficient.",
      "If your trip leans toward chain hotels, the stays layer may be worth deepening with a hotel-group app later."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个全国通用的主入口，再决定要不要补第二个。",
        "en-US": "For rides, start with one nationwide default, then decide if a second app is worth it."
      },
      "apps": [
        {
          "id": "uber-us",
          "name": "Uber",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只留一个打车 app，就先留它。",
            "en-US": "If you keep only one ride app, keep this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.uber.com/us/en/ride/"
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
        },
        {
          "id": "lyft-us",
          "name": "Lyft",
          "summary": {
            "zh-CN": "适合作为本地备选。",
            "en-US": "A useful local backup."
          },
          "reason": {
            "zh-CN": "如果你想补第二个 ride 入口，再装它。",
            "en-US": "Add it when you want a second ride option in the US."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.lyft.com/"
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
          "id": "google-maps-us",
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
        "zh-CN": "买衣服和应急补货，先保留一个大而稳的零售入口。",
        "en-US": "For clothing and emergency replacement buys, keep one broad retail app first."
      },
      "apps": [
        {
          "id": "target-us",
          "name": "Target",
          "summary": {
            "zh-CN": "默认首选，适合衣服、日用品和临时补货。",
            "en-US": "Primary pick for clothes, basics, and general replacement shopping."
          },
          "reason": {
            "zh-CN": "如果你想先解决“衣”和临时补货层，就先装它。",
            "en-US": "If clothing and quick replacement shopping come first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.target.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个本地评价和发现入口。",
        "en-US": "For dining, keep one local review-and-discovery layer first."
      },
      "apps": [
        {
          "id": "yelp-us",
          "name": "Yelp",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你更依赖看评价和区域筛店，就先装它。",
            "en-US": "If ratings, neighborhood scanning, and quick filtering matter first, start here."
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
        "en-US": "For delivery, one mature default is enough to start with."
      },
      "apps": [
        {
          "id": "doordash-us",
          "name": "DoorDash",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果外卖会成为高频动作，就先装它。",
            "en-US": "If delivery will be a repeat habit on the trip, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.doordash.com/"
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
          "id": "booking-us",
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
