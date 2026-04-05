# BioCard - Roadmap de Implementación

## Convenciones de Versiones
- v0.x.y = Pre-lanzamiento (desarrollo)
- v1.0.0 = Primera versión en producción
- v1.x.y = Mejoras post-lanzamiento

---

## v0.1.0 - FOUNDATION
**Objetivo:** Setup técnico y autenticación básica

### Tareas Técnicas
| ID | Tarea | Descripción |
|----|-------|-------------|
| T1.1 | Setup Next.js | Inicializar Next.js 14 + TypeScript + ESLint + Prettier |
| T1.2 | Setup FastAPI | Backend API con Python FastAPI |
| T1.3 | Docker Compose | Entorno de desarrollo containerizado |
| T1.4 | PostgreSQL + Prisma | Database schema y migraciones |
| T1.5 | Auth JWT | Registro, login, generación tokens |

### Tareas Frontend
| ID | Tarea | Descripción |
|----|-------|-------------|
| F1.1 | Login Page | Formulario de login con email/password |
| F1.2 | Register Page | Formulario de registro |
| F1.3 | Dashboard Shell | Layout principal con sidebar |
| F1.4 | Protected Routes | Middleware para rutas protegidas |

### Datos a Guardar
- Users: id, email, passwordHash, name, avatar, plan, createdAt
- Sessions: id, userId, token, expiresAt

### API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

**Definition of Done:**
- [ ] Proyecto corre con docker-compose up
- [ ] Usuario puede registrarse con email/password
- [ ] Usuario puede iniciar sesión
- [ ] Dashboard accesible solo autenticado

---

## v0.2.0 - CORE LINKS
**Objetivo:** Gestión básica de links

### Backend
| ID | Endpoint | Método | Descripción |
|----|----------|--------|-------------|
| L1 | /api/links | GET | Listar todos los links del usuario |
| L2 | /api/links/:id | GET | Obtener link específico |
| L3 | /api/links | POST | Crear nuevo link |
| L4 | /api/links/:id | PUT | Actualizar link |
| L5 | /api/links/:id | DELETE | Eliminar link |
| L6 | /api/links/reorder | POST | Reordenar posiciones |

### Datos Link (DB)
- id, profileId, title, url, icon, thumbnail
- position (int), isActive (bool), clickCount
- createdAt, updatedAt

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | LinksList | Lista de links con drag handles |
| C2 | LinkForm | Modal para crear/editar link |
| C3 | LinkCard | Card individual de cada link |
| C4 | DragDrop | Reordenar con @dnd-kit |
| C5 | ProfilePage | /[username] público |

### Flujo Crear Link
1. Usuario clickea "Add Link"
2. Completa: title, url, icon (emoji)
3. Backend: validar url, guardar con position=next
4. Frontend: mostrar en lista

### Flujo Reordenar
1. Usuario arrastra link
2. Optimistic UI update
3. POST /api/links/reorder con nuevas posiciones
4. Invalidar cache

### Perfil Público
- GET /api/profiles/:username
- GET /api/profiles/:username/links
- Renderizar con tema default

**Definition of Done:**
- [ ] CRUD de links funciona completamente
- [ ] Links se reordenan con drag & drop
- [ ] Perfil público accesible por /[username]
- [ ] Links renderizan correctamente en perfil

---

## v0.3.0 - CUSTOMIZATION
**Objetivo:** Personalización del perfil

### Backend
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| P1 | GET /api/profiles/me | Obtener perfil actual |
| P2 | PUT /api/profiles/me | Actualizar perfil |
| P3 | GET /api/themes | Listar temas disponibles |
| P4 | PUT /api/profiles/me/theme | Guardar tema seleccionado |

### Datos Perfil (DB)
- id, userId, username (unique), displayName
- bio, avatar, theme, backgroundColor
- backgroundImage, font, customDomain
- isPublic, createdAt, updatedAt

