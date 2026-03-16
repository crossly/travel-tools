import type { RawLocalAppGuideDefinition } from '@/data/local-apps/types'

export const LOCAL_APP_GUIDE: RawLocalAppGuideDefinition = {
  "slug": "china",
  "teaser": {
    "zh-CN": "先把打车、地图和支付入口装好。中国大陆很多现场动作默认围绕本地 app 展开。",
    "en-US": "Sort ride-hailing, maps, and payments first. Many on-the-ground actions in mainland China assume local apps."
  },
  "intro": {
    "zh-CN": "中国大陆更适合先装一个稳定的打车 app、一个偏游客友好的地图 app，再准备支付入口。先把这三件事做完，后面的机场进城、叫车、找路和付款都会顺很多。",
    "en-US": "For mainland China, start with one dependable ride-hailing app, one visitor-friendly map app, and a payment app before you land. That covers the first wave of airport rides, directions, and checkout moments."
  },
  "highlights": {
    "zh-CN": [
      "打车",
      "地图",
      "支付"
    ],
    "en-US": [
      "Ride-hailing",
      "Maps",
      "Payments"
    ]
  },
  "cautions": {
    "zh-CN": [
      "很多商户默认扫码支付，提前准备好支付 app 会省掉很多解释成本。",
      "如果你不习惯纯中文地图，优先试 AMap Global，再保留百度地图做备选。"
    ],
    "en-US": [
      "Many merchants default to QR payments, so setting up a payment app early reduces friction.",
      "If you do not want a map app that leans fully Chinese-first, start with AMap Global and keep Baidu Maps as backup."
    ]
  },
  "categories": [
    {
      "id": "ride-hailing",
      "summary": {
        "zh-CN": "先装一个能直接叫车的入口，机场和高峰时段会最明显。",
        "en-US": "Install one direct ride-hailing option first. The benefit is largest at airports and during rush hours."
      },
      "apps": [
        {
          "id": "didi",
          "name": "DiDi",
          "summary": {
            "zh-CN": "默认首选，覆盖机场、市内和常见叫车场景。",
            "en-US": "Primary pick for airport pickups, city rides, and everyday ride-hailing in China."
          },
          "reason": {
            "zh-CN": "如果你只准备一个打车 app，就先装它。",
            "en-US": "If you only set up one ride app for China, make it this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.didiglobal.com/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/didi-china-ride-hailing/id554499054"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.sdu.didi.psnger"
            }
          ]
        }
      ]
    },
    {
      "id": "maps",
      "summary": {
        "zh-CN": "地图不要只装一个。游客友好和本地信息密度通常不是同一款。",
        "en-US": "Do not stop at one map app. Tourist-friendly UI and local data density are not always the same app."
      },
      "apps": [
        {
          "id": "amap-global",
          "name": "AMap Global",
          "summary": {
            "zh-CN": "更适合作为默认地图入口，界面对海外用户更友好。",
            "en-US": "Best default map pick for visitors because the experience is friendlier for international users."
          },
          "reason": {
            "zh-CN": "先用它处理步行、驾车和常见 POI 搜索。",
            "en-US": "Use this first for walking, driving, and common point-of-interest searches."
          },
          "recommended": true,
          "links": [
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/amap-global/id461703208"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.autonavi.minimap"
            }
          ]
        },
        {
          "id": "baidu-maps",
          "name": "Baidu Maps",
          "summary": {
            "zh-CN": "当你需要更本地化的地点信息时，用它做备选。",
            "en-US": "Keep it as backup when you need denser local place data."
          },
          "reason": {
            "zh-CN": "某些本地商户和 POI 信息会更完整。",
            "en-US": "Some local listings and POI details can be more complete here."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://map.baidu.com/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/%E7%99%BE%E5%BA%A6%E5%9C%B0%E5%9B%BE-%E8%B7%AF%E7%BA%BF%E8%A7%84%E5%88%92-%E5%87%BA%E8%A1%8C%E5%BF%85%E5%A4%87/id452186370"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.baidu.BaiduMap"
            }
          ]
        }
      ]
    },
    {
      "id": "payments",
      "summary": {
        "zh-CN": "很多线下场景最先卡住的是支付，不是语言。",
        "en-US": "Payments often break before language does in everyday offline moments."
      },
      "apps": [
        {
          "id": "alipay",
          "name": "Alipay",
          "summary": {
            "zh-CN": "更适合作为游客的第一支付入口。",
            "en-US": "Best first payment app for most visitors."
          },
          "reason": {
            "zh-CN": "先装好它，付款时会更顺。",
            "en-US": "Set this up early to avoid checkout friction."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.alipay.com/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/alipay-simplify-your-life/id333206289"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.eg.android.AlipayGphone"
            }
          ]
        },
        {
          "id": "wechat",
          "name": "WeChat",
          "summary": {
            "zh-CN": "如果同行和商家大量用微信，再补它。",
            "en-US": "Add it if your contacts or merchants lean heavily on WeChat."
          },
          "reason": {
            "zh-CN": "适合作为沟通和补充支付入口。",
            "en-US": "Useful as a communication layer and secondary payment path."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.wechat.com/"
            },
            {
              "platform": "ios",
              "url": "https://apps.apple.com/us/app/wechat/id414478124"
            },
            {
              "platform": "android",
              "url": "https://play.google.com/store/apps/details?id=com.tencent.mm"
            }
          ]
        }
      ]
    },
    {
      "id": "shopping",
      "summary": {
        "zh-CN": "买衣服和临时补货，先装电商入口比到店现找更省时间。",
        "en-US": "For clothes and quick replacement buys, shopping apps save more time than hunting in person first."
      },
      "apps": [
        {
          "id": "taobao",
          "name": "Taobao",
          "summary": {
            "zh-CN": "默认首选，买衣服和日用品都够全。",
            "en-US": "Primary pick for clothing, accessories, and general replacement shopping."
          },
          "reason": {
            "zh-CN": "如果你只装一个购物 app，就先装它。",
            "en-US": "If you only keep one shopping app in China, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.taobao.com/"
            }
          ]
        },
        {
          "id": "jd",
          "name": "JD",
          "summary": {
            "zh-CN": "适合作为次选，临时补货效率也不错。",
            "en-US": "A strong backup when you want another large, reliable shopping catalog."
          },
          "reason": {
            "zh-CN": "需要第二个购物入口时再补它。",
            "en-US": "Add it only when you want a second shopping path."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.jd.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-discovery",
      "summary": {
        "zh-CN": "吃喝玩乐最值得先看点评和团购入口。",
        "en-US": "Food discovery starts with local review and deal layers."
      },
      "apps": [
        {
          "id": "dianping",
          "name": "Dianping",
          "summary": {
            "zh-CN": "默认首选，探店、看评价、找热门餐厅都更直接。",
            "en-US": "Primary pick for ratings, neighborhood discovery, and restaurant shortlists."
          },
          "reason": {
            "zh-CN": "如果你想要“大众点评型”能力，就先用它。",
            "en-US": "If you want the closest local equivalent to a deep review-and-ranking app, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.dianping.com/"
            }
          ]
        }
      ]
    },
    {
      "id": "food-delivery",
      "summary": {
        "zh-CN": "外卖层面先有一个主力入口就够。",
        "en-US": "One strong delivery app is usually enough."
      },
      "apps": [
        {
          "id": "meituan",
          "name": "Meituan",
          "summary": {
            "zh-CN": "默认首选，外卖和本地生活都更完整。",
            "en-US": "Primary pick for food delivery and the broader local-life layer."
          },
          "reason": {
            "zh-CN": "如果你只装一个吃喝玩乐 app，就优先它。",
            "en-US": "If you only install one food-and-local-life app, make it this one."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.meituan.com/"
            }
          ]
        },
        {
          "id": "eleme",
          "name": "Ele.me",
          "summary": {
            "zh-CN": "可作为外卖备选。",
            "en-US": "A reasonable delivery backup."
          },
          "reason": {
            "zh-CN": "需要第二个外卖入口时再补。",
            "en-US": "Add it only when you want a second delivery option."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.ele.me/"
            }
          ]
        }
      ]
    },
    {
      "id": "stays",
      "summary": {
        "zh-CN": "住的层面更适合先装订酒店和连锁会员入口。",
        "en-US": "For stays, start with one booking app and one local chain option."
      },
      "apps": [
        {
          "id": "ctrip",
          "name": "Trip.com / Ctrip",
          "summary": {
            "zh-CN": "默认首选，订酒店和改订单更顺。",
            "en-US": "Primary pick for hotel booking and booking changes."
          },
          "reason": {
            "zh-CN": "如果你只想先装一个订酒店 app，就先装它。",
            "en-US": "If you only want one hotel-booking app in China, start here."
          },
          "recommended": true,
          "links": [
            {
              "platform": "official",
              "url": "https://www.trip.com/"
            }
          ]
        },
        {
          "id": "huazhu",
          "name": "Huazhu",
          "summary": {
            "zh-CN": "适合住连锁酒店较多时补充。",
            "en-US": "Useful when your trip leans heavily on local chain hotels."
          },
          "reason": {
            "zh-CN": "如果你会多次住华住系酒店，再装它。",
            "en-US": "Add it when you expect repeated stays in Huazhu properties."
          },
          "recommended": false,
          "links": [
            {
              "platform": "official",
              "url": "https://www.huazhu.com/"
            }
          ]
        }
      ]
    }
  ]
}
