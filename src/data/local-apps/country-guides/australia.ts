import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "australia",
  "teaser": {
    "zh-CN": "澳大利亚更适合先把打车、外卖、购物和酒店入口准备好，城市旅行会顺很多。",
    "en-US": "Australia works best when rides, delivery, shopping, and hotel booking are already sorted before daily city movement starts."
  },
  "intro": {
    "zh-CN": "澳大利亚不需要很重的本地 app 栈，但值得先把打车、地图、购物、找餐厅、外卖和酒店这几层准备好。这样机场进城、找饭吃、补衣服和改住宿都会更顺。",
    "en-US": "Australia does not need a very heavy local stack, but rides, maps, shopping, restaurant discovery, delivery, and hotels are worth sorting early. That makes airport arrivals, meals, replacement shopping, and stay changes much smoother."
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
      "澳大利亚很多层面不必追求太本地化，保留你已经熟的主流 app 往往就够了。",
      "如果你只想把 app 栈做轻，先保证打车、外卖和住宿三层在线。"
    ],
    "en-US": [
      "In Australia, you do not need to localize every layer. Keeping the mainstream tools you already know is often enough.",
      "If you want the stack to stay light, make sure rides, delivery, and stays are ready first."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个全国通用主入口，再决定要不要补第二个。",
        "en-US": "Start with one nationwide ride default, then decide if a second app is worth adding."
      },
      "apps": [
        {
          "id": "uber-au",
          "name": "Uber",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你只留一个 ride app，就先留它。",
            "en-US": "If you keep one ride app, keep this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.uber.com/au/en/ride/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/uber-request-a-ride/id368677368"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.ubercab"
            }
          ]
        },
        {
          "id": "didi-au",
          "name": "DiDi",
          "summary": {
            "zh-CN": "适合作为本地备选。",
            "en-US": "A useful local backup."
          },
          "reason": {
            "zh-CN": "如果你想补第二个打车入口，再装它。",
            "en-US": "Add it when you want a second ride option in Australia."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.didiglobal.com/au-en"
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
          "id": "google-maps-au",
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
        "zh-CN": "买衣服先保留一个澳洲本地时尚入口。",
        "en-US": "For fashion and replacement shopping, keep one Australia-first platform."
      },
      "apps": [
        {
          "id": "the-iconic",
          "name": "THE ICONIC",
          "summary": {
            "zh-CN": "默认首选，更适合作为澳洲的时尚和衣物入口。",
            "en-US": "Primary pick and the stronger Australia-first fashion layer."
          },
          "reason": {
            "zh-CN": "如果你要先解决“衣”的层面，就先装它。",
            "en-US": "If fashion is the first shopping layer to solve, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.theiconic.com.au/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个订位和发现入口。",
        "en-US": "For dining, keep one discovery-and-booking app first."
      },
      "apps": [
        {
          "id": "opentable-au",
          "name": "OpenTable",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary pick."
          },
          "reason": {
            "zh-CN": "如果你更依赖找店和订位，就先装它。",
            "en-US": "If restaurant discovery and bookings matter first, start here."
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
        "zh-CN": "外卖先保留一个成熟入口即可。",
        "en-US": "For delivery, one mature default is enough."
      },
      "apps": [
        {
          "id": "menulog-au",
          "name": "Menulog",
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
              "url": "https://www.menulog.com.au/"
            }
          ]
        },
        {
          "id": "ubereats-au",
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
              "url": "https://www.ubereats.com/au"
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
          "id": "booking-au",
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
