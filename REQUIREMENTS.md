# BioCard - Requisitos y Planificación

## 1. REQUISITOS Y FUNCIONALIDADES

### 1.1 Requisitos Funcionales

#### Autenticación y Usuarios
- Registro con email/password
- Login con redes sociales (Google, GitHub, Discord)
- Recuperación de contraseña
- Autenticación de dos factores (2FA)
- Perfil de usuario editable
- Dashboard de usuario
- Eliminación de cuenta

#### Gestión de Links (CRUD)
- Crear/Editar/Eliminar links
- Reordenar links (drag & drop)
- Preview de link antes de publicar
- Links con icons (emoji)
- Links condicionados por fecha (schedule)
- Links con redirección temporal
- Links condicionados por ubicación
- Links con password protection
- Links con limite de clicks
- Clonar links

#### Personalización de Perfil
- Username único
- Display name
- Biografía/Descripción
- Foto de perfil (avatar)
- Tema visual (colores predefinidos)
- Fondo personalizado (imagen/color/gradient)
- Custom domain (tusitio.com)
- Preview del perfil público
- Banners/Headers personalizados

#### Página de Perfil Público
- Renderizado de todos los links
- Diseño responsive (mobile-first)
- Animaciones en links
- Featured links (destacados)
- Pinned links
- Redes sociales enlazadas
- Compartir via QR
- SEO optimizado (meta tags, Open Graph)
- Dark/Light mode
- Password protection del perfil

#### Analytics
- Total de visitas al perfil
- Clicks por link individual
- Dispositivos (mobile/desktop/tablet)
- Ubicación geográfica (país/ciudad)
- Fuentes de tráfico
- Tiempo de permanencia
- Historial de analytics
- UTM tracking
- Conversion tracking

#### Tarjeta Digital
- Generación de QR Code
- QR Code con logo custom
- Exportar vCard (.vcf)
- Apple Wallet pass
- Google Wallet pass
- NFC sharing (vía app)

#### Sistema de Rewards (Pro)
- Acumulación de puntos
- Sistema de referidos
- Niveles/Rangos de usuario
- Badges/Achievements
- Leaderboard
- Daily login bonuses
- Points multiplier por referrals

#### Gamificación
- Niveles (Bronze, Silver, Gold, Platinum)
- Badges por hitos
- Progreso visual
- Streaks de actividad
- Ranks mensuales

#### E-commerce
- Venta de productos digitales
- Carrito de compras
- Checkout con Stripe
- Pagos con Payphone (Ecuador)
- Pagos con PayPal
- Generación de facturas (PDF)
- Descuentos/Cupones
- Historial de ventas
- Dashboard de vendedor

#### Email Marketing
- Colección de emails (opt-in)
- Formularios de signup customizables
- Popup de email collection
- Exportar lista de emails
- Integración con Mailchimp
- Integración con ConvertKit
- Email automation (autoresponder)

#### Embeds
- YouTube embeds
- Twitch streams
- Spotify/SoundCloud
- Instagram posts/stories
- Twitter/X embeds
- Vimeo embeds
- TikTok embeds
- Calendly embeds

#### Team Collaboration (Enterprise)
- Multi-user acceso
- Roles (Admin, Editor, Viewer)
- Approval workflows
- Activity logs

#### API & Integrations
- REST API
- Webhooks
- Zapier integration
- Make (Integromat)
- Pixel tracking (FB, TikTok, Google)

### 1.2 Reglas de Negocio y Rate Limits

#### Rate Limits por Plan

| Recurso | Free | Basic | Pro | Enterprise |
|---------|------|-------|-----|------------|
| Links máximos | 5 | 25 | Ilimitados | Ilimitados |
| Links destacadas | 0 | 3 | 10 | Ilimitados |
| Links con schedule | ❌ | ✅ | ✅ | ✅ |
| Links con password | ❌ | ✅ | ✅ | ✅ |
| Clicks/mes | 1,000 | 10,000 | 100,000 | Ilimitados |
| Productos vendibles | 0 | 3 | 25 | Ilimitados |
| Emails/mes | 100 | 1,000 | 10,000 | Ilimitados |
| Perfiles adicionales | 0 | 0 | 3 | 10 |
| Custom domains | 0 | 1 | 3 | Ilimitados |
| Team members | 0 | 0 | 3 | 10 |
| API calls/día | 0 | 100 | 1,000 | Ilimitados |
| Almacenamiento | 100MB | 1GB | 10GB | 100GB |
| Analytics retention | 7 días | 30 días | 90 días | 1 año |

#### Reglas de Negocio

| Regla | Descripción |
|-------|-------------|
| Username uniqueness | Username debe ser único, 3-30 chars, solo letras,números,guiones |
| URL validation | Links deben ser URLs válidas |
| Email verification | Email debe ser verificado antes de activar cuenta |
| Password requirements | Mínimo 8 chars, 1 mayúscula, 1 número |
| Profile visibility | Perfiles pueden ser públicos o privados |
| Content moderation | Links con contenido prohibido se eliminan |
| Spam prevention | Rate limiting en creación de links |
| Referral limits | Máximo 5 referidos por usuario para evitar abuso |
| File upload | Solo imágenes (jpg, png, webp, gif), máx 5MB |
| Custom domain | Debe verificar propiedad via DNS/CNAME |

