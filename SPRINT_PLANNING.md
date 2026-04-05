# BioCard - Planificación por Sprints

## Metodología
- Sprints de 1 semana
- Cada tarea = 1-2 días
- Orden: Simple → Complejo
- Dependencias marcadas

---

## SPRINT 0: FUNDACIÓN (Semana 1)

### S0.1: Setup del Proyecto
**Dificultad:** ⭐ | **Estimación:** 1 día

- [ ] Inicializar repositorio Git
- [ ] Setup Next.js 14 + TypeScript
- [ ] Setup FastAPI (Python)
- [ ] Docker Compose (dev environment)
- [ ] ESLint + Prettier
- [ ] GitHub Actions CI/CD

### S0.2: Database Schema
**Dificultad:** ⭐ | **Estimación:** 1 día

- [ ] Setup PostgreSQL
- [ ] Crear schema Prisma
- [ ] Migration initial
- [ ] Seed datos básicos

### S0.3: Autenticación Básica
**Dificultad:** ⭐⭐ | **Estimación:** 2 días

**Backend:**
- [ ] Registro con email/password
- [ ] Login con email/password
- [ ] JWT token generation
- [ ] Middleware auth

**Frontend:**
- [ ] Login page
- [ ] Register page
- [ ] Protected routes

**Dependencias:** S0.1, S0.2

### S0.4: Dashboard Shell
**Dificultad:** ⭐ | **Estimación:** 1 día

- [ ] Layout principal (sidebar + content)
- [ ] Navegación
- [ ] Header con user menu
- [ ] Mobile responsive shell

---

## SPRINT 1: CORE LINKS (Semana 2)

### S1.1: CRUD de Links
**Dificultad:** ⭐⭐ | **Estimación:** 2 días

**Backend:**
- [ ] GET /api/links - Listar
- [ ] GET /api/links/:id - Obtener
- [ ] POST /api/links - Crear
- [ ] PUT /api/links/:id - Actualizar
- [ ] DELETE /api/links/:id - Eliminar
- [ ] Validación de inputs

**Frontend:**
- [ ] Links list component
- [ ] Link form (create/edit modal)
- [ ] Delete confirmation modal

### S1.2: Reordenar Links (Drag & Drop)
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Setup @dnd-kit
- [ ] Vertical list con drag handles
- [ ] Optimistic UI update
- [ ] Batch update API
- [ ] Mobile touch support

**Dependencias:** S1.1

### S1.3: Perfil Público Básico
**Dificultad:** ⭐⭐ | **Estimación:** 2 días

**Backend:**
- [ ] GET /api/profiles/:username
- [ ] GET /api/profiles/:username/links

**Frontend:**
- [ ] Dynamic route /[username]
- [ ] Link cards rendering
- [ ] Basic theme (default)
- [ ] 404 handle

---

## SPRINT 2: CUSTOMIZATION (Semana 3)

### S2.1: Editor de Perfil
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Profile settings page
- [ ] Edit displayName, bio, avatar
- [ ] Image upload a S3/R2
- [ ] Preview button

### S2.2: Temas Visuales
**Dificultad:** ⭐⭐ | **Estimación:** 2 días

**Backend:**
- [ ] GET /api/themes
- [ ] Guardar theme preference

**Frontend:**
- [ ] Theme selector component
- [ ] 5 predefined themes
- [ ] Live preview
- [ ] Aplicar theme en perfil

### S2.3: Background Personalizado
**Dificultad:** ⭐ | **Estimación:** 1 día

- [ ] Color picker
- [ ] Image upload
- [ ] Gradient options
- [ ] Preview tiempo real

### S2.4: Custom Domain
**Dificultad:** ⭐⭐⭐ | **Estimación:** 2 días

**Backend:**
- [ ] PUT /api/profiles/:id/domain
- [ ] DNS verification (cron)
- [ ] Middleware custom domain
- [ ] SSL (Let's Encrypt)

**Frontend:**
- [ ] Domain input + instructions
- [ ] Verification status

**Dependencias:** S1.3

---

## SPRINT 3: ANALYTICS & SHARING (Semana 4)

### S3.1: Click Tracking
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] POST /api/analytics/click
- [ ] Incremental counter
- [ ] Async (no blocking)

### S3.2: Visit Tracking
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] POST /api/analytics/visit
- [ ] Device detection
- [ ] GeoIP (country, city)
- [ ] UTM params

### S3.3: Dashboard Analytics
**Dificultad:** ⭐⭐⭐ | **Estimación:** 2 días

- [ ] Stats overview
- [ ] Time series chart
- [ ] Top links table
- [ ] Device breakdown
- [ ] Geo chart

### S3.4: QR Code Generation
**Dificultad:** ⭐ | **Estimación:** 1 día

- [ ] QR code library
- [ ] Generate con profile URL
- [ ] Download as PNG
- [ ] QR con logo (opcional)

### S3.5: vCard Export
**Dificultad:** ⭐ | **Estimación:** 0.5 días

- [ ] Generate .vcf file
- [ ] Download button

---

## SPRINT 4: SOCIAL & SEO (Semana 5)

### S4.1: Social Links
**Dificultad:** ⭐ | **Estimación:** 1 día

- [ ] CRUD social links
- [ ] Icon component
- [ ] Render en perfil

### S4.2: Video Embeds
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] YouTube embed
- [ ] Vimeo embed
- [ ] Twitch embed
- [ ] Auto-detect URL

### S4.3: SEO / Open Graph
**Dificultad:** ⭐ | **Estimación:** 1 día

