interface CloudflareEnv {
  DB: D1Database
  APP_KV: KVNamespace
  RATES_KV: KVNamespace
  ASSETS: Fetcher
  FX_API_BASE_URL?: string
  APP_NAME?: string
}
