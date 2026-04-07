# Xentari Website Playbook

This document defines the page structure rules and website-building guidelines for the Xentari project.

---

## Homepage Structure

The homepage is a **routing page**, not a content page.

### Purpose
- Instantly communicate what Xentari does
- Route users to relevant services
- Build trust quickly
- Drive toward consultation CTA

### Section Order (6 sections max)

| Section | Component | Purpose |
|---------|-----------|---------|
| 1. Hero | `HeroV2` | Headline + value prop + primary CTA |
| 2. Trust Bar | `TrustBarV2` | Credibility signals (licensed, years, etc.) |
| 3. Who We Help | `WhoWeHelpV2` | Route users by audience type |
| 4. Services | `ServicesGridV2` | Show 5 service categories |
| 5. Testimonials | `TestimonialsV2` | Social proof (3 cards) |
| 6. Final CTA | `CTAV2` | Drive action |

### What NOT to Put on Homepage

- Long explanations (save for service pages)
- Embedded tools/calculators (link to them instead)
- FAQ sections (has its own page)
- About sections (has its own page)
- Duplicate content sections

### Homepage File

`app/page.tsx`

---

## Services Section Rules

### Navigation Structure

Services dropdown must contain exactly these 5 items:

```
Services
├── Health Insurance → /services/health-insurance
├── Life Insurance → /services/life-insurance
├── Business Benefits → /services/business-benefits
├── Tax Structuring → /services/tax-structuring
└── Medicare & Retirement → /services/medicare-retirement
```

### Update Location

`lib/constants.ts` → `navLinks` array

### Services Grid Component

`ServicesGridV2` displays 5 service cards on homepage. Each links to its detail page.

---

## Service Page Structure

Every service page follows the same template for consistency.

### Required Sections

| Section | Purpose |
|---------|---------|
| Hero | Icon + Title + Description + CTA |
| Problem | State the problem this service solves |
| Benefits | 6 cards showing what we offer |
| Ideal For | List of who this is for + sidebar card |
| Final CTA | Drive to consultation |
| FinalCTA Component | Shared site-wide CTA |

### Template Pattern

```tsx
<>
  {/* Hero - Icon, Title, Subtitle, CTA */}
  <section className="hero">...</section>

  {/* Problem Section - Why this matters */}
  <section className="problem">...</section>

  {/* Benefits - 6 cards grid */}
  <section className="benefits">...</section>

  {/* Ideal For - List + sidebar */}
  <section className="ideal-for">...</section>

  {/* CTA - Page-specific CTA */}
  <section className="cta">...</section>

  {/* FinalCTA - Shared component */}
  <FinalCTA />
</>
```

### Existing Service Pages

| Service | Route | File |
|---------|-------|------|
| Health Insurance | `/services/health-insurance` | `app/services/health-insurance/page.tsx` |
| Life Insurance | `/services/life-insurance` | `app/services/life-insurance/page.tsx` |
| Business Benefits | `/services/business-benefits` | `app/services/business-benefits/page.tsx` |
| Tax Structuring | `/services/tax-structuring` | `app/services/tax-structuring/page.tsx` |
| Medicare & Retirement | `/services/medicare-retirement` | `app/services/medicare-retirement/page.tsx` |

---

## Tools Rules

### Core Principle

Tools should **never clutter the homepage**. They live on their own routes.

### Navigation Structure

```
Tools
└── Retirement Calculator → /calculator
```

### Tools Landing Page

`/tools` (`app/tools/page.tsx`) serves as:
- Entry point for all tools
- Brief description of each tool
- Links to individual tool pages
- CTA to get personalized help

### Calculator

- Route: `/calculator`
- File: `app/calculator/page.tsx`
- Component: `AdvancedCalculator` from `components/v2`

### Adding New Tools

1. Create route in `app/[tool-name]/page.tsx`
2. Add to `navLinks.Tools.children` in `lib/constants.ts`
3. Add card to `/tools` landing page

---

## Navigation Structure

### Central Config

All navigation is controlled by `lib/constants.ts`:

```typescript
export const navLinks = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Health Insurance", href: "/services/health-insurance" },
      { label: "Life Insurance", href: "/services/life-insurance" },
      { label: "Business Benefits", href: "/services/business-benefits" },
      { label: "Tax Structuring", href: "/services/tax-structuring" },
      { label: "Medicare & Retirement", href: "/services/medicare-retirement" },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    children: [
      { label: "Retirement Calculator", href: "/calculator" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
];
```

### Header Component

`components/layout/Header.tsx` reads from `navLinks` - never hardcode items there.

### Footer Links

Also controlled by `lib/constants.ts` → `footerLinks`

### Rule: Route Must Exist

If a nav item exists, its route MUST exist in the `app/` folder. If adding a nav item, create the page first.

---

## CTA Rules

### Every Page Needs a CTA

No page should be a dead end. Every page must:
- Have at least one clear CTA
- Guide user toward consultation
- Use consistent button styling

### Primary CTA Style

```tsx
<Button href="/contact" size="lg">
  CTA Text
  <ArrowRight className="h-5 w-5" />
</Button>
```

### CTA Hierarchy

1. **Primary**: Orange background (`bg-[#FF6B35]`)
2. **Secondary**: Border only (`border border-white/20`)
3. **Text link**: Orange text with arrow

### Page-Specific CTAs

| Page | CTA Text |
|------|----------|
| Homepage | "Get Your Free Money Audit" / "Book a Consultation" |
| Health Insurance | "Get Your Free Coverage Review" |
| Life Insurance | "Get Your Coverage Analysis" |
| Business Benefits | "Get Your Benefits Analysis" |
| Tax Structuring | "Get Your Tax Strategy Review" |
| Medicare | "Get Your Medicare Review" |
| Tools | "Book a Free Consultation" |
| Calculator | CTA to contact page |

### Shared FinalCTA

`<FinalCTA />` from `components/sections/FinalCTA.tsx` is used at the bottom of service pages.

---

## Design Principles

### Mobile First

- Design for mobile first, then expand to desktop
- Test touch targets (min 44x44px)
- Ensure text is readable without zooming

### Visual Hierarchy

1. Headlines: Large, bold, white
2. Subheadlines: Medium, regular, gray
3. Body: Regular, text-secondary
4. CTAs: Stand out with orange accent

### Spacing Consistency

- Section padding: `py-20 md:py-28`
- Container: `container mx-auto px-6`
- Card padding: `p-6` or `p-8`
- Grid gaps: `gap-6` or `gap-8`

### Orange Border System

All cards/boxes use:
```css
border border-[#FF6B35]/20
hover:border-[#FF6B35]/40
transition-all duration-300
rounded-2xl
```

### Background Pattern

Alternate between:
- `bg-[#0A0A0B]` - Darker sections
- `bg-[#0F0F11]` - Lighter sections

### Icons

- Use Lucide React icons
- Icon containers: `bg-accent/10` with `text-accent`
- Size: `w-5 h-5` to `w-8 h-8` depending on context

---

## Page Checklist

Before publishing any page, verify:

- [ ] Clear headline visible immediately
- [ ] Mobile responsive
- [ ] At least one CTA visible without scrolling
- [ ] Orange border system applied to cards
- [ ] Consistent spacing with other pages
- [ ] Navigation links work
- [ ] Build passes (`npm run build`)
