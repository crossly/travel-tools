import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "cambodia",
  "teaser": {
    "zh-CN": "柬埔寨更适合先把叫车、外卖和住宿入口准备好，其他层保持轻量即可。",
    "en-US": "Cambodia works best when rides, delivery, and stays are ready first while the rest of the stack stays light."
  },
  "intro": {
    "zh-CN": "柬埔寨不需要很重的 app 栈。先把打车、地图、购物、找餐厅、外卖和住宿准备好，机场到酒店、临时补货和晚到点餐都会顺很多。",
    "en-US": "Cambodia does not need a heavy app stack. Once rides, maps, shopping, restaurant discovery, delivery, and stays are ready, airport arrivals, replacement buys, and late food orders become much easier."
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
      "柬埔寨更适合保持轻量 app 栈，先确保叫车、外卖和住宿可用。",
      "如果你已经习惯 Google Maps，就没有必要额外加很多导航备份。"
    ],
    "en-US": [
      "Cambodia is usually better with a lighter stack. Make sure rides, delivery, and stays are covered first.",
      "If Google Maps already fits your flow, there is no need to add many map backups."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "打车先保留一个区域强入口。",
        "en-US": "For rides, keep one strong regional default."
      },
      "apps": [
        {
          "id": "grab-kh",
          "name": "Grab",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你只留一个打车入口，就先装它。",
            "en-US": "If you keep one ride app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.grab.com/kh/en/"
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
        "zh-CN": "买衣服和应急补货先保留一个本地大盘入口。",
        "en-US": "For clothing and quick replacement buys, keep one broad local marketplace."
      },
      "apps": [
        {
          "id": "khmer24",
          "name": "Khmer24",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你想先解决“衣”和临时补货层，就先装它。",
            "en-US": "If clothing and replacement shopping come first, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.khmer24.com/"
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
          "id": "tripadvisor-kh",
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
        "zh-CN": "外卖先保留一个成熟入口即可。",
        "en-US": "For delivery, one mature app is enough."
      },
      "apps": [
        {
          "id": "foodpanda-kh",
          "name": "foodpanda",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果晚到、下雨或不想出门找吃的，就先装它。",
            "en-US": "If you expect late arrivals, rainy days, or nights in, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.foodpanda.com.kh/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "住宿层更适合先保留一个东南亚常用入口。",
        "en-US": "For stays, begin with one Southeast Asia-friendly hotel app."
      },
      "apps": [
        {
          "id": "agoda-kh",
          "name": "Agoda",
          "summary": {
            "zh-CN": "默认首选。",
            "en-US": "Primary."
          },
          "reason": {
            "zh-CN": "如果你只保留一个订酒店入口，就先留它。",
            "en-US": "If you keep one hotel app, keep this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.agoda.com/"
            }
          ]
        }
      ]
    }
  ]
}
