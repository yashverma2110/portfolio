/**
 * Cloudflare Web Analytics. The token is public: Cloudflare's beacon reads it from the page.
 * Loaded only in production so local dev is not counted as traffic.
 * Dashboard: Web Analytics → www.itsyashverma.com.
 */
export const CLOUDFLARE_WEB_ANALYTICS_TOKEN = "47c1c1afc05248f4a0e53355e21d0b3b";

export const CLOUDFLARE_BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js";

/** `data-cf-beacon` JSON, or null outside production. */
export const CLOUDFLARE_BEACON =
  process.env.NODE_ENV === "production"
    ? JSON.stringify({ token: CLOUDFLARE_WEB_ANALYTICS_TOKEN })
    : null;
