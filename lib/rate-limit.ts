// Basic in-memory rate limiter — resets on server restart and isn't shared
// across multiple instances, which is fine for a single-instance launch but
// should move to a shared store (e.g. Upstash Redis) if this app ever runs
// on multiple serverless instances at once.
const submissions = new Map<string, number>();
const WINDOW_MS = 5 * 60 * 1000;

function pruneStaleEntries(now: number) {
  if (submissions.size <= 5000) return;
  for (const [key, timestamp] of submissions) {
    if (now - timestamp > WINDOW_MS) submissions.delete(key);
  }
}

// Checks every key (e.g. one for the submitted email, one for the client
// IP) and returns true if ANY of them submitted within the window. Only
// records a new timestamp for all keys when none were limited, so a
// rejected attempt doesn't extend anyone else's window.
export function isRateLimited(keys: string[]): boolean {
  const now = Date.now();
  pruneStaleEntries(now);

  const limited = keys.some((key) => {
    const last = submissions.get(key);
    return last !== undefined && now - last < WINDOW_MS;
  });

  if (limited) return true;

  for (const key of keys) submissions.set(key, now);
  return false;
}