### Temas Predefinidos (5)
| Tema | Colores | Font |
|------|---------|------|
| Light | #FFFFFF bg, #000000 text | Inter |
| Dark | #1a1a1a bg, #ffffff text | Inter |
| Ocean | #0066cc accent | Poppins |
| Forest | #228B22 accent | Roboto |
| Sunset | #FF6B35 accent | Open Sans |

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | ProfileEditor | Formulario de edición |
| C2 | AvatarUpload | Upload de imagen |
| C3 | ThemeSelector | Preview de 5 temas |
| C4 | ColorPicker | Selección de color |
| C5 | BackgroundPicker | Color/Imagen/Gradient |
| C6 | PreviewModal | Vista previa del perfil |

### Flujo Editar Perfil
1. Usuario entra a Settings/Profile
2. Edita: username, displayName, bio, avatar
3. Selecciona tema
4. Configura background
5. Click Preview → Modal con resultado
6. Save → PUT /api/profiles/me

**Definition of Done:**
- [ ] Usuario puede editar todos los campos del perfil
- [ ] 5 temas se aplican correctamente
- [ ] Preview muestra exactamente el resultado

---

## v0.4.0 - SHARING + ANALYTICS
**Objetivo:** Compartir perfil y métricas básicas

### Backend - QR Code
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| Q1 | GET /api/profiles/:username/qr | Generar QR con URL del perfil |

### QR Code Features
- URL: https://biocard.app/[username]
- Tamaño: 512x512px
- Logo opcional en centro
- Formato: PNG

### Backend - vCard
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| V1 | GET /api/profiles/:username/vcard | Generar archivo .vcf |

### vCard Fields
- FN: displayName
- EMAIL: user email
- TEL: phone (si existe)
- URL: profile URL
- ORG: BioCard

### Backend - Analytics
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| A1 | POST /api/analytics/click | Registrar click en link |
| A2 | POST /api/analytics/visit | Registrar visita al perfil |
| A3 | GET /api/analytics/summary | Métricas del dashboard |

### Datos Analytics (DB)
- id, profileId, linkId, visitorId
- ip, userAgent, device (mobile/desktop/tablet)
- country, city, referrer, utmSource
- clickedAt, visitedAt

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | QRCodeModal | Generar y descargar QR |
| C2 | vCardButton | Descargar contacto |
| C3 | AnalyticsDashboard | Stats overview |
| C4 | ClickChart | Gráfico de clicks |
| C5 | TopLinksTable | Links más populares |

### Métricas del Dashboard
- Total visitas (últimos 7 días)
- Total clicks en links
- Links activos / total
- Top 5 links por clicks

**Definition of Done:**
- [ ] QR code genera y descarga correctamente
- [ ] vCard se importa en contactos
- [ ] Dashboard muestra métricas reales
- [ ] Clicks se registran al hacer click

---

## v0.5.0 - CUSTOM DOMAIN
**Objetivo:** Dominio personalizado

### Backend
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| D1 | PUT /api/profiles/me/domain | Configurar dominio |
| D2 | GET /api/profiles/me/domain/status | Verificar estado |
| D3 | POST /api/profiles/verify-domain | Verificar DNS |

### Datos Domain (DB)
- customDomain (string)
- domainVerified (bool)
- verificationToken (string)
- verifiedAt (timestamp)
- sslCertificate (string)

### Proceso de Verificación
1. Usuario ingresa: midominio.com
2. Backend genera TXT record: biocard-verification=xyz123
3. Usuario configura DNS
4. Cron verifica cada hora (máx 48h)
5. Si-verificado: domainVerified=true

### SSL
- Let's Encrypt automático
- Renovación cada 90 días

### Middleware
```
Request → Check Host header
  → Si es custom domain
    → Lookup en DB por customDomain
    → Renderizar perfil correspondiente
```

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | DomainInput | Campo para dominio |
| C2 | DNSInstructions | Pasos de configuración |
| C3 | VerificationStatus | Pending/Verified/Failed |

**Definition of Done:**
- [ ] Perfil accesible por dominio propio
- [ ] SSL funciona correctamente
- [ ] Verificación DNS exitosa

---

## v0.6.0 - SOCIAL + SEO
**Objetivo:** Integraciones sociales y SEO

