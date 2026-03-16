import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "kenya",
  "teaser": {
    "zh-CN": "肯尼亚更适合先把打车、探店、外卖和住宿入口准备好，落地后的动作会快很多。",
    "en-US": "Kenya works best when rides, food discovery, delivery, and stays are sorted before you land."
  },
  "intro": {
    "zh-CN": "肯尼亚更适合围绕打车、地图、购物、探店、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找店和临时补货都会顺很多。",
    "en-US": "Kenya works best when the app stack is built around rides, maps, shopping, food discovery, delivery, and stays. Once those layers are ready, airport arrivals, restaurant choices, and replacement shopping become much smoother."
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
      "肯尼亚更值得先把 ride 和 food 层准备好。",
      "如果你只想保留最小 app 栈，先保证打车、外卖和住宿在线。"
    ],
    "en-US": [
      "In Kenya, it is usually more valuable to sort the ride and food layers first.",
      "If you want the smallest useful stack, make sure rides, delivery, and stays are ready first."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个本地强入口。",
        "en-US": "For rides, keep one strong local default."
      },
      "apps": [
        {
          "id": "bolt-ke",
          "name": "Bolt",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你只留一个打车入口，就先装它。",
            "en-US": "If you keep one ride app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://bolt.eu/en-ke/"
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
        "zh-CN": "买衣服和补货先保留一个本地大盘入口。",
        "en-US": "For clothing and replacement shopping, keep one broad local marketplace."
      },
      "apps": [
        {
          "id": "jumia-ke",
          "name": "Jumia",
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
              "url": "https://www.jumia.co.ke/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个本地餐厅发现入口。",
        "en-US": "For dining, keep one local restaurant-discovery layer first."
      },
      "apps": [
        {
          "id": "eatout-ke",
          "name": "EatOut",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你更依赖先找店和看榜单，就先装它。",
            "en-US": "If restaurant discovery and local lists matter first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://eatout.co.ke/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖先保留一个区域强入口即可。",
        "en-US": "For delivery, one strong regional app is enough."
      },
      "apps": [
        {
          "id": "glovo-ke",
          "name": "Glovo",
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
              "url": "https://glovoapp.com/ke/en/"
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
          "id": "booking-ke",
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
