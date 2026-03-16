import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "morocco",
  "teaser": {
    "zh-CN": "摩洛哥更适合先把打车、购物、外卖和住宿入口准备好，落地后的动作会顺很多。",
    "en-US": "Morocco works best when rides, shopping, delivery, and stays are sorted before you land."
  },
  "intro": {
    "zh-CN": "摩洛哥更适合围绕打车、地图、购物、探店、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找吃的和补货都会顺很多。",
    "en-US": "Morocco works best when the app stack is built around rides, maps, shopping, food discovery, delivery, and stays. Once those layers are ready, airport arrivals, meals, and replacement shopping become much smoother."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "购物",
      "外卖"
    ],
    "en-US": [
      "Rides",
      "Shopping",
      "Delivery"
    ]
  },
  "cautions": {
    "zh-CN": [
      "摩洛哥更值得先把 ride 和 delivery 层准备好。",
      "如果你已经习惯 Google Maps，就继续保留它即可。"
    ],
    "en-US": [
      "In Morocco, it is usually more valuable to sort the ride and delivery layers first.",
      "If Google Maps is already your default, keep it."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个本地更常见的入口。",
        "en-US": "For rides, keep one more locally common default."
      },
      "apps": [
        {
          "id": "heetch-ma",
          "name": "Heetch",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你想先装一个更接近本地日常使用的叫车入口，就先装它。",
            "en-US": "If you want the ride app that feels more local-first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.heetch.com/"
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
          "id": "jumia-ma",
          "name": "Jumia",
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
              "url": "https://www.jumia.ma/"
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
          "id": "tripadvisor-ma",
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
          "id": "glovo-ma",
          "name": "Glovo",
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
              "url": "https://glovoapp.com/en/ma/"
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
          "id": "booking-ma",
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
