# Xentari Website

A premium, dark-themed financial services website built with Next.js 14 and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Navigate to the project directory:
   ```bash
   cd xentari-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
xentari-website/
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── contact/
│   ├── faq/
│   ├── privacy/
│   ├── services/
│   │   ├── individual-family/
│   │   ├── business-benefits/
│   │   └── tax-structuring/
│   ├── terms/
│   ├── testimonials/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/             # Header, Footer, Container
│   ├── sections/           # Page sections (Hero, Services, etc.)
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── constants.ts        # Site config, content data
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Customization

### Updating Content

All site content is centralized in `lib/constants.ts`:
- Company name and contact info
- Navigation links
- Services, testimonials, FAQs
- Trust statistics

### Updating Styles

Design tokens are defined in `tailwind.config.ts`:
- Colors (background, accent, text)
- Typography
- Shadows and animations

## Form Integration

The contact form is ready for backend integration. To connect to your preferred service:

1. **Email Service (e.g., Resend, SendGrid):**
   Create an API route in `app/api/contact/route.ts`

2. **CRM Integration:**
   Add your CRM's API call in the form submission handler

3. **Calendar Integration (Calendly/Cal.com):**
   See comments in `components/sections/ContactForm.tsx`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy

### Other Platforms

```bash
npm run build
npm run start
```

## License

Private - All rights reserved.