### Backend - Social Links
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| S1 | GET /api/social-links | Listar social links |
| S2 | POST /api/social-links | Crear social link |
| S3 | PUT /api/social-links/:id | Actualizar |
| S4 | DELETE /api/social-links/:id | Eliminar |

### Datos SocialLink (DB)
- id, profileId, platform, url
- platform: instagram, twitter, youtube, tiktok, facebook, linkedin, snapchat, whatsapp

### Backend - Video Embeds
| ID | Feature | Descripción |
|----|---------|-------------|
| E1 | YouTube | Detectar youtu.be o youtube.com → iframe |
| E2 | Vimeo | Detectar vimeo.com → iframe |
| E3 | Twitch | Detectar twitch.tv → iframe |

### SEO - Meta Tags
| Tag | Valor |
|-----|-------|
| title | {displayName} \| BioCard |
| description | {bio truncado a 160 chars} |
| og:title | {displayName} |
| og:description | {bio} |
| og:image | {avatar o og-image生成} |
| twitter:card | summary_large_image |

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | SocialLinksEditor | CRUD de social links |
| C2 | PlatformIcon | Icono por plataforma |
| C3 | EmbedRenderer | Renderizar videos |
| C4 | SEOPreview | Preview de搜索引擎 |

### Integración en Perfil
- Social icons debajo de bio
- Video embeds como links especiales
- Meta tags en head de página pública

**Definition of Done:**
- [ ] Social icons aparecen en perfil
- [ ] Videos embebidos reproducen
- [ ] Facebook Debugger muestra OG correcto

---

## v0.7.0 - ADVANCED LINKS
**Objetivo:** Features avanzados de links

### Backend - Password Protection
| ID | Feature | Descripción |
|----|---------|-------------|
| P1 | POST /api/links/:id/password | Set password |
| P2 | POST /api/links/:id/verify-password | Verificar password |

### Datos Link (actualizado)
- password (string, bcrypt hash)
- showPasswordModal (bool)

### Flujo Acceso Protegido
1. Visitante clickea link
2. Backend detecta password
3. Frontend muestra modal input
4. POST /verify-password
5. Si correcto: redirigir + registrar click

### Backend - Schedule
| ID | Feature | Descripción |
|----|---------|-------------|
| S1 | Date picker en link form | scheduleStart, scheduleEnd |
| S2 | GET /links/active | Solo retornar activos por fecha |

### Datos Link (actualizado)
- scheduleStart (datetime, nullable)
- scheduleEnd (datetime, nullable)

### Backend - Featured/Pinned
| ID | Feature | Descripción |
|----|---------|-------------|
| F1 | Toggle isFeatured | Mostrar primero con badge |
| F2 | Toggle isPinned | Fijar arriba de todo |

### Backend - Link Preview
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| L1 | GET /api/links/:id/preview | Fetch Open Graph metadata |

### Metadata a Extraer
- og:title
- og:description
- og:image
- favicon

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | PasswordModal | Input de contraseña |
| C2 | SchedulePicker | Date range picker |
| C3 | ToggleFeatured | Switch para featured |
| C4 | TogglePinned | Switch para pinned |
| C5 | LinkPreview | Preview de metadata |

**Definition of Done:**
- [ ] Links con password funcionan correctamente
- [ ] Links schedule se muestran/ocultan por fecha
- [ ] Featured/Pinned aparecen al inicio
- [ ] Preview muestra metadata del URL

---

## v0.8.0 - E-COMMERCE BASIC
**Objetivo:** Gestión de productos

### Backend - Productos
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| PR1 | GET /api/products | Listar productos del usuario |
| PR2 | GET /api/products/:id | Obtener producto |
| PR3 | POST /api/products | Crear producto |
| PR4 | PUT /api/products/:id | Actualizar producto |
| PR5 | DELETE /api/products/:id | Eliminar producto |

### Datos Product (DB)
- id, sellerId, name, description
- price (decimal), currency (USD/EUR)
- fileUrl (digital), thumbnailUrl
- isActive, salesCount, inventoryCount
- createdAt, updatedAt

