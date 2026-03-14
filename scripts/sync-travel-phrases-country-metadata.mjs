import { readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DATA_DIR = join(process.cwd(), 'src/data/travel-phrases')
const SUPPORTED_LOCALES = ['en-US', 'zh-CN']
const FEATURED_DEFAULTS = new Set([
  'japan',
  'china',
  'south-korea',
  'thailand',
  'singapore',
  'france',
  'united-arab-emirates',
])
const COUNTRY_PROFILES = {
  'argentina': {
    description: {
      'en-US': 'Travel phrases for Argentina with audio, built for SUBE transit cards, airport transfers, hotel check-ins, parrilla meals, and everyday payment questions.',
      'zh-CN': '阿根廷旅行短语卡，围绕 SUBE 交通卡、机场接驳、酒店入住、烤肉餐厅和支付沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Argentina trips where city transit, domestic flights, steakhouse meals, and cash questions can all come up quickly. These cards help when you need short Spanish for SUBE top-ups, hotel check-in, or ordering in a busy parrilla.',
      'zh-CN': '这套阿根廷短语适合那种城市交通、国内航班、烤肉餐厅和现金支付会连续出现的旅行节奏。遇到要问 SUBE 充值、酒店入住，或在热闹餐厅里快速点单时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for Argentina SUBE cards, airport rides, parrilla orders, and hotel or cafe counter conversations.',
      'zh-CN': '适合阿根廷的 SUBE、机场交通、烤肉点单和酒店或咖啡馆柜台沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for SUBE cards, airport transfers, and bus or metro questions before moving around Buenos Aires.',
        'Dining phrases are most useful in parrillas and cafes when you want to ask about cuts, set meals, or how to pay.',
        'Cash and card rules can vary, so a short Spanish question often saves time before you order or book something small.',
      ],
      'zh-CN': [
        '在布宜诺斯艾利斯行动前，最好先备好 SUBE、机场接驳，以及公交或地铁相关短语。',
        '在烤肉店和咖啡馆里，餐饮短语尤其适合用来问部位、套餐和怎么付款。',
        '现金和刷卡规则可能会有差异，所以先用一句简短西语问清楚，通常能省掉很多来回确认。',
      ],
    },
    highlights: {
      'en-US': [
        'SUBE, airport rides, and cafe stops',
        'Parrilla orders and payment questions',
        'Hotels, domestic flights, and simple directions',
      ],
      'zh-CN': [
        'SUBE、机场交通与咖啡馆沟通',
        '烤肉点单与支付询问',
        '酒店、国内航班与基础问路',
      ],
    },
    relatedSlugs: ['brazil', 'chile', 'peru'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Argentina trip?',
          'zh-CN': '第一次去阿根廷旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, dining, and hotel. That covers SUBE, airport transfers, check-in, and most first-day cafe or parrilla conversations.',
          'zh-CN': '建议先看交通、餐饮和酒店三组，基本就能覆盖 SUBE、机场接驳、入住办理，以及第一天大部分咖啡馆和烤肉店沟通。',
        },
      },
      {
        question: {
          'en-US': 'Why are short phrase cards especially useful in Argentina?',
          'zh-CN': '为什么在阿根廷旅行时，简短短语卡会特别有用？',
        },
        answer: {
          'en-US': 'Because many useful interactions are quick: transport cards, cafe counters, small payments, and straightforward food orders.',
          'zh-CN': '因为很多高频沟通都很快，比如交通卡、咖啡馆柜台、小额支付和直接点餐，提前备好一句短语会省事很多。',
        },
      },
    ],
  },
  'australia': {
    description: {
      'en-US': 'Travel phrases for Australia with audio, built for airport trains, rideshares, hotel check-ins, cafe counters, and everyday local-service conversations.',
      'zh-CN': '澳大利亚旅行短语卡，围绕机场交通、网约车、酒店入住、咖啡馆柜台和本地服务沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Australia trips where airport links, rideshares, cafe orders, and accommodation check-ins all move quickly. These cards help when you want short local wording for pickup points, takeaway coffee, or simple service questions without over-explaining.',
      'zh-CN': '这套澳大利亚短语适合那种机场接驳、网约车、咖啡点单和住宿入住节奏很快的旅行场景。遇到要确认上车点、外带咖啡，或提出简单服务需求时，短语卡会更直接。',
    },
    teaser: {
      'en-US': 'Built for Australia airport links, rideshares, cafe orders, and hotel or road-trip logistics.',
      'zh-CN': '适合澳大利亚的机场交通、网约车、咖啡点单和酒店或自驾相关沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport trains, rideshare pickup zones, and city transit before you arrive downtown.',
        'Cafe counters move fast, so short local wording helps for takeaway, milk choices, and table or receipt questions.',
        'Even in English-speaking settings, phrase cards are useful when you want a clear on-screen request for addresses or room issues.',
      ],
      'zh-CN': [
        '从机场进城前，最好先备好机场铁路、网约车上车区和市内交通相关短语。',
        '咖啡馆柜台节奏很快，外带、牛奶选择和要小票这类需求，用简短表达会更顺。',
        '即使在英语环境里，遇到地址确认或房间问题时，直接展示一条清晰请求依然很有用。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport links, rideshares, and cafe counters',
        'Hotels, road trips, and simple service requests',
        'Takeaway coffee, receipts, and local transit',
      ],
      'zh-CN': [
        '机场交通、网约车与咖啡馆柜台',
        '酒店、自驾与基础服务需求',
        '外带咖啡、小票与本地交通',
      ],
    },
    relatedSlugs: ['new-zealand', 'singapore', 'united-states'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Australia trip?',
          'zh-CN': '第一次去澳大利亚旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, rideshares, check-in, and most first-day cafe or restaurant needs.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、网约车、入住办理，以及第一天大部分咖啡馆和餐厅场景。',
        },
      },
      {
        question: {
          'en-US': 'Why keep phrase cards for Australia if the language is English?',
          'zh-CN': '既然澳大利亚讲英语，为什么还值得准备短语卡？',
        },
        answer: {
          'en-US': 'Because many travel interactions are fast and repetitive. A ready-made card is still quicker than typing or rephrasing the same request.',
          'zh-CN': '因为很多旅行沟通都很快而且重复度高，提前准备好的短语卡，往往还是会比现场打字或换说法更快。',
        },
      },
    ],
  },
  'austria': {
    description: {
      'en-US': 'Travel phrases for Austria with audio, built for OeBB trains, trams, hotel check-ins, coffeehouses, and everyday city-service questions.',
      'zh-CN': '奥地利旅行短语卡，围绕 OeBB 火车、电车、酒店入住、咖啡馆和城市服务沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Austria trips where rail platforms, tram stops, hotel counters, and coffeehouse orders can all come up in the same afternoon. These cards help when you need short German for train changes, room requests, or concise cafe conversations.',
      'zh-CN': '这套奥地利短语适合那种火车站站台、电车站、酒店前台和咖啡馆点单会连续出现的旅行节奏。遇到要问火车变更、房间需求，或者在咖啡馆里做简短沟通时，短语卡会很方便。',
    },
    teaser: {
      'en-US': 'Built for Austria OeBB trains, tram stops, coffeehouses, and hotel or museum-day logistics.',
      'zh-CN': '适合奥地利的 OeBB、电车、咖啡馆以及酒店和博物馆行程沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for OeBB platforms, tram stops, and ticket questions before moving between cities.',
        'Coffeehouse and bakery counters go smoother when you can ask for takeaway, table service, or the bill in short German.',
        'Hotel phrases help most for check-in timing, room preferences, and asking how to reach museums or old-town areas.',
      ],
      'zh-CN': [
        '如果有跨城移动，最好先备好 OeBB 站台、电车站和车票相关短语。',
        '在咖啡馆和面包店里，想问外带、堂食或要账单时，用简短德语会更顺。',
        '酒店短语最适合处理入住时间、房间偏好，以及去博物馆或老城区怎么走这类问题。',
      ],
    },
    highlights: {
      'en-US': [
        'OeBB, trams, and ticket questions',
        'Coffeehouses, bakeries, and the bill',
        'Hotels, museums, and old-town directions',
      ],
      'zh-CN': [
        'OeBB、电车与车票询问',
        '咖啡馆、面包店与要账单',
        '酒店、博物馆与老城问路',
      ],
    },
    relatedSlugs: ['germany', 'switzerland', 'italy'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Austria trip?',
          'zh-CN': '第一次去奥地利旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers OeBB, trams, check-in, and most first-day cafe or restaurant conversations.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖 OeBB、电车、入住办理，以及第一天大部分咖啡馆和餐厅沟通。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards useful in Austria even in tourist cities?',
          'zh-CN': '即使在奥地利游客很多的城市里，短语卡为什么也有用？',
        },
        answer: {
          'en-US': 'Because ticket counters, cafe orders, and hotel conversations are often short and direct. Having the phrase ready keeps things moving.',
          'zh-CN': '因为售票柜台、咖啡点单和酒店沟通通常都很简短直接，提前备好一句话会让整个过程更顺。',
        },
      },
    ],
  },
  'brazil': {
    description: {
      'en-US': 'Travel phrases for Brazil with audio, built for airport rides, Pix or card questions, hotel check-ins, beach kiosks, and everyday Portuguese service conversations.',
      'zh-CN': '巴西旅行短语卡，围绕机场交通、Pix 或刷卡、酒店入住、海滩小摊和葡语服务沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Brazil trips where airport arrivals, rideshares, beach kiosks, hotel counters, and intercity bus or flight questions come up quickly. These cards help when you need short Portuguese for payment, directions, or a simple food request.',
      'zh-CN': '这套巴西短语适合那种机场落地、网约车、海滩小摊、酒店前台，以及巴士或航班询问会快速出现的旅行节奏。遇到要问支付、方向或简单点餐时，短语卡会很实用。',
    },
    teaser: {
      'en-US': 'Built for Brazil airport rides, Pix or card questions, beach kiosks, and hotel or bus-day logistics.',
      'zh-CN': '适合巴西的机场交通、Pix 或刷卡、海滩小摊以及酒店和巴士行程沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport arrivals, rideshares, and long-distance bus or domestic flight questions.',
        'Payment phrases are especially useful because you may need to ask about Pix, cards, or cash before ordering something small.',
        'Dining phrases help at beach kiosks, cafes, and casual restaurants when you want takeaway, less ice, or a quick recommendation.',
      ],
      'zh-CN': [
        '机场落地、网约车，以及长途巴士或国内航班相关问题，最好提前备好交通短语。',
        '支付类短语尤其有用，因为很多时候你会先想确认能不能 Pix、刷卡还是现金。',
        '在海滩小摊、咖啡馆和轻松餐厅里，想外带、少冰或让对方推荐时，餐饮短语会特别好用。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport rides, Pix, and card questions',
        'Beach kiosks, takeaway, and casual dining',
        'Hotels, buses, and domestic travel basics',
      ],
      'zh-CN': [
        '机场交通、Pix 与刷卡询问',
        '海滩小摊、外带与轻餐饮',
        '酒店、巴士与国内出行基础沟通',
      ],
    },
    relatedSlugs: ['argentina', 'peru', 'colombia'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Brazil trip?',
          'zh-CN': '第一次去巴西旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport rides, check-in, payment questions, and most first-day food stops.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场交通、入住办理、支付询问，以及第一天大部分用餐场景。',
        },
      },
      {
        question: {
          'en-US': 'Why are payment phrases especially useful in Brazil?',
          'zh-CN': '为什么在巴西旅行时，支付类短语特别有用？',
        },
        answer: {
          'en-US': 'Because payment methods can vary by shop or stall. Asking first about Pix, card, or cash keeps small transactions simple.',
          'zh-CN': '因为不同店铺和摊位的支付方式可能不一样，先问清楚是 Pix、刷卡还是现金，会让很多小额消费更顺利。',
        },
      },
    ],
  },
  'cambodia': {
    description: {
      'en-US': 'Travel phrases for Cambodia with audio, built for tuk-tuks, temple visits, guesthouses, market bargaining, and everyday payment or direction questions.',
      'zh-CN': '柬埔寨旅行短语卡，围绕 tuk-tuk、寺庙参观、旅馆入住、市场砍价和支付或问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Cambodia trips where tuk-tuk rides, temple tickets, guesthouse check-ins, and market conversations all come up quickly. These cards help when you need short Khmer for directions, small payments, or simple service requests.',
      'zh-CN': '这套柬埔寨短语适合那种 tuk-tuk、寺庙门票、旅馆入住和市场沟通会快速出现的旅行节奏。遇到要问方向、小额支付或提出简单需求时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for Cambodia tuk-tuks, temple stops, guesthouses, and market or cash conversations.',
      'zh-CN': '适合柬埔寨的 tuk-tuk、寺庙、旅馆以及市场和现金沟通场景。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for tuk-tuks, bus stations, and airport pickups before you move between neighborhoods or cities.',
        'Temple and market visits go smoother when you can ask about entry, prices, or where to go next in short Khmer.',
        'Small payments still come up often, so a simple phrase card helps when you want to confirm cash, change, or the total price.',
      ],
      'zh-CN': [
        '如果要坐 tuk-tuk、去巴士站或机场接驳，最好先准备好相关交通短语。',
        '参观寺庙和逛市场时，能用几句简短高棉语问门票、价格或下一步怎么走，会顺很多。',
        '小额现金支付依然很常见，所以想确认零钱、总价或怎么付时，短语卡会特别实用。',
      ],
    },
    highlights: {
      'en-US': [
        'Tuk-tuks, temple tickets, and market basics',
        'Guesthouses, cash questions, and simple directions',
        'Airport pickups, buses, and local service requests',
      ],
      'zh-CN': [
        'tuk-tuk、寺庙门票与市场沟通',
        '旅馆、现金支付与基础问路',
        '机场接驳、巴士与本地服务请求',
      ],
    },
    relatedSlugs: ['thailand', 'vietnam', 'malaysia'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Cambodia trip?',
          'zh-CN': '第一次去柬埔寨旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and shopping. That covers tuk-tuks, guesthouse check-in, market questions, and most first-day logistics.',
          'zh-CN': '建议先看交通、酒店和购物三组，基本就能覆盖 tuk-tuk、旅馆入住、市场询问，以及第一天的大多数安排。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards especially useful in Cambodia?',
          'zh-CN': '为什么在柬埔寨旅行时，短语卡会特别有用？',
        },
        answer: {
          'en-US': 'Because many interactions are short, local, and cash-based. Having the phrase ready helps you move faster without awkward back-and-forth.',
          'zh-CN': '因为很多沟通都很短、很本地，也常常和现金有关。提前备好一句话，能让你少很多来回解释。',
        },
      },
    ],
  },
  'canada': {
    description: {
      'en-US': 'Travel phrases for Canada with audio, built for airport trains, transit passes, hotel check-ins, cafe orders, and everyday city-service conversations.',
      'zh-CN': '加拿大旅行短语卡，围绕机场铁路、交通卡、酒店入住、咖啡点单和城市服务沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Canada trips where airport links, transit passes, hotel counters, and cafe stops all happen quickly. These cards help when you need a short request for directions, room issues, or a simple order without repeating yourself.',
      'zh-CN': '这套加拿大短语适合那种机场交通、交通卡、酒店前台和咖啡馆会快速切换的旅行场景。遇到要问方向、房间问题，或提出一个简短点单需求时，短语卡会更省事。',
    },
    teaser: {
      'en-US': 'Built for Canada airport links, transit passes, cafe counters, and hotel or city-day logistics.',
      'zh-CN': '适合加拿大的机场交通、交通卡、咖啡馆柜台，以及酒店和城市行程沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport trains, buses, and local transit cards before heading into the city.',
        'Cafe and casual-dining phrases are useful for takeaway, substitutions, and quick payment or tipping questions.',
        'Even in English-speaking settings, phrase cards help when you want a fast on-screen request for addresses, room problems, or directions.',
      ],
      'zh-CN': [
        '进城前最好先备好机场铁路、巴士和本地交通卡相关短语。',
        '在咖啡馆和轻餐饮场景里，外带、替换食材、支付和小费问题都很常用。',
        '即使在英语环境里，遇到地址确认、房间问题或问路时，短语卡依然能让沟通更快。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport links, transit passes, and cafe counters',
        'Hotels, directions, and quick payment questions',
        'Takeaway orders, tipping, and city-day basics',
      ],
      'zh-CN': [
        '机场交通、交通卡与咖啡馆柜台',
        '酒店、问路与支付询问',
        '外带、小费与城市行程基础沟通',
      ],
    },
    relatedSlugs: ['united-states', 'australia', 'new-zealand'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Canada trip?',
          'zh-CN': '第一次去加拿大旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, transit, check-in, and most first-day cafe or restaurant needs.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、城市交通、入住办理，以及第一天大部分用餐场景。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards useful in Canada if the language is English?',
          'zh-CN': '既然加拿大也讲英语，为什么短语卡依然有用？',
        },
        answer: {
          'en-US': 'Because travel requests are often repetitive and time-sensitive. A ready-made phrase still speeds up counters, pickups, and hotel questions.',
          'zh-CN': '因为旅行中的需求往往很重复，而且很多时候节奏很快。提前备好的短语，照样能帮你加快柜台、上车点和酒店沟通。',
        },
      },
    ],
  },
  'chile': {
    description: {
      'en-US': 'Travel phrases for Chile with audio, built for airport buses, metro travel, hotel check-ins, cafe stops, and everyday payment or direction questions.',
      'zh-CN': '智利旅行短语卡，围绕机场巴士、地铁、酒店入住、咖啡馆和支付或问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Chile trips where airport transfers, metro rides, long-distance buses, and restaurant or cafe stops all come up quickly. These cards help when you need short Spanish for routes, payment, or a simple order.',
      'zh-CN': '这套智利短语适合那种机场接驳、地铁、长途巴士，以及餐厅或咖啡馆会快速切换的旅行节奏。遇到要问路线、支付或简短点单时，短语卡会很实用。',
    },
    teaser: {
      'en-US': 'Built for Chile airport buses, metro rides, cafe counters, and hotel or intercity travel logistics.',
      'zh-CN': '适合智利的机场巴士、地铁、咖啡馆柜台，以及酒店和跨城行程沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport buses, metro lines, and long-distance routes before you move across the city or region.',
        'Dining phrases help with set menus, seafood questions, and asking how to pay in smaller cafes or restaurants.',
        'A phrase card is especially handy when you want to confirm an address, bus stop, or the total price without a long explanation.',
      ],
      'zh-CN': [
        '如果要坐机场巴士、地铁或长途交通，最好先把相关短语准备好。',
        '在餐厅和咖啡馆里，套餐、海鲜和怎么付款这些问题都很常用。',
        '当你只想确认地址、车站或总价，不想说很多时，短语卡会特别方便。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport buses, metro rides, and route questions',
        'Cafe counters, seafood, and payment basics',
        'Hotels, addresses, and intercity travel',
      ],
      'zh-CN': [
        '机场巴士、地铁与路线询问',
        '咖啡馆、海鲜与支付基础沟通',
        '酒店、地址与跨城出行',
      ],
    },
    relatedSlugs: ['argentina', 'peru', 'colombia'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Chile trip?',
          'zh-CN': '第一次去智利旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport transfers, metro questions, check-in, and most first-day meals.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场接驳、地铁询问、入住办理，以及第一天大部分用餐场景。',
        },
      },
      {
        question: {
          'en-US': 'Why are short phrase cards useful in Chile?',
          'zh-CN': '为什么在智利旅行时，简短短语卡会很有用？',
        },
        answer: {
          'en-US': 'Because many travel moments are quick: transport choices, cafe counters, small payments, and simple direction checks.',
          'zh-CN': '因为很多场景节奏都很快，比如交通选择、咖啡馆柜台、小额支付和问方向，提前备好一句话会轻松很多。',
        },
      },
    ],
  },
  'china': {
    description: {
      'en-US': 'Travel phrases for China with audio, built for metro travel, high-speed rail, hotel check-ins, Alipay or WeChat Pay questions, and everyday local-service conversations.',
      'zh-CN': '中国旅行短语卡，围绕地铁、高铁、酒店入住、支付宝或微信支付，以及本地服务沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for China trips where metro security, high-speed rail, hotel registration, and cashless payment questions all come up quickly. These cards help when you need short Mandarin for station exits, table orders, or showing exactly what you mean on screen.',
      'zh-CN': '这套中国短语适合那种地铁安检、高铁、酒店登记和无现金支付会快速出现的旅行节奏。遇到要问出入口、餐桌点单，或者想直接在屏幕上准确表达意思时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for China metro rides, high-speed rail, hotel registration, and Alipay or WeChat Pay questions.',
      'zh-CN': '适合中国的地铁、高铁、酒店登记，以及支付宝或微信支付相关沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for metro exits, station security, and high-speed rail platforms before you start moving between cities.',
        'Payment phrases are essential because many small purchases still revolve around Alipay or WeChat Pay, even when cash is accepted.',
        'Showing the phrase card on screen is often the fastest way to handle address details, food orders, or room requests without extra typing.',
      ],
      'zh-CN': [
        '如果有地铁和高铁行程，最好先备好出入口、安检和站台相关短语。',
        '支付类短语非常重要，因为很多小额消费都会围绕支付宝或微信支付展开，即使现金也可能可以用。',
        '在地址确认、点餐和房间需求这类场景里，直接展示短语卡，通常会比现场多打一轮字更快。',
      ],
    },
    highlights: {
      'en-US': [
        'Metro exits, high-speed rail, and station basics',
        'Alipay, WeChat Pay, and small-payment questions',
        'Hotels, food orders, and exact on-screen requests',
      ],
      'zh-CN': [
        '地铁出入口、高铁与车站沟通',
        '支付宝、微信支付与小额支付询问',
        '酒店、点餐与屏幕直出需求',
      ],
    },
    relatedSlugs: ['japan', 'south-korea', 'taiwan'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first China trip?',
          'zh-CN': '第一次去中国旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers metro, high-speed rail, hotel registration, and most first-day food or payment needs.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖地铁、高铁、酒店登记，以及第一天大部分用餐和支付场景。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards especially useful in China?',
          'zh-CN': '为什么在中国旅行时，短语卡会特别有用？',
        },
        answer: {
          'en-US': 'Because many interactions depend on exact wording, exact addresses, and fast mobile-payment communication. The card makes that easier immediately.',
          'zh-CN': '因为很多沟通都依赖非常准确的说法、地址和支付信息，提前备好的短语卡能马上把这些细节说清楚。',
        },
      },
    ],
  },
  'colombia': {
    description: {
      'en-US': 'Travel phrases for Colombia with audio, built for airport rides, city transit, hotel check-ins, cafe stops, and everyday payment or direction questions.',
      'zh-CN': '哥伦比亚旅行短语卡，围绕机场交通、城市通勤、酒店入住、咖啡馆和支付或问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Colombia trips where airport pickups, city transit, coffee stops, and hotel counters come up quickly. These cards help when you need short Spanish for addresses, simple food orders, or everyday service conversations.',
      'zh-CN': '这套哥伦比亚短语适合那种机场接驳、城市交通、咖啡馆和酒店前台会快速出现的旅行节奏。遇到要确认地址、简短点单，或者处理日常服务沟通时，短语卡会很有用。',
    },
    teaser: {
      'en-US': 'Built for Colombia airport rides, city transit, coffee stops, and hotel or local-direction conversations.',
      'zh-CN': '适合哥伦比亚的机场交通、城市通勤、咖啡馆，以及酒店和本地问路沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport pickups, city buses or metro, and address checks before you move around.',
        'Cafe and dining phrases are useful for coffee orders, set lunches, and quick payment questions in smaller spots.',
        'A short phrase card helps when you want to confirm the exact destination or ask for help without a long explanation.',
      ],
      'zh-CN': [
        '机场接驳、城市公交或地铁，以及地址确认相关短语最好提前准备好。',
        '在咖啡馆和小餐馆里，咖啡点单、套餐和支付问题都很常用。',
        '如果你只想确认准确目的地或快速求助，不想解释太多，短语卡会特别方便。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport rides, city transit, and address checks',
        'Coffee orders, local lunches, and payment basics',
        'Hotels, directions, and quick service requests',
      ],
      'zh-CN': [
        '机场交通、城市通勤与地址确认',
        '咖啡点单、本地套餐与支付基础沟通',
        '酒店、问路与快速服务请求',
      ],
    },
    relatedSlugs: ['peru', 'mexico', 'costa-rica'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Colombia trip?',
          'zh-CN': '第一次去哥伦比亚旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, local transit, check-in, and most first-day food or cafe stops.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、本地交通、入住办理，以及第一天大部分用餐和咖啡场景。',
        },
      },
      {
        question: {
          'en-US': 'Why are short phrase cards useful in Colombia?',
          'zh-CN': '为什么在哥伦比亚旅行时，简短短语卡会很有用？',
        },
        answer: {
          'en-US': 'Because many useful interactions are quick and practical: rides, addresses, small meals, and simple service questions.',
          'zh-CN': '因为很多高频沟通都很实际也很快，比如交通、地址、小餐和简短服务需求，提前备好一句话会轻松很多。',
        },
      },
    ],
  },
  'costa-rica': {
    description: {
      'en-US': 'Travel phrases for Costa Rica with audio, built for shuttle pickups, hotel check-ins, soda restaurants, park tickets, and everyday travel logistics.',
      'zh-CN': '哥斯达黎加旅行短语卡，围绕接驳车、酒店入住、soda 餐馆、景区门票和日常旅行沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Costa Rica trips where airport shuttles, hotel transfers, casual restaurants, and park or activity counters all come up quickly. These cards help when you need short Spanish for pickups, food orders, or simple booking questions.',
      'zh-CN': '这套哥斯达黎加短语适合那种机场接驳、酒店交通、家常餐馆，以及公园或活动柜台会快速出现的旅行节奏。遇到要问接送、点餐或预订相关问题时，短语卡会很实用。',
    },
    teaser: {
      'en-US': 'Built for Costa Rica shuttle pickups, soda restaurants, park counters, and hotel or transfer questions.',
      'zh-CN': '适合哥斯达黎加的接驳车、soda 餐馆、公园柜台，以及酒店和交通沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for shuttle pickups, airport transfers, and longer road trips between beach or nature areas.',
        'Dining phrases help at sodas and casual restaurants when you want to ask about fresh juice, set meals, or takeaway.',
        'Booking and ticket phrases are useful for parks, tours, and hotel desks where you need a quick confirmation or timing question.',
      ],
      'zh-CN': [
        '如果有接驳车、机场接送或去海边与自然景区的长途移动，最好先备好交通短语。',
        '在 soda 和家常餐馆里，鲜榨果汁、套餐和外带问题都很常用。',
        '景区、活动和酒店柜台上，预订和门票类短语尤其适合用来快速确认时间和安排。',
      ],
    },
    highlights: {
      'en-US': [
        'Shuttle pickups, road trips, and transfers',
        'Sodas, fresh juice, and takeaway basics',
        'Park tickets, tours, and hotel questions',
      ],
      'zh-CN': [
        '接驳车、长途交通与接送',
        'soda、鲜榨果汁与外带基础沟通',
        '公园门票、活动和酒店询问',
      ],
    },
    relatedSlugs: ['mexico', 'peru', 'colombia'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Costa Rica trip?',
          'zh-CN': '第一次去哥斯达黎加旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers shuttles, check-in, casual restaurants, and most first-day planning questions.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖接驳车、入住办理、家常餐馆，以及第一天大部分安排相关问题。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards especially useful in Costa Rica?',
          'zh-CN': '为什么在哥斯达黎加旅行时，短语卡会特别有用？',
        },
        answer: {
          'en-US': 'Because many useful interactions happen around pickups, timings, and activity counters where short, clear wording matters.',
          'zh-CN': '因为很多高频沟通都和接送、时间确认以及活动柜台有关，这些场景里越短越清楚越好。',
        },
      },
    ],
  },
  'egypt': {
    description: {
      'en-US': 'Travel phrases for Egypt with audio, built for airport pickups, hotel check-ins, museum visits, cash questions, and everyday transport or dining conversations.',
      'zh-CN': '埃及旅行短语卡，围绕机场接驳、酒店入住、博物馆参观、现金支付和交通或餐饮沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Egypt trips where airport pickups, museum days, hotel counters, and transport or cash questions all come up quickly. These cards help when you need short Arabic for directions, entry, or a simple service request.',
      'zh-CN': '这套埃及短语适合那种机场接驳、博物馆日程、酒店前台，以及交通和现金支付会快速出现的旅行节奏。遇到要问方向、门票，或提出简单需求时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for Egypt airport pickups, museum stops, hotel counters, and transport or cash conversations.',
      'zh-CN': '适合埃及的机场接驳、博物馆、酒店柜台，以及交通和现金沟通场景。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport pickups, taxis, and day-trip departures before you start moving around Cairo or beyond.',
        'Cash questions still matter in many travel moments, so short Arabic helps when you want to confirm the total price or change.',
        'Museum and dining phrases are useful for tickets, water, simple meal orders, and asking where to go next.',
      ],
      'zh-CN': [
        '如果有机场接驳、出租车或一日游出发安排，最好先备好交通短语。',
        '很多场景仍然会涉及现金问题，所以想确认总价或找零时，简短阿语会很有用。',
        '博物馆和餐饮类短语适合处理门票、买水、简短点餐，以及问下一步往哪走。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport pickups, taxis, and cash questions',
        'Museums, tickets, and simple directions',
        'Hotels, water, and short meal orders',
      ],
      'zh-CN': [
        '机场接驳、出租车与现金询问',
        '博物馆、门票与基础问路',
        '酒店、买水与简短点餐',
      ],
    },
    relatedSlugs: ['morocco', 'turkey', 'united-arab-emirates'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Egypt trip?',
          'zh-CN': '第一次去埃及旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and shopping. That covers airport pickups, hotel counters, cash questions, and many first-day needs in Egypt.',
          'zh-CN': '建议先看交通、酒店和购物三组，基本就能覆盖机场接驳、酒店前台、现金问题，以及在埃及第一天的大多数需求。',
        },
      },
      {
        question: {
          'en-US': 'Why are short phrase cards useful in Egypt?',
          'zh-CN': '为什么在埃及旅行时，简短短语卡会很有用？',
        },
        answer: {
          'en-US': 'Because many useful interactions happen in fast, practical settings like transport, tickets, cash payments, and quick directions.',
          'zh-CN': '因为很多高频沟通都发生在非常实际又很快的场景里，比如交通、门票、现金支付和问方向。',
        },
      },
    ],
  },
  'greece': {
    description: {
      'en-US': 'Travel phrases for Greece with audio, built for ferries, hotel check-ins, tavernas, island transfers, and everyday payment or direction questions.',
      'zh-CN': '希腊旅行短语卡，围绕渡轮、酒店入住、taverna 餐馆、岛屿交通和支付或问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Greece trips where ferry schedules, island transfers, hotel counters, and taverna meals all come up quickly. These cards help when you need short Greek for tickets, directions, or simple dining requests.',
      'zh-CN': '这套希腊短语适合那种渡轮时刻、岛屿交通、酒店柜台和 taverna 餐馆会快速出现的旅行节奏。遇到要问票务、方向或简短点餐需求时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for Greece ferries, island transfers, tavernas, and hotel or ticket-counter conversations.',
      'zh-CN': '适合希腊的渡轮、岛屿交通、taverna，以及酒店和售票柜台沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for ferry terminals, island transfers, and ticket counters before you move between stops.',
        'Dining phrases are most useful in tavernas when you want to ask about seafood, house specialties, or how to split and pay.',
        'A short phrase card helps with hotel timing, luggage questions, and asking how to reach beaches or old-town areas.',
      ],
      'zh-CN': [
        '如果要坐渡轮和换岛，最好先把码头、转乘和售票柜台相关短语准备好。',
        '在 taverna 里，想问海鲜、招牌菜，或者怎么分开结账时，餐饮短语特别实用。',
        '酒店时间、行李问题，以及怎么去海滩或老城区这类需求，用简短短语卡会更顺。',
      ],
    },
    highlights: {
      'en-US': [
        'Ferries, island transfers, and ticket counters',
        'Tavernas, seafood, and payment basics',
        'Hotels, beaches, and old-town directions',
      ],
      'zh-CN': [
        '渡轮、岛屿交通与售票柜台',
        'taverna、海鲜与支付基础沟通',
        '酒店、海滩与老城问路',
      ],
    },
    relatedSlugs: ['italy', 'turkey', 'france'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Greece trip?',
          'zh-CN': '第一次去希腊旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers ferries, check-in, tavernas, and most first-day island or city logistics.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖渡轮、入住办理、taverna，以及第一天大部分岛上或城市行程安排。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards useful in Greece?',
          'zh-CN': '为什么在希腊旅行时，短语卡会很有用？',
        },
        answer: {
          'en-US': 'Because many useful interactions happen at ports, counters, and casual restaurants where short, clear wording matters.',
          'zh-CN': '因为很多高频沟通都发生在港口、柜台和轻松餐馆里，这些场景里越短越清楚越好。',
        },
      },
    ],
  },
  'india': {
    description: {
      'en-US': 'Travel phrases for India with audio, built for airport pickups, train platforms, hotel check-ins, food orders, and everyday payment or direction questions.',
      'zh-CN': '印度旅行短语卡，围绕机场接驳、火车站台、酒店入住、点餐和支付或问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for India trips where airport transfers, station platforms, hotel counters, and restaurant or market conversations all move quickly. These cards help when you need short Hindi for routes, room requests, or simple food and payment questions.',
      'zh-CN': '这套印度短语适合那种机场接驳、火车站台、酒店前台，以及餐厅和市场沟通节奏都很快的旅行场景。遇到要问路线、房间需求，或简短餐饮和支付问题时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for India airport transfers, train platforms, hotel counters, and dining or market conversations.',
      'zh-CN': '适合印度的机场接驳、火车站台、酒店柜台，以及餐饮和市场沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport pickups, train platforms, and station changes before long travel days.',
        'Dining phrases are especially useful when you want to ask about spice, filtered water, or whether a meal is vegetarian.',
        'Hotel and payment phrases help with check-in timing, room issues, and small purchases where you want to confirm the total clearly.',
      ],
      'zh-CN': [
        '如果有机场接驳和火车出行，最好先备好站台、换站和上车相关短语。',
        '餐饮短语尤其适合用来说明辣度、过滤水，以及菜品是否是素食。',
        '酒店和支付类短语则更适合处理入住时间、房间问题和小额消费总价确认。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport pickups, train platforms, and routes',
        'Spice, vegetarian meals, and water questions',
        'Hotels, payments, and practical service requests',
      ],
      'zh-CN': [
        '机场接驳、火车站台与路线询问',
        '辣度、素食与饮水问题',
        '酒店、支付与实用服务请求',
      ],
    },
    relatedSlugs: ['turkey', 'united-arab-emirates', 'singapore'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first India trip?',
          'zh-CN': '第一次去印度旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, train platforms, check-in, and most first-day food questions.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、火车站台、入住办理，以及第一天大部分饮食相关问题。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards especially useful in India?',
          'zh-CN': '为什么在印度旅行时，短语卡会特别有用？',
        },
        answer: {
          'en-US': 'Because many practical travel moments depend on short, exact requests around transport, food preferences, and service details.',
          'zh-CN': '因为很多高频场景都依赖简短而准确的表达，比如交通、饮食偏好和服务细节，提前备好会轻松很多。',
        },
      },
    ],
  },
  'indonesia': {
    description: {
      'en-US': 'Travel phrases for Indonesia with audio, built for Grab or Gojek rides, ferries, hotel check-ins, warung orders, and everyday payment or direction questions.',
      'zh-CN': '印度尼西亚旅行短语卡，围绕 Grab 或 Gojek、渡轮、酒店入住、warung 点单和支付或问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Indonesia trips where airport pickups, scooters or ride apps, ferries, hotel counters, and casual food stops all come up quickly. These cards help when you need short Indonesian for directions, meals, or simple travel logistics.',
      'zh-CN': '这套印度尼西亚短语适合那种机场接驳、网约车或摩托、渡轮、酒店柜台和随手吃饭场景会快速切换的旅行节奏。遇到要问方向、点餐或处理简单出行安排时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for Indonesia ride apps, ferries, warungs, and hotel or island-transfer conversations.',
      'zh-CN': '适合印度尼西亚的网约车、渡轮、warung，以及酒店和岛屿交通沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for Grab or Gojek pickups, ferry terminals, and airport transfers before moving between islands or neighborhoods.',
        'Dining phrases are most useful in warungs and casual restaurants when you want less spicy food, takeaway, or simple ingredient checks.',
        'Payment and direction questions still come up often, so a phrase card helps when the setting is noisy or the route is unclear.',
      ],
      'zh-CN': [
        '如果要坐 Grab 或 Gojek、去码头或机场接驳，最好先把相关交通短语准备好。',
        '在 warung 和轻松餐馆里，少辣、外带和简单食材确认这类需求最常用。',
        '支付和问路问题也很高频，所以环境嘈杂或路线不清楚时，短语卡会特别方便。',
      ],
    },
    highlights: {
      'en-US': [
        'Grab, Gojek, ferries, and transfers',
        'Warungs, spice requests, and takeaway',
        'Hotels, payment questions, and directions',
      ],
      'zh-CN': [
        'Grab、Gojek、渡轮与接驳',
        'warung、辣度需求与外带',
        '酒店、支付与问路沟通',
      ],
    },
    relatedSlugs: ['malaysia', 'singapore', 'thailand'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Indonesia trip?',
          'zh-CN': '第一次去印度尼西亚旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, dining, and hotel. That covers ride apps, ferries, check-in, and most first-day food or transfer needs.',
          'zh-CN': '建议先看交通、餐饮和酒店三组，基本就能覆盖网约车、渡轮、入住办理，以及第一天大部分用餐和转移场景。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards useful in Indonesia?',
          'zh-CN': '为什么在印度尼西亚旅行时，短语卡会很有用？',
        },
        answer: {
          'en-US': 'Because many interactions are quick, practical, and noisy. Short written phrases make transport and food conversations much easier.',
          'zh-CN': '因为很多沟通都很快、很实用，而且环境可能比较嘈杂。提前准备好的短语，会让交通和点餐沟通顺很多。',
        },
      },
    ],
  },
  'kenya': {
    description: {
      'en-US': 'Travel phrases for Kenya with audio, built for airport pickups, ride apps, lodge check-ins, park days, and everyday payment or direction questions.',
      'zh-CN': '肯尼亚旅行短语卡，围绕机场接驳、网约车、营地入住、公园行程和支付或问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Kenya trips where airport pickups, lodge transfers, city rides, and safari or park questions all come up quickly. These cards help when you need short local wording for timing, directions, or simple meal and service requests.',
      'zh-CN': '这套肯尼亚短语适合那种机场接驳、营地交通、市内出行，以及 safari 或公园行程会快速出现的旅行节奏。遇到要问时间、方向，或提出简短餐饮和服务需求时，短语卡会很实用。',
    },
    teaser: {
      'en-US': 'Built for Kenya airport pickups, lodge transfers, park days, and simple city or payment conversations.',
      'zh-CN': '适合肯尼亚的机场接驳、营地交通、公园日程，以及简单城市和支付沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport pickups, ride apps, and longer transfers to lodges or park gates.',
        'Hotel and lodge phrases help most with check-in timing, meal schedules, and asking what is included.',
        'Payment and direction cards are useful when you want to confirm the price, the route, or the exact pickup point quickly.',
      ],
      'zh-CN': [
        '如果有机场接驳、网约车和去营地或公园门口的长途交通，最好先备好相关短语。',
        '酒店和营地短语尤其适合处理入住时间、用餐安排和包含内容这类问题。',
        '支付和方向卡则适合用来快速确认价格、路线或准确上车点。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport pickups, ride apps, and lodge transfers',
        'Park days, meal schedules, and what is included',
        'Payments, routes, and quick service requests',
      ],
      'zh-CN': [
        '机场接驳、网约车与营地交通',
        '公园日程、用餐安排与包含内容',
        '支付、路线与快速服务请求',
      ],
    },
    relatedSlugs: ['tanzania', 'mauritius', 'south-africa'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Kenya trip?',
          'zh-CN': '第一次去肯尼亚旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, lodge check-in, meal planning, and many first-day logistics.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、营地入住、用餐安排，以及第一天的大多数行程细节。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards useful in Kenya?',
          'zh-CN': '为什么在肯尼亚旅行时，短语卡会很有用？',
        },
        answer: {
          'en-US': 'Because many useful travel interactions depend on exact timing, pickup points, and practical service details.',
          'zh-CN': '因为很多高频沟通都和准确时间、上车点和实际服务细节有关，提前备好的短语能减少很多确认成本。',
        },
      },
    ],
  },
  'mauritius': {
    description: {
      'en-US': 'Travel phrases for Mauritius with audio, built for airport transfers, beach hotels, market stops, cafe counters, and everyday payment or direction questions.',
      'zh-CN': '毛里求斯旅行短语卡，围绕机场接驳、海边酒店、市场、咖啡馆和支付或问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Mauritius trips where airport pickups, beach-hotel check-ins, market stops, and day-trip planning all come up quickly. These cards help when you need short local wording for transport, food, or a simple service request.',
      'zh-CN': '这套毛里求斯短语适合那种机场接驳、海边酒店入住、市场停留和一日游安排会快速出现的旅行节奏。遇到要问交通、点餐，或提出一个简单需求时，短语卡会很方便。',
    },
    teaser: {
      'en-US': 'Built for Mauritius airport transfers, beach hotels, market stops, and cafe or payment conversations.',
      'zh-CN': '适合毛里求斯的机场接驳、海边酒店、市场，以及咖啡馆和支付沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport pickups, hotel transfers, and day-trip departures before you head around the island.',
        'Dining and cafe phrases are useful for simple orders, takeaway, and asking what is available near beach areas.',
        'Payment and direction questions come up often in smaller shops and markets, so a phrase card helps keep things quick and clear.',
      ],
      'zh-CN': [
        '如果有机场接驳、酒店接送和一日游出发安排，最好先把相关交通短语准备好。',
        '在海边一带，点餐、外带以及问附近有什么可选项时，餐饮和咖啡馆短语很有用。',
        '在小店和市场里，支付和问路类问题很常见，所以短语卡会让沟通更快更清楚。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport transfers, beach hotels, and day trips',
        'Market stops, small shops, and payment basics',
        'Cafe counters, takeaway, and simple directions',
      ],
      'zh-CN': [
        '机场接驳、海边酒店与一日游',
        '市场、小店与支付基础沟通',
        '咖啡馆柜台、外带与基础问路',
      ],
    },
    relatedSlugs: ['south-africa', 'kenya', 'tanzania'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Mauritius trip?',
          'zh-CN': '第一次去毛里求斯旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, beach-hotel check-in, and most first-day food or transfer questions.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、海边酒店入住，以及第一天大部分用餐和转移安排。',
        },
      },
      {
        question: {
          'en-US': 'Why are short phrase cards useful in Mauritius?',
          'zh-CN': '为什么在毛里求斯旅行时，简短短语卡会很有用？',
        },
        answer: {
          'en-US': 'Because many practical interactions are small and fast: pickups, directions, cafe counters, and simple shop payments.',
          'zh-CN': '因为很多高频沟通都很小也很快，比如接送、问路、咖啡馆柜台和小店付款，提前备好一句话会轻松很多。',
        },
      },
    ],
  },
  'mexico': {
    description: {
      'en-US': 'Travel phrases for Mexico with audio, built for airport transfers, metro or ADO buses, hotel check-ins, taco or cafe orders, and everyday payment questions.',
      'zh-CN': '墨西哥旅行短语卡，围绕机场接驳、地铁或 ADO 巴士、酒店入住、taco 或咖啡点单，以及支付沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Mexico trips where airport rides, metro or bus terminals, hotel counters, and casual food stops all come up quickly. These cards help when you need short Spanish for routes, food preferences, or a simple service request.',
      'zh-CN': '这套墨西哥短语适合那种机场接驳、地铁或巴士站、酒店柜台和轻松餐饮会快速切换的旅行节奏。遇到要问路线、饮食偏好或提出简单服务需求时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for Mexico airport transfers, metro or ADO routes, tacos, cafes, and hotel or payment conversations.',
      'zh-CN': '适合墨西哥的机场接驳、地铁或 ADO 路线、taco、咖啡馆，以及酒店和支付沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport pickups, metro lines, and ADO bus terminals before longer travel days.',
        'Dining phrases are especially useful for tacos, sauces, takeaway, and simple ingredient or spice questions.',
        'Payment and hotel phrases help when you want to confirm card acceptance, the room setup, or the exact pickup address.',
      ],
      'zh-CN': [
        '如果有机场接驳、地铁和 ADO 巴士行程，最好先把相关交通短语备好。',
        '在 taco 店和轻餐场景里，酱料、外带和食材或辣度问题都很常用。',
        '支付和酒店类短语则适合用来确认能否刷卡、房间安排，以及准确上车地址。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport transfers, metro, and ADO routes',
        'Tacos, sauces, and takeaway basics',
        'Hotels, card questions, and pickup addresses',
      ],
      'zh-CN': [
        '机场接驳、地铁与 ADO 路线',
        'taco、酱料与外带基础沟通',
        '酒店、刷卡询问与上车地址',
      ],
    },
    relatedSlugs: ['costa-rica', 'peru', 'colombia'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Mexico trip?',
          'zh-CN': '第一次去墨西哥旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, metro or bus routes, check-in, and most first-day food stops.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、地铁或巴士路线、入住办理，以及第一天大部分用餐场景。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards especially useful in Mexico?',
          'zh-CN': '为什么在墨西哥旅行时，短语卡会特别有用？',
        },
        answer: {
          'en-US': 'Because transport, food, and payment conversations are often quick and practical. A short phrase lets you move through them faster.',
          'zh-CN': '因为交通、点餐和支付类沟通通常都很快也很实际，提前备好一句短语会让这些场景顺很多。',
        },
      },
    ],
  },
  'morocco': {
    description: {
      'en-US': 'Travel phrases for Morocco with audio, built for medina directions, riad check-ins, taxis, souk shopping, and everyday dining or payment questions.',
      'zh-CN': '摩洛哥旅行短语卡，围绕 medina 问路、riad 入住、出租车、souk 市场购物，以及餐饮和支付沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Morocco trips where taxis, riad arrivals, souk shopping, and restaurant or tea-stop conversations can all happen fast. These cards help when you need short Arabic for directions, prices, or a simple service request.',
      'zh-CN': '这套摩洛哥短语适合那种出租车、riad 入住、souq 购物，以及餐厅或喝茶场景会快速出现的旅行节奏。遇到要问方向、价格或提出简单服务需求时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for Morocco medinas, riads, taxis, souks, and short dining or payment conversations.',
      'zh-CN': '适合摩洛哥的 medina、riad、出租车、souq，以及简短餐饮和支付沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep direction phrases ready for medinas, riads, and taxi drop-off points because many routes are easier to show than explain.',
        'Shopping phrases help most in souks when you want to ask the price, confirm what is included, or say you are only looking.',
        'Dining and payment cards are useful for tea, tagines, cash questions, and simple requests in smaller local spots.',
      ],
      'zh-CN': [
        '在 medina、riad 和出租车下车点这类场景里，方向类短语最好提前准备好，因为很多路比解释更适合直接展示。',
        '在 souq 里，购物短语尤其适合问价格、确认包含什么，或者表达自己只是先看看。',
        '喝茶、tagine、现金支付和小店简短需求这些场景里，餐饮和支付卡会非常好用。',
      ],
    },
    highlights: {
      'en-US': [
        'Medina directions, riads, and taxi drop-offs',
        'Souk prices, browsing, and payment basics',
        'Tea stops, tagines, and local service requests',
      ],
      'zh-CN': [
        'medina 问路、riad 与出租车下车点',
        'souq 价格、逛店与支付基础沟通',
        '喝茶、tagine 与本地服务请求',
      ],
    },
    relatedSlugs: ['egypt', 'spain', 'france'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Morocco trip?',
          'zh-CN': '第一次去摩洛哥旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, shopping, and hotel. That covers taxis, medina directions, riad check-in, and many first-day souk conversations.',
          'zh-CN': '建议先看交通、购物和酒店三组，基本就能覆盖出租车、medina 问路、riad 入住，以及第一天很多 souq 场景。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards especially useful in Morocco?',
          'zh-CN': '为什么在摩洛哥旅行时，短语卡会特别有用？',
        },
        answer: {
          'en-US': 'Because many useful interactions revolve around directions, prices, and short local conversations where direct wording matters.',
          'zh-CN': '因为很多高频沟通都围绕方向、价格和本地简短对话展开，这些场景里越直接越清楚越好。',
        },
      },
    ],
  },
  'netherlands': {
    description: {
      'en-US': 'Travel phrases for Netherlands with audio, built for OV-chipkaart travel, trains, bike directions, hotel check-ins, and everyday cafe or payment conversations.',
      'zh-CN': '荷兰旅行短语卡，围绕 OV-chipkaart、火车、自行车路线、酒店入住，以及咖啡馆和支付沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Netherlands trips where train platforms, trams, bike lanes, hotel counters, and cafe stops all come up quickly. These cards help when you need short Dutch for routes, tickets, or a simple food and service request.',
      'zh-CN': '这套荷兰短语适合那种火车站台、电车、自行车路线、酒店前台和咖啡馆会快速出现的旅行节奏。遇到要问路线、车票，或提出简短点餐和服务需求时，短语卡会很有用。',
    },
    teaser: {
      'en-US': 'Built for Netherlands OV-chipkaart travel, trains, bike directions, and hotel or cafe conversations.',
      'zh-CN': '适合荷兰的 OV-chipkaart、火车、自行车路线，以及酒店和咖啡馆沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for OV-chipkaart, train platforms, and tram stops before you move between stations or cities.',
        'Direction phrases are useful for bike lanes, canals, museums, and addresses because routes can look similar at first glance.',
        'Cafe and hotel phrases help with takeaway, breakfast questions, and simple room or timing requests.',
      ],
      'zh-CN': [
        '如果要用 OV-chipkaart、火车和电车，最好先把相关交通短语准备好。',
        '自行车道、运河、博物馆和地址这类场景里，方向短语特别有用，因为路线一开始很容易看混。',
        '在咖啡馆和酒店里，外带、早餐和简短房间需求都很常用。',
      ],
    },
    highlights: {
      'en-US': [
        'OV-chipkaart, trains, and tram stops',
        'Bike directions, canals, and museum routes',
        'Hotels, breakfast, and takeaway basics',
      ],
      'zh-CN': [
        'OV-chipkaart、火车与电车站',
        '自行车路线、运河与博物馆路线',
        '酒店、早餐与外带基础沟通',
      ],
    },
    relatedSlugs: ['germany', 'france', 'switzerland'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Netherlands trip?',
          'zh-CN': '第一次去荷兰旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers OV-chipkaart, trains, check-in, and most first-day cafe or city needs.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖 OV-chipkaart、火车、入住办理，以及第一天大部分咖啡馆和城市沟通需求。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards useful in Netherlands tourist cities?',
          'zh-CN': '为什么在荷兰热门城市里，短语卡依然有用？',
        },
        answer: {
          'en-US': 'Because transport and direction conversations move quickly, and a short phrase is often faster than explaining the whole route.',
          'zh-CN': '因为交通和路线沟通通常节奏很快，很多时候一句短语会比把整条路线解释一遍更有效。',
        },
      },
    ],
  },
  'new-zealand': {
    description: {
      'en-US': 'Travel phrases for New Zealand with audio, built for airport shuttles, intercity buses, ferries, hotel or holiday-park check-ins, and cafe conversations.',
      'zh-CN': '新西兰旅行短语卡，围绕机场接驳、城际巴士、渡轮、酒店或 holiday park 入住，以及咖啡馆沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for New Zealand trips where airport shuttles, intercity transport, holiday-park check-ins, and cafe stops all come up quickly. These cards help when you need short local wording for routes, bookings, or simple food and service requests.',
      'zh-CN': '这套新西兰短语适合那种机场接驳、城际交通、holiday park 入住和咖啡馆停留会快速出现的旅行节奏。遇到要问路线、预订，或提出简短餐饮和服务需求时，短语卡会很实用。',
    },
    teaser: {
      'en-US': 'Built for New Zealand airport shuttles, intercity buses, ferries, and hotel or holiday-park conversations.',
      'zh-CN': '适合新西兰的机场接驳、城际巴士、渡轮，以及酒店和 holiday park 沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport shuttles, intercity buses, ferries, and longer road-trip stops.',
        'Accommodation phrases help most with check-in timing, parking, kitchen access, and simple room or cabin requests.',
        'Cafe cards are useful for takeaway coffee, breakfast questions, and quick directions in smaller towns or stops.',
      ],
      'zh-CN': [
        '如果有机场接驳、城际巴士、渡轮或长途自驾停靠，最好先把相关交通短语备好。',
        '住宿类短语尤其适合处理入住时间、停车、厨房使用和房间或 cabin 需求。',
        '在小镇和休息点里，外带咖啡、早餐和简短问路这类咖啡馆短语也很实用。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport shuttles, intercity buses, and ferries',
        'Hotels, holiday parks, and parking questions',
        'Cafe stops, breakfast, and small-town directions',
      ],
      'zh-CN': [
        '机场接驳、城际巴士与渡轮',
        '酒店、holiday park 与停车问题',
        '咖啡馆停靠、早餐与小镇问路',
      ],
    },
    relatedSlugs: ['australia', 'canada', 'united-states'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first New Zealand trip?',
          'zh-CN': '第一次去新西兰旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, intercity travel, accommodation check-in, and most first-day food or cafe stops.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、城际交通、住宿入住，以及第一天大部分用餐和咖啡馆场景。',
        },
      },
      {
        question: {
          'en-US': 'Why keep phrase cards for New Zealand if the language is English?',
          'zh-CN': '既然新西兰讲英语，为什么还值得准备短语卡？',
        },
        answer: {
          'en-US': 'Because travel logistics still repeat constantly. A ready-made phrase is faster for shuttles, check-in, parking, and food counters.',
          'zh-CN': '因为很多旅行安排依然会重复出现，接驳、入住、停车和柜台点餐这些场景里，提前备好的短语依然会更快。',
        },
      },
    ],
  },
  'peru': {
    description: {
      'en-US': 'Travel phrases for Peru with audio, built for airport rides, long-distance transport, hotel check-ins, market stops, and everyday dining or direction questions.',
      'zh-CN': '秘鲁旅行短语卡，围绕机场交通、长途出行、酒店入住、市场停留，以及餐饮和问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Peru trips where airport pickups, bus or rail connections, hotel counters, and market or restaurant conversations all come up quickly. These cards help when you need short Spanish for routes, food, or simple travel logistics.',
      'zh-CN': '这套秘鲁短语适合那种机场接驳、巴士或铁路换乘、酒店前台，以及市场和餐厅沟通会快速出现的旅行节奏。遇到要问路线、点餐或处理简单行程安排时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for Peru airport rides, longer transport days, market stops, and hotel or dining conversations.',
      'zh-CN': '适合秘鲁的机场交通、长途出行、市场停留，以及酒店和餐饮沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport pickups, bus terminals, rail tickets, and early departures before longer travel days.',
        'Dining phrases are especially useful for menu questions, soup or set meals, and asking for bottled water or less spice.',
        'Market and hotel cards help when you want to confirm the total price, ask for directions, or solve a simple room issue quickly.',
      ],
      'zh-CN': [
        '如果有机场接驳、巴士站、火车票和早班出发安排，最好先把相关交通短语备好。',
        '在餐厅里，菜单、汤或套餐，以及瓶装水和少辣这类问题都很常用。',
        '市场和酒店短语则适合快速确认总价、问方向或解决简短房间问题。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport rides, buses, and rail connections',
        'Market prices, set meals, and bottled water',
        'Hotels, directions, and quick service requests',
      ],
      'zh-CN': [
        '机场交通、巴士与铁路换乘',
        '市场价格、套餐与瓶装水',
        '酒店、问路与快速服务请求',
      ],
    },
    relatedSlugs: ['chile', 'argentina', 'colombia'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Peru trip?',
          'zh-CN': '第一次去秘鲁旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, longer travel connections, check-in, and most first-day meals.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、长途换乘、入住办理，以及第一天大部分用餐场景。',
        },
      },
      {
        question: {
          'en-US': 'Why are short phrase cards useful in Peru?',
          'zh-CN': '为什么在秘鲁旅行时，简短短语卡会很有用？',
        },
        answer: {
          'en-US': 'Because transport, market, and food conversations are often fast and practical. Having a short phrase ready reduces confusion immediately.',
          'zh-CN': '因为交通、市场和点餐类沟通常常都很快也很实际，提前备好一句话能立刻减少很多误会。',
        },
      },
    ],
  },
  'philippines': {
    description: {
      'en-US': 'Travel phrases for Philippines with audio, built for airport pickups, island ferries, hotel check-ins, mall or food-court stops, and everyday local-service questions.',
      'zh-CN': '菲律宾旅行短语卡，围绕机场接驳、岛屿渡轮、酒店入住、商场或食阁停留，以及本地服务沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Philippines trips where airport rides, ferry terminals, hotel counters, and food-court or market conversations all happen quickly. These cards help when you need short local wording for transport, simple food orders, or service requests.',
      'zh-CN': '这套菲律宾短语适合那种机场接驳、渡轮码头、酒店前台，以及食阁和市场沟通会快速出现的旅行节奏。遇到要问交通、简短点餐或服务请求时，短语卡会很实用。',
    },
    teaser: {
      'en-US': 'Built for Philippines airport rides, island ferries, food courts, and hotel or mall conversations.',
      'zh-CN': '适合菲律宾的机场交通、岛屿渡轮、食阁，以及酒店和商场沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport pickups, ferries, and longer island transfers before you start moving around.',
        'Dining phrases help in food courts and casual spots when you want takeaway, less ice, or a simple menu explanation.',
        'Even where English is common, a phrase card still helps for addresses, pickup points, and quick service requests.',
      ],
      'zh-CN': [
        '如果有机场接驳、渡轮和岛屿交通，最好先把相关短语备好。',
        '在食阁和轻松餐饮场景里，外带、少冰和简单菜单说明都很常用。',
        '即使很多地方英语通行，遇到地址确认、上车点和快速服务请求时，短语卡依然很好用。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport rides, ferries, and island transfers',
        'Food courts, takeaway, and menu basics',
        'Hotels, addresses, and quick service requests',
      ],
      'zh-CN': [
        '机场交通、渡轮与岛屿交通',
        '食阁、外带与菜单基础沟通',
        '酒店、地址与快速服务请求',
      ],
    },
    relatedSlugs: ['singapore', 'malaysia', 'thailand'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Philippines trip?',
          'zh-CN': '第一次去菲律宾旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, ferries, check-in, and most first-day food or transfer needs.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、渡轮、入住办理，以及第一天大部分用餐和转移场景。',
        },
      },
      {
        question: {
          'en-US': 'Why keep phrase cards for Philippines if English is common?',
          'zh-CN': '既然菲律宾英语很常见，为什么还值得准备短语卡？',
        },
        answer: {
          'en-US': 'Because travel logistics still move quickly. A ready-made phrase is often faster for transport, counters, and exact destination questions.',
          'zh-CN': '因为很多旅行安排节奏依然很快，在交通、柜台和准确目的地确认这类场景里，提前备好的短语往往还是更快。',
        },
      },
    ],
  },
  'south-africa': {
    description: {
      'en-US': 'Travel phrases for South Africa with audio, built for airport pickups, rideshares, hotel or lodge check-ins, restaurant stops, and everyday payment or direction questions.',
      'zh-CN': '南非旅行短语卡，围绕机场接驳、网约车、酒店或 lodge 入住、餐厅停留，以及支付和问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for South Africa trips where airport pickups, rideshares, lodge check-ins, and restaurant or tour-day conversations all happen quickly. These cards help when you need short local wording for addresses, timing, or simple service requests.',
      'zh-CN': '这套南非短语适合那种机场接驳、网约车、lodge 入住，以及餐厅和一日游沟通会快速出现的旅行节奏。遇到要问地址、时间或简短服务需求时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for South Africa airport pickups, rideshares, lodge check-ins, and restaurant or tour-day conversations.',
      'zh-CN': '适合南非的机场接驳、网约车、lodge 入住，以及餐厅和一日游沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport pickups, rideshares, and longer transfers to hotels or lodges.',
        'Restaurant cards help with quick orders, payment questions, and asking what is included before a longer outing.',
        'Even in English-speaking settings, phrase cards help when you want a clear on-screen address, pickup point, or service request.',
      ],
      'zh-CN': [
        '如果有机场接驳、网约车以及去酒店或 lodge 的长距离交通，最好先备好相关短语。',
        '在餐厅里，快速点单、支付问题，以及出发前确认包含什么内容，这类餐饮卡都很好用。',
        '即使是英语环境，遇到地址、上车点和服务请求这类场景时，清晰的屏幕短语依然很有帮助。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport pickups, rideshares, and lodge transfers',
        'Restaurants, payments, and tour-day basics',
        'Hotels, addresses, and simple service requests',
      ],
      'zh-CN': [
        '机场接驳、网约车与 lodge 交通',
        '餐厅、支付与一日游基础沟通',
        '酒店、地址与简单服务请求',
      ],
    },
    relatedSlugs: ['kenya', 'tanzania', 'mauritius'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first South Africa trip?',
          'zh-CN': '第一次去南非旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, lodge or hotel check-in, and most first-day food or transfer needs.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、酒店或 lodge 入住，以及第一天大部分用餐和转移场景。',
        },
      },
      {
        question: {
          'en-US': 'Why keep phrase cards for South Africa if English is common?',
          'zh-CN': '既然南非英语很常见，为什么还值得准备短语卡？',
        },
        answer: {
          'en-US': 'Because travel logistics still repeat constantly. A ready-made phrase keeps pickups, counters, and service requests moving faster.',
          'zh-CN': '因为很多旅行安排依然会不断重复，提前备好的短语能让接驳、柜台和服务请求处理得更快。',
        },
      },
    ],
  },
  'switzerland': {
    description: {
      'en-US': 'Travel phrases for Switzerland with audio, built for SBB trains, mountain transport, hotel check-ins, bakeries, and everyday ticket or direction questions.',
      'zh-CN': '瑞士旅行短语卡，围绕 SBB 火车、山地交通、酒店入住、面包店，以及票务和问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Switzerland trips where SBB platforms, mountain lifts, hotel counters, and bakery or cafe stops can all happen in one day. These cards help when you need short German for routes, passes, or a simple meal and service request.',
      'zh-CN': '这套瑞士短语适合那种 SBB 站台、山地缆车、酒店前台和面包店或咖啡馆会在一天里连续出现的旅行节奏。遇到要问路线、通票，或提出简短餐饮和服务需求时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for Switzerland SBB trains, mountain transport, bakeries, and hotel or ticket-counter conversations.',
      'zh-CN': '适合瑞士的 SBB、山地交通、面包店，以及酒店和售票柜台沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for SBB platforms, mountain rail or lift tickets, and route changes before longer travel days.',
        'Bakery and cafe cards are useful for takeaway, breakfast, and quick snack orders between trains or sightseeing stops.',
        'Hotel and pass questions matter because many days involve exact timing, storage, or knowing what a ticket already covers.',
      ],
      'zh-CN': [
        '如果有 SBB、山地火车或缆车行程，最好先把站台、票务和路线变更相关短语准备好。',
        '在火车和景点之间，面包店和咖啡馆里的外带、早餐和简短点心需求都很常见。',
        '酒店和通票问题也很重要，因为很多行程都依赖准确时间、行李寄存，以及确认票已经包含什么。',
      ],
    },
    highlights: {
      'en-US': [
        'SBB trains, mountain transport, and route changes',
        'Bakeries, breakfast, and quick takeaway orders',
        'Hotels, passes, and timing questions',
      ],
      'zh-CN': [
        'SBB、山地交通与路线变更',
        '面包店、早餐与快速外带',
        '酒店、通票与时间询问',
      ],
    },
    relatedSlugs: ['germany', 'austria', 'france'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Switzerland trip?',
          'zh-CN': '第一次去瑞士旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers SBB, mountain routes, check-in, and most first-day bakery or restaurant needs.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖 SBB、山地路线、入住办理，以及第一天大部分面包店和餐厅场景。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards useful in Switzerland?',
          'zh-CN': '为什么在瑞士旅行时，短语卡会很有用？',
        },
        answer: {
          'en-US': 'Because many travel days depend on exact transport details, ticket coverage, and fast counter conversations.',
          'zh-CN': '因为很多瑞士行程都依赖非常准确的交通细节、票务覆盖范围，以及节奏很快的柜台沟通。',
        },
      },
    ],
  },
  'tanzania': {
    description: {
      'en-US': 'Travel phrases for Tanzania with audio, built for airport pickups, ferries, lodge check-ins, safari days, and everyday payment or direction questions.',
      'zh-CN': '坦桑尼亚旅行短语卡，围绕机场接驳、渡轮、营地入住、safari 日程，以及支付和问路等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Tanzania trips where airport pickups, ferry terminals, lodge transfers, and safari or beach-day plans all come up quickly. These cards help when you need short Swahili for timing, directions, or simple food and service requests.',
      'zh-CN': '这套坦桑尼亚短语适合那种机场接驳、渡轮码头、营地交通，以及 safari 或海边日程会快速出现的旅行节奏。遇到要问时间、方向，或提出简短餐饮和服务需求时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for Tanzania airport pickups, ferries, safari or beach days, and lodge or payment conversations.',
      'zh-CN': '适合坦桑尼亚的机场接驳、渡轮、safari 或海边日程，以及营地和支付沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport pickups, ferries, and longer lodge or island transfers before you start moving around.',
        'Meal and service phrases help most with lodge timing, water, simple food requests, and what is included in a plan.',
        'Payment and direction cards are useful when you want to confirm the total, the pickup point, or how to reach the next stop quickly.',
      ],
      'zh-CN': [
        '如果有机场接驳、渡轮和去营地或岛上的长途交通，最好先把相关短语准备好。',
        '在营地里，用餐时间、饮水、简短点餐和确认包含什么内容，这些短语都很高频。',
        '支付和方向卡则适合快速确认总价、上车点，以及下一站怎么走。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport pickups, ferries, and lodge transfers',
        'Safari or beach days, water, and meal timing',
        'Payments, directions, and pickup-point basics',
      ],
      'zh-CN': [
        '机场接驳、渡轮与营地交通',
        'safari 或海边日程、饮水与用餐时间',
        '支付、问路与上车点基础沟通',
      ],
    },
    relatedSlugs: ['kenya', 'mauritius', 'south-africa'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Tanzania trip?',
          'zh-CN': '第一次去坦桑尼亚旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, lodge check-in, ferry questions, and many first-day logistics.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、营地入住、渡轮询问，以及第一天的大多数安排。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards useful in Tanzania?',
          'zh-CN': '为什么在坦桑尼亚旅行时，短语卡会很有用？',
        },
        answer: {
          'en-US': 'Because many useful interactions depend on exact timing, transfers, and practical service details around lodges and travel days.',
          'zh-CN': '因为很多高频沟通都和准确时间、转移安排，以及营地和出行日里的实际服务细节有关。',
        },
      },
    ],
  },
  'turkey': {
    description: {
      'en-US': 'Travel phrases for Turkey with audio, built for airport transfers, Istanbulkart travel, hotel check-ins, bazaars, and everyday dining or payment questions.',
      'zh-CN': '土耳其旅行短语卡，围绕机场接驳、Istanbulkart、酒店入住、市场，以及餐饮和支付沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for Turkey trips where airport rides, ferries or trams, hotel counters, bazaars, and tea or kebab stops all come up quickly. These cards help when you need short Turkish for directions, prices, or a simple service request.',
      'zh-CN': '这套土耳其短语适合那种机场交通、渡轮或电车、酒店前台、市场，以及茶馆和烤肉场景会快速出现的旅行节奏。遇到要问方向、价格或提出简单服务需求时，短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for Turkey airport rides, Istanbulkart travel, bazaars, and hotel or dining conversations.',
      'zh-CN': '适合土耳其的机场交通、Istanbulkart、市场，以及酒店和餐饮沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport transfers, Istanbulkart, ferries, and tram stops before you move through the city.',
        'Shopping phrases are most useful in bazaars when you want to ask the price, confirm what is included, or say you are just looking.',
        'Dining cards help with tea, kebabs, takeaway, and payment questions in smaller local spots where speed matters.',
      ],
      'zh-CN': [
        '如果要用机场接驳、Istanbulkart、渡轮和电车，最好先把相关交通短语准备好。',
        '在市场里，购物短语尤其适合问价格、确认包含什么，或者表达自己只是先看看。',
        '在本地小店里，喝茶、烤肉、外带和支付问题都很常用，而且节奏通常很快。',
      ],
    },
    highlights: {
      'en-US': [
        'Airport rides, Istanbulkart, ferries, and trams',
        'Bazaars, prices, and browsing basics',
        'Tea, kebabs, takeaway, and payment questions',
      ],
      'zh-CN': [
        '机场交通、Istanbulkart、渡轮与电车',
        '市场、价格与逛店基础沟通',
        '喝茶、烤肉、外带与支付问题',
      ],
    },
    relatedSlugs: ['greece', 'egypt', 'united-arab-emirates'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first Turkey trip?',
          'zh-CN': '第一次去土耳其旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, shopping, and dining. That covers airport arrivals, Istanbulkart, bazaars, and many first-day food or price questions.',
          'zh-CN': '建议先看交通、购物和餐饮三组，基本就能覆盖机场落地、Istanbulkart、市场，以及第一天很多吃饭和价格相关问题。',
        },
      },
      {
        question: {
          'en-US': 'Why are phrase cards especially useful in Turkey?',
          'zh-CN': '为什么在土耳其旅行时，短语卡会特别有用？',
        },
        answer: {
          'en-US': 'Because many high-frequency interactions revolve around transport, prices, and short local conversations where direct wording matters.',
          'zh-CN': '因为很多高频沟通都围绕交通、价格和简短本地对话展开，这些场景里越直接越清楚越好。',
        },
      },
    ],
  },
  'united-states': {
    description: {
      'en-US': 'Travel phrases for United States with audio, built for airport rideshares, hotel check-ins, cafe or diner stops, and everyday local-service conversations.',
      'zh-CN': '美国旅行短语卡，围绕机场网约车、酒店入住、咖啡馆或 diner 停留，以及本地服务沟通等高频场景整理。',
    },
    intro: {
      'en-US': 'Built for United States trips where airport rideshares, hotel counters, coffee stops, and restaurant or pharmacy questions all come up quickly. These cards help when you want a short, clear request for directions, service, or everyday logistics.',
      'zh-CN': '这套美国短语适合那种机场网约车、酒店前台、咖啡馆，以及餐厅或药房问题会快速出现的旅行节奏。遇到要问方向、服务或处理日常行程安排时，简短清晰的短语卡会很有帮助。',
    },
    teaser: {
      'en-US': 'Built for United States rideshares, hotel check-ins, cafes or diners, and pharmacy or payment conversations.',
      'zh-CN': '适合美国的网约车、酒店入住、咖啡馆或 diner，以及药房和支付沟通。',
    },
    travelTips: {
      'en-US': [
        'Keep transport phrases ready for airport rideshares, pickup zones, and local transit before you head into the city.',
        'Dining phrases help at cafes and diners when you want takeaway, substitutions, separate checks, or a quick recommendation.',
        'Even in English-speaking settings, a phrase card is handy for exact addresses, room issues, or short pharmacy and service requests.',
      ],
      'zh-CN': [
        '从机场进城前，最好先把网约车、上车区和本地交通相关短语准备好。',
        '在咖啡馆和 diner 里，外带、替换食材、分开结账和让对方推荐这类需求都很常用。',
        '即使在英语环境里，遇到准确地址、房间问题或药房与服务请求时，短语卡也依然很方便。',
      ],
    },
    highlights: {
      'en-US': [
        'Rideshares, pickup zones, and local transit',
        'Cafes, diners, and separate-check questions',
        'Hotels, pharmacies, and exact addresses',
      ],
      'zh-CN': [
        '网约车、上车区与本地交通',
        '咖啡馆、diner 与分开结账',
        '酒店、药房与准确地址',
      ],
    },
    relatedSlugs: ['canada', 'australia', 'new-zealand'],
    faq: [
      {
        question: {
          'en-US': 'Which phrase groups matter most for a first United States trip?',
          'zh-CN': '第一次去美国旅行，最该先准备哪几组短语？',
        },
        answer: {
          'en-US': 'Start with transport, hotel, and dining. That covers airport arrivals, hotel check-in, and most first-day cafe or restaurant needs.',
          'zh-CN': '建议先看交通、酒店和餐饮三组，基本就能覆盖机场落地、酒店入住，以及第一天大部分咖啡馆和餐厅场景。',
        },
      },
      {
        question: {
          'en-US': 'Why keep phrase cards for United States if the language is English?',
          'zh-CN': '既然美国讲英语，为什么还值得准备短语卡？',
        },
        answer: {
          'en-US': 'Because many travel moments are still repetitive and time-sensitive. A ready-made phrase speeds up addresses, pickups, counters, and service requests.',
          'zh-CN': '因为很多旅行场景依然重复又赶时间，提前备好的短语能让地址、接驳、柜台和服务请求处理得更快。',
        },
      },
    ],
  },
}

