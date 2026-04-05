# BioCard - Requisitos y Planificación

## 1. REQUISITOS Y FUNCIONALIDADES

### 1.1 Requisitos Funcionales

#### Autenticación y Usuarios
- Registro con email/password
- Login con redes sociales (Google, GitHub)
- Recuperación de contraseña
- Perfil de usuario editable
- Dashboard de usuario

#### Gestión de Links
- Crear/Editar/Eliminar links
- Reordenar links (drag & drop)
- Categorizar links
- Preview de link antes de publicar
- Links con icons (emoji)
- Links condicionados por fecha (schedule)
- Links con redirección temporal

#### Personalización de Perfil
- Username único
- Display name
- Biografía/Descripción
- Foto de perfil (avatar)
- Tema visual (colores, fondo)
- Fondo personalizado (imagen/color/gradient)
- Preview del perfil público

#### Página de Perfil Público
- Renderizado de todos los links
- Diseño responsive (mobile-first)
- Animaciones en links
- Featured links (destacados)
- Redes sociales enlazadas
- Compartir via QR
- SEO optimizado

#### Analytics
- Total de visitas al perfil
- Clicks por link individual
- Dispositivos (mobile/desktop)
- Ubicación geográfica (país/ciudad)
- Fuentes de tráfico

#### Tarjeta Digital
- Generación de QR Code
- Exportar vCard (.vcf)
- Apple Wallet pass
- Google Wallet pass

#### Sistema de Rewards (Pro)
- Acumulación de puntos
- Sistema de referidos
- Niveles/Rangos de usuario
- Badges/Achievements
- Leaderboard

#### E-commerce
- Venta de productos digitales
- Checkout con Stripe
- Pagos con Payphone (Ecuador)

### 1.2 Requisitos No Funcionales
- Tiempo de carga < 3 segundos
- Autenticación segura (JWT)
- Escalabilidad
- Uptime 99.9%

---

## 2. PLANIFICACIÓN POR SPRINTS

### Sprint 0: Foundation (Semana 1)
- Setup proyecto
- Autenticación básica
- Database schema
- Dashboard shell

### Sprint 1: Core Links (Semana 2)
- CRUD links
- Reordenar links
- Perfil público básico

### Sprint 2: Customization (Semana 3)
- Temas visuales
- Colores personalizados
- Foto de perfil

### Sprint 3: Analytics & Sharing (Semana 4)
- Analytics clicks
- QR Code generation
- vCard export

### Sprint 4: Payments (Semana 5-6)
- Stripe integration
- Payphone integration
- Productos digitales

### Sprint 5: Rewards (Semana 7-8)
- Points system
- Referral program
- Badges

### Sprint 6: Polish & Launch (Semana 9-10)
- Email collection
- Embed integrations
- Testing QA

---

## 3. ARQUITECTURA Y STACK

### Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS + Shadcn/ui |
| Backend | Node.js + FastAPI (Python) |
| Database | PostgreSQL + Prisma |
| Cache | Redis |
| Auth | NextAuth.js + JWT |
| Payments | Stripe + Payphone |
| Storage | AWS S3 / Cloudflare R2 |
| Hosting | Vercel + Railway |

---

## 4. MODELO DE BASE DE DATOS

### Schema Principal

```
User:
- id, email, passwordHash, name, avatar
- plan, points, level
- createdAt, updatedAt

Profile:
- id, userId, username, displayName, bio
- theme, backgroundColor, backgroundImage
- customDomain, isPublic

Link:
- id, profileId, title, url, icon
- position, isActive, isFeatured
- clickCount, scheduleStart, scheduleEnd

Analytics:
- id, linkId, profileId, visitorId
- ip, device, country, city, referrer

Reward:
- id, userId, action, points

DigitalCard:
- id, userId, qrCode, vcardData
```

---

## 5. ITERACIONES

### Iteración 1: Backend
- Setup FastAPI + Prisma
- Modelos de database
- Auth endpoints
- CRUD de users/profiles/links

### Iteración 2: Frontend
- Setup Next.js
- UI components
- Login/Register pages
- Dashboard

### Iteración 3: Profile Publico
- Dynamic profile page
- Theme rendering
- Analytics tracking

### Iteración 4: Integrations
- Stripe checkout
- Payphone integration

### Iteración 5: Rewards
- Points backend
- Referral logic

### Iteración 6: Tests
- Integration tests
- E2E tests

---

## 6. CI/CD

### Pipeline
1. Test (lint + unit tests)
2. Build (Docker)
3. Deploy (Railway/Vercel)

### Environments
- Development: dev.biocard.app
- Staging: staging.biocard.app  
- Production: biocard.app
