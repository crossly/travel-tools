import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "egypt",
  "teaser": {
    "zh-CN": "埃及更适合先把打车、购物、外卖和住宿入口准备好，现场动作会顺很多。",
    "en-US": "Egypt works best when rides, shopping, delivery, and stays are sorted before you land."
  },
  "intro": {
    "zh-CN": "埃及更适合围绕打车、地图、购物、探店、外卖和住宿来搭 app 栈。先把这些层准备好，机场进城、找饭吃和补货都会顺很多。",
    "en-US": "Egypt works best when the app stack is built around rides, maps, shopping, food discovery, delivery, and stays. Once those layers are ready, airport arrivals, meals, and replacement shopping become much smoother."
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
      "埃及更值得先把 ride 和 delivery 层准备好。",
      "如果你已经熟悉 Google Maps，就继续保留它即可。"
    ],
    "en-US": [
      "In Egypt, it is usually more valuable to sort the ride and delivery layers first.",
      "If Google Maps is already your default, keep it."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个成熟国际化入口。",
        "en-US": "For rides, keep one mature international default."
      },
      "apps": [
        {
          "id": "uber-eg",
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
              "url": "https://www.uber.com/eg/en/ride/"
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
        "zh-CN": "买衣服和日用品先保留一个本地大盘入口。",
        "en-US": "For clothing and basics, keep one broad local marketplace first."
      },
      "apps": [
        {
          "id": "jumia-eg",
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
              "url": "https://www.jumia.com.eg/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝层先保留一个本地发现入口。",
        "en-US": "For dining, keep one local discovery layer first."
      },
      "apps": [
        {
          "id": "elmenus",
          "name": "elmenus",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你更依赖先找店和看菜单，就先装它。",
            "en-US": "If restaurant browsing and menu scanning matter first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://elmenus.com/"
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
          "id": "talabat-eg",
          "name": "talabat",
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
              "url": "https://www.talabat.com/egypt"
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
          "id": "booking-eg",
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
