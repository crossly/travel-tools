import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "brazil",
  "teaser": {
    "zh-CN": "巴西更适合先把打车、外卖、酒店和购物入口准备好，落地后的动作会快很多。",
    "en-US": "Brazil works best when rides, delivery, hotel booking, and shopping are already sorted before you land."
  },
  "intro": {
    "zh-CN": "巴西的 app 栈更适合围绕打车、地图、购物、找餐厅、外卖和酒店来搭。先把这几层准备好，城市切换、找吃的和临时补货都会更顺。",
    "en-US": "Brazil works best when the app stack is built around rides, maps, shopping, restaurant discovery, delivery, and hotels. Getting those layers ready early makes city changes, meal decisions, and replacement shopping much smoother."
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
      "如果你已经有 Uber，可以继续保留，但本地 ride 层也值得先装。",
      "吃喝层不一定要拆得很重，先把探店和外卖各保留一个入口即可。"
    ],
    "en-US": [
      "If Uber is already installed, keep it, but a Brazil-first ride app is still worth sorting early.",
      "The food layer does not need to get heavy. One discovery app and one delivery app are enough to start."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个本地强入口，再决定要不要补国际备选。",
        "en-US": "Start with one strong local ride app, then decide if an international backup is worth keeping."
      },
      "apps": [
        {
          "id": "99-br",
          "name": "99",
          "summary": {
            "zh-CN": "默认首选，更适合作为巴西的第一 ride app。",
            "en-US": "Primary pick and the better first ride app to sort in Brazil."
          },
          "reason": {
            "zh-CN": "如果你想先准备一个更本地化的打车入口，就先装它。",
            "en-US": "If you want a more Brazil-first ride layer, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://99app.com/"
            }
          ]
        },
        {
          "id": "uber-br",
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
          "id": "google-maps-br",
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
        "zh-CN": "买衣服和临时补货先保留一个大型本地购物入口。",
        "en-US": "For clothing and quick replacement buys, keep one large local marketplace first."
      },
      "apps": [
        {
          "id": "mercado-livre-br",
          "name": "Mercado Livre",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你想先解决“衣”和补货层，就先装它。",
            "en-US": "If fashion and general replacement shopping come first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.mercadolivre.com.br/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个点评型发现入口。",
        "en-US": "For dining, keep one review-first discovery app."
      },
      "apps": [
        {
          "id": "tripadvisor-br",
          "name": "Tripadvisor",
          "summary": {
            "zh-CN": "默认首选，更适合作为先看评价和区域选择的入口。",
            "en-US": "Primary pick for ratings, neighborhood scanning, and shortlisting."
          },
          "reason": {
            "zh-CN": "如果你更在意先看评价和筛店，就先用它。",
            "en-US": "If ratings and filtering matter first, start here."
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
        "zh-CN": "外卖先保留一个本地强入口即可。",
        "en-US": "For delivery, one strong local app is enough."
      },
      "apps": [
        {
          "id": "ifood-br",
          "name": "iFood",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果 delivery 会成为高频动作，就先装它。",
            "en-US": "If delivery will become a repeat habit on the trip, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.ifood.com.br/"
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
          "id": "booking-br",
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
