/**
 * Sliding-window rate limiter. Uses Upstash Redis (REST) when configured,
 * otherwise an in-memory window — fine for a single instance, and always
 * fail-open: a broken limiter must not block real borrowers.
 */

interface LimitResult {
  allowed: boolean;
  remaining: number;
}

const memory = new Map<string, number[]>();

function memoryLimit(key: string, max: number, windowSec: number): LimitResult {
  const now = Date.now();
  const windowStart = now - windowSec * 1000;
  const hits = (memory.get(key) ?? []).filter((t) => t > windowStart);
  if (hits.length >= max) {
    memory.set(key, hits);
    return { allowed: false, remaining: 0 };
  }
  hits.push(now);
  memory.set(key, hits);
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (memory.size > 10_000) {
    for (const [k, v] of memory) {
      if (v.every((t) => t <= windowStart)) memory.delete(k);
    }
  }
  return { allowed: true, remaining: max - hits.length };
}

async function upstashLimit(
  key: string,
  max: number,
  windowSec: number,
): Promise<LimitResult | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    // Fixed-window counter: INCR + EXPIRE (set only on first hit).
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", `rl:${key}`],
        ["EXPIRE", `rl:${key}`, String(windowSec), "NX"],
      ]),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result: number }[];
    const count = Number(data[0]?.result ?? 0);
    return { allowed: count <= max, remaining: Math.max(0, max - count) };
  } catch {
    return null; // fail open
  }
}

/**
 * Check `key` against `max` events per `windowSec` seconds.
 */
export async function rateLimit(
  key: string,
  max: number,
  windowSec: number,
): Promise<LimitResult> {
  const redis = await upstashLimit(key, max, windowSec);
  if (redis) return redis;
  return memoryLimit(key, max, windowSec);
}
