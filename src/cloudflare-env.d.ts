interface CloudflareEnv {
  DB: D1Database
  APP_KV: KVNamespace
  RATES_KV: KVNamespace
  ASSETS: Fetcher
  FX_API_BASE_URL?: string
  OPEN_EXCHANGE_RATES_APP_ID?: string
  OPEN_EXCHANGE_RATES_API_BASE?: string
  APP_NAME?: string
  GA_MEASUREMENT_ID?: string
  GOOGLE_ANALYTICS_ID?: string
  UMAMI_WEBSITE_ID?: string
  UMAMI_SCRIPT_URL?: string
}
