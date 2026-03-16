import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "south-africa",
  "teaser": {
    "zh-CN": "南非更适合先把打车、探店、外卖和购物入口准备好，城市旅行会顺很多。",
    "en-US": "South Africa works best when rides, food discovery, delivery, and shopping are ready before daily city travel starts."
  },
  "intro": {
    "zh-CN": "南非更适合围绕打车、地图、购物、探店、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找餐厅和补货都会顺很多。",
    "en-US": "South Africa works best when the app stack is built around rides, maps, shopping, food discovery, delivery, and stays. Once those layers are ready, airport arrivals, restaurant choices, and replacement shopping become much smoother."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "探店",
      "购物"
    ],
    "en-US": [
      "Rides",
      "Food discovery",
      "Shopping"
    ]
  },
  "cautions": {
    "zh-CN": [
      "南非更值得先把 ride 和 delivery 层准备好。",
      "如果你只想保留最小 app 栈，先保证打车、外卖和住宿在线。"
    ],
    "en-US": [
      "In South Africa, it is usually more valuable to sort rides and delivery first.",
      "If you want the smallest useful stack, make sure rides, delivery, and stays are ready first."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个成熟全国入口。",
        "en-US": "For rides, keep one mature nationwide default."
      },
      "apps": [
        {
          "id": "uber-za",
          "name": "Uber",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你只留一个打车入口，就先留它。",
            "en-US": "If you keep one ride app, keep this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.uber.com/za/en/ride/"
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
          "id": "takealot",
          "name": "Takealot",
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
              "url": "https://www.takealot.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个本地餐厅发现入口。",
        "en-US": "For dining, keep one local restaurant-discovery layer first."
      },
      "apps": [
        {
          "id": "dineplan",
          "name": "Dineplan",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你更依赖先找店和看订位层，就先装它。",
            "en-US": "If restaurant discovery and bookings matter first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.dineplan.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖先保留一个成熟本地入口即可。",
        "en-US": "For delivery, one mature local default is enough."
      },
      "apps": [
        {
          "id": "mr-d",
          "name": "Mr D",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果外卖会成为高频动作，就先装它。",
            "en-US": "If delivery will be frequent, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.mrdfood.com/"
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
          "id": "booking-za",
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
