# Kakera Find

Plataforma de descubrimiento de productos anime. Un proyecto de **Kakera Labs**.

Encontrá figuras, periféricos kawaii, merch oficial, ropa, decoración y más — todo curado en un solo lugar con links directos a las tiendas vía afiliados.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **MercadoLibre API** pública (sin auth)
- **AliExpress** mockeado (estructura lista para conectar)
- **Deploy:** Vercel

## Setup local

```bash
# 1. Clonar el repo
git clone <repo-url>
cd kakera-find

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local si necesitás cambiar el site de MercadoLibre

# 4. Correr en desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `NEXT_PUBLIC_ML_SITE` | `MLA` | Site de MercadoLibre (MLA=AR, MLM=MX, MLC=CL) |
| `ALIEXPRESS_APP_KEY` | — | API key de AliExpress Affiliate (futuro) |
| `ALIEXPRESS_APP_SECRET` | — | Secret de AliExpress Affiliate (futuro) |

## Estructura

```
app/
  page.tsx                  # Home: hero + categorías + productos
  buscar/page.tsx           # Resultados de búsqueda con filtros
  categoria/[slug]/page.tsx # Página de categoría
components/
  layout/                   # Header, Footer
  home/                     # Hero, CategoryGrid, FeaturedProducts
  products/                 # ProductCard, ProductGrid, Skeleton
  search/                   # SearchBar, SearchFilters, FilterDrawer
  ui/                       # Badge, Button
lib/
  mercadolibre.ts           # Servicio MercadoLibre API
  aliexpress.ts             # Mock AliExpress (reemplazar con API real)
  categories.ts             # Definición de categorías y slugs
  utils.ts                  # formatPrice y utilidades
types/
  product.ts                # Tipos TypeScript compartidos
```

## Deploy en Vercel

1. Subir el repo a GitHub
2. Ir a [vercel.com](https://vercel.com) → **Add New Project** → importar el repo
3. En **Environment Variables**, agregar `NEXT_PUBLIC_ML_SITE=MLA`
4. Click **Deploy**

Vercel detecta Next.js automáticamente, sin configuración extra.

## Conectar AliExpress real

1. Registrarse en [AliExpress Portals](https://portals.aliexpress.com/)
2. Obtener `APP_KEY` y `APP_SECRET`
3. Agregar las variables a `.env.local` y en Vercel
4. Reemplazar la función `searchAliExpress` en `lib/aliexpress.ts` con la llamada real a la API
5. Eliminar `MOCK_PRODUCTS`

## Agregar más países (i18n de tienda)

Cambiar `NEXT_PUBLIC_ML_SITE` en `.env.local`:
- `MLA` — Argentina
- `MLM` — México  
- `MLC` — Chile
- `MLB` — Brasil
- `MLU` — Uruguay

## i18n (futuro)

Todos los strings están marcados con `// TODO: i18n`. Para migrar a next-intl:
1. `npm install next-intl`
2. Buscar todos los `// TODO: i18n` en el código
3. Extraer strings a archivos de mensajes por locale

---

Kakera Find es un proyecto de Kakera Labs.
