# BioCard - Roadmap de Implementación

## Convenciones de Versiones

- **v0.x.y** = Pre-lanzamiento (desarrollo)
- **v1.0.0** = Primera versión en producción
- **v1.x.y** = Mejoras post-lanzamiento

---

## SECUENCIA DE IMPLEMENTACIÓN (Pre-Producción)

### v0.1.0 - FOUNDATION
**Objetivo:** Setup técnico y autenticación

| Tarea | Descripción |
|-------|-------------|
| Setup Next.js 14 + TypeScript | Repo, estructura, ESLint, Prettier |
| Setup FastAPI + Python | Backend API |
| Docker Compose | Entorno de desarrollo |
| PostgreSQL + Prisma | Schema de database |
| Registro/Login JWT | Autenticación básica |
| Dashboard Shell | Layout responsive |

**Definition of Done:**
- [ ] Proyecto corre localmente
- [ ] Usuario puede registrarse e iniciar sesión

---

### v0.2.0 - CORE LINKS
**Objetivo:** Gestión básica de links

| Tarea | Descripción |
|-------|-------------|
| CRUD Links | Create, Read, Update, Delete |
| Drag & Drop | Reordenar links |
| Perfil Público | Ruta /[username] |
| Render Links | Mostrar en perfil |
| Links Básicos | Título, URL, ícono |

**Definition of Done:**
- [ ] Usuario puede crear y gestionar links
- [ ] Perfil público muestra links correctamente

---

### v0.3.0 - CUSTOMIZATION
**Objetivo:** Personalización del perfil

| Tarea | Descripción |
|-------|-------------|
| Editor de Perfil | displayName, bio, avatar |
| Temas Visuales | 5 temas predefinidos |
| Background | Color, imagen, gradiente |
| Preview | Vista previa en tiempo real |

**Definition of Done:**
- [ ] Usuario puede personalizar su perfil
- [ ] Temas se aplican correctamente

---

### v0.4.0 - SHARING + ANALYTICS
**Objetivo:** Compartir y métricas básicas

| Tarea | Descripción |
|-------|-------------|
| QR Code | Generar código QR |
| vCard Export | Descargar contacto |
| Click Tracking | Registrar clicks |
| Visit Tracking | Registrar visitas |
| Dashboard Analytics | Métricas básicas |

**Definition of Done:**
- [ ] QR code genera correctamente
- [ ] Analytics muestra clicks y visitas

---

### v0.5.0 - CUSTOM DOMAIN
**Objetivo:** Dominio personalizado

| Tarea | Descripción |
|-------|-------------|
| Domain Input | Usuario ingresa dominio |
| DNS Verification | Verificar propiedad |
| SSL Certificate | Let's Encrypt |
| Middleware | Detectar custom domain |

**Definition of Done:**
- [ ] Perfil accesible por dominio propio

---

### v0.6.0 - SOCIAL + SEO
**Objetivo:** Integraciones sociales

| Tarea | Descripción |
|-------|-------------|
| Social Links | Iconos de redes sociales |
| Video Embeds | YouTube, Vimeo, Twitch |
| Meta Tags | SEO dinámico |
| Open Graph | Imágenes para compartir |

**Definition of Done:**
- [ ] Redes sociales aparecen en perfil
- [ ] Videos embebidos funcionan

---

### v0.7.0 - ADVANCED LINKS
**Objetivo:** Features avanzados de links

| Tarea | Descripción |
|-------|-------------|
| Password Protection | Proteger links con contraseña |
| Schedule Links | Fechas de actividad |
| Featured Links | Links destacados |
| Pinned Links | Links fijados |
| Link Preview | Fetch metadata |

**Definition of Done:**
- [ ] Links con contraseña funcionan
- [ ] Links programados se muestran/ocultan correctamente

---

### v0.8.0 - E-COMMERCE BASIC
**Objetivo:** Gestión de productos

| Tarea | Descripción |
|-------|-------------|
| CRUD Productos | Crear productos |
| Image Upload | Imágenes de productos |
| File Upload | Productos digitales |
| Carrito | Agregar/quitar items |
| Cart Page | Vista del carrito |

**Definition of Done:**
- [ ] Usuario puede crear productos
- [ ] Carrito funciona correctamente

---

### v0.9.0 - PAYMENTS
**Objetivo:** Procesadores de pago

| Tarea | Descripción |
|-------|-------------|
| Stripe Checkout | Pagos con tarjeta |
| Payphone | Pagos Ecuador |
| PayPal | Pagos PayPal |
| Order Management | Órdenes en DB |
| PDF Invoice | Facturación |

**Definition of Done:**
- [ ] Pagos con tarjeta funcionan
- [ ] Pagos con Payphone funcionan
- [ ] Facturas se generan

---

### v0.10.0 - EMAIL MARKETING
**Objetivo:** Captura de emails

| Tarea | Descripción |
|-------|-------------|
| Email Capture | Formulario de suscripción |
| Custom Forms | Formularios editables |
| Export CSV | Descargar lista |
| Mailchimp | Integración |

