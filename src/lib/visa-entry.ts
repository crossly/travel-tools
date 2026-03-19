import '@/lib/i18n/messages/visa-entry'
import { translate } from '@/lib/i18n'
import { VISA_ENTRY_DESTINATIONS, type VisaEntryCountryRecord, type VisaEntrySource } from '@/data/visa-entry'
import type { Locale, PhraseRegion } from '@/lib/types'

export type VisaEntryRegionFilter = 'all' | PhraseRegion

export const VISA_ENTRY_REGIONS: VisaEntryRegionFilter[] = ['all', 'asia', 'europe', 'americas', 'africa', 'middle-east', 'oceania']

export type VisaEntryLink = VisaEntrySource

export type VisaEntryDestinationSummary = VisaEntryCountryRecord & {
  title: string
  summary: string
  teaser: string
  commonEntryPathPreview: string
}

export type VisaEntryDestinationGuide = VisaEntryDestinationSummary & {
  description: string
  commonEntryPaths: string[]
  arrivalCard: string
  customsDeclaration: string
  healthDeclaration: string
  officialLinks: VisaEntryLink[]
  verificationNote: string
  lastReviewed: string
}

const COUNTRY_NAME_FORMATTERS = new Map<Locale, Intl.DisplayNames>()

const ZH_SOURCE_LABELS: Record<string, string> = {
  'AADE customs information': '希腊 AADE 海关信息',
  'AFIP traveller guidance': '阿根廷 AFIP 旅客申报指引',
  AIMA: '葡萄牙 AIMA',
  'Acces Maroc': 'Acces Maroc',
  Anvisa: '巴西国家卫生监督局',
  'Australian Border Force': '澳大利亚边境执法局',
  'Australian immigration and visas': '澳大利亚移民与签证',
  'Austrian Foreign Ministry': '奥地利外交部',
  'Austrian customs information': '奥地利海关信息',
  'Biosecurity and arrivals': '澳大利亚生物安全与入境指引',
  'Bureau of Customs': '菲律宾海关局',
  'Bureau of Immigration': '菲律宾移民局',
  'CBP international visitors': '美国海关与边境保护局国际旅客页',
  'CBSA travel guidance': '加拿大边境服务局旅客指引',
  'CDC travel health': '美国疾控中心旅行健康页',
  'Cambodia Customs and Excise': '柬埔寨海关与消费税总署',
  'Cambodia eVisa': '柬埔寨电子签证',
  'Central Board of Indirect Taxes and Customs': '印度中央间接税和海关委员会',
  'Chilean Customs': '智利海关',
  'China Customs': '中国海关',
  'DIAN customs': '哥伦比亚 DIAN 海关',
  'Department of Home Affairs': '南非内政部',
  'Department of Immigration Services': '肯尼亚移民局',
  'Dirección General de Migración y Extranjería': '哥斯达黎加移民总局',
  'Dirección Nacional de Migraciones': '阿根廷国家移民局',
  'Directorate General of Immigration': '印尼移民总局',
  'Directorate General of Immigration eVisa': '印尼移民总局电子签证',
  'Directorate General of Migration Management': '土耳其移民管理总局',
  'Dubai Customs': '迪拜海关',
  'Dutch Customs': '荷兰海关',
  'Egypt Customs': '埃及海关',
  'Egypt eVisa portal': '埃及电子签证门户',
  'Federal Foreign Office visa service': '德国外交部签证服务',
  'Federal Office of Public Health': '瑞士联邦公共卫生局',
  'Federal Police foreigner guidance': '巴西联邦警察外籍旅客指引',
  'Federal Revenue customs guidance': '巴西联邦税务局海关指引',
  'France-Visas': '法国 France-Visas',
  'French Customs': '法国海关',
  'General Department of Immigration': '柬埔寨移民总局',
  'German Customs': '德国海关',
  'Greek Ministry of Foreign Affairs': '希腊外交部',
  'HiKorea immigration services': '韩国 HiKorea 移民服务',
  'Hong Kong Customs and Excise Department': '香港海关',
  'Hong Kong Immigration Department': '香港入境事务处',
  'ICP Smart Services': '阿联酋 ICP Smart Services',
  'Immigration Department of Malaysia': '马来西亚移民局',
  'Immigration New Zealand': '新西兰移民局',
  'Immigration and Checkpoints Authority entry page': '新加坡移民与关卡局入境页',
  'Indian eVisa portal': '印度电子签证门户',
  'Indonesia Customs e-CD': '印尼海关 e-CD',
  'Instituto Nacional de Migración': '墨西哥国家移民局',
  'Italian Customs and Monopolies Agency': '意大利海关与专卖局',
  'Japan Customs traveller guidance': '日本海关旅客指引',
  'Kenya Revenue Authority': '肯尼亚税务局',
  'Kenya eVisa': '肯尼亚电子签证',
  'Korea Customs Service': '韩国海关厅',
  'Malaysia eVisa portal': '马来西亚电子签证门户',
  'Mauritius Revenue Authority customs': '毛里求斯税务局海关',
  'Migraciones Perú': '秘鲁移民局',
  'Migración Colombia': '哥伦比亚移民局',
  'Ministry of Finance / customs': '哥斯达黎加财政部海关',
  'Ministry of Foreign Affairs': '外交部',
  'Ministry of Foreign Affairs visa information': '日本外务省签证信息',
  'Ministry of Foreign Affairs visa notices': '外交部签证公告',
  'Ministry of Health': '卫生部',
  'Ministry of Health and Prevention': '卫生与预防部',
  'Ministry of Health and Social Protection': '卫生与社会保障部',
  'Ministry of Health and Wellness': '卫生与健康部',
  'Ministry of Health, Labour and Welfare': '日本厚生劳动省',
  'Ministry of Interior': '内政部',
  'Ministry of Trade': '贸易部',
  'Ministry of the Interior': '内政部',
  'Moroccan Customs': '摩洛哥海关',
  'National Department of Health': '国家卫生部',
  'National Immigration Administration': '国家移民管理局',
  'National Immigration Agency': '移民署',
  'NetherlandsWorldwide visa guidance': 'NetherlandsWorldwide 签证指引',
  'New Zealand Customs Service': '新西兰海关',
  'New Zealand Traveller Declaration': '新西兰 Traveller Declaration',
  'Passport and Immigration Office': '护照与移民办公室',
  'Philippine eTravel': '菲律宾 eTravel',
  'Portuguese Tax and Customs Authority': '葡萄牙税务与海关总局',
  'Portuguese visa portal': '葡萄牙签证门户',
  'Q-CODE': '韩国 Q-CODE',
  'Royal Malaysian Customs Department': '马来西亚皇家海关',
  'Royal Thai Immigration Bureau': '泰国移民局',
  'SARS customs and excise': '南非税务局海关与消费税部门',
  'SAT customs and border guidance': '墨西哥 SAT 海关与边检指引',
  'SG Arrival Card': '新加坡 SG Arrival Card',
  'SUNAT customs guidance': '秘鲁 SUNAT 海关指引',
  'Servicio Nacional de Migraciones': '智利国家移民局',
  'Singapore Customs': '新加坡海关',
  'Spanish Ministry of Foreign Affairs': '西班牙外交部',
  'Spanish Tax Agency customs portal': '西班牙税务局海关门户',
  'State Secretariat for Migration': '瑞士联邦移民秘书处',
  'Swiss Customs': '瑞士海关',
  'Taiwan Customs Administration': '台湾海关',
  'Taiwan eVisa portal': '台湾电子签证门户',
  'Tanzania Immigration Services Department': '坦桑尼亚移民局',
  'Tanzania Immigration eServices': '坦桑尼亚移民电子服务',
  'Tanzania Revenue Authority': '坦桑尼亚税务局',
  'Thai Customs Department': '泰国海关厅',
  'Thai eVisa portal': '泰国电子签证门户',
  'Turkey eVisa portal': '土耳其电子签证门户',
  'U.S. Customs and Border Protection travel page': '美国海关与边境保护局旅客页',
  'Vietnam Customs': '越南海关',
  'Vietnam Immigration Department': '越南出入境管理局',
  'Vietnam eVisa portal': '越南电子签证门户',
  'Visit Canada': 'Visit Canada',
  'Visit Japan Web': 'Visit Japan Web',
  'Visto per l Italia': '意大利签证门户',
  'e-Arrival Card': '电子入境卡',
}

