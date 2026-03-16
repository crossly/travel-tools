import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "taiwan",
  "teaser": {
    "zh-CN": "台湾先把打车、外卖和订酒店解决好，游客常见动作就覆盖得差不多了。",
    "en-US": "In Taiwan, rides, delivery, and hotel booking cover most common traveler decisions first."
  },
  "intro": {
    "zh-CN": "台湾的 app 组合更适合保持克制。先准备打车、地图、购物和外卖，再保留一个成熟的酒店入口，就足够日常旅行使用。",
    "en-US": "Taiwan works best with a restrained stack. Prepare rides, maps, shopping, and delivery first, then keep one mature hotel app for the stays layer."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "外卖",
      "购物"
    ],
    "en-US": [
      "Rides",
      "Delivery",
      "Shopping"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果你已经习惯 Google Maps，不必为了本地化额外增加太多地图工具。",
      "外卖层面 foodpanda 和 Uber Eats 二选一就够。"
    ],
    "en-US": [
      "If Google Maps already fits your flow, do not overcomplicate the maps layer.",
      "For delivery, one of foodpanda or Uber Eats is usually enough."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先保留一个游客最熟的打车入口。",
        "en-US": "Keep the ride layer simple with the app visitors already know best."
      },
      "apps": [
        {
          "id": "uber-tw",
          "name": "Uber",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你已经用惯 Uber，就继续用它。",
            "en-US": "If Uber is already in your travel stack, keep it here too."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.uber.com/global/en/cities/taipei/"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图继续保留一个主流入口就够。",
        "en-US": "One mainstream map app is enough here."
      },
      "apps": [
        {
          "id": "google-maps-tw",
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
        "zh-CN": "购物层面先保留一个本地电商入口。",
        "en-US": "For shopping, keep one Taiwan-first marketplace ready."
      },
      "apps": [
        {
          "id": "momo",
          "name": "momo",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "买衣服和生活用品都更方便。",
            "en-US": "Useful for both clothing and everyday replacement buys."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.momoshop.com.tw/main/Main.jsp"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖保留一个主力入口即可。",
        "en-US": "One delivery default is enough."
      },
      "apps": [
        {
          "id": "foodpanda-tw",
          "name": "foodpanda",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只想保留一个 delivery app，就先装它。",
            "en-US": "If you keep one delivery app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.foodpanda.com.tw/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "订酒店先保留一个成熟入口。",
        "en-US": "For stays, one mature booking app is enough."
      },
      "apps": [
        {
          "id": "agoda-tw",
          "name": "Agoda",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只留一个酒店入口，就先留它。",
            "en-US": "If you keep one hotel-booking app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.agoda.com/"
            }
          ]
        }
      ]
    }
  ]
}
