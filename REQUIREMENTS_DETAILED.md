# BioCard - Requisitos Detallados

---

## 1. AUTENTICACIÓN Y USUARIOS

### 1.1 Registro con Email/Password

**Descripción:** El usuario se registra usando email y password.

**Datos a guardar:**
- `email` (string, unique, required)
- `passwordHash` (string, bcrypt hash)
- `name` (string, optional)
- `avatar` (string, URL)
- `plan` (enum: FREE, BASIC, PRO, ENTERPRISE)
- `emailVerified` (boolean, default false)
- `createdAt`, `updatedAt` (timestamps)

**Datos a validar:**
- Email: formato válido, no existente en DB
- Password: mínimo 8 caracteres, 1 mayúscula, 1 número

**Flujo:**
1. Usuario completa form (email, password, name)
2. Validar formato y unicidad
3. Hashear password con bcrypt
4. Crear usuario en DB
5. Generar token de verificación
6. Enviar email de verificación
7. Crear sesión y retornar tokens

**Fin:** Usuario registrado, email enviado, sesión iniciada.

---

### 1.2 Login con Email/Password

**Datos a guardar:**
- `loginAttempts` (contador por IP)
- `lastLoginAt` (timestamp)

**Flujo:**
1. Usuario ingresa email + password
2. Buscar usuario por email
3. Verificar password (bcrypt compare)
4. Verificar rate limit (5 intentos/15min)
5. Generar JWT tokens
6. Guardar sesión en DB
7. Retornar tokens + user data

**Fin:** Sesión iniciada.

---

### 1.3 Login OAuth (Google, GitHub, Discord)

**Datos a guardar:**
- `provider` (google|github|discord)
- `providerId` (unique per provider)
- `providerAccessToken` (encrypted)
- `providerRefreshToken` (encrypted)

**Flujo:**
1. Click botón OAuth → redirigir a provider
2. Provider retorna authorization code
3. Intercambiar code por tokens
4. Obtener user info del provider
5. Buscar/crear usuario por provider+id
6. Generar JWT y retornar

**Fin:** Usuario logueado via OAuth.

---

### 1.4 Recuperación de Contraseña

**Datos a guardar:**
- `resetToken` (UUID, single-use)
- `resetExpiresAt` (timestamp, 1 hora)

**Flujo:**
1. Usuario ingresa email
2. Generar reset token + expiry
3. Enviar email con link de reset
4. Usuario clickea link + nueva password
5. Hashear password, actualizar
6. Invalidar token y todas las sesiones

**Fin:** Password reseteada, sesiones invalidadas.

---

### 1.5 Autenticación de Dos Factores (2FA)

**Datos a guardar:**
- `twoFactorEnabled` (boolean)
- `twoFactorSecret` (encrypted)
- `backupCodes` (array de 10 códigos)

**Flujo - Activación:**
1. Generar secret con speakeasy
2. Mostrar QR para Google Authenticator
3. Usuario ingresa código para verificar
4. Guardar secret encriptado
5. Generar 10 backup codes

**Flujo - Login:**
1. Email + password verificados
2. Solicitar código 2FA
3. Verificar código contra secret
4. Si válido, generar tokens

**Fin:** 2FA configurado o login con 2FA exitoso.

---

### 1.6 Editar Perfil de Usuario

**Datos a guardar:**
- `name` (string, máx 100)
- `avatar` (URL o archivo)
- `phone` (string)

**Flujo:**
1. Usuario modifica campos
2. Si es archivo, subir a S3
3. Actualizar en DB
4. Retornar datos actualizados

**Fin:** Perfil actualizado.

---

### 1.7 Dashboard de Usuario

**Datos a exponer:**
- Total visitas al perfil
- Total clicks en links
- Top 5 links más populares
- Recent analytics (7 días)
- Quick actions

**Fin:** Dashboard renderizado.

---

## 2. GESTIÓN DE LINKS

### 2.1 Crear Link

**Datos a guardar:**
- `title` (string, 1-100)
- `url` (string, URL válida)
- `icon` (emoji)
- `thumbnail` (URL)
- `position` (integer)
- `isActive` (boolean)
- `isFeatured` (boolean)
- `isPinned` (boolean)
- `category` (string)
- `clickLimit` (integer)
- `password` (hashed)
- `scheduleStart`, `scheduleEnd` (datetime)
- `clickCount` (integer)

