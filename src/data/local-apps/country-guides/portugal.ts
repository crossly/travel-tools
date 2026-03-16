import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "portugal",
  "teaser": {
    "zh-CN": "葡萄牙更适合先把打车、餐厅发现、外卖和酒店入口准备好，城市内行动会更轻松。",
    "en-US": "Portugal works best when rides, restaurant discovery, delivery, and hotel booking are ready before daily city movement starts."
  },
  "intro": {
    "zh-CN": "葡萄牙的 app 栈可以保持轻量，但值得先把打车、地图、购物、找餐厅、外卖和酒店入口准备好。这样从机场到市区、找餐厅到补住宿都更顺。",
    "en-US": "Portugal can stay lean, but rides, maps, shopping, restaurant discovery, delivery, and hotel booking are worth preparing early. That keeps airport arrivals, meal choices, and stay changes much smoother."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "探店",
      "酒店"
    ],
    "en-US": [
      "Rides",
      "Food discovery",
      "Hotels"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果你的地图习惯已经固定，别为了本地化强行切换太多导航工具。",
      "葡萄牙不需要很重的购物层，先把吃和住做好更值。"
    ],
    "en-US": [
      "If your mapping flow is already stable, do not over-rotate into too many navigation apps just for localization.",
      "Portugal does not need a heavy shopping layer. Food and stays usually matter more first."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个主力入口，再决定要不要补第二个。",
        "en-US": "Keep one main ride app first, then decide if a backup is worth it."
      },
      "apps": [
        {
          "id": "bolt-pt",
          "name": "Bolt",
          "summary": {
            "zh-CN": "默认首选，更适合作为葡萄牙的第一叫车入口。",
            "en-US": "Primary pick and the best first ride layer to sort in Portugal."
          },
          "reason": {
            "zh-CN": "如果你想先装一个本地更常见的叫车 app，就先装它。",
            "en-US": "If you want the more locally common ride app first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://bolt.eu/en-pt/"
            }
          ]
        },
        {
          "id": "uber-pt",
          "name": "Uber",
          "summary": {
            "zh-CN": "适合作为国际化备选。",
            "en-US": "A useful international backup."
          },
          "reason": {
            "zh-CN": "如果 Uber 已经在你的旅行栈里，就继续保留它。",
            "en-US": "Keep it if Uber is already part of your broader travel stack."
          },
          "recommended": false,
          "links": [
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/uber-request-a-ride/id368677368"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.ubercab"
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
          "id": "google-maps-pt",
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
        "zh-CN": "买衣服先保留一个成熟时尚平台。",
        "en-US": "For fashion and basics, keep one mature shopping platform."
      },
      "apps": [
        {
          "id": "zalando-pt",
          "name": "Zalando",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只补一个“衣”的入口，就先装它。",
            "en-US": "If you add only one clothing-focused app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.zalando.pt/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个餐厅发现和订位入口。",
        "en-US": "For dining, keep one restaurant-discovery and reservation app first."
      },
      "apps": [
        {
          "id": "thefork-pt",
          "name": "TheFork",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果餐厅选择和订位更重要，就先看它。",
            "en-US": "If restaurant choice and reservations matter first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.thefork.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖保留一个本地强入口就够。",
        "en-US": "For delivery, one strong local app is enough."
      },
      "apps": [
        {
          "id": "glovo-pt",
          "name": "Glovo",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果 delivery 会变成高频动作，就先装它。",
            "en-US": "If delivery will become a repeat action on the trip, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://glovoapp.com/pt/en/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "住的层面先保留一个成熟酒店入口。",
        "en-US": "For stays, keep one mature hotel-booking app first."
      },
      "apps": [
        {
          "id": "booking-pt",
          "name": "Booking.com",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
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