### Backend - Carrito
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| C1 | GET /api/cart | Obtener carrito del usuario |
| C2 | POST /api/cart/items | Agregar item |
| C3 | PUT /api/cart/items/:id | Actualizar cantidad |
| C4 | DELETE /api/cart/items/:id | Eliminar item |
| C5 | DELETE /api/cart | Vaciar carrito |

### Datos Cart (localStorage + DB)
- cartItems: [{ productId, quantity }]
-Persistido en localStorage, luego sync a DB en checkout

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | ProductsList | Grid de productos |
| C2 | ProductForm | Formulario crear/editar |
| C3 | ProductCard | Card individual |
| C4 | CartDrawer | Carrito slide-out |
| C5 | CartPage | Página de carrito |

**Definition of Done:**
- [ ] CRUD de productos funciona
- [ ] Productos con imagen muestran correctamente
- [ ] Carrito guarda items correctamente
- [ ] Productos digitales tienen fileUrl

---

## v0.9.0 - PAYMENTS
**Objetivo:** Procesadores de pago

### Stripe Integration
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| ST1 | POST /api/checkout/stripe | Crear checkout session |
| ST2 | POST /api/webhooks/stripe | Webhook payment success |

### Flujo Stripe
1. Usuario inicia checkout
2. POST /checkout/stripe → returns sessionId
3. Redirect a Stripe checkout
4. Stripe webhook → POST /webhooks/stripe
5. Crear Order en DB (status: PAID)
6. Email de confirmación

### Payphone (Ecuador)
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| PP1 | POST /api/checkout/payphone | Iniciar transacción |
| PP2 | POST /api/webhooks/payphone | Webhook de resultado |

### Flujo Payphone
1. Usuario selecciona Payphone
2. POST /checkout/payphone → returns payphoneUrl
3. Redirect a app Payphone
4. Payphone webhook → resultado
5. Crear Order en DB

### PayPal
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| PL1 | POST /api/checkout/paypal | Crear orden PayPal |
| PL2 | POST /api/webhooks/paypal | Webhook de captura |

### Orders
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| O1 | GET /api/orders | Listar órdenes |
| O2 | GET /api/orders/:id | Detalle de orden |

### Datos Order (DB)
- id, buyerId, productId, amount, currency
- status (PENDING, PAID, FAILED, REFUNDED)
- stripePaymentId, payphoneTransactionId, paypalOrderId
- createdAt, updatedAt

### Facturación
| ID | Feature | Descripción |
|----|---------|-------------|
| INV1 | Generate PDF | Crear invoice PDF |
| INV2 | Email invoice | Enviar por email |

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | CheckoutPage | Resumen + payment methods |
| C2 | StripeForm | Datos de tarjeta |
| C3 | PayphoneButton | Botón de pago Payphone |
| C4 | PayPalButton | Botón de pago PayPal |
| C5 | OrderConfirmation | Página de éxito |
| C6 | InvoicePDF | Descargar factura |

**Definition of Done:**
- [ ] Pago con Stripe funciona
- [ ] Pago con Payphone funciona (Ecuador)
- [ ] Pago con PayPal funciona
- [ ] Factura PDF se genera

---

## v0.10.0 - EMAIL MARKETING
**Objetivo:** Captura y gestión de emails

### Backend - Email Capture
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| E1 | POST /api/subscribe | Suscribir email (visitante) |
| E2 | GET /api/emails | Listar emails del perfil |
| E3 | DELETE /api/emails/:id | Eliminar email |

### Datos EmailCapture (DB)
- id, profileId, email, source (modal/embedded/form)
- subscribedAt, confirmedAt

### Email Forms
| ID | Feature | Descripción |
|----|---------|-------------|
| F1 | Modal popup | Pop-up al entrar al sitio |
| F2 | Embedded | Formulario嵌入en perfil |
| F3 | Custom styling | Colores, posicion |

### Export
| ID | Feature | Descripción |
|----|---------|-------------|
| X1 | Export CSV | Descargar lista como CSV |
| X2 | Mailchimp format | Formato para importación |

### Mailchimp Integration
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| M1 | POST /api/integrations/mailchimp | Sincronizar a Mailchimp |

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | SubscribeModal | Pop-up de suscripción |
| C2 | EmbeddedForm | Formulario en perfil |
| C3 | EmailList | Tabla de emails |
| C4 | ExportButton | Botón exportar CSV |

