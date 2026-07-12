import { createHash } from "node:crypto";

/**
 * Salted, truncated SHA-256 of the client IP. We never store raw IPs —
 * the hash is enough for rate limiting and abuse triage.
 */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "pds-global-dev-salt";
  return createHash("sha256")
    .update(`${salt}|${ip}`)
    .digest("hex")
    .slice(0, 32);
}

/** Mask a mobile number for logs: keeps last 4 digits only. */
export function maskMobile(mobile: string): string {
  return mobile.replace(/\d(?=\d{4})/g, "•");
}

/** Mask a PAN for logs/notifications previews: ABCDE1234F → AB•••••••F. */
export function maskPan(pan: string): string {
  if (pan.length < 3) return "•••";
  return pan[0] + pan[1] + "•".repeat(pan.length - 3) + pan[pan.length - 1];
}
