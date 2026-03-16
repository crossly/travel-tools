import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "indonesia",
  "teaser": {
    "zh-CN": "印尼更适合先把打车、外卖和酒店入口装好，本地超 app 的价值会很高。",
    "en-US": "Indonesia is a strong local-super-app market, so rides, delivery, and stays are worth setting up first."
  },
  "intro": {
    "zh-CN": "印尼更适合围绕 Gojek、Google Maps、购物入口和酒店入口来搭栈。先把这几层准备好，落地后的移动、吃饭和临时补货都会更顺。",
    "en-US": "Indonesia works well around Gojek, Google Maps, one shopping marketplace, and one hotel-booking layer. With those ready, movement, meals, and replacement shopping become much easier after landing."
  },
  "highlights": {
    "zh-CN": [
      "超级 app",
      "外卖",
      "酒店"
    ],
    "en-US": [
      "Super app",
      "Delivery",
      "Hotels"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果你已经装了 Gojek，就优先复用它处理 ride 和 food 两层。",
      "住的层面 Traveloka 往往比继续找第三个备选更值。"
    ],
    "en-US": [
      "If Gojek is already installed, reuse it across rides and food before adding more apps.",
      "For stays, Traveloka often adds more value than searching for a third backup app."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先有一个本地强势入口。",
        "en-US": "Start with one strong local ride default."
      },
      "apps": [
        {
          "id": "gojek",
          "name": "Gojek",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只装一个印尼本地 app，就先装它。",
            "en-US": "If you install one Indonesia-first app, make it this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.gojek.com/id-id/"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图保持一个主流入口就够。",
        "en-US": "One mainstream map app is enough here."
      },
      "apps": [
        {
          "id": "google-maps-id",
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
        "zh-CN": "购物层面保留一个本地电商入口就够。",
        "en-US": "For shopping, one local marketplace is enough."
      },
      "apps": [
        {
          "id": "tokopedia",
          "name": "Tokopedia",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "临时补货和生活用品都更顺手。",
            "en-US": "Useful for both replacement shopping and local essentials."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.tokopedia.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖直接复用 Gojek 会更轻。",
        "en-US": "The lightest move is reusing Gojek for delivery."
      },
      "apps": [
        {
          "id": "gofood",
          "name": "GoFood",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "同一个超级 app 解决 ride 和 food，切换最少。",
            "en-US": "The same super app handles rides and food, which keeps the stack simpler."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://gofood.co.id/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "订酒店先保留一个本地强势入口。",
        "en-US": "For stays, start with one strong local booking layer."
      },
      "apps": [
        {
          "id": "traveloka-id",
          "name": "Traveloka",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只留一个酒店入口，就先装它。",
            "en-US": "If you keep one hotel-booking app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.traveloka.com/en-id/hotel"
            }
          ]
        }
      ]
    }
  ]
}