**Definition of Done:**
- [ ] Visitantes pueden suscribirse
- [ ] Emails aparecen en lista
- [ ] Export CSV funciona
- [ ] Sync a Mailchimp funciona

---

## v0.11.0 - PLUGIN SYSTEM
**Objetivo:** Sistema de plugins

### Plugin Schema (DB)
| Tabla | Campos |
|-------|---------|
| Plugin | id, name, slug, description, icon, version, category, price, isCore, settingsSchema |
| UserPlugin | id, userId, pluginId, isActivated, settings (JSON), subscribedAt |

### Plugin Categories
- FEATURED: ecommerce, email, video, music, calendly, donations, memberships, reviews
- INTEGRATIONS: mailchimp, convertkit, zapier, google_analytics, meta_pixel
- DEVELOPER: custom_css, custom_js, api_access, webhooks

### Backend
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| PL1 | GET /api/plugins | Listar todos los plugins |
| PL2 | GET /api/plugins/:slug | Detalle de plugin |
| PL3 | POST /api/plugins/:slug/install | Instalar plugin |
| PL4 | DELETE /api/plugins/:slug/uninstall | Desinstalar |
| PL5 | PUT /api/plugins/:slug/settings | Guardar settings |

### Plugin Loader System
```javascript
// Cargar plugins activos del usuario
const userPlugins = await db.userPlugin.findMany({
  where: { isActivated: true }
});
const loadedPlugins = userPlugins.map(p => loadPlugin(p));
```

### Frontend - Marketplace
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | PluginBrowser | Explorar plugins por categoría |
| C2 | PluginCard | Card con info del plugin |
| C3 | PluginDetail | Modal con descripción completa |
| C4 | PluginSettings | Formulario de configuración |

**Definition of Done:**
- [ ] Plugins listan correctamente
- [ ] Plugins se instalan/desinstalan
- [ ] Settings se guardan
- [ ] Plugins activos cargan en perfil

---

## v0.12.0 - DONATIONS
**Objetivo:** Sistema de donativos

### Backend
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| D1 | GET /api/donations/campaign | Obtener campaña |
| D2 | PUT /api/donations/campaign | Configurar campaña |
| D3 | POST /api/donations | Procesar donación |
| D4 | GET /api/donations | Listar donaciones |

### Datos Campaign (DB)
- id, userId, name, description
- goalAmount, currentAmount
- currency, isActive
- showDonors (bool)

### Datos Donation (DB)
- id, campaignId, donorEmail, amount
- message, status (PENDING, COMPLETED, FAILED)
- paymentMethod, transactionId
- createdAt

### Donation Form Features
- One-time / Recurring toggle
- Preset amounts: $5, $10, $25, $50, $100
- Custom amount input
- Message opcional
- Goal progress bar

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | CampaignEditor | Configurar campaña |
| C2 | DonationForm | Formulario de donación |
| C3 | ProgressBar | Meta de recaudo |
| C4 | DonorList | Lista de donantes |

**Definition of Done:**
- [ ] Campaña configurable
- [ ] Donaciones procesan correctamente
- [ ] Progress bar actualiza
- [ ] Lista de donantes visible

---

## v0.13.0 - MEMBERSHIPS
**Objetivo:** Sistema de membresías

### Backend - Tiers
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| T1 | GET /api/memberships/tiers | Listar niveles |
| T2 | POST /api/memberships/tiers | Crear nivel |
| T3 | PUT /api/memberships/tiers/:id | Editar nivel |
| T4 | DELETE /api/memberships/tiers/:id | Eliminar nivel |

### Datos MembershipTier (DB)
- id, userId, name, price, interval (monthly/yearly)
- description, features (JSON array)
- isActive

### Backend - Subscriptions
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| S1 | POST /api/memberships/subscribe | Iniciar suscripción |
| S2 | GET /api/memberships/subscription | Ver suscripción actual |
| S3 | PUT /api/memberships/subscription/cancel | Cancelar |

