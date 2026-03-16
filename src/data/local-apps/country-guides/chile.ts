import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "chile",
  "teaser": {
    "zh-CN": "智利更适合先把打车、外卖、购物和住宿入口准备好，城市内行动会顺很多。",
    "en-US": "Chile works best when rides, delivery, shopping, and stays are ready before daily city movement starts."
  },
  "intro": {
    "zh-CN": "智利更适合围绕打车、地图、购物、餐厅发现、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找吃的和补货都会顺很多。",
    "en-US": "Chile works best when the app stack is built around rides, maps, shopping, restaurant discovery, delivery, and stays. Once those layers are ready, airport arrivals, food decisions, and replacement shopping become much smoother."
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
      "如果你已经在别国用过 Uber，也可以留着，但本地 ride 层更值得先装。",
      "智利更适合先把吃和住的层准备好。"
    ],
    "en-US": [
      "If Uber is already part of your stack, you can keep it, but the more local ride layer is still worth sorting first.",
      "In Chile, it is usually more valuable to sort the food and stays layers early."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个更本地化的主入口。",
        "en-US": "For rides, keep one more local-first default."
      },
      "apps": [
        {
          "id": "cabify-cl",
          "name": "Cabify",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你想先准备一个更本地化的 ride app，就先装它。",
            "en-US": "If you want the more local-first ride app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://cabify.com/cl"
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
          "id": "mercado-libre-cl",
          "name": "Mercado Libre",
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
              "url": "https://www.mercadolibre.cl/"
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
          "id": "tripadvisor-cl",
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
        "zh-CN": "外卖先保留一个成熟主入口即可。",
        "en-US": "For delivery, one mature default is enough."
      },
      "apps": [
        {
          "id": "pedidosya-cl",
          "name": "PedidosYa",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果 delivery 会成为高频动作，就先装它。",
            "en-US": "If delivery will be frequent, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.pedidosya.com/"
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
          "id": "booking-cl",
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
