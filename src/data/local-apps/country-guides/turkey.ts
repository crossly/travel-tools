import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "turkey",
  "teaser": {
    "zh-CN": "土耳其更适合先装本地打车、外卖和酒店入口，再补购物和餐厅发现。",
    "en-US": "Turkey works best when local rides, food delivery, and hotel booking are ready before you add more."
  },
  "intro": {
    "zh-CN": "土耳其更适合围绕本地 ride、地图、购物、探店、外卖和酒店入口来搭 app 栈。先把这些准备好，城市内移动和吃住的决策都会更快。",
    "en-US": "Turkey works well when the app stack is built around local rides, maps, shopping, restaurant discovery, delivery, and hotel booking. With those ready, city movement and stay decisions become much faster."
  },
  "highlights": {
    "zh-CN": [
      "本地打车",
      "外卖",
      "酒店"
    ],
    "en-US": [
      "Local rides",
      "Delivery",
      "Hotels"
    ]
  },
  "cautions": {
    "zh-CN": [
      "本地 ride 入口比继续多装一个地图 app 更值。",
      "住和食的层面都不需要一开始就堆太多备选。"
    ],
    "en-US": [
      "A local ride app adds more value than a second map app here.",
      "For food and stays, you do not need too many backups on day one."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先有一个本地 ride 入口。",
        "en-US": "Start with a local ride default."
      },
      "apps": [
        {
          "id": "bitaksi",
          "name": "BiTaksi",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只装一个土耳其本地打车 app，就先装它。",
            "en-US": "If you install one Turkey-first ride app, make it this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.bitaksi.com/en/"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图继续用熟悉的主流入口即可。",
        "en-US": "The maps layer can stay on the mainstream tool you already know."
      },
      "apps": [
        {
          "id": "google-maps-tr",
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
        "zh-CN": "购物先保留一个本地大平台。",
        "en-US": "For shopping, keep one large local marketplace."
      },
      "apps": [
        {
          "id": "trendyol",
          "name": "Trendyol",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你要先补“衣”的层面，就先装它。",
            "en-US": "If fashion is the first shopping layer to solve, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.trendyol.com/en"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖层先保留一个本地强入口。",
        "en-US": "For delivery, keep one strong local default."
      },
      "apps": [
        {
          "id": "yemeksepeti",
          "name": "Yemeksepeti",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果 delivery 是高频动作，就先装它。",
            "en-US": "If delivery will be frequent, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.yemeksepeti.com/en"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "订酒店先保留一个本地订房入口。",
        "en-US": "For stays, keep one local hotel-booking layer."
      },
      "apps": [
        {
          "id": "otelz",
          "name": "Otelz",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只留一个土耳其订酒店入口，就先装它。",
            "en-US": "If you keep one Turkey-first hotel app, make it this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.otelz.com/en"
            }
          ]
        }
      ]
    }
  ]
}
