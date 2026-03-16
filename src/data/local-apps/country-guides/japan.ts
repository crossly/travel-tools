import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "japan",
  "teaser": {
    "zh-CN": "日本先解决叫车和导航。多数游客一套 GO + Google Maps 就够用。",
    "en-US": "In Japan, solve rides and navigation first. For most visitors, GO plus Google Maps covers the trip."
  },
  "intro": {
    "zh-CN": "日本不需要一次装太多 app。先把叫车和路线规划稳定下来，再看是否要补餐饮或票务工具。多数城市旅行里，GO、Google Maps 和 Apple Maps 已经够用。",
    "en-US": "You do not need a long app stack for Japan. Lock in rides and route planning first, then add food or booking tools only if the trip needs them. GO, Google Maps, and Apple Maps cover most city trips."
  },
  "highlights": {
    "zh-CN": [
      "叫车",
      "路线规划",
      "步行导航"
    ],
    "en-US": [
      "Taxi calls",
      "Route planning",
      "Walking directions"
    ]
  },
  "cautions": {
    "zh-CN": [
      "城市内多数时候公共交通优先，叫车更适合赶时间、下雨或带大件行李。",
      "Apple Maps 可以做备选，但 Google Maps 仍然更适合作为第一路线入口。"
    ],
    "en-US": [
      "Public transport still handles most city movement, while ride-hailing matters more in rain, with luggage, or late at night.",
      "Apple Maps is fine as backup, but Google Maps remains the stronger first route-planning choice."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "叫车场景没有中国那么频繁，但要用时最好提前装好。",
        "en-US": "You may not hail rides as often as in China, but it is better to be ready before you need one."
      },
      "apps": [
        {
          "id": "go",
          "name": "GO",
          "summary": {
            "zh-CN": "日本本地最值得先装的打车入口。",
            "en-US": "The local ride app most worth setting up first in Japan."
          },
          "reason": {
            "zh-CN": "更适合处理日本本地叫车需求。",
            "en-US": "Built around the local taxi flow you will actually use in Japan."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://go.goinc.jp/"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "路线规划优先，地图细节其次。",
        "en-US": "Route planning comes first, then local map detail."
      },
      "apps": [
        {
          "id": "google-maps",
          "name": "Google Maps",
          "summary": {
            "zh-CN": "默认首选，适合步行、换乘和地点搜索。",
            "en-US": "Primary pick for walking, transfers, and place search."
          },
          "reason": {
            "zh-CN": "如果你只装一个导航 app，就先装它。",
            "en-US": "If you only keep one navigation app, start here."
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
        },
        {
          "id": "apple-maps",
          "name": "Apple Maps",
          "summary": {
            "zh-CN": "iPhone 用户可留作备选。",
            "en-US": "A sensible backup for iPhone users."
          },
          "reason": {
            "zh-CN": "不想切 app 时，它是最顺手的备用路线入口。",
            "en-US": "It is the easiest fallback if you do not want to leave the default iPhone stack."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.apple.com/maps/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/apple-maps/id915056765"
            }
          ]
        }
      ]
    },
    {
      "id": "shopping",
      "summary": {
        "zh-CN": "日本买衣服更适合先装品牌和时尚平台，不必全靠线下现逛。",
        "en-US": "In Japan, fashion-platform and brand apps save time before you fall back to in-store browsing."
      },
      "apps": [
        {
          "id": "zozotown",
          "name": "ZOZOTOWN",
          "summary": {
            "zh-CN": "默认首选，时尚和品牌密度更高。",
            "en-US": "Primary pick for local fashion discovery and brand coverage."
          },
          "reason": {
            "zh-CN": "如果你想先看日本本地时尚平台，就从它开始。",
            "en-US": "If you want one Japan-first fashion app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://zozo.jp/"
            }
          ]
        },
        {
          "id": "uniqlo-jp",
          "name": "UNIQLO",
          "summary": {
            "zh-CN": "临时补衣服时很好用。",
            "en-US": "Useful when you need a quick clothing fallback rather than fashion discovery."
          },
          "reason": {
            "zh-CN": "缺基础衣物时，它往往是最快补位。",
            "en-US": "It is often the fastest recovery option for basics."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.uniqlo.com/jp/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃的层面先看本地评分和排队价值。",
        "en-US": "Food discovery works best with local ratings before you decide what is worth the line."
      },
      "apps": [
        {
          "id": "tabelog",
          "name": "Tabelog",
          "summary": {
            "zh-CN": "默认首选，更像日本本地的餐厅评分入口。",
            "en-US": "Primary pick and the strongest local restaurant ranking layer in Japan."
          },
          "reason": {
            "zh-CN": "如果你要找“日本版大众点评”，就先看它。",
            "en-US": "If you want the Japan-equivalent of a true local restaurant ranking app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://tabelog.com/en/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖不是所有行程都必要，但下雨、晚到或住远时很值。",
        "en-US": "Delivery is not essential for every trip, but it is valuable on rainy, late, or far-from-center nights."
      },
      "apps": [
        {
          "id": "ubereats-jp",
          "name": "Uber Eats",
          "summary": {
            "zh-CN": "默认首选，游客理解成本最低。",
            "en-US": "Primary pick with the lowest setup friction for most travelers."
          },
          "reason": {
            "zh-CN": "如果你已经在别的国家用过 Uber 系列，就继续用它。",
            "en-US": "Keep it if Uber is already part of your default stack elsewhere."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.ubereats.com/jp"
            }
          ]
        },
        {
          "id": "demae-can",
          "name": "Demae-can",
          "summary": {
            "zh-CN": "可作为本地外卖备选。",
            "en-US": "A local delivery backup worth adding later."
          },
          "reason": {
            "zh-CN": "需要第二个外卖入口时再补。",
            "en-US": "Add it only when you want a second delivery option."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://demae-can.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "订酒店更适合先用日本本地预订入口。",
        "en-US": "For stays, Japan-first booking tools are often worth checking before global hotel apps."
      },
      "apps": [
        {
          "id": "rakuten-travel",
          "name": "Rakuten Travel",
          "summary": {
            "zh-CN": "默认首选，更适合先看日本本地住宿盘子。",
            "en-US": "Primary pick for local inventory and Japan-first booking flow."
          },
          "reason": {
            "zh-CN": "如果你主要在日本境内订酒店，就先装它。",
            "en-US": "If most of your stay decisions are inside Japan, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://travel.rakuten.com/"
            }
          ]
        },
        {
          "id": "jalan",
          "name": "Jalan",
          "summary": {
            "zh-CN": "适合作为备选本地订房入口。",
            "en-US": "A strong local backup for hotel searches."
          },
          "reason": {
            "zh-CN": "想多看一个日本本地住宿平台时再补。",
            "en-US": "Add it when you want a second local hotel-search layer."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.jalan.net/en/japan_hotels_ryokan/"
            }
          ]
        }
      ]
    }
  ]
}