### Datos Subscription (DB)
- id, userId, tierId, status (ACTIVE, CANCELED, PAST_DUE)
- currentPeriodStart, currentPeriodEnd
- stripeSubscriptionId

### Stripe Subscriptions
| ID | Feature | Descripción |
|----|---------|-------------|
| SS1 | Create product | Crear producto en Stripe |
| SS2 | Create price | Crear precio por tier |
| SS3 | Checkout | Session de suscripción |
| SS4 | Webhook | Sincronizar estado |

### Gated Content
| ID | Feature | Descripción |
|----|---------|-------------|
| G1 | Link gating | Links visibles solo a miembros |
| G2 | Content gating | Contenido restringido |
| G3 | Access check | Verificar suscripción activa |

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | TierEditor | Crear/editar niveles |
| C2 | TierCard | Mostrar plan |
| C3 | SubscribeButton | Botón de suscripción |
| C4 | MemberContent | Contenido exclusivo |

**Definition of Done:**
- [ ] Múltiples niveles configurables
- [ ] Suscripciones procesan con Stripe
- [ ] Contenido exclusivo accesible
- [ ] Cancelación funciona

---

## v0.14.0 - REWARDS
**Objetivo:** Gamificación y engagement

### Points System
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| P1 | GET /api/points | Ver puntos actuales |
| P2 | GET /api/points/history | Historial de puntos |
| P3 | POST /api/points/award | Award points (internal) |

### Points Accumulation
| Acción | Puntos |
|--------|--------|
| Complete profile | +50 |
| Create link | +10 |
| Get first 100 clicks | +100 |
| Daily login | +5 |
| Share profile | +20 |

### Datos Points (DB)
- id, userId, points (total), level
- history: [{ action, points, createdAt }]

### Levels
| Level | Points Required |
|-------|-----------------|
| Bronze | 0-99 |
| Silver | 100-499 |
| Gold | 500-999 |
| Platinum | 1000+ |

### Referral Program
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| R1 | GET /api/referrals/link | Obtener link de referido |
| R2 | POST /api/referrals/track | Registrar referido |

### Datos Referral (DB)
- id, referrerId, referredId, rewardPoints
- status (PENDING, CONFIRMED)
- createdAt

### Referral Rewards
- Referrer: +100 puntos cuando referido se registra
- Referido: +50 puntos al registrarse con link

### Badges
| ID | Badge | Criteria |
|----|-------|----------|
| B1 | First Link | Crear primer link |
| B2 | 10 Links | 10 links creados |
| B3 | 1K Clicks | 1000 clicks totales |
| B4 | 10 Referrals | 10 referidos |
| B5 | 30 Day Streak | 30 días consecutive login |

### Datos Badge (DB)
- Badge: id, name, description, icon, criteria (JSON)
- UserBadge: id, userId, badgeId, earnedAt

### Leaderboard
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| L1 | GET /api/leaderboard | Top usuarios por puntos |

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | PointsDisplay | Mostrar puntos y nivel |
| C2 | ProgressBar | Progreso al siguiente nivel |
| C3 | ReferralLink | Link para compartir |
| C4 | BadgeGrid | Grid de badges |
| C5 | Leaderboard | Ranking de usuarios |

**Definition of Done:**
- [ ] Puntos acumul正确的
- [ ] Niveles actualizan correctamente
- [ ] Referidos otorgan puntos
- [ ] Badges se otorgan automáticamente

---

## v0.15.0 - TEAM
**Objetivo:** Colaboración en equipo

### Backend - Team
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| T1 | GET /api/team | Listar miembros del equipo |
| T2 | POST /api/team/invite | Invitar miembro |
| T3 | PUT /api/team/:id/role | Cambiar rol |
| T4 | DELETE /api/team/:id | Eliminar miembro |
| T5 | POST /api/team/accept | Aceptar invitación |

### Datos TeamMember (DB)
- id, profileId, userId, role
- role: OWNER, ADMIN, EDITOR, VIEWER
- invitedAt, joinedAt

