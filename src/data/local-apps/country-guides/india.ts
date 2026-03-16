import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "india",
  "teaser": {
    "zh-CN": "印度更适合先把打车、点外卖和订酒店入口准备好，游客常见动作会轻松很多。",
    "en-US": "India gets easier fast once rides, delivery, and hotel booking are set up before the trip."
  },
  "intro": {
    "zh-CN": "印度的本地 app 层更适合围绕打车、地图、购物、餐饮和住宿来搭。先把这几层准备好，落地后的移动、吃饭和临时补货都会更顺。",
    "en-US": "India works best when the app stack is built around rides, maps, shopping, food, and stays. With those layers ready, movement, meals, and replacement shopping become much smoother on the ground."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "外卖",
      "酒店"
    ],
    "en-US": [
      "Rides",
      "Delivery",
      "Hotels"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果你已经装了 Uber，可以保留，但本地 ride 入口更值得提早准备。",
      "食和住的层面都不需要堆太多 app，一类先保留一个强入口就够。"
    ],
    "en-US": [
      "If Uber is already installed, keep it, but a local ride app is still worth setting up early.",
      "For food and stays, one strong default per category is usually enough."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先有一个本地 ride 入口。",
        "en-US": "Start with one local ride default."
      },
      "apps": [
        {
          "id": "ola",
          "name": "Ola",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只装一个印度本地打车 app，就先装它。",
            "en-US": "If you install one India-first ride app, make it this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.olacabs.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图继续保留一个主流入口即可。",
        "en-US": "The maps layer can stay on one mainstream tool."
      },
      "apps": [
        {
          "id": "google-maps-in",
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
        "zh-CN": "购物层面先保留一个服饰入口。",
        "en-US": "For shopping, one fashion-first marketplace is enough."
      },
      "apps": [
        {
          "id": "myntra",
          "name": "Myntra",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你要先解决“衣”的层面，就先装它。",
            "en-US": "If fashion is the first shopping problem to solve, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.myntra.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层面先看本地餐厅发现入口。",
        "en-US": "For dining, start with one strong local discovery layer."
      },
      "apps": [
        {
          "id": "zomato-in",
          "name": "Zomato",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你想先找店、看评价，再决定去哪吃，就先看它。",
            "en-US": "Install it first when you want ratings and restaurant discovery before deciding where to eat."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.zomato.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖层先保留一个强入口就够。",
        "en-US": "One strong delivery app is enough here."
      },
      "apps": [
        {
          "id": "swiggy",
          "name": "Swiggy",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果 delivery 会成为高频动作，就先装它。",
            "en-US": "If delivery will be a frequent need, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.swiggy.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "订酒店层保留一个成熟入口就够。",
        "en-US": "For stays, one mature booking layer is enough."
      },
      "apps": [
        {
          "id": "makemytrip",
          "name": "MakeMyTrip",
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
              "url": "https://www.makemytrip.com/hotels/"
            }
          ]
        }
      ]
    }
  ]
}
