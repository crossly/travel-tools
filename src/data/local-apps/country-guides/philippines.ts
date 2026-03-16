import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "philippines",
  "teaser": {
    "zh-CN": "菲律宾更适合先把 Grab、外卖和酒店入口准备好，城市旅行会更稳。",
    "en-US": "The Philippines becomes much easier once Grab, delivery, and hotel booking are already in place."
  },
  "intro": {
    "zh-CN": "菲律宾的 app 栈不需要太重。先把 ride、地图、购物、餐饮和酒店入口准备好，多数游客高频动作就都覆盖了。",
    "en-US": "The Philippines does not need a very heavy app stack. Once rides, maps, shopping, food, and hotel booking are ready, most common traveler actions are covered."
  },
  "highlights": {
    "zh-CN": [
      "Grab",
      "外卖",
      "酒店"
    ],
    "en-US": [
      "Grab",
      "Delivery",
      "Hotels"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果你已经装了 Grab，就尽量复用它处理 ride 和 food。",
      "酒店层先保留一个成熟入口即可，不必一开始堆太多备选。"
    ],
    "en-US": [
      "If Grab is already installed, reuse it across rides and food first.",
      "For stays, one mature booking app is enough to start with."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先保留一个你最熟的 ride 入口。",
        "en-US": "Keep the ride layer simple with the app visitors already know best."
      },
      "apps": [
        {
          "id": "grab-ph",
          "name": "Grab",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只装一个菲律宾本地 app，就先装它。",
            "en-US": "If you install one Philippines-first app, make it this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.grab.com/ph/download/"
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
          "id": "google-maps-ph",
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
        "zh-CN": "购物先保留一个服饰入口。",
        "en-US": "For shopping, keep one fashion-first app."
      },
      "apps": [
        {
          "id": "zalora-ph",
          "name": "ZALORA",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你要先补“衣”的层面，就先装它。",
            "en-US": "If fashion is the first shopping need to solve, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.zalora.com.ph/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先有一个本地发现入口。",
        "en-US": "For dining, keep one local discovery layer."
      },
      "apps": [
        {
          "id": "booky",
          "name": "Booky",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你想先看店、看餐厅信息，再决定去哪吃，就先装它。",
            "en-US": "Install it first when you want restaurant discovery before deciding where to eat."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://booky.ph/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖优先复用 Grab 或 foodpanda 之一。",
        "en-US": "Delivery is easiest when you keep just one of Grab or foodpanda."
      },
      "apps": [
        {
          "id": "foodpanda-ph",
          "name": "foodpanda",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你想把 delivery 层单独做强，就先装它。",
            "en-US": "If you want the delivery layer to be its own strong default, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.foodpanda.ph/"
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
          "id": "agoda-ph",
          "name": "Agoda",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只留一个酒店入口，就先留它。",
            "en-US": "If you keep one hotel-booking app, keep this one."
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