#### Límites de Seguridad

| Límite | Valor |
|--------|-------|
| Login attempts | 5 por 15 minutos |
| Password reset | 3 por hora |
| API rate | 100/min (default) |
| File uploads | 10/hora |
| Links created | 50/día |

### 1.3 Requisitos No Funcionales
- Tiempo de carga < 3 segundos
- Autenticación segura (JWT + bcrypt)
- Escalabilidad (100k+ usuarios)
- Uptime 99.9%
- GDPR compliant
- WCAG 2.1 AA accesibilidad

---

## 2. PLANIFICACIÓN POR SPRINTS

### Sprint 0: Foundation (Semana 1)
- Setup proyecto (Next.js + FastAPI + Prisma)
- Autenticación básica (JWT)
- Database schema completo
- Dashboard shell

### Sprint 1: Core Links (Semana 2)
- CRUD links completo
- Reordenar links (drag & drop)
- Preview link
- Perfil público básico

### Sprint 2: Customization (Semana 3)
- Temas visuales
- Colores personalizados
- Fondo personalizado
- Foto de perfil
- Custom domains

### Sprint 3: Analytics & Sharing (Semana 4)
- Analytics clicks y views
- QR Code generation
- vCard export
- Device/geo tracking

### Sprint 4: Embeds & Integrations (Semana 5)
- Video embeds (YouTube, Twitch, Spotify)
- Social icons
- SEO optimization
- Open Graph images

### Sprint 5: Payments (Semana 6-7)
- Stripe integration
- Payphone integration
- Productos digitales
- Carrito y checkout

### Sprint 6: Email & Lists (Semana 8)
- Email collection
- Forms customizables
- Export emails

### Sprint 7: Rewards System (Semana 9-10)
- Points system
- Referral program
- Badges/Achievements
- Leaderboard

### Sprint 8: Team & Enterprise (Semana 11-12)
- Multi-user
- Roles y permisos
- API access
- Webhooks

### Sprint 9: Polish & Launch (Semana 13-14)
- Performance optimization
- Security audit
- Testing QA
- CI/CD setup

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
| Payments | Stripe + Payphone + PayPal |
| Storage | AWS S3 / Cloudflare R2 |
| Email | Resend / SendGrid |
| Hosting | Vercel + Railway |

---

## 4. MODELO DE BASE DE DATOS

### Schema Principal

```
User {
  id, email (unique), passwordHash
  name, avatar, phone
  plan (FREE|BASIC|PRO|ENTERPRISE)
  points, level, streak
  emailVerified, twoFactorEnabled
  createdAt, updatedAt
}

Profile {
  id, userId
  username (unique)
  displayName, bio
  theme, backgroundColor, backgroundImage, font
  customDomain, isPublic, passwordHash
  createdAt, updatedAt
}

Link {
  id, profileId
  title, url, icon, thumbnail
  position, isActive, isFeatured, isPinned
  category, clickLimit
  password, scheduleStart, scheduleEnd
  clickCount, createdAt, updatedAt
}

SocialLink {
  id, profileId
  platform (instagram|twitter|youtube|tiktok|etc)
  url
}

Analytics {
  id, linkId, profileId, sessionId
  ip, userAgent, device, country, city
  referrer, utmSource, utmMedium, utmCampaign
  clickedAt
}

Reward {
  id, userId
  action, points
  multiplier, createdAt
}

Badge {
  id, name, description, icon, criteria
}

UserBadge {
  id, userId, badgeId, earnedAt
}

Referral {
  id, referrerId, referredId
  rewardPoints, status, createdAt
}

DigitalCard {
  id, userId
  qrCode, qrLogo
  vcardData, applePass, googlePass
}

Product {
  id, sellerId
  name, description, price, currency
  fileUrl, thumbnailUrl
  isActive, salesCount
}

Order {
  id, buyerId, productId
  amount, currency, status
  stripePaymentId, payphoneId
}

EmailCapture {
  id, profileId
  email, source, createdAt
}

TeamMember {
  id, profileId, userId
  role (OWNER|ADMIN|EDITOR|VIEWER)
}
```

---

## 5. ITERACIONES

### Iteración 1: Backend Foundation
- Setup FastAPI + Prisma
- Modelos de database
- Auth endpoints
- CRUD users/profiles/links

### Iteración 2: Frontend Foundation
- Setup Next.js
- UI components
- Login/Register pages
- Dashboard

### Iteración 3: Profile Publico
- Dynamic profile page
- Theme rendering
- Analytics tracking

### Iteración 4: Embeds
- Video embeds
- Social links

### Iteración 5: Payments
- Stripe checkout
- Payphone

### Iteración 6: Rewards
- Points backend
- Referral logic
- Badges

### Iteración 7: Teams
- Multi-user
- Permissions

### Iteración 8: Tests
- Integration tests
- E2E tests
- Security tests

---

## 6. CI/CD

### Pipeline
1. Lint + Type check
2. Unit tests (70%+ coverage)
3. Build
4. Security scan
5. Deploy to staging
6. E2E tests
7. Deploy to production

### Environments
- Development: dev.biocard.app
- Staging: staging.biocard.app  
- Production: biocard.app