### Permissions Matrix
| Acción | OWNER | ADMIN | EDITOR | VIEWER |
|--------|-------|-------|--------|--------|
| Ver perfil | ✅ | ✅ | ✅ | ✅ |
| Editar perfil | ✅ | ✅ | ✅ | ❌ |
| Crear links | ✅ | ✅ | ✅ | ❌ |
| Editar links | ✅ | ✅ | ✅ | ❌ |
| Eliminar links | ✅ | ✅ | ✅ | ❌ |
| Ver analytics | ✅ | ✅ | ✅ | ✅ |
| Gestionar productos | ✅ | ✅ | ✅ | ❌ |
| Gestionar equipo | ✅ | ✅ | ❌ | ❌ |
| Eliminar perfil | ✅ | ❌ | ❌ | ❌ |

### Invite Flow
1. OWNER/ADMIN ingresa email
2. Sistema crea TeamMember (pending)
3. Email enviado con link
4. Usuario hace click → registra/login
5. TeamMember actualizado (confirmed)

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | TeamList | Lista de miembros |
| C2 | InviteModal | Formulario de invitación |
| C3 | RoleSelect | Selector de rol |
| C4 | InviteCard | Pending invitations |

**Definition of Done:**
- [ ] Invitaciones funcionan
- [ ] Roles se aplican correctamente
- [ ] Permisos respetados en UI y API

---

## v0.16.0 - API + WEBHOOKS
**Objetivo:** Para developers

### REST API
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| A1 | GET /api/v1/users | Obtener usuario actual |
| A2 | GET /api/v1/profile | Obtener perfil |
| A3 | GET /api/v1/links | Obtener links |
| A4 | GET /api/v1/analytics | Obtener analytics |

### API Authentication
| ID | Feature | Descripción |
|----|---------|-------------|
| Auth1 | API Keys | GET /api/v1/keys generar key |
| Auth2 | Bearer token | Authorization: Bearer {api_key} |

### Datos ApiKey (DB)
- id, userId, key (hashed), name, lastUsedAt
- permissions (read/write), createdAt

### Rate Limits
| Plan | Requests/Day |
|------|--------------|
| Free | 0 |
| Basic | 100 |
| Pro | 1,000 |
| Enterprise | Unlimited |

### Webhooks
| ID | Endpoint | Descripción |
|----|-----------|-------------|
| W1 | GET /api/webhooks | Listar webhooks |
| W2 | POST /api/webhooks | Crear webhook |
| W3 | PUT /api/webhooks/:id | Editar webhook |
| W4 | DELETE /api/webhooks/:id | Eliminar webhook |

### Webhook Events
| Event | Descripción |
|-------|-------------|
| link.created | Nuevo link creado |
| link.clicked | Click en link |
| link.updated | Link actualizado |
| link.deleted | Link eliminado |
| order.paid | Orden pagada |
| subscription.created | Nueva suscripción |
| subscription.canceled | Suscripción cancelada |

### Webhook Payload
```json
{
  "event": "link.clicked",
  "timestamp": "2026-04-05T12:00:00Z",
  "data": {
    "linkId": "123",
    "profileId": "456"
  }
}
```

### Retry Logic
- 3 intentos con exponential backoff
- 1min, 5min, 25min

### Frontend
| ID | Componente | Descripción |
|----|------------|-------------|
| C1 | ApiKeysManager | Generar y listar keys |
| C2 | WebhookEditor | Crear/editar webhooks |
| C3 | WebhookLogs | Ver logs de envios |
| C4 | ApiDocs | Documentación |

**Definition of Done:**
- [ ] API keys funcionan
- [ ] Endpoints responden correctamente
- [ ] Webhooks se disparan
- [ ] Documentación disponible

---

## v1.0.0 - PRODUCCIÓN
**Objetivo:** Lanzamiento público

### Performance
| ID | Tarea | Target |
|----|-------|--------|
| PF1 | Lighthouse Performance | > 90 |
| PF2 | Image Optimization | Next.js Image |
| PF3 | CDN Setup | Cloudflare |
| PF4 | Caching | Redis + stale-while-revalidate |
| PF5 | Load Testing | k6 - 1000 concurrent users |