**Flujo:**
1. Completar form
2. Validar campos y limits del plan
3. Obtener siguiente posición
4. Crear link en DB
5. Retornar link creado

**Fin:** Link creado.

---

### 2.2 Editar Link

**Flujo:** Modificar campos → validar → actualizar DB → invalidar cache → retornar.

---

### 2.3 Eliminar Link

**Flujo:** Confirmar → eliminar de DB → reordenar posiciones → invalidar cache.

---

### 2.4 Reordenar Links (Drag & Drop)

**Flujo:** Calcular nuevas posiciones → batch update → invalidar cache.

---

### 2.5 Preview de Link

**Flujo:** Ingresar URL → fetch metadata (title, image) → renderizar preview.

---

### 2.6 Links con Password

**Flujo - Crear:** Input password → bcrypt → guardar.

**Flujo - Acceso:** Solicitar password → verificar → registrar click → redirigir.

---

### 2.7 Links con Schedule

**Flujo:** Guardar scheduleStart/End → al renderizar verificar rango → mostrar solo si activo.

---

### 2.8 Clonar Link

**Flujo:** Crear copia con "(Copy)" → posición al final → guardar.

---

## 3. PERSONALIZACIÓN DE PERFIL

### 3.1 Crear/Editar Perfil

**Datos a guardar:**
- `username` (unique, 3-30, regex `^[a-zA-Z0-9_-]+$`)
- `displayName` (1-50)
- `bio` (máx 500)
- `avatar` (URL)
- `theme` (predefined)
- `backgroundColor` (hex)
- `backgroundImage` (URL)
- `font` (predefined)
- `customDomain` (string)
- `isPublic` (boolean)
- `passwordHash` (optional)

**Flujo:**
1. Validar username único
2. Subir archivos a S3
3. Verificar custom domain DNS
4. Guardar en DB

**Fin:** Perfil configurado.

---

### 3.2 Custom Domain

**Datos a guardar:**
- `customDomain`
- `domainVerified` (boolean)
- `verificationToken`
- `verifiedAt`

**Flujo:**
1. Usuario ingresa dominio
2. Generar CNAME/TXT para verificación
3. Usuario configura DNS
4. Verificar cada hora (cron)
5. Si verificado, activar

**Fin:** Perfil accesible por dominio propio.

---

## 4. PÁGINA DE PERFIL PÚBLICO

### 4.1 Renderizar Perfil

**Datos a exponer:** username, displayName, bio, avatar, theme, background, links activos, social links, QR code.

**Flujo:**
1. Acceder a /{username} o custom domain
2. Buscar perfil
3. Verificar isPublic o password
4. Obtener links activos (verificar schedules)
5. Renderizar con theme
6. Registrar analytics (async)

**Fin:** Perfil mostrado.

---

### 4.2 Click en Link

**Datos a guardar:** linkId, profileId, visitorId, ip, userAgent, device, country, city, referrer, utm params, clickedAt.

**Flujo:** Interceptar click → registrar analytics → redirigir.

---

### 4.3 QR Code

**Flujo:** Generar QR con URL del perfil → renderizar → permitir download.

---

### 4.4 SEO / Open Graph

**Meta tags:** title, description, og:title, og:description, og:image, twitter:card.

---

## 5. ANALYTICS

### 5.1 Tracking de Visitas

**Datos a guardar:** profileId, visitorId, ip (truncated), userAgent, device, country, city, referrer, utm params, visitedAt.

**Flujo:** Cargar perfil → generar/leer cookie → guardar analytics async.

---

### 5.2 Dashboard Analytics

**Datos a exponer:** Total visitas, unique visitors, clicks por link, device breakdown, geography, referrers, time series.

---

### 5.3 UTM Tracking

Guardar utmSource, utmMedium, utmCampaign en analytics.

---

## 6. TARJETA DIGITAL

### 6.1 Generar QR Code

**Datos a guardar:** qrCode (URL), qrLogo (URL).

**Flujo:** Generar vCard → generar QR con library → guardar URL.

---

### 6.2 Exportar vCard

