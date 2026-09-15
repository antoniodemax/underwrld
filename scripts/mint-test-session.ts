// LOCAL TEST UTILITY ONLY — mints a session cookie value with the SESSION_SECRET from .env.local.
// It proves nothing an attacker can do: without the server-only secret the output cannot be produced.
// Usage: node --experimental-strip-types scripts/mint-test-session.ts [sub] [--expired] [--wrong-secret]
import { readFileSync } from 'node:fs'
import { createSessionToken } from '../lib/session.ts'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]),
)

const args = process.argv.slice(2)
const sub = args.find((a) => !a.startsWith('--')) ?? '109999999999999999999'
const expired = args.includes('--expired')
const wrongSecret = args.includes('--wrong-secret')

const secret = wrongSecret ? 'not-the-real-secret' : env.SESSION_SECRET
if (!secret) throw new Error('SESSION_SECRET missing from .env.local')

const now = expired ? Date.now() - 9 * 60 * 60 * 1000 : Date.now()
process.stdout.write(await createSessionToken(secret, sub, now))