const REGION_SUMMARY = {
  'asia': {
    'en-US': 'fast-moving city travel and everyday service interactions',
    'zh-CN': '城市交通快节奏和高频服务沟通',
  },
  'middle-east': {
    'en-US': 'hotel, mall, and transport interactions across mixed-language service settings',
    'zh-CN': '酒店、商场和多语言服务场景',
  },
  'europe': {
    'en-US': 'rail travel, hotel check-ins, and restaurant conversations',
    'zh-CN': '铁路出行、酒店入住和餐厅沟通',
  },
  'americas': {
    'en-US': 'transport, dining, and everyday travel logistics',
    'zh-CN': '交通、餐饮和日常旅行安排',
  },
  'africa': {
    'en-US': 'transport, hospitality, and practical day-to-day travel moments',
    'zh-CN': '交通、接待服务和日常旅行场景',
  },
  'oceania': {
    'en-US': 'road trips, city transport, and accommodation check-ins',
    'zh-CN': '自驾、城市交通和住宿入住场景',
  },
}

function isEnglishLanguage(languageCode, languageName) {
  return languageCode.startsWith('en') || /english/i.test(languageName['en-US'])
}

function buildDefaults(pack) {
  const countryEn = pack.country['en-US']
  const countryZh = pack.country['zh-CN']
  const languageEn = pack.languageName['en-US']
  const languageZh = pack.languageName['zh-CN']
  const regionSummary = REGION_SUMMARY[pack.region]
  const englishLocal = isEnglishLanguage(pack.languageCode, pack.languageName)
  const phraseLabelEn = englishLocal ? 'local phrase cards' : `${languageEn} phrase cards`
  const phraseLabelZh = englishLocal ? '当地沟通短语卡' : `${languageZh}短语卡`

  return {
    description: {
      'en-US': `Travel phrases for ${countryEn} with audio and practical ${phraseLabelEn} for transport, hotels, dining, shopping, and emergencies.`,
      'zh-CN': `${countryZh}旅行短语卡，补充了更适合当地落地使用的${phraseLabelZh}，覆盖交通、酒店、餐饮、购物和紧急场景。`,
    },
    intro: {
      'en-US': `Built for trips in ${countryEn}, with quick phrase support for ${regionSummary['en-US']}. Use these cards when you need a short request, a visible phrase on screen, or fast backup when pronunciation is difficult.`,
      'zh-CN': `这套${countryZh}短语优先覆盖${regionSummary['zh-CN']}。遇到需要快速表达、直接给对方看屏幕，或者临时说不准发音的时候，都可以直接拿来使用。`,
    },
    teaser: {
      'en-US': `Useful for everyday travel situations in ${countryEn}, especially transport, hotel, and dining conversations.`,
      'zh-CN': `适合在${countryZh}旅行时处理交通、酒店和餐饮等高频场景沟通。`,
    },
    travelTips: {
      'en-US': [
        `Start with short ${englishLocal ? 'local' : languageEn} phrases for greetings, directions, and simple requests.`,
        'Keep the transport, hotel, and payment sections ready for offline or noisy travel moments.',
        'If pronunciation feels uncertain, show the phrase card on screen first and use audio when it is available.',
      ],
      'zh-CN': [
        `可以先准备几句简短的${englishLocal ? '当地常用' : languageZh}表达，用来打招呼、问路和提出简单需求。`,
        '交通、酒店和支付类短语最适合提前备好，离线或环境嘈杂时特别有用。',
        '如果对发音没把握，先把短语卡展示给对方看，再配合音频会更稳妥。',
      ],
    },
    highlights: {
      'en-US': [
        `${englishLocal ? 'Local' : languageEn} basics`,
        'Transport and directions',
        'Hotel and dining',
      ],
      'zh-CN': [
        `${englishLocal ? '当地常用' : languageZh}基础`,
        '交通与问路',
        '酒店与点餐',
      ],
    },
    featured: FEATURED_DEFAULTS.has(pack.slug),
    faq: [
      {
        question: {
          'en-US': `Which phrase section should I start with for ${countryEn}?`,
          'zh-CN': `去${countryZh}旅行时，最适合先看哪一组短语？`,
        },
        answer: {
          'en-US': `Transport, dining, and hotel phrases cover most first-day situations in ${countryEn}, then you can keep shopping and emergency phrases ready as backup.`,
          'zh-CN': `通常先看交通、餐饮和酒店三组就够应对${countryZh}旅行第一天的大部分场景，再把购物和求助短语留作备用即可。`,
        },
      },
      {
        question: {
          'en-US': `What is the easiest way to use these phrase cards in ${countryEn}?`,
          'zh-CN': `在${countryZh}旅行时，最简单的使用方式是什么？`,
        },
        answer: {
          'en-US': 'Keep the phrase card visible, tap audio when it helps, and rely on the written phrase when you want to communicate quickly without typing a translation.',
          'zh-CN': '最简单的方式就是直接展示短语卡，需要时点播放音频；如果不想临时打字翻译，直接给对方看文字通常最快。',
        },
      },
    ],
  }
}

