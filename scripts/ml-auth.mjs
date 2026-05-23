// Uso: node scripts/ml-auth.mjs <codigo_de_la_url>
const code = process.argv[2]
if (!code) {
  console.error('Uso: node scripts/ml-auth.mjs <codigo>')
  process.exit(1)
}

const APP_ID = '5266056884641309'
const APP_SECRET = 'YYzeER8pgR5x4apZxXeTzTvRdMdZXZ6b'
const REDIRECT_URI = 'https://kakera-find.vercel.app'

const res = await fetch('https://api.mercadolibre.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: APP_ID,
    client_secret: APP_SECRET,
    code,
    redirect_uri: REDIRECT_URI,
  }),
})

const data = await res.json()

if (!res.ok) {
  console.error('Error:', JSON.stringify(data, null, 2))
  process.exit(1)
}

console.log('\n✅ Tokens obtenidos!\n')
console.log('=== Agregá estas líneas a tu .env.local ===\n')
console.log(`ML_ACCESS_TOKEN=${data.access_token}`)
if (data.refresh_token) {
  console.log(`ML_REFRESH_TOKEN=${data.refresh_token}`)
} else {
  console.log('# (sin refresh_token — el access_token expira en 6h)')
}
console.log('\nuser_id:', data.user_id)
console.log('expires_in:', data.expires_in, 'segundos')
