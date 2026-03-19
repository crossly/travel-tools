import type { PhraseRegion } from '@/lib/types'

export type VisaEntryDestinationRecord = {
  slug: string
  country: string
  region: PhraseRegion
  flag: string
}

export const VISA_ENTRY_DESTINATIONS: VisaEntryDestinationRecord[] = [
  { slug: 'cambodia', country: 'Cambodia', region: 'asia', flag: '🇰🇭' },
  { slug: 'china', country: 'China', region: 'asia', flag: '🇨🇳' },
  { slug: 'hong-kong', country: 'Hong Kong', region: 'asia', flag: '🇭🇰' },
  { slug: 'india', country: 'India', region: 'asia', flag: '🇮🇳' },
  { slug: 'indonesia', country: 'Indonesia', region: 'asia', flag: '🇮🇩' },
  { slug: 'japan', country: 'Japan', region: 'asia', flag: '🇯🇵' },
  { slug: 'malaysia', country: 'Malaysia', region: 'asia', flag: '🇲🇾' },
  { slug: 'philippines', country: 'Philippines', region: 'asia', flag: '🇵🇭' },
  { slug: 'singapore', country: 'Singapore', region: 'asia', flag: '🇸🇬' },
  { slug: 'south-korea', country: 'South Korea', region: 'asia', flag: '🇰🇷' },
  { slug: 'taiwan', country: 'Taiwan', region: 'asia', flag: '🇹🇼' },
  { slug: 'thailand', country: 'Thailand', region: 'asia', flag: '🇹🇭' },
  { slug: 'vietnam', country: 'Vietnam', region: 'asia', flag: '🇻🇳' },
  { slug: 'turkey', country: 'Turkey', region: 'middle-east', flag: '🇹🇷' },
  { slug: 'united-arab-emirates', country: 'United Arab Emirates', region: 'middle-east', flag: '🇦🇪' },
  { slug: 'austria', country: 'Austria', region: 'europe', flag: '🇦🇹' },
  { slug: 'france', country: 'France', region: 'europe', flag: '🇫🇷' },
  { slug: 'germany', country: 'Germany', region: 'europe', flag: '🇩🇪' },
  { slug: 'greece', country: 'Greece', region: 'europe', flag: '🇬🇷' },
  { slug: 'italy', country: 'Italy', region: 'europe', flag: '🇮🇹' },
  { slug: 'netherlands', country: 'Netherlands', region: 'europe', flag: '🇳🇱' },
  { slug: 'portugal', country: 'Portugal', region: 'europe', flag: '🇵🇹' },
  { slug: 'spain', country: 'Spain', region: 'europe', flag: '🇪🇸' },
  { slug: 'switzerland', country: 'Switzerland', region: 'europe', flag: '🇨🇭' },
  { slug: 'argentina', country: 'Argentina', region: 'americas', flag: '🇦🇷' },
  { slug: 'brazil', country: 'Brazil', region: 'americas', flag: '🇧🇷' },
  { slug: 'canada', country: 'Canada', region: 'americas', flag: '🇨🇦' },
  { slug: 'chile', country: 'Chile', region: 'americas', flag: '🇨🇱' },
  { slug: 'colombia', country: 'Colombia', region: 'americas', flag: '🇨🇴' },
  { slug: 'costa-rica', country: 'Costa Rica', region: 'americas', flag: '🇨🇷' },
  { slug: 'mexico', country: 'Mexico', region: 'americas', flag: '🇲🇽' },
  { slug: 'peru', country: 'Peru', region: 'americas', flag: '🇵🇪' },
  { slug: 'united-states', country: 'United States', region: 'americas', flag: '🇺🇸' },
  { slug: 'egypt', country: 'Egypt', region: 'africa', flag: '🇪🇬' },
  { slug: 'kenya', country: 'Kenya', region: 'africa', flag: '🇰🇪' },
  { slug: 'mauritius', country: 'Mauritius', region: 'africa', flag: '🇲🇺' },
  { slug: 'morocco', country: 'Morocco', region: 'africa', flag: '🇲🇦' },
  { slug: 'south-africa', country: 'South Africa', region: 'africa', flag: '🇿🇦' },
  { slug: 'tanzania', country: 'Tanzania', region: 'africa', flag: '🇹🇿' },
  { slug: 'australia', country: 'Australia', region: 'oceania', flag: '🇦🇺' },
  { slug: 'new-zealand', country: 'New Zealand', region: 'oceania', flag: '🇳🇿' },
]
