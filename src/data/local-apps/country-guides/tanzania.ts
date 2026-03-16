import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "tanzania",
  "teaser": {
    "zh-CN": "坦桑尼亚更适合先把打车、外卖和住宿入口准备好，其他层保持轻量即可。",
    "en-US": "Tanzania works best when rides, delivery, and stays are ready first while the rest of the stack stays lighter."
  },
  "intro": {
    "zh-CN": "坦桑尼亚更适合保持一个轻量但好用的 app 栈。先把打车、地图、购物、探店、外卖和住宿准备好，机场进城、叫车和点餐都会顺很多。",
    "en-US": "Tanzania works better with a lighter but usable app stack. Once rides, maps, shopping, food discovery, delivery, and stays are ready, airport arrivals, ride calls, and meal orders become much easier."
  },
  "highlights": {
    "zh-CN": [
      "打车",
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
      "坦桑尼亚更适合先把 ride 和 delivery 层准备好。",
      "地图层继续保留你最熟悉的主流入口即可。"
    ],
    "en-US": [
      "Tanzania is usually easier when the ride and delivery layers are sorted first.",
      "For maps, the mainstream tool you already know is usually enough."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个在当地运营的主入口。",
        "en-US": "For rides, keep one active local default."
      },
      "apps": [
        {
          "id": "bolt-tz",
          "name": "Bolt",
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
              "url": "https://bolt.eu/en/"
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
        "zh-CN": "买衣服和补货先保留一个本地二手与交易入口。",
        "en-US": "For clothing and replacement shopping, keep one local marketplace first."
      },
      "apps": [
        {
          "id": "jiji-tz",
          "name": "Jiji",
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
              "url": "https://jiji.co.tz/"
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
          "id": "tripadvisor-tz",
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
        "zh-CN": "外卖先保留一个本地综合入口即可。",
        "en-US": "For delivery, one local all-in-one app is enough."
      },
      "apps": [
        {
          "id": "piki",
          "name": "Piki",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你想先把点餐和配送层准备好，就先装它。",
            "en-US": "If you want the delivery layer ready first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.piki.africa/"
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
          "id": "booking-tz",
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
