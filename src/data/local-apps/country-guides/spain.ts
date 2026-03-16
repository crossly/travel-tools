import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "spain",
  "teaser": {
    "zh-CN": "西班牙更适合先把打车、餐厅发现、外卖和酒店入口准备好，城市切换会顺很多。",
    "en-US": "Spain works best when rides, restaurant discovery, delivery, and hotel booking are ready before you start moving between cities."
  },
  "intro": {
    "zh-CN": "西班牙不需要很重的 app 栈，但值得先把打车、地图、购物、找餐厅、外卖和酒店这几层准备好。这样从机场进城、找店订位到回酒店都会更顺。",
    "en-US": "Spain does not need a very heavy app stack, but rides, maps, shopping, restaurant discovery, delivery, and hotels are worth sorting early. That makes airport arrivals, meal decisions, and hotel changes much easier on the ground."
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
      "如果你的主要问题是找店和订位，优先把餐厅发现层准备好，比多装一个地图备份更值。",
      "住和行先各保留一个主入口，别一上来装太多同类 app。"
    ],
    "en-US": [
      "If restaurant choice and bookings matter first, prioritizing the dining layer adds more value than a second map app.",
      "For rides and stays, start with one main app each before adding backups."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个本地强入口，再视情况补国际备选。",
        "en-US": "Start with one strong local ride app, then add an international backup only if needed."
      },
      "apps": [
        {
          "id": "cabify-es",
          "name": "Cabify",
          "summary": {
            "zh-CN": "默认首选，更像西班牙本地化的叫车入口。",
            "en-US": "Primary pick and the more Spain-native ride layer to sort first."
          },
          "reason": {
            "zh-CN": "如果你想先准备一个更本地化的打车 app，就先装它。",
            "en-US": "If you want the more local ride layer first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://cabify.com/es"
            }
          ]
        },
        {
          "id": "uber-es",
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
        "zh-CN": "地图层保持主流入口即可。",
        "en-US": "The maps layer can stay on the mainstream app you already know."
      },
      "apps": [
        {
          "id": "google-maps-es",
          "name": "Google Maps",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只保留一个地图 app，就先留它。",
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
        "zh-CN": "买衣服先保留一个本地百货入口。",
        "en-US": "For clothing and essentials, start with one local retail app."
      },
      "apps": [
        {
          "id": "el-corte-ingles",
          "name": "El Corte Ingles",
          "summary": {
            "zh-CN": "默认首选，衣服和临时补货都更直观。",
            "en-US": "Primary pick for clothing, basics, and general replacement shopping."
          },
          "reason": {
            "zh-CN": "如果你想要一个更“西班牙本地”的购物入口，就先装它。",
            "en-US": "If you want the more Spain-first shopping layer, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.elcorteingles.es/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个餐厅发现和订位入口。",
        "en-US": "For dining, keep one restaurant-discovery and reservation layer first."
      },
      "apps": [
        {
          "id": "thefork-es",
          "name": "TheFork",
          "summary": {
            "zh-CN": "默认首选，找店和订位都更顺。",
            "en-US": "Primary pick for restaurant discovery and reservations."
          },
          "reason": {
            "zh-CN": "如果吃饭更依赖看评分和订位，就先装它。",
            "en-US": "If ratings and reservations drive the dining plan, start here."
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
        "zh-CN": "外卖先保留一个本地强入口即可。",
        "en-US": "For delivery, one strong local app is enough."
      },
      "apps": [
        {
          "id": "glovo-es",
          "name": "Glovo",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果外卖会成为高频动作，就先装它。",
            "en-US": "If delivery will be a repeated part of the trip, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://glovoapp.com/es/"
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
          "id": "booking-es",
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
