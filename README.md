# BioCard - Link in Bio + Tarjeta Digital + Rewards

Plataforma SaaS para creadores y negocios en Latinoamérica.

## 🌟 Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Framework** | Next.js 14 (Monolito) |
| **Backend** | NestJS inside (API Routes) |
| **Database** | PostgreSQL + Prisma |
| **Auth** | NextAuth.js |
| **UI** | Tailwind CSS + shadcn/ui |
| **Pagos** | Stripe, Payphone, PayPal |
| **Hosting** | Vercel |

## 📋 Roadmap

Ver [VERSION_ROADMAP.md](./VERSION_ROADMAP.md)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Run development
npm run dev

# Build
npm run build
```

## 📁 Estructura

```
biocard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes
│   │   ├── (dashboard)/       # Admin panel
│   │   ├── api/               # API routes (NestJS style)
│   │   └── [username]/        # Public profile
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui
│   │   └── admin/             # Dashboard components
│   ├── lib/                   # Utilities
│   │   ├── db.ts             # Prisma client
│   │   ├── auth.ts           # NextAuth
│   │   └── api.ts            # API helpers
│   └── prisma/               # Database schema
├── public/
└── package.json
```

## 🎯 Versiones

- v0.1.0 → Foundation (Setup, Auth, Dashboard)
- v0.2.0 → Core Links (CRUD, Drag & Drop)
- v1.0.0 → Production

---

*Built with ❤️ for Latin American creators*