# BioCard Web - Landing page

> ⚠️ THIS FILE IS AUTO-GENERATED
> Run `npm run scaffold` to regenerate

## 📁 Estructura de Carpetas

```
src/
├── pages/                    # Rutas de Astro
│   ├── index.astro          # Landing page principal
│   ├── [username].astro     # Perfil público dinámico (SSR)
│   ├── admin/               # Dashboard (React islands)
│   │   ├── index.astro
│   │   └── links.astro
│   └── api/                 # API routes
├── components/              # Componentes Astro (estáticos)
│   ├── Header.astro
│   ├── Footer.astro
│   ├── LinkCard.astro
│   └── ThemePreview.astro
├── components/              # Componentes React (interactivos)
│   ├── LinkEditor.tsx       # Island: Editor de links
│   ├── DragDropList.tsx     # Island: Reordenar
│   ├── CartDrawer.tsx       # Island: Carrito
│   └── PaymentForm.tsx      # Island: Pagos
├── layouts/
│   ├── BaseLayout.astro     # Layout base
│   └── AdminLayout.astro    # Layout dashboard
├── lib/
│   ├── api.ts               # Client API
│   ├── auth.ts              # Auth helpers
│   └── utils.ts             # Utilidades
├── stores/                  # Estado global (Nano Stores)
│   ├── userStore.ts
│   └── cartStore.ts
└── styles/
    └── global.css           # Estilos globales
```

## 🎯 Convenciones

### Archivos Astro (.astro)
- Componentes estáticos
- Server-side rendering por defecto
- Islands para interactividad

### Archivos React (.tsx)
- Solo donde necesita interactividad
- Usar `client:load` o `client:visible`

### Rutas
- `/` - Landing page (estático)
- `/[username]` - Perfil público (SSR)
- `/admin` - Dashboard (SSR con auth)
- `/admin/links` - Gestión de links

## 📝 Comandos

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview
npm run preview
```