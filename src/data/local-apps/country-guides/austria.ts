import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "austria",
  "teaser": {
    "zh-CN": "奥地利更适合先把打车、外卖和住宿入口准备好，其他层保持精简即可。",
    "en-US": "Austria works best when rides, delivery, and stays are sorted first while the rest of the stack stays restrained."
  },
  "intro": {
    "zh-CN": "奥地利的 app 栈不需要很重。先把打车、地图、购物、找餐厅、外卖和住宿准备好，机场进城、找店和临时补酒店都会顺很多。",
    "en-US": "Austria does not need a very heavy app stack. Once rides, maps, shopping, restaurant discovery, delivery, and stays are ready, airport arrivals, restaurant decisions, and hotel changes become much smoother."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "外卖",
      "住宿"
    ],
    "en-US": [
      "Rides",
      "Delivery",
      "Stays"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果你已经有熟悉的国际地图 app，就继续保留它。",
      "奥地利更适合把 app 栈做轻，先把 ride 和 delivery 准备好。"
    ],
    "en-US": [
      "If you already have a trusted global map app, keep it.",
      "Austria usually works better with a lighter stack. Sort rides and delivery first."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个本地强入口。",
        "en-US": "For rides, keep one strong local default."
      },
      "apps": [
        {
          "id": "freenow-at",
          "name": "FREENOW",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你想先准备一个更本地化的叫车入口，就先装它。",
            "en-US": "If you want the more local ride layer first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.free-now.com/at-en/"
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
        "zh-CN": "买衣服先保留一个成熟时尚入口。",
        "en-US": "For fashion and basics, keep one mature shopping platform."
      },
      "apps": [
        {
          "id": "zalando-at",
          "name": "Zalando",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你只补一个“衣”的入口，就先装它。",
            "en-US": "If you add only one clothing-focused app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://en.zalando.at/"
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
          "id": "tripadvisor-at",
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
        "zh-CN": "外卖先保留一个本地常见入口。",
        "en-US": "For delivery, keep one locally common default."
      },
      "apps": [
        {
          "id": "foodora-at",
          "name": "foodora",
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
              "url": "https://www.foodora.at/"
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
          "id": "booking-at",
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
