import { neon } from '@neondatabase/serverless'

function getSql() {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    return null
  }
  return neon(dbUrl)
}

export interface VisitorData {
  uniqueVisitors: number
}

export function generateVisitorId(ip: string | null, userAgent: string | null, fingerprint?: string): string {
  if (fingerprint) {
    return `fp:${fingerprint}`
  }

  const ipPart = ip || 'unknown'
  const uaPart = userAgent || 'unknown'
  return Buffer.from(`${ipPart}-${uaPart}`).toString('base64').slice(0, 32)
}

export async function initVisitorTable(): Promise<void> {
  const sql = getSql()
  if (!sql) return
  await sql`
    CREATE TABLE IF NOT EXISTS visitors (
      id SERIAL PRIMARY KEY,
      visitor_id TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `
}

/**
 * Global persistent counter fallback using public CounterAPI microservice
 * when process.env.DATABASE_URL is not configured.
 */
async function trackFallbackVisit(): Promise<number> {
  try {
    const res = await fetch('https://api.counterapi.dev/v1/lkshayyadav-portfolio/visits/up', {
      method: 'GET',
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      if (typeof data.count === 'number') {
        return data.count
      }
    }
  } catch (error) {
    console.error('Fallback counter API error:', error)
  }
  return 1
}

async function getFallbackStats(): Promise<number> {
  try {
    const res = await fetch('https://api.counterapi.dev/v1/lkshayyadav-portfolio/visits/', {
      method: 'GET',
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      if (typeof data.count === 'number') {
        return data.count
      }
    }
  } catch (error) {
    console.error('Fallback counter GET stats error:', error)
  }
  return 1
}

export async function trackVisit(visitorId: string): Promise<VisitorData> {
  const sql = getSql()
  if (!sql) {
    const fallbackCount = await trackFallbackVisit()
    return { uniqueVisitors: fallbackCount }
  }
  try {
    await sql`
      INSERT INTO visitors (visitor_id)
      VALUES (${visitorId})
      ON CONFLICT (visitor_id) DO NOTHING
    `
    const result = await sql`SELECT COUNT(*) as count FROM visitors`
    const uniqueCount = parseInt(result[0]?.count || '1', 10)

    return { uniqueVisitors: uniqueCount }
  } catch (error) {
    console.error('Error tracking visitor with DB, attempting fallback:', error)
    const fallbackCount = await trackFallbackVisit()
    return { uniqueVisitors: fallbackCount }
  }
}

export async function getVisitorStats(): Promise<{ uniqueVisitors: number }> {
  const sql = getSql()
  if (!sql) {
    const count = await getFallbackStats()
    return { uniqueVisitors: count }
  }
  try {
    const result = await sql`SELECT COUNT(*) as count FROM visitors`
    const uniqueCount = parseInt(result[0]?.count || '1', 10)
    return { uniqueVisitors: uniqueCount }
  } catch (error) {
    console.error('Error getting visitor stats with DB, attempting fallback:', error)
    const count = await getFallbackStats()
    return { uniqueVisitors: count }
  }
}
