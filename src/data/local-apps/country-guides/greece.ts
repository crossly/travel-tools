import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "greece",
  "teaser": {
    "zh-CN": "希腊更适合先把打车、探店和住宿入口准备好，购物和外卖层保持轻量即可。",
    "en-US": "Greece works best when rides, food discovery, and stays are ready first while shopping and delivery stay lighter."
  },
  "intro": {
    "zh-CN": "希腊更适合保持一个轻量但可执行的 app 栈。先把打车、地图、购物、餐厅发现、外卖和住宿准备好，机场、海岛切换和餐厅选择都会顺很多。",
    "en-US": "Greece works better with a light but usable app stack. Once rides, maps, shopping, restaurant discovery, delivery, and stays are ready, airport arrivals, island transfers, and dining decisions become much easier."
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
      "如果你的行程会在多个城市或岛屿切换，先把住和吃的层准备好。",
      "地图层继续用你最熟悉的主流 app 即可。"
    ],
    "en-US": [
      "If your trip switches between cities or islands, sort the stays and food layers first.",
      "For maps, the mainstream app you already know is usually enough."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个成熟入口。",
        "en-US": "For rides, keep one mature local default."
      },
      "apps": [
        {
          "id": "freenow-gr",
          "name": "FREENOW",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你想先装一个更接近本地日常使用的打车入口，就先装它。",
            "en-US": "If you want the ride app that feels more local-first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.free-now.com/gr-en/"
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
        "zh-CN": "买衣服和临时补货先保留一个本地电商入口。",
        "en-US": "For clothing and quick replacement shopping, keep one broad local marketplace."
      },
      "apps": [
        {
          "id": "skroutz",
          "name": "Skroutz",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你想先解决“衣”和应急补货层，就先装它。",
            "en-US": "If clothing and emergency replacement shopping come first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.skroutz.gr/"
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
          "id": "tripadvisor-gr",
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
        "zh-CN": "外卖先保留一个本地强入口即可。",
        "en-US": "For delivery, one strong local app is enough."
      },
      "apps": [
        {
          "id": "efood",
          "name": "efood",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你会晚到或不想出门找吃的，就先装它。",
            "en-US": "If you expect late arrivals or nights in, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.e-food.gr/"
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
          "id": "booking-gr",
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