function getCountryCodeFromFlag(flag: string) {
  const codePoints = Array.from(flag).map((character) => character.codePointAt(0) ?? 0)
  if (codePoints.length !== 2) return null

  const countryCode = codePoints
    .map((codePoint) => {
      const offset = codePoint - 127397
      return offset >= 65 && offset <= 90 ? String.fromCharCode(offset) : null
    })
    .join('')

  return /^[A-Z]{2}$/.test(countryCode) ? countryCode : null
}

function getCountryName(locale: Locale, destination: VisaEntryCountryRecord) {
  const countryCode = getCountryCodeFromFlag(destination.flag)
  if (!countryCode) return destination.country

  let formatter = COUNTRY_NAME_FORMATTERS.get(locale)
  if (!formatter) {
    formatter = new Intl.DisplayNames([locale], { type: 'region' })
    COUNTRY_NAME_FORMATTERS.set(locale, formatter)
  }

  return formatter.of(countryCode) ?? destination.country
}

function localizeSourceLabel(locale: Locale, label: string) {
  if (locale === 'en-US') return label
  return ZH_SOURCE_LABELS[label] ?? label
}

function getPrimarySource(destination: VisaEntryCountryRecord) {
  return destination.officialSources.find((source) => source.kind === 'immigration')
    ?? destination.officialSources.find((source) => source.kind === 'visa')
    ?? destination.officialSources[0]
}