### Security
| ID | Tarea | Descripción |
|----|-------|-------------|
| SE1 | OWASP Top 10 | Audit completo |
| SE2 | Rate Limiting | API + auth endpoints |
| SE3 | Input Sanitization | XSS prevention |
| SE4 | Security Headers | CSP, HSTS, etc |
| SE5 | GDPR Compliance | Cookie consent, data export |

### Testing
| ID | Tarea | Descripción |
|----|-------|-------------|
| T1 | Unit Tests | Jest - 70% coverage |
| T2 | E2E Tests | Playwright - critical paths |
| T3 | Integration Tests | API endpoints |
| T4 | Security Tests | SQL injection, XSS |

### CI/CD
| ID | Tarea | Descripción |
|----|-------|-------------|
| CD1 | GitHub Actions | CI pipeline |
| CD2 | Auto Deploy | Staging en push a main |
| CD3 | Production Deploy | Release workflow |
| CD4 | Database Migrations | Auto apply |

### Monitoring
| ID | Tarea | Descripción |
|----|-------|-------------|
| M1 | Health Checks | /health, /health/db |
| M2 | Error Tracking | Sentry |
| M3 | Analytics | Page views, actions |
| M4 | Uptime Monitor | Pingdom uptime |

### Landing Page
| ID | Feature | Descripción |
|----|---------|-------------|
| LP1 | Hero Section | CTA - Start Free |
| LP2 | Features | Ventajas de BioCard |
| LP3 | Pricing | Planes |
| LP4 | Testimonials | Usuarios satisfechos |
| LP5 | Blog | Content marketing |
| LP6 | Contact | Formulario de contacto |

**Definition of Done:**
- [ ] Lighthouse > 90
- [ ] Tests pasan (70%+ coverage)
- [ ] Deploy automático funciona
- [ ] Landing page en producción
- [ ] Monitoreo activo

---

## RESUMEN COMPLETO

| Versión | Enfoque | Endpoints/API | Frontend | DB |
|---------|---------|---------------|----------|-----|
| **v0.1.0** | Foundation | 4 auth endpoints | 4 pages | 2 tables |
| **v0.2.0** | Core Links | 6 links endpoints | 5 components | +1 table |
| **v0.3.0** | Customization | 4 profile endpoints | 6 components | +1 table |
| **v0.4.0** | Sharing | 4 analytics + QR + vCard | 5 components | +1 table |
| **v0.5.0** | Domain | 3 domain endpoints | 3 components | +1 table |
| **v0.6.0** | Social+SEO | 4 social + embeds | 4 components | +1 table |
| **v0.7.0** | Advanced Links | 8 advanced endpoints | 5 components | - |
| **v0.8.0** | Ecommerce | 9 product + cart endpoints | 5 components | +2 tables |
| **v0.9.0** | Payments | 6 checkout + 4 order | 6 components | +1 table |
| **v0.10.0** | Email | 3 email + export | 4 components | +1 table |
| **v0.11.0** | Plugins | 5 plugin endpoints | 4 components | +2 tables |
| **v0.12.0** | Donations | 4 donation endpoints | 4 components | +2 tables |
| **v0.13.0** | Memberships | 9 membership endpoints | 4 components | +2 tables |
| **v0.14.0** | Rewards | 7 points + referral + badges | 5 components | +3 tables |
| **v0.15.0** | Team | 5 team endpoints | 4 components | +1 table |
| **v0.16.0** | API+Webhooks | 10 API + 4 webhook | 4 components | +2 tables |
| **v1.0.0** | Production | Full system | Landing page | - |

**Total: 17 versiones | ~80+ endpoints | ~60+ componentes**

---

## ORDEN DE IMPLEMENTACIÓN (SECUENCIAL)

```
v0.1.0 → v0.2.0 → v0.3.0 → v0.4.0 → v0.5.0 → v0.6.0
    ↓
v0.7.0 → v0.8.0 → v0.9.0 → v0.10.0 → v0.11.0 → v0.12.0
    ↓
v0.13.0 → v0.14.0 → v0.15.0 → v0.16.0 → v1.0.0
```

**Cada versión debe completarse antes de iniciar la siguiente.**

---

*Document Version: 1.0*  
*Last Updated: 2026-04-05*