- [ ] Dynamic meta tags
- [ ] Open Graph image
- [ ] Sitemap.xml
- [ ] robots.txt

---

## SPRINT 5: PAYMENTS (Semana 6-7)

### S5.1: Productos (Mini Ecommerce)
**Dificultad:** ⭐⭐ | **Estimación:** 2 días

**Backend:**
- [ ] CRUD products
- [ ] Image upload
- [ ] File upload
- [ ] Pricing, currency

**Frontend:**
- [ ] Products list
- [ ] Product form
- [ ] Product card

### S5.2: Carrito de Compras
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Add to cart
- [ ] Cart page
- [ ] Update quantity
- [ ] Remove item
- [ ] localStorage persist

### S5.3: Stripe Integration
**Dificultad:** ⭐⭐⭐ | **Estimación:** 2 días

- [ ] Stripe checkout session
- [ ] Webhook handler
- [ ] Order creation
- [ ] Confirmation page

### S5.4: Payphone (Ecuador)
**Dificultad:** ⭐⭐⭐ | **Estimación:** 2 días

- [ ] Payphone checkout
- [ ] Webhook handler
- [ ] Transaction status

### S5.5: Facturación
**Dificultad:** ⭐ | **Estimación:** 1 día

- [ ] Generate PDF invoice
- [ ] Email con factura
- [ ] Download button

---

## SPRINT 6: EMAIL MARKETING (Semana 8)

### S6.1: Colección de Emails
**Dificultad:** ⭐ | **Estimación:** 1 día

- [ ] Email capture form
- [ ] Opt-in mechanism
- [ ] Save to DB

### S6.2: Email Forms
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Form builder
- [ ] Style customization
- [ ] Position settings

### S6.3: Export Emails
**Dificultad:** ⭐ | **Estimación:** 0.5 días

- [ ] Export to CSV
- [ ] Mailchimp format

---

## SPRINT 7: ADVANCED LINKS (Semana 9)

### S7.1: Links con Password
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Password input
- [ ] bcrypt hash
- [ ] Request password
- [ ] Verify antes redirect

### S7.2: Links con Schedule
**Dificultad:** ⭐ | **Estimación:** 1 día

- [ ] Date picker (start/end)
- [ ] Verificar schedule
- [ ] Mostrar si activo

### S7.3: Featured/Pinned
**Dificultad:** ⭐ | **Estimación:** 0.5 días

- [ ] Toggle isFeatured/isPinned
- [ ] Render al inicio

### S7.4: Link Preview
**Dificultad:** ⭐ | **Estimación:** 1 día

- [ ] Fetch Open Graph
- [ ] Show preview

---

## SPRINT 8: PLUGINS (Semana 10-11)

### S8.1: Plugin System Core
**Dificultad:** ⭐⭐⭐ | **Estimación:** 2 días

- [ ] Plugin table schema
- [ ] Plugin loader
- [ ] Enable/disable

### S8.2: Plugin Marketplace
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Browse plugins
- [ ] Search/filter
- [ ] Install button

### S8.3: Donations Plugin
**Dificultad:** ⭐⭐⭐ | **Estimación:** 2 días

- [ ] Campaign config
- [ ] Goal tracking
- [ ] Donation form
- [ ] Donor list

### S8.4: Memberships Plugin
**Dificultad:** ⭐⭐⭐⭐ | **Estimación:** 2 días

- [ ] Create tiers
- [ ] Stripe subscription
- [ ] Webhook handling
- [ ] Access control

---

## SPRINT 9: REWARDS (Semana 12)

### S9.1: Points System
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Points table
- [ ] Action triggers
- [ ] Calculation

### S9.2: Referral Program
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Referral link
- [ ] Track signups
- [ ] Reward both

### S9.3: Badges/Achievements
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Badge definitions
- [ ] Auto-award
- [ ] Badge display

---

## SPRINT 10: TEAM (Semana 13)

### S10.1: Multi-User
**Dificultad:** ⭐⭐⭐ | **Estimación:** 2 días

- [ ] Invite member
- [ ] Accept invite
- [ ] TeamMember table

### S10.2: Roles y Permisos
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Role definitions
- [ ] Permission checks
- [ ] UI conditional

---

## SPRINT 11: LAUNCH (Semana 14)

### S11.1: Performance
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Lighthouse audit
- [ ] Image optimization
- [ ] Cache strategies

### S11.2: Security Audit
**Dificultad:** ⭐⭐⭐ | **Estimación:** 1 día

- [ ] OWASP check
- [ ] Rate limiting
- [ ] Input sanitization

### S11.3: Testing
**Dificultad:** ⭐⭐ | **Estimación:** 2 días

- [ ] Unit tests (Jest)
- [ ] E2E tests (Playwright)
- [ ] Coverage report

### S11.4: CI/CD Final
**Dificultad:** ⭐⭐ | **Estimación:** 1 día

- [ ] Deploy production
- [ ] Health checks
- [ ] Monitoring

---

## RESUMEN

| Sprint | Enfoque | Semanas |
|--------|---------|----------|
| S0 | Fundación | 1 |
| S1 | Core Links | 2 |
| S2 | Customization | 3 |
| S3 | Analytics | 4 |
| S4 | Social & SEO | 5 |
| S5 | Payments | 6-7 |
| S6 | Email | 8 |
| S7 | Advanced Links | 9 |
| S8 | Plugins | 10-11 |
| S9 | Rewards | 12 |
| S10 | Team | 13 |
| S11 | Launch | 14 |

**Total: 14 semanas (3.5 meses)