Generar .vcf con FN, EMAIL, TEL, URL, ORG → download.

---

### 6.3 Apple/Google Wallet

Generar .pkpass con certificate → download o directly add.

---

## 7. E-COMMERCE (Mini Ecommerce)

### 7.1 Gestión de Productos

**Datos a guardar:**
- `name`, `description`
- `price`, `currency`
- `fileUrl`, `thumbnailUrl`
- `isActive`, `salesCount`
- `inventoryCount` (optional)
- `shippingOptions` (optional)

**Flujo:** CRUD de productos con imágenes y archivos.

---

### 7.2 Carrito de Compras

**Datos a guardar:** cartItems (userId, productId, quantity).

**Flujo:** Agregar → actualizar quantity → remover → checkout.

---

### 7.3 Checkout

**Flujo:**
1. Revisar carrito
2. Seleccionar método de pago
3. Crear order en DB (status: PENDING)
4. Procesar pago con Stripe/Payphone/PayPal
5. Si exitoso → status: PAID → enviar email
6. Si fallido → status: FAILED

**Fin:** Order procesada.

---

### 7.4 Facturación

**Flujo:** Generar PDF invoice con order details → email al buyer.

---

## 8. EMAIL MARKETING

### 8.1 Colección de Emails

**Datos a guardar:** email, profileId, source, createdAt.

**Flujo:** Visitor.opt-in → guardar email → enviar confirmation.

---

### 8.2 Formularios

Formularios customizables con: campos, colors, posicion.

---

## 9. PLUGINS

### 9.1 Plugin Marketplace

**Datos a guardar:**
- `Plugin` table: name, slug, description, icon, version, category, price, isCore, settingsSchema
- `UserPlugin`: userId, pluginId, isActivated, settings, subscribedAt

**Flujo:**
1. Browse/search plugins
2. Click install → verificar plan limits
3. Activar → guardar en UserPlugin
4. Configurar settings
5. Cargar plugin en perfil

---

### 9.2 Plugin Donations

**Datos a guardar:**
- `campaignName`, `goalAmount`
- `currentAmount`, `donors`
- `Donation`: donorId, amount, message, createdAt

**Flujo:** Configurar campaña → visitantes donan → registrar → actualizar goal.

---

### 9.3 Plugin Memberships

**Datos a guardar:**
- `MembershipTier`: name, price, features
- `Subscription`: userId, tierId, status, startDate, endDate

**Flujo:** Crear tiers → usuario suscribe → Stripe webhook → activar acceso.

---

## 10. TEAM / ENTERPRISE

### 10.1 Multi-User

**Datos a guardar:**
- `TeamMember`: profileId, userId, role (OWNER, ADMIN, EDITOR, VIEWER)

**Flujo:** Owner invita → usuario acepta → crear TeamMember.

---

### 10.2 Roles y Permisos

| Rol | Permisos |
|-----|----------|
| OWNER | Todo |
| ADMIN | Todo excepto delete profile |
| EDITOR | Crear/editar links y productos |
| VIEWER | Solo ver analytics |

---

## 11. REWARDS / GAMIFICACIÓN

### 11.1 Points System

**Datos a guardar:** points, level, streak.

**Acciones que dan points:** crear link, completar perfil, hacer share, recibir referido, daily login.

---

### 11.2 Referral Program

**Datos a guardar:** referrerId, referredId, rewardPoints, status.

**Flujo:** Usuario comparte link de referido → nuevo registra → ambos reciben points.

---

### 11.3 Badges/Achievements

**Datos a guardar:** Badge, UserBadge (userId, badgeId, earnedAt).

**Criterios:** 10 links, 1000 clicks, 10 referidos, 30 días consecutive login.

---

## 12. API & WEBHOOKS

### 12.1 REST API

Endpoints: /api/users, /api/profiles, /api/links, /api/analytics, /api/products, /api/orders.

Auth: Bearer token (JWT).

Rate limit: según plan.

---

### 12.2 Webhooks

**Datos a guardar:** webhookUrl, events (link.created, link.clicked, order.paid, etc).

**Flujo:** Evento ocurre → enviar POST a webhookUrl → retry si falla (3 intentos).

---

*Document Version: 1.0 - Last Updated: 2026-04-05*