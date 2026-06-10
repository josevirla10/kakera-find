// Uso:
//   Paso 1 — obtener URL de auth:  node scripts/ml-auth.mjs
//   Paso 2 — canjear código:       node scripts/ml-auth.mjs <codigo_de_la_url>
const code = process.argv[2]

const APP_ID = '2330777155471999'
const APP_SECRET = 'Ytz97DG1hJprkdMg4w6Gl0UL7nSE48Ps'
const REDIRECT_URI = 'https://find.kakeralabs.com'

if (!code) {
  const authUrl = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
  console.log('\n📋 Paso 1 — Abrí esta URL en el browser:\n')
  console.log(authUrl)
  console.log('\nDespués de autorizar, ML te redirige a find.kakeralabs.com?code=XXXXX')
  console.log('Copiá ese código y corré: node scripts/ml-auth.mjs <codigo>\n')
  process.exit(0)
}

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