function getArrivalSource(destination: VisaEntryCountryRecord) {
  return destination.officialSources.find((source) => source.kind === 'arrival')
}

function getCustomsSource(destination: VisaEntryCountryRecord) {
  return destination.officialSources.find((source) => source.kind === 'customs')
}

function getHealthSource(destination: VisaEntryCountryRecord) {
  return destination.officialSources.find((source) => source.kind === 'health')
}

function getArrivalMode(destination: VisaEntryCountryRecord) {
  if (destination.arrivalCard.includes('not typically required')) return 'not_required' as const
  if (destination.arrivalCard.includes('pre-arrival') || destination.arrivalCard.includes('arrival-card step')) return 'digital_flow' as const
  return 'verify' as const
}

function getHealthMode(destination: VisaEntryCountryRecord) {
  if (destination.healthDeclaration.includes('not typically required')) return 'not_required' as const
  return 'verify' as const
}

function buildHealthSummary(locale: Locale, destination: VisaEntryCountryRecord) {
  const healthMode = getHealthMode(destination)
  const healthSource = getHealthSource(destination)
  const healthLabel = healthSource ? localizeSourceLabel(locale, healthSource.label) : null

  if (locale === 'zh-CN') {
    if (healthMode === 'not_required') return '常规游客一般不用单独健康申报。'
    return healthLabel ? `临时健康通知通常看 ${healthLabel}。` : '如遇临时健康措施，出发前再核对官方通知。'
  }

  if (healthMode === 'not_required') return 'Separate health forms are not usually part of routine tourist entry.'
  return healthLabel ? `Temporary health notices usually sit on ${healthLabel}.` : 'Re-check official health notices before you travel.'
}

function buildCardSummary(locale: Locale, destination: VisaEntryCountryRecord) {
  const primarySource = getPrimarySource(destination)
  const arrivalSource = getArrivalSource(destination)
  const customsSource = getCustomsSource(destination)
  const primaryLabel = primarySource ? localizeSourceLabel(locale, primarySource.label) : destination.specialFlow
  const arrivalLabel = arrivalSource ? localizeSourceLabel(locale, arrivalSource.label) : null
  const customsLabel = customsSource ? localizeSourceLabel(locale, customsSource.label) : null
  const arrivalMode = getArrivalMode(destination)
  const healthSummary = buildHealthSummary(locale, destination)

  if (locale === 'zh-CN') {
    if (arrivalMode === 'digital_flow' && arrivalLabel && arrivalLabel !== primaryLabel) {
      return `通常先看 ${primaryLabel}，入境前表单再看 ${arrivalLabel}；${customsLabel ? `海关部分看 ${customsLabel}。` : ''}${healthSummary}`
    }

    if (arrivalMode === 'digital_flow') {
      return `通常先看 ${primaryLabel}；${customsLabel ? `海关部分看 ${customsLabel}。` : ''}${healthSummary}`
    }

    if (arrivalMode === 'not_required') {
      return `通常先看 ${primaryLabel}；${customsLabel ? `海关部分看 ${customsLabel}。` : ''}常规游客一般不用单独入境卡。${healthSummary}`
    }

    return `通常先看 ${primaryLabel}；${customsLabel ? `海关部分看 ${customsLabel}。` : ''}${healthSummary}`
  }

  if (arrivalMode === 'digital_flow' && arrivalLabel && arrivalLabel !== primaryLabel) {
    return `Start with ${primaryLabel}, then use ${arrivalLabel} for any pre-arrival step. ${customsLabel ? `Customs checks sit with ${customsLabel}. ` : ''}${healthSummary}`
  }

  if (arrivalMode === 'not_required') {
    return `Start with ${primaryLabel}. ${customsLabel ? `Customs checks sit with ${customsLabel}. ` : ''}Separate arrival cards are not usually part of routine tourist entry. ${healthSummary}`
  }

  return `Start with ${primaryLabel}. ${customsLabel ? `Customs checks sit with ${customsLabel}. ` : ''}${healthSummary}`
}

