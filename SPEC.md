# BioCard - Specification Document

## Project Overview

**Project Name:** BioCard  
**Type:** Web Application (SaaS)  
**Tagline:** Link in Bio + Tarjeta Digital + Rewards System  
**Target Audience:** Creators, influencers, small businesses in Latin America  
**Mission:** Empower Latam creators with an all-in-one link platform featuring digital cards, gamification, and rewards

---

## Problem Statement

Existing link in bio tools (Linktree, Beacons, etc.) lack:
- Rewards/Gamification systems
- Integrated digital business cards with NFC
- Latin America-focused features (local payments, Spanish support)
- Affordable pricing for LATAM markets

---

## Solution

BioCard is a comprehensive link in bio platform that combines:
1. Link in bio management
2. Digital business card (QR + NFC)
3. Rewards/Loyalty program
4. Gamification elements

---

## Market Opportunity

### Target Market
- **Primary:** Latin America (Ecuador, Colombia, Mexico, Peru, Chile)
- **Secondary:** Spanish-speaking creators globally

### Market Size
- 500M+ social media users in Latam
- Growing creator economy
- Demand for affordable tools

### Competitive Landscape
| Competitor | Strength | Weakness |
|------------|----------|----------|
| Linktree | Brand recognition | No rewards, expensive |
| Beacons | AI features | No Latam focus |
| Popl | NFC cards | Limited to USA |
| Carrd | Simple/Easy | Not link in bio focused |

---

## Product Features

### Core Features (MVP)

#### 1. Link Management
- [x] Unlimited links
- [x] Link categorization
- [x] Link scheduling
- [x] Link redirect
- [x] Link preview

#### 2. Profile Customization
- [x] Profile picture
- [x] Bio/description
- [x] Theme selection (5 free themes)
- [x] Custom colors
- [x] Background images
- [x] Custom domain (Basic+)

#### 3. Analytics
- [x] Click tracking
- [x] View tracking
- [x] Device breakdown
- [x] Geographic data
- [x] Traffic sources

#### 4. Digital Card
- [x] QR Code generation
- [x] vCard export
- [x] Apple Wallet (Pro)
- [x] Google Wallet (Pro)

#### 5. Embeds
- [x] YouTube/Twitch videos
- [x] Spotify/SoundCloud
- [x] Instagram posts
- [x] Twitter embeds

### Premium Features

#### 6. Rewards System
- [ ] Points accumulation
- [ ] Referral rewards
- [ ] Levels/Ranks
- [ ] Badges/Achievements
- [ ] Leaderboard

#### 7. Gamification
- [ ] Daily login bonuses
- [ ] Share rewards
- [ ] Achievement unlocks
- [ ] Progress tracking

#### 8. AI Features
- [ ] Content suggestions
- [ ] Analytics insights
- [ ] Auto-bio generation

### Monetization Features

#### 9. E-commerce
- [ ] Digital products
- [ ] Online courses
- [ ] Affiliate links
- [ ] Donations/Tips

#### 10. Email Marketing
- [ ] Email collection
- [ ] Basic automation
- [ ] Integration with external tools

---

## Technical Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 + React |
| Styling | Tailwind CSS |
| Backend | Node.js + FastAPI (Python) |
| Database | PostgreSQL + Redis |
| Auth | NextAuth.js + JWT |
| Payments | Stripe + Payphone (Ecuador) |
| Hosting | Vercel + Railway |
| Storage | AWS S3 |

### Database Schema

```sql
-- Users
users (
  id, email, name, avatar, 
  plan, points, level,
  created_at, updated_at
)

-- Profiles
profiles (
  id, user_id, username, display_name,
  bio, theme, custom_domain,
  is_public, created_at
)

-- Links
links (
  id, profile_id, title, url, icon,
  position, is_active, schedule_start,
  schedule_end, click_count, created_at
)

-- Analytics
analytics (
  id, link_id, visitor_ip,
  device, country, city, 
  referrer, clicked_at
)

-- Rewards
rewards (
  id, user_id, action, points,
  created_at
)

-- Digital Cards
digital_cards (
  id, user_id, qr_code, nfc_data,
  vcard_data, created_at
)
```

### API Structure

```
/api
├── /auth          # Authentication
├── /users         # User management
├── /profiles      # Profile CRUD
├── /links         # Link management
├── /analytics     # Analytics
├── /rewards       # Rewards system
├── /cards         # Digital cards
├── /payments      # Payment processing
└── /webhooks      # External integrations
```

---

## Pricing Plans

| Plan | Price (USD) | Features |
|------|-------------|----------|
| **Free** | $0 | 5 links, basic themes, QR, analytics |
| **Basic** | $3.99/mo | Custom domain, all themes, advanced analytics |
| **Pro** | $7.99/mo | Rewards, digital card, gamification, AI |
| **Enterprise** | $19.99/mo | Team, white-label, SLA |

---

## Development Phases

### Phase 1: MVP (Weeks 1-4)
- [ ] User authentication
- [ ] Link CRUD
- [ ] Profile customization (basic)
- [ ] Analytics (basic)
- [ ] Theme system
- [ ] QR Code generation
- [ ] Public profile page

### Phase 2: Growth (Weeks 5-8)
- [ ] Custom domains
- [ ] Advanced analytics
- [ ] Email collection
- [ ] Embed integrations
- [ ] Digital card (vCard)
- [ ] Apple/Google Wallet

### Phase 3: Monetization (Weeks 9-12)
- [ ] Digital products
- [ ] Stripe integration
- [ ] Payphone integration
- [ ] Affiliate system
- [ ] Transaction fees handling

### Phase 4: Rewards (Weeks 13-16)
- [ ] Points system
- [ ] Referral program
- [ ] Gamification
- [ ] Leaderboards
- [ ] Badges/Achievements

### Phase 5: Scale (Weeks 17-20)
- [ ] AI features
- [ ] Team collaboration
- [ ] White-label
- [ ] API for developers

---

## Success Metrics

### Key Metrics (KPIs)
| Metric | Target (Month 3) | Target (Month 6) |
|--------|------------------|------------------|
| Users | 1,000 | 10,000 |
| Active Users | 500 | 5,000 |
| MRR | $1,000 | $10,000 |
| Conversion Rate | 3% | 5% |
| Churn | <10% | <5% |

### User Engagement
- Average links per user: 8+
- Daily visits per user: 50+
- Links click rate: 15%+

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Competition | High | Focus on Latam, unique features |
| Feature creep | Medium | Strict MVP scope |
| Churn | Medium | Build engagement with rewards |
| Payment issues | Medium | Multiple payment options |

---

## Future Roadmap

### v2.0 (Post-launch)
- NFT integration
- AI-powered content suggestions
- Multi-language support
- Mobile apps (iOS/Android)

### v3.0
- Marketplace for templates
- Affiliate network
- White-label for agencies
- API for developers

---

## References

- Linktree Pricing: https://linktr.ee/s/pricing
- Beacons Pricing: https://beacons.ai/i/pricing
- Competitor Analysis: See `/research-bioCard.md`

---

## Appendix

### Terminology
- **Link in Bio:** Single landing page containing multiple links
- **Bio Card:** Digital business card with QR/NFC
- **Rewards:** Points system for user engagement
- **Gamification:** Game-like elements (badges, levels, leaderboards)

### Design Guidelines
- Mobile-first design
- Latam-friendly (warm colors, Spanish language)
- Fast loading (<3s)
- Accessibility (WCAG 2.1 AA)

---

*Document Version: 1.0*  
*Last Updated: 2026-04-05*
