import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "mauritius",
  "teaser": {
    "zh-CN": "毛里求斯更适合先把叫车、购物、外卖和住宿入口准备好，岛上移动会顺很多。",
    "en-US": "Mauritius works best when rides, shopping, delivery, and stays are ready before you start moving around the island."
  },
  "intro": {
    "zh-CN": "毛里求斯更适合保持一个轻量但明确的 app 栈。先把叫车、地图、购物、探店、外卖和住宿准备好，机场接送、海边酒店往返和日常找吃的都会顺很多。",
    "en-US": "Mauritius works better with a light but clear app stack. Once rides, maps, shopping, food discovery, delivery, and stays are ready, airport transfers, hotel movement, and everyday food decisions become much easier."
  },
  "highlights": {
    "zh-CN": [
      "叫车",
      "外卖",
      "住宿"
    ],
    "en-US": [
      "Rides",
      "Delivery",
      "Stays"
    ]
  },
  "cautions": {
    "zh-CN": [
      "毛里求斯更适合保持一个轻量 app 栈，先把 ride 和 delivery 层准备好。",
      "如果你已经熟悉 Google Maps，就继续保留它即可。"
    ],
    "en-US": [
      "Mauritius is usually better with a lighter stack, so sort rides and delivery first.",
      "If Google Maps already fits your flow, keep it."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个岛上本地入口。",
        "en-US": "For rides, keep one island-local default."
      },
      "apps": [
        {
          "id": "yugo-mu",
          "name": "Yugo",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你只留一个叫车入口，就先装它。",
            "en-US": "If you keep one ride app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.yugo.mu/"
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
        "zh-CN": "买衣服和日常补货先保留一个本地商业入口。",
        "en-US": "For clothing and replacement shopping, keep one local commerce app first."
      },
      "apps": [
        {
          "id": "fliqo",
          "name": "FLIQO",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你想先解决“衣”和本地购物层，就先装它。",
            "en-US": "If shopping and local commerce come first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://fliqo.site/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个评分和发现入口。",
        "en-US": "For dining, keep one ratings-and-discovery layer first."
      },
      "apps": [
        {
          "id": "tripadvisor-mu",
          "name": "Tripadvisor",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你更依赖先看评价和区域筛店，就先用它。",
            "en-US": "If ratings and neighborhood scanning matter first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.tripadvisor.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖先保留一个成熟本地入口即可。",
        "en-US": "For delivery, one mature local default is enough."
      },
      "apps": [
        {
          "id": "ordermanzer",
          "name": "OrderManzer",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你会在酒店或住处点餐，就先装它。",
            "en-US": "If you expect to order to your hotel or stay, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.ordermanzer.mu/"
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
          "id": "booking-mu",
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