function buildGuideDescription(locale: Locale, destination: VisaEntryCountryRecord) {
  const primarySource = getPrimarySource(destination)
  const arrivalSource = getArrivalSource(destination)
  const customsSource = getCustomsSource(destination)
  const healthSource = getHealthSource(destination)
  const primaryLabel = primarySource ? localizeSourceLabel(locale, primarySource.label) : destination.specialFlow
  const arrivalLabel = arrivalSource ? localizeSourceLabel(locale, arrivalSource.label) : null
  const customsLabel = customsSource ? localizeSourceLabel(locale, customsSource.label) : null
  const healthLabel = healthSource ? localizeSourceLabel(locale, healthSource.label) : null
  const arrivalMode = getArrivalMode(destination)
  const healthMode = getHealthMode(destination)

  if (locale === 'zh-CN') {
    const parts = [`入境路径一般先看 ${primaryLabel}。`]
    if (arrivalMode === 'digital_flow' && arrivalLabel) {
      parts.push(`如果行程需要入境前表单，通常在 ${arrivalLabel} 处理。`)
    } else if (arrivalMode === 'not_required') {
      parts.push('常规游客通常没有单独入境卡。')
    }
    if (customsLabel) {
      parts.push(`海关申报主要看 ${customsLabel}。`)
    }
    if (healthMode === 'verify' && healthLabel) {
      parts.push(`临时健康通知通常以 ${healthLabel} 为准。`)
    } else if (healthMode === 'not_required') {
      parts.push('常规游客一般不用单独健康申报。')
    }
    return parts.join('')
  }

  const parts = [`The main entry route usually starts on ${primaryLabel}.`]
  if (arrivalMode === 'digital_flow' && arrivalLabel) {
    parts.push(`If a pre-arrival form is part of the trip, ${arrivalLabel} is the usual place to handle it.`)
  } else if (arrivalMode === 'not_required') {
    parts.push('Routine tourist trips do not usually involve a separate arrival card.')
  }
  if (customsLabel) {
    parts.push(`Declaration checks usually sit with ${customsLabel}.`)
  }
  if (healthMode === 'verify' && healthLabel) {
    parts.push(`Temporary health notices usually sit on ${healthLabel}.`)
  } else if (healthMode === 'not_required') {
    parts.push('Separate health forms are not usually part of routine tourist entry.')
  }
  return parts.join(' ')
}

function buildCommonEntryPaths(locale: Locale, destination: VisaEntryCountryRecord) {
  const primarySource = getPrimarySource(destination)
  const arrivalSource = getArrivalSource(destination)
  const customsSource = getCustomsSource(destination)
  const primaryLabel = primarySource ? localizeSourceLabel(locale, primarySource.label) : destination.specialFlow
  const arrivalLabel = arrivalSource ? localizeSourceLabel(locale, arrivalSource.label) : null
  const customsLabel = customsSource ? localizeSourceLabel(locale, customsSource.label) : null
  const arrivalMode = getArrivalMode(destination)

  if (locale === 'zh-CN') {
    return [
      `签证、电子签或主要入境路径先看 ${primaryLabel}。`,
      arrivalMode === 'digital_flow' && arrivalLabel
        ? `如需入境前表单，通常在 ${arrivalLabel} 完成。`
        : '常规游客通常没有单独入境卡，但出发前仍要再核对官方通知。',
      customsLabel
        ? `现金、烟酒和受限物品申报看 ${customsLabel}。`
        : '现金、烟酒和受限物品申报要提前看海关公告。',
    ]
  }

  return [
    `Check ${primaryLabel} first for the main visa or entry route.`,
    arrivalMode === 'digital_flow' && arrivalLabel
      ? `Use ${arrivalLabel} if your trip includes a pre-arrival form or digital arrival step.`
      : 'Routine tourist trips do not usually involve a separate arrival card, but re-check before departure.',
    customsLabel
      ? `Keep ${customsLabel} open for cash, tobacco, alcohol, and restricted-goods declarations.`
      : 'Re-check customs guidance for cash, tobacco, alcohol, and restricted goods.',
  ]
}