function ensureLocalizedObject(current, fallback) {
  const next = { ...(current ?? {}) }
  for (const locale of SUPPORTED_LOCALES) {
    if (!next[locale] || (typeof next[locale] === 'string' && !next[locale].trim())) {
      next[locale] = fallback[locale]
    }
  }
  return next
}

function ensureLocalizedList(current, fallback) {
  const next = { ...(current ?? {}) }
  for (const locale of SUPPORTED_LOCALES) {
    if (!Array.isArray(next[locale]) || next[locale].length === 0) {
      next[locale] = fallback[locale]
    }
  }
  return next
}

function ensureFaq(current, fallback) {
  if (Array.isArray(current) && current.length > 0) {
    return current.map((item, index) => ({
      question: ensureLocalizedObject(item.question, fallback[index]?.question ?? fallback[0].question),
      answer: ensureLocalizedObject(item.answer, fallback[index]?.answer ?? fallback[0].answer),
    }))
  }

  return fallback
}

function deriveRelatedSlugs(packs, currentPack) {
  return packs
    .filter((pack) => pack.slug !== currentPack.slug && pack.region === currentPack.region)
    .sort((left, right) => left.country['en-US'].localeCompare(right.country['en-US']))
    .slice(0, 3)
    .map((pack) => pack.slug)
}

