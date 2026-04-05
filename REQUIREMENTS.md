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

#### E-commerce (Mini Ecommerce)
- Venta de productos digitales
- Carrito de compras
- Checkout con Stripe
- Pagos con Payphone (Ecuador)
- Pagos con PayPal
- Generación de facturas (PDF)
- Descuentos/Cupones
- Historial de ventas
- Dashboard de vendedor
- Inventory management

#### Email Marketing
- Colección de emails (opt-in)
- Formularios de signup customizables
- Popup de email collection
- Exportar lista de emails
- Integración con Mailchimp
- Integración con ConvertKit

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

---

### 1.2 PLUGINS / MARKETPLACE

Sistema de plugins para extender funcionalidades mediante integraciones de terceros.

#### Core Plugins (Incluidos)
| Plugin | Descripción |
|--------|-------------|
| Links | Gestión de enlaces |
| Analytics | Métricas básicas |
| Social Icons | Iconos de redes |
| QR Code | Generación de QR |
| Themes | Temas visuales |

#### Featured Plugins (Pro)
| Plugin | Descripción | Precio |
|--------|-------------|--------|
| Mini Ecommerce | Tienda de productos | $4.99/mes |
| Email Marketing | Colección y automation | $2.99/mes |
| Video Embeds | YouTube, Twitch, Vimeo | $1.99/mes |
| Music Player | Spotify, SoundCloud | $1.99/mes |
| Calendly | Citas y reservaciones | $2.99/mes |
| Donations | Recibir donaciones | $2.99/mes |
| Memberships | Contenido exclusivo | $4.99/mes |
| Course Builder | Crear y vender cursos | $9.99/mes |
| Reviews | Sistema de testimonios | $1.99/mes |
| Lead Forms | Formularios avanzados | $2.99/mes |

#### Integrations Plugins
| Plugin | Descripción | Precio |
|--------|-------------|--------|
| Mailchimp | Email automation | $2.99/mes |
| ConvertKit | Email marketing | $2.99/mes |
| Zapier | Automatizaciones | $4.99/mes |
| Google Analytics | Tracking avanzado | Free |
| Meta Pixel | Facebook tracking | Free |
| Notion | Sincronizar con Notion | $1.99/mes |
| Slack | Notificaciones | Free |
| Discord | Webhooks a Discord | Free |

#### Developer Plugins
| Plugin | Descripción | Precio |
|--------|-------------|--------|
| Custom CSS | CSS personalizado | $0.99/mes |
| Custom JS | JavaScript personalizado | $0.99/mes |
| API Access | Access a REST API | $9.99/mes |
| Webhooks | Webhooks ilimitados | $2.99/mes |

#### Plugin Marketplace Features
- Browse plugins por categoría
- Search plugins
- Install con un click
- Activate/Deactivate
- Configuración por plugin
- Subscriptions por plugin
- Developer SDK
- Ratings y reviews

---

### 1.3 Reglas de Negocio y Rate Limits

#### Rate Limits por Plan

| Recurso | Free | Basic | Pro | Enterprise |
|---------|------|-------|-----|------------|
| Links máximos | 5 | 25 | Ilimitados | Ilimitados |
| Links destacadas | 0 | 3 | 10 | Ilimitados |
| Links con schedule | ❌ | ✅ | ✅ | ✅ |
| Links con password | ❌ | ✅ | ✅ | ✅ |
| Clicks/mes | 1,000 | 10,000 | 100,000 | Ilimitados |
| Plugins activos | 3 | 10 | 25 | Ilimitados |
| Productos vendibles | 0 | 3 | 25 | Ilimitados |
| Emails/mes | 100 | 1,000 | 10,000 | Ilimitados |
| Custom domains | 0 | 1 | 3 | Ilimitados |
| Team members | 0 | 0 | 3 | 10 |
| API calls/día | 0 | 100 | 1,000 | Ilimitados |
| Almacenamiento | 100MB | 1GB | 10GB | 100GB |
| Analytics retention | 7 días | 30 días | 90 días | 1 año |

#### Reglas de Negocio

| Regla | Descripción |
|-------|-------------|
| Username uniqueness | Username debe ser único, 3-30 chars |
| URL validation | Links deben ser URLs válidas |
| Email verification | Email debe ser verificado |
| Password requirements | Mínimo 8 chars, 1 mayúscula, 1 número |
| Profile visibility | Perfiles pueden ser públicos o privados |
| Referral limits | Máximo 5 referidos por usuario |
| File upload | Solo imágenes (jpg, png, webp, gif), máx 5MB |
| Plugin limits | Máximo plugins activos según plan |

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
- Perfil público

### Sprint 2: Customization (Semana 3)
- Temas visuales
- Colores personalizados
- Custom domains

### Sprint 3: Analytics & Sharing (Semana 4)
- Analytics clicks
- QR Code
- vCard export

### Sprint 4: Embeds & Integrations (Semana 5)
- Video embeds
- Social icons

### Sprint 5: Payments (Semana 6-7)
- Stripe
- Payphone
- Mini Ecommerce

### Sprint 6: Email & Lists (Semana 8)
- Email collection
- Forms

### Sprint 7: Rewards System (Semana 9-10)
- Points system
- Referral program

### Sprint 8: Plugin System (Semana 11-12)
- Plugin marketplace
- Plugin loader

### Sprint 9: Team & Enterprise (Semana 13-14)
- Multi-user
- Roles y permisos

### Sprint 10: Polish & Launch (Semana 15-16)
- Testing
- CI/CD

---

## 3. ARQUITECTURA Y STACK

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
| Hosting | Vercel + Railway |

---

## 4. MODELO DE BASE DE DATOS

Entidades principales: User, Profile, Link, Analytics, Reward, Badge, DigitalCard, Product, Order, EmailCapture, TeamMember, Plugin, UserPlugin