function buildArrivalCard(locale: Locale, destination: VisaEntryCountryRecord) {
  const arrivalSource = getArrivalSource(destination)
  const arrivalLabel = arrivalSource ? localizeSourceLabel(locale, arrivalSource.label) : destination.specialFlow
  const arrivalMode = getArrivalMode(destination)

  if (locale === 'zh-CN') {
    if (arrivalMode === 'digital_flow') return `如需入境前表单，通常在 ${arrivalLabel} 完成。`
    if (arrivalMode === 'not_required') return '常规游客通常不用单独填写入境卡，临行前再核对一次官方通知即可。'
    return `入境卡或入境前表单如有临时调整，优先看 ${arrivalLabel}。`
  }

  if (arrivalMode === 'digital_flow') return `${arrivalLabel} is usually the place to handle any pre-arrival form or digital arrival step.`
  if (arrivalMode === 'not_required') return 'Routine tourist trips do not usually require a separate arrival card, but re-check before departure.'
  return `Check ${arrivalLabel} if the destination adds a temporary arrival-card or pre-entry step.`
}

function buildCustomsDeclaration(locale: Locale, destination: VisaEntryCountryRecord) {
  const customsSource = getCustomsSource(destination)
  const customsLabel = customsSource ? localizeSourceLabel(locale, customsSource.label) : null

  if (locale === 'zh-CN') {
    return customsLabel
      ? `${customsLabel} 负责现金、烟酒、电子设备和受限物品的申报说明。`
      : '现金、烟酒、电子设备和受限物品申报要提前看海关公告。'
  }

  return customsLabel
    ? `${customsLabel} is the main reference for cash, tobacco, alcohol, electronics, and restricted-goods declarations.`
    : 'Re-check customs guidance for cash, tobacco, alcohol, electronics, and restricted goods.'
}

function buildHealthDeclaration(locale: Locale, destination: VisaEntryCountryRecord) {
  const healthSource = getHealthSource(destination)
  const healthLabel = healthSource ? localizeSourceLabel(locale, healthSource.label) : null
  const healthMode = getHealthMode(destination)

  if (locale === 'zh-CN') {
    if (healthMode === 'not_required') return '常规游客一般不用单独健康申报；如有临时措施，出发前再核对官方通知。'
    return healthLabel
      ? `临时健康通知或额外健康要求，通常以 ${healthLabel} 的公告为准。`
      : '如遇临时健康措施，出发前再核对官方通知。'
  }

  if (healthMode === 'not_required') return 'Routine tourist trips do not usually require a separate health form, but re-check if temporary measures return.'
  return healthLabel
    ? `Temporary health notices or extra health requirements usually sit on ${healthLabel}.`
    : 'Re-check official health notices before you travel.'
}

function buildTeaser(locale: Locale, destination: VisaEntryCountryRecord) {
  if (locale === 'zh-CN') {
    return destination.specialFlow
  }
  return destination.specialFlow
}

function buildSummaryRecord(locale: Locale, destination: VisaEntryCountryRecord): VisaEntryDestinationSummary {
  return {
    ...destination,
    country: getCountryName(locale, destination),
    title: translate(locale, 'visaEntry.countryTitle', { country: getCountryName(locale, destination) }),
    summary: buildCardSummary(locale, destination),
    teaser: buildTeaser(locale, destination),
    commonEntryPathPreview: buildCommonEntryPaths(locale, destination)[0],
  }
}

function buildGuide(locale: Locale, destination: VisaEntryCountryRecord): VisaEntryDestinationGuide {
  const summary = buildSummaryRecord(locale, destination)

  return {
    ...summary,
    description: buildGuideDescription(locale, destination),
    commonEntryPaths: buildCommonEntryPaths(locale, destination),
    arrivalCard: buildArrivalCard(locale, destination),
    customsDeclaration: buildCustomsDeclaration(locale, destination),
    healthDeclaration: buildHealthDeclaration(locale, destination),
    officialLinks: destination.officialSources,
    verificationNote: locale === 'zh-CN'
      ? `最近核对：${destination.lastReviewed}`
      : `Last reviewed: ${destination.lastReviewed}`,
    lastReviewed: destination.lastReviewed,
  }
}

export function countVisaEntryDestinations() {
  return VISA_ENTRY_DESTINATIONS.length
}

