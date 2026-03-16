import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "singapore",
  "teaser": {
    "zh-CN": "新加坡的 app 组合可以非常克制：Grab 加熟悉的地图 app 就够。",
    "en-US": "Singapore can stay lean: Grab plus the map app you already trust is usually enough."
  },
  "intro": {
    "zh-CN": "新加坡的游客端 app 选择非常清晰。大多数时候一个 Grab 解决打车，再配 Google Maps 或 Apple Maps 处理步行和地址，就足够顺手。",
    "en-US": "The tourist-facing app stack in Singapore is straightforward. Grab handles rides, and Google Maps or Apple Maps covers walking and address lookup without much extra setup."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "导航",
      "简单组合"
    ],
    "en-US": [
      "Rides",
      "Navigation",
      "Simple stack"
    ]
  },
  "cautions": {
    "zh-CN": [
      "这个国家不需要堆很多 app，少而准更好。",
      "如果你本来就熟悉 Apple Maps，完全可以把它留作备选而不是强行换工具。"
    ],
    "en-US": [
      "You do not need a long stack here. Fewer, more certain tools work better.",
      "If you already know Apple Maps well, keep it as backup rather than forcing a switch."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "Grab 是最值得先装的单一入口。",
        "en-US": "Grab is the single app most worth setting up first."
      },
      "apps": [
        {
          "id": "grab",
          "name": "Grab",
          "summary": {
            "zh-CN": "默认首选，游客使用成本最低。",
            "en-US": "Primary recommendation with the lowest setup friction for visitors."
          },
          "reason": {
            "zh-CN": "到机场或酒店前把它准备好，现场动作会更顺。",
            "en-US": "Set it up before the airport or hotel leg and the first local moves get smoother."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.grab.com/sg/download/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/grab-superapp/id647268330"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.grabtaxi.passenger"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "保留你最熟的地图 app，别为了本地化强行换。",
        "en-US": "Keep the map app you already move fastest in. No need to switch just for localization."
      },
      "apps": [
        {
          "id": "google-maps",
          "name": "Google Maps",
          "summary": {
            "zh-CN": "默认首选，跨平台最稳。",
            "en-US": "Best default and the most dependable across platforms."
          },
          "reason": {
            "zh-CN": "如果你跨 Android / iPhone 切换，它最省心。",
            "en-US": "It is the easiest default if you switch between Android and iPhone."
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
        },
        {
          "id": "apple-maps",
          "name": "Apple Maps",
          "summary": {
            "zh-CN": "iPhone 用户的轻量备选。",
            "en-US": "A light iPhone-native backup."
          },
          "reason": {
            "zh-CN": "如果你已经习惯它，不必特意换掉。",
            "en-US": "If it already fits your flow, there is no reason to force a switch."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.apple.com/maps/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/apple-maps/id915056765"
            }
          ]
        }
      ]
    },
    {
      "id": "shopping",
      "summary": {
        "zh-CN": "买衣服保持一个时尚平台就够。",
        "en-US": "For fashion, one regional platform is enough here."
      },
      "apps": [
        {
          "id": "zalora-sg",
          "name": "ZALORA",
          "summary": {
            "zh-CN": "默认首选，买衣服最省心。",
            "en-US": "Primary pick for straightforward clothing and fashion shopping."
          },
          "reason": {
            "zh-CN": "如果你只补一个“衣”的入口，就先装它。",
            "en-US": "If you add only one shopping app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.zalora.sg/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝玩乐层面先看本地餐厅发现入口。",
        "en-US": "For dining, start with the local discovery layer before you optimize the rest of the stack."
      },
      "apps": [
        {
          "id": "burpple",
          "name": "Burpple",
          "summary": {
            "zh-CN": "默认首选，更像新加坡本地探店入口。",
            "en-US": "Primary pick and the closest local food-discovery default."
          },
          "reason": {
            "zh-CN": "如果你要先找“去哪吃”，就从它开始。",
            "en-US": "If your first question is where to eat next, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.burpple.com/"
            }
          ]
        },
        {
          "id": "chope",
          "name": "Chope",
          "summary": {
            "zh-CN": "适合需要订位时补充。",
            "en-US": "Useful when reservations matter."
          },
          "reason": {
            "zh-CN": "如果你的用餐计划更偏订位，再补它。",
            "en-US": "Add it when bookings and timing matter more than discovery."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.chope.co/singapore-restaurants"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖层面优先走已经装好的 Grab。",
        "en-US": "Use the Grab stack first before adding extra delivery apps."
      },
      "apps": [
        {
          "id": "grabfood-sg",
          "name": "GrabFood",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "同一套 app 解决打车和外卖，切换最少。",
            "en-US": "The same app handles rides and delivery, which keeps the stack lighter."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.grab.com/sg/food/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "订酒店不需要太复杂，保留一个成熟入口就够。",
        "en-US": "Hotel booking can stay simple here with one mature app."
      },
      "apps": [
        {
          "id": "agoda-sg",
          "name": "Agoda",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你不想把住的层面做复杂，就先留它。",
            "en-US": "Keep this if you want the stays layer to remain simple."
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