async function main() {
  const files = (await readdir(DATA_DIR))
    .filter((file) => file.endsWith('.json') && file !== 'index.json' && file !== 'phrase-definitions.json')
    .sort()

  const packs = await Promise.all(files.map(async (file) => ({
    file,
    pack: JSON.parse(await readFile(join(DATA_DIR, file), 'utf8')),
  })))

  for (const entry of packs) {
    const profile = COUNTRY_PROFILES[entry.pack.slug]

    if (profile) {
      entry.pack.description = profile.description
      entry.pack.intro = profile.intro
      entry.pack.teaser = profile.teaser
      entry.pack.travelTips = profile.travelTips
      entry.pack.highlights = profile.highlights
      entry.pack.featured = typeof profile.featured === 'boolean' ? profile.featured : FEATURED_DEFAULTS.has(entry.pack.slug)
      entry.pack.relatedSlugs = profile.relatedSlugs
      entry.pack.faq = profile.faq
    } else {
      const defaults = buildDefaults(entry.pack)

      entry.pack.description = ensureLocalizedObject(entry.pack.description, defaults.description)
      entry.pack.intro = ensureLocalizedObject(entry.pack.intro, defaults.intro)
      entry.pack.teaser = ensureLocalizedObject(entry.pack.teaser, defaults.teaser)
      entry.pack.travelTips = ensureLocalizedList(entry.pack.travelTips, defaults.travelTips)
      entry.pack.highlights = ensureLocalizedList(entry.pack.highlights, defaults.highlights)
      entry.pack.featured = FEATURED_DEFAULTS.has(entry.pack.slug)
      entry.pack.relatedSlugs = Array.isArray(entry.pack.relatedSlugs) && entry.pack.relatedSlugs.length
        ? entry.pack.relatedSlugs
        : deriveRelatedSlugs(packs.map((item) => item.pack), entry.pack)
      entry.pack.faq = ensureFaq(entry.pack.faq, defaults.faq)
    }

    await writeFile(join(DATA_DIR, entry.file), `${JSON.stringify(entry.pack, null, 2)}\n`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