export function listVisaEntryDestinationSummaries(locale: Locale, region: VisaEntryRegionFilter = 'all') {
  return VISA_ENTRY_DESTINATIONS
    .filter((destination) => region === 'all' || destination.region === region)
    .map((destination) => buildSummaryRecord(locale, destination))
}

export function getVisaEntryDestinationSummary(locale: Locale, slug: string) {
  const destination = VISA_ENTRY_DESTINATIONS.find((entry) => entry.slug === slug)
  return destination ? buildSummaryRecord(locale, destination) : null
}

export function getVisaEntryDestinationGuide(locale: Locale, slug: string) {
  const destination = VISA_ENTRY_DESTINATIONS.find((entry) => entry.slug === slug)
  return destination ? buildGuide(locale, destination) : null
}

function isOfficialSourceHref(href: string) {
  try {
    const { hostname } = new URL(href)
    const blockedHosts = ['iatatravelcentre.com', 'travel.state.gov']
    const trustedTokens = [
      'gov',
      'gouv',
      'gob',
      'go.',
      'canada.ca',
      'netherlandsworldwide',
      'bmeia',
      'bmf',
      'auswaertiges-amt',
      'aade',
      'acces-maroc',
      'aduana',
      'hacienda',
      'admin',
      'mfa',
      'mofa',
      'mre',
      'moi',
      'cbsa',
      'abf',
      'mhlw',
      'immi',
      'immigration',
      'customs',
      'border',
      'passport',
      'health',
      'homeaffairs',
      'douane',
      'zoll',
      'cbp',
      'cbic',
      'mra',
      'sars',
      'dian',
      'sunat',
      'aima',
      'inm',
      'migracion',
      'visa',
      'evisa',
      'visto',
      'esteri',
      'travellerdeclaration',
      'interieur',
      'sem',
      'bazg',
      'bag',
      'dubaicustoms',
      'migraciones',
      'passport',
      'goc',
      'go.tz',
      'go.ke',
      'govmu',
      'gov.sg',
      'gov.hk',
      'govt',
    ]

    if (!href.startsWith('https://')) return false
    if (blockedHosts.some((host) => hostname.includes(host))) return false

    return trustedTokens.some((token) => hostname.includes(token))
  } catch {
    return false
  }
}

export function validateVisaEntryDestinationDirectory() {
  const errors: string[] = []
  const seenSlugs = new Set<string>()

  if (VISA_ENTRY_DESTINATIONS.length !== 41) {
    errors.push(`visa-entry: expected 41 destinations, received ${VISA_ENTRY_DESTINATIONS.length}`)
  }

  for (const destination of VISA_ENTRY_DESTINATIONS) {
    if (seenSlugs.has(destination.slug)) {
      errors.push(`visa-entry: duplicate destination slug "${destination.slug}"`)
      continue
    }
    seenSlugs.add(destination.slug)

    if (!destination.country) {
      errors.push(`visa-entry: missing country for "${destination.slug}"`)
    }
    if (!destination.flag) {
      errors.push(`visa-entry: missing flag for "${destination.slug}"`)
    }
    if (!destination.lastReviewed) {
      errors.push(`visa-entry: missing lastReviewed for "${destination.slug}"`)
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(destination.lastReviewed)) {
      errors.push(`visa-entry: invalid lastReviewed for "${destination.slug}"`)
    }
    if (!destination.specialFlow) {
      errors.push(`visa-entry: missing specialFlow for "${destination.slug}"`)
    }
    if (!destination.entryOverview) {
      errors.push(`visa-entry: missing entryOverview for "${destination.slug}"`)
    }
    if (!destination.commonEntryPaths.length) {
      errors.push(`visa-entry: missing commonEntryPaths for "${destination.slug}"`)
    }
    if (destination.officialSources.length < 2 || destination.officialSources.length > 5) {
      errors.push(`visa-entry: expected 2-5 officialSources for "${destination.slug}", received ${destination.officialSources.length}`)
    }
    for (const source of destination.officialSources) {
      if (!source.label || !source.href) {
        errors.push(`visa-entry: invalid source for "${destination.slug}"`)
      } else if (!isOfficialSourceHref(source.href)) {
        errors.push(`visa-entry: non-official source href for "${destination.slug}": ${source.href}`)
      }
    }
    if (!VISA_ENTRY_REGIONS.includes(destination.region)) {
      errors.push(`visa-entry: invalid region for "${destination.slug}"`)
    }
  }

  return errors
}