**Definition of Done:**
- [ ] Visitantes pueden suscribirse
- [ ] Emails exportables

---

### v0.11.0 - PLUGIN SYSTEM
**Objetivo:** Sistema de plugins

| Tarea | Descripción |
|-------|-------------|
| Plugin Schema | Tabla de plugins |
| Plugin Loader | Cargar plugins |
| Marketplace UI | Explorar plugins |
| Install/Enable | Activar plugins |

**Definition of Done:**
- [ ] Plugins pueden instalarse

---

### v0.12.0 - DONATIONS
**Objetivo:** Sistema de donativos

| Tarea | Descripción |
|-------|-------------|
| Campaign Setup | Configurar campaña |
| Donation Form | Formulario de donación |
| Goal Tracking | Meta de recaudo |
| Donor List | Lista de donantes |

**Definition of Done:**
- [ ] Donaciones funcionan

---

### v0.13.0 - MEMBERSHIPS
**Objetivo:** Sistema de membresías

| Tarea | Descripción |
|-------|-------------|
| Create Tiers | Crear niveles |
| Stripe Subs | Suscripciones Stripe |
| Gated Content | Contenido exclusivo |
| Access Control | Verificar membresía |

**Definition of Done:**
- [ ] Suscripciones funcionan
- [ ] Contenido exclusivo accesible

---

### v0.14.0 - REWARDS
**Objetivo:** Gamificación

| Tarea | Descripción |
|-------|-------------|
| Points System | Sistema de puntos |
| Referral Program | Programa de referidos |
| Badges | Logros |
| Leaderboard | Ranking |

**Definition of Done:**
- [ ] Puntos se acumulan
- [ ] Referidos otorgan recompensas

---

### v0.15.0 - TEAM
**Objetivo:** Colaboración

| Tarea | Descripción |
|-------|-------------|
| Invite Members | Invitar usuarios |
| Accept Invite | Aceptar invitación |
| Roles | OWNER, ADMIN, EDITOR, VIEWER |
| Permissions | Restringir acceso |

**Definition of Done:**
- [ ] Equipos funcionan
- [ ] Roles se aplican

---

### v0.16.0 - API + WEBHOOKS
**Objetivo:** Para developers

| Tarea | Descripción |
|-------|-------------|
| REST API | Endpoints públicos |
| API Keys | Autenticación API |
| Webhooks | Notificaciones |
| Documentation | Docs API |

**Definition of Done:**
- [ ] API expuesta
- [ ] Webhooks funcionan

---

## v1.0.0 - PRODUCCIÓN
**Objetivo:** Lanzamiento público

| Tarea | Descripción |
|-------|-------------|
| Performance | Lighthouse > 90 |
| Security | OWASP audit |
| Testing | Unit + E2E tests |
| CI/CD | Deploy automático |
| Monitoring | Health checks |
| Landing Page | Página de inicio |

**Definition of Done:**
- [ ] Sistema en producción
- [ ] Monitoreo activo
- [ ] Docs completas

---

## RESUMEN DE VERSIONES PRE-PRODUCCIÓN

| Versión | Enfoque | Features Clave |
|---------|---------|----------------|
| **v0.1.0** | Foundation | Setup, Auth, Dashboard |
| **v0.2.0** | Core Links | CRUD, Drag & Drop, Perfil |
| **v0.3.0** | Customization | Perfil, Temas, Background |
| **v0.4.0** | Sharing | QR, vCard, Analytics |
| **v0.5.0** | Custom Domain | Dominio propio, SSL |
| **v0.6.0** | Social + SEO | Embeds, Meta tags |
| **v0.7.0** | Advanced Links | Password, Schedule, Pinned |
| **v0.8.0** | E-commerce | Productos, Carrito |
| **v0.9.0** | Payments | Stripe, Payphone, PayPal |
| **v0.10.0** | Email | Capture, Export |
| **v0.11.0** | Plugin System | Marketplace, Loader |
| **v0.12.0** | Donations | Campaigns, Donors |
| **v0.13.0** | Memberships | Tiers, Subscriptions |
| **v0.14.0** | Rewards | Points, Referrals, Badges |
| **v0.15.0** | Team | Multi-user, Roles |
| **v0.16.0** | API + Webhooks | REST API, Webhooks |
| **v1.0.0** | **PRODUCCIÓN** | Launch público |

**Total pre-producción: 16 versiones (v0.1.0 - v0.16.0)**

---

## ORDEN DE IMPLEMENTACIÓN

```
v0.1.0 → v0.2.0 → v0.3.0 → v0.4.0 → v0.5.0 → v0.6.0
    ↓
v0.7.0 → v0.8.0 → v0.9.0 → v0.10.0 → v0.11.0 → v0.12.0
    ↓
v0.13.0 → v0.14.0 → v0.15.0 → v0.16.0 → v1.0.0 (PROD)
```

Cada versión depende de la anterior. No se salta ninguna.

---

*Document Version: 1.0*  
*Last Updated: 2026-04-05*