# BioCard

**Link in Bio + Tarjeta Digital + Rewards System**

Plataforma SaaS para creadores y negocios en Latinoamérica.

## 🌟 Características

- 🌐 Perfiles personalizables con temas
- 📊 Analytics avanzados
- 💳 Sistema de pagos (Stripe, Payphone, PayPal)
- 🎁 Plugins (Donations, Memberships, Ecommerce)
- 🏆 Sistema de recompensas
- 👥 Colaboración en equipo

## 📋 Roadmap

Ver [VERSION_ROADMAP.md](./VERSION_ROADMAP.md) para el plan de implementación completo.

## 🛠 Tech Stack

| Capa | Tecnología |
|------|------------|
| **Frontend** | Astro + React (islands) + Tailwind CSS |
| Backend | FastAPI (Python) |
| Database | PostgreSQL + Prisma |
| Auth | JWT |
| Payments | Stripe, Payphone, PayPal |
| Hosting | Cloudflare Pages (web) + Railway (API) |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL (local o cloud)

### Setup Local

```bash
# Clone repository
git clone https://github.com/WalterCun/biocard.git
cd biocard

# Start with Docker
docker-compose up -d

# O manualmente:
# Backend
cd api
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd web
npm install
npm run dev
```

### Environment Variables

Ver `.env.example` para las variables requeridas.

## 📁 Estructura del Proyecto

```
biocard/
├── api/                  # Backend FastAPI
│   ├── src/
│   │   ├── domain/      # Lógica de negocio
│   │   ├── infrastructure/  # DB, external APIs
│   │   ├── application/ # Use cases
│   │   └── api/         # Endpoints
│   └── tests/
├── web/                 # Frontend Next.js
│   ├── src/
│   │   ├── app/        # App Router
│   │   ├── components/ # React components
│   │   ├── lib/        # Utilities
│   │   └── styles/     # CSS/Tailwind
├── docker/              # Docker configs
├── docs/                # Documentación
└── scripts/             # Scripts utilities
```

## 🔧 Comandos

```bash
# Development
docker-compose up

# Run tests
pytest (backend)
npm test (frontend)

# Lint
ruff check . (backend)
npm run lint (frontend)
```

## 📝 Licencia

MIT License - ver [LICENSE](./LICENSE)

---

*Built with ❤️ for Latin American creators*