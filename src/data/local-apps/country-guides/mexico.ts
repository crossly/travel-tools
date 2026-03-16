import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "mexico",
  "teaser": {
    "zh-CN": "墨西哥更适合先把打车、外卖、酒店和购物入口准备好，日常动作会更顺。",
    "en-US": "Mexico works best when rides, delivery, hotels, and shopping are already sorted before daily movement starts."
  },
  "intro": {
    "zh-CN": "墨西哥值得先把打车、地图、购物、找餐厅、外卖和酒店这几层准备好。这样从机场进城、找饭吃到临时补货和改住宿都会更顺。",
    "en-US": "Mexico is easier when rides, maps, shopping, restaurant discovery, delivery, and hotel booking are ready before you land. That smooths out airport arrivals, meal decisions, replacement shopping, and stay changes."
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
      "如果你已经准备了 Uber，可以保留它，但本地更常见的打车层也值得先装。",
      "吃的层面先把 delivery 准备好，往往比再补第二个地图 app 更值。"
    ],
    "en-US": [
      "If you already have Uber installed, keep it, but a more local-first ride layer is still worth setting up early.",
      "For food, sorting delivery early often adds more value than a second map app."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个本地强入口，再决定要不要补国际备选。",
        "en-US": "Start with one strong local ride app, then decide if an international backup is worth adding."
      },
      "apps": [
        {
          "id": "didi-mx",
          "name": "DiDi",
          "summary": {
            "zh-CN": "默认首选，更适合作为墨西哥的第一叫车入口。",
            "en-US": "Primary pick and the better first ride layer to sort in Mexico."
          },
          "reason": {
            "zh-CN": "如果你想先准备一个更本地化的打车 app，就先装它。",
            "en-US": "If you want the more local-first ride layer early, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://mexico.didiglobal.com/mx/"
            }
          ]
        },
        {
          "id": "uber-mx",
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
          "id": "google-maps-mx",
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
        "zh-CN": "买衣服和临时补货先保留一个大型本地电商入口。",
        "en-US": "For clothing and quick replacement buys, keep one large local marketplace first."
      },
      "apps": [
        {
          "id": "mercado-libre-mx",
          "name": "Mercado Libre",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你想先解决“衣”和补货层，就先装它。",
            "en-US": "If clothing and general replacement shopping are the first needs to solve, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.mercadolibre.com.mx/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个点评和订位入口。",
        "en-US": "For dining, keep one review-and-booking app first."
      },
      "apps": [
        {
          "id": "opentable-mx",
          "name": "OpenTable",
          "summary": {
            "zh-CN": "默认首选，适合先找店和看订位层。",
            "en-US": "Primary pick for restaurant discovery and booking flow."
          },
          "reason": {
            "zh-CN": "如果你想先知道哪里值得吃、能不能订位，就先看它。",
            "en-US": "If you want to know what is worth eating next and whether it can be booked, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.opentable.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖先保留一个本地强入口。",
        "en-US": "For delivery, start with one strong local default."
      },
      "apps": [
        {
          "id": "rappi-mx",
          "name": "Rappi",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你会高频点餐或买些小东西，就先装它。",
            "en-US": "If you expect repeated food or quick-item orders, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.rappi.com.mx/"
            }
          ]
        },
        {
          "id": "ubereats-mx",
          "name": "Uber Eats",
          "summary": {
            "zh-CN": "适合作为国际化备选。",
            "en-US": "A useful international backup."
          },
          "reason": {
            "zh-CN": "如果 Uber 系列已经在你的旅行栈里，就继续保留它。",
            "en-US": "Keep it if the Uber stack is already part of your broader travel flow."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.ubereats.com/mx"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "住的层面先保留一个成熟酒店入口。",
        "en-US": "For stays, start with one mature hotel-booking app."
      },
      "apps": [
        {
          "id": "booking-mx",
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
