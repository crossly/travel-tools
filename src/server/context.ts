export function getEnv(context: { cloudflare: { env: CloudflareEnv } }) {
  return context.cloudflare.env
}
