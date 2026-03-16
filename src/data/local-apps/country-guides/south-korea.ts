import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "south-korea",
  "teaser": {
    "zh-CN": "韩国更值得先解决地图 app，再补叫车。游客最容易踩坑的是继续只用全球地图。",
    "en-US": "South Korea is more about solving maps first, then rides. The usual mistake is relying only on a global map app."
  },
  "intro": {
    "zh-CN": "韩国是少数需要认真换地图 app 的国家。先把本地地图装好，再补 Kakao T 叫车入口，现场体验会明显更稳。",
    "en-US": "South Korea is one of the few countries where switching map apps actually matters. Install a local map app first, then add Kakao T for rides and the day gets much easier."
  },
  "highlights": {
    "zh-CN": [
      "本地地图",
      "叫车",
      "游客避坑"
    ],
    "en-US": [
      "Local maps",
      "Ride-hailing",
      "Visitor traps"
    ]
  },
  "cautions": {
    "zh-CN": [
      "如果你只依赖 Google Maps，很容易在现场找路时掉速。",
      "先把 Naver Map 或 KakaoMap 准备好，再谈备选。"
    ],
    "en-US": [
      "If you rely only on Google Maps, you can lose time fast when navigating on the ground.",
      "Set up Naver Map or KakaoMap before worrying about secondary tools."
    ]
  },
  "categories": [
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图是韩国最关键的第一入口。",
        "en-US": "Maps are the most important first app category in South Korea."
      },
      "apps": [
        {
          "id": "naver-map",
          "name": "Naver Map",
          "summary": {
            "zh-CN": "默认首选，先装它。",
            "en-US": "Primary pick. Install this first."
          },
          "reason": {
            "zh-CN": "如果你只愿意装一个本地地图，就先装它。",
            "en-US": "If you only want one local map app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/naver-map-navigation/id311867728"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.nhn.android.nmap"
            }
          ]
        },
        {
          "id": "kakao-map",
          "name": "KakaoMap",
          "summary": {
            "zh-CN": "适合作为备选本地地图。",
            "en-US": "A solid secondary local map option."
          },
          "reason": {
            "zh-CN": "保留它能在某些地址和本地搜索场景里更从容。",
            "en-US": "Keeping it as backup helps when an address or local search behaves better here."
          },
          "recommended": false,
          "links": [
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/kakaomap-korea-no-1-map/id304608425"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=net.daum.android.map"
            }
          ]
        }
      ]
    },
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "叫车层面先补 Kakao T 就够。",
        "en-US": "For rides, Kakao T is the one to add first."
      },
      "apps": [
        {
          "id": "kakao-t",
          "name": "Kakao T",
          "summary": {
            "zh-CN": "韩国本地最值得先装的叫车入口。",
            "en-US": "The local ride app most worth setting up first."
          },
          "reason": {
            "zh-CN": "当你带行李、赶时间或夜间移动时，它会很值。",
            "en-US": "It pays off most when you have luggage, are short on time, or move late at night."
          },
          "recommended": true,
          "links": [
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/kakao-t/id981110422"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.kakao.taxi"
            }
          ]
        }
      ]
    },
    {
      "id": "shopping",
      "summary": {
        "zh-CN": "韩国买衣服更值得先装本地时尚平台。",
        "en-US": "For fashion in South Korea, local style platforms matter more than generic global shopping apps."
      },
      "apps": [
        {
          "id": "musinsa",
          "name": "MUSINSA",
          "summary": {
            "zh-CN": "默认首选，更适合作为韩国本地潮流购物入口。",
            "en-US": "Primary pick for local fashion and streetwear discovery."
          },
          "reason": {
            "zh-CN": "如果你想找“韩国本地时尚 app”，就先装它。",
            "en-US": "If you want one Korea-first fashion app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://global.musinsa.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "韩国吃喝玩乐更适合先用本地地图和餐厅发现层。",
        "en-US": "Food discovery in South Korea works best through local map-and-restaurant layers."
      },
      "apps": [
        {
          "id": "naver-map-food",
          "name": "Naver Map",
          "summary": {
            "zh-CN": "默认首选，探店和找餐厅都更实用。",
            "en-US": "Primary pick for restaurant discovery as well as navigation."
          },
          "reason": {
            "zh-CN": "在韩国，地图和探店经常就是同一个入口。",
            "en-US": "In South Korea, maps and local food discovery are often the same workflow."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://map.naver.com/"
            }
          ]
        },
        {
          "id": "catchtable",
          "name": "Catchtable",
          "summary": {
            "zh-CN": "适合想提前看热门店和订位时补充。",
            "en-US": "Useful when reservations and popular-spot planning matter."
          },
          "reason": {
            "zh-CN": "如果你很在意热门餐厅排队和订位，再补它。",
            "en-US": "Add it if you care about reservation-heavy dining plans."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.catchtable.net/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖先有一个主入口，再决定要不要补第二个。",
        "en-US": "Get one delivery default first, then decide if you need a backup."
      },
      "apps": [
        {
          "id": "baemin",
          "name": "Baemin",
          "summary": {
            "zh-CN": "默认首选，本地化最强。",
            "en-US": "Primary local pick and the strongest Korea-first default."
          },
          "reason": {
            "zh-CN": "如果你会频繁点外卖，就先装它。",
            "en-US": "If delivery matters repeatedly on the trip, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.baemin.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "订酒店更适合加一个韩国本地住宿入口。",
        "en-US": "For stays, one Korea-first booking layer is worth adding."
      },
      "apps": [
        {
          "id": "yanolja",
          "name": "Yanolja",
          "summary": {
            "zh-CN": "默认首选，本地住宿选择更直接。",
            "en-US": "Primary pick for local accommodation browsing."
          },
          "reason": {
            "zh-CN": "如果你会在韩国境内多城市移动，先看它。",
            "en-US": "If your trip moves between Korean cities, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.yanolja.com/"
            }
          ]
        }
      ]
    }
  ]
}
