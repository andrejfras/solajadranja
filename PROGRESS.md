# Navtični tečaji Izola — Progress Report

## Date: 28–29 March 2026

---

## What was done

### Homepage — Complete conversion funnel rebuild
- **Transformation-focused hero** — "Od začetnika do samostojne plovbe" with dual CTAs (Rezerviraj termin + Poglej prosta mesta)
- **Dynamic alert widget** — "Naslednji prosti termin" bar pulls course name, date, and remaining spots from DB. Controlled from admin dashboard (featured date flag). Hides automatically when no date is featured or all spots are taken. Slovenian grammar handled correctly (1 mesto, 2 mesti, 3-4 mesta, 5+ mest)
- **Three intent paths** — "Želim se naučiti jadrati" / "Želim doživetje na morju" / "Želim najeti plovilo"
- **Course cards** with "Rezerviraj mesto" CTA
- **Available dates section** with occupancy bars and urgency messaging
- **Testimonials section** — database-driven, hidden until admin adds reviews
- **Rental outcome block** — boat fleet preview connecting courses to rentals
- **FAQ section** — 4 expandable questions with FAQPage JSON-LD schema
- **Final CTA** — risk reversal badges (guarantee, year-round, small groups)
- Removed: trust strip (numbers bar), journey ladder, comparison table (per Andrej's feedback)

### Admin Dashboard (`/admin`)
- **Overview page** — 4 stat cards (courses, signups, occupancy %, boats), quick action links, latest 5 signups table
- **Courses & dates** (`/admin/courses`) — add/edit/delete dates, inline occupancy bars, enable/disable dates, set featured date for homepage alert
- **Signups** (`/admin/signups`) — full table with all fields, mailto/tel links, delete on hover
- **Boats** (`/admin/boats`) — full CRUD with image preview, inline editing
- **Testimonials** (`/admin/testimonials`) — add/edit/delete reviews, toggle visibility, star rating, sort order
- **Sidebar navigation** with icons, "Odpri stran" link, logout
- **Public site elements hidden** on admin pages (header, footer, WhatsApp, mobile booking bar, exit intent popup)

### Signup Form
- Streamlined — only 4 essential fields visible (name, phone, email, participants)
- Optional fields (address, postal code, city, notes) hidden behind expandable toggle
- Trust anchors below submit button
- Button changed to "Rezerviraj mesto"

### Header & Footer
- Header: added "Rezerviraj termin" CTA button (desktop + mobile)
- Footer: full layout with brand description, trust badges, nav links, contact info, WhatsApp button, sticky mobile booking bar

### Exit Intent Popup
- 30-second delay before arming (prevents immediate popup on page load)
- Session storage — only shows once per browser session
- Desktop only (exit intent via mouse leave)

### Contact & Other Pages
- Contact page: quick-link cards, response time promise
- Boats page: trust strip, "Povprašaj za najem" CTA per boat, course cross-sell
- Izleti page: cross-sell to courses
- Success page: cross-sell to boat rentals after signup
- Custom 404 page

### SEO — Technical Foundation
- **Google Search Console** verified via DNS TXT record
- **Sitemap** (`/sitemap.xml`) — dynamic, includes all pages and course slugs
- **robots.txt** — allows all, blocks `/admin/`, points to sitemap
- **Structured data:**
  - `LocalBusiness` JSON-LD on all pages (name, address, geo, phone, email, hours, logo)
  - `Course` JSON-LD on each course page (name, description, price, availability)
  - `FAQPage` JSON-LD on homepage (4 questions)
  - `BreadcrumbList` JSON-LD on boats, izleti, contact, and course pages
- **Open Graph + Twitter Cards** on every page with images, titles, descriptions
- **Canonical URLs** on every page
- **`metadataBase`** set so relative image URLs resolve correctly
- **Title template** — sub-pages use "Page Name | Navtični tečaji Izola" format
- **Per-page meta descriptions** for all routes
- **`generateStaticParams`** — course pages pre-rendered at build time (SSG)
- **AVIF/WebP** image format optimization via next.config
- **Favicon** replaced (Vercel default → site logo)

### Database
- Added `featured` boolean to `CourseDate` model (with migration)
- Added `Testimonial` model (name, text, role, stars, enabled, sortOrder) with migration
- Admin user created in Neon production DB

### Deployment
- Build script updated to `prisma generate && prisma migrate deploy && next build` (auto-migrations on deploy)
- All changes deployed to production via Vercel CLI
- Real phone number (+386 40 871 110) and WhatsApp set across all pages

---

## What could be done to improve

### High Priority

1. **Google Business Profile** — Create and verify a Google Business listing for "Navtični tečaji Izola." This is the single most impactful action for local SEO. It enables Google Maps presence, review collection, and the knowledge panel in search results.

2. **Blog / Content section** — Add a `/blog` route with articles targeting long-tail keywords:
   - "Kako se pripraviti na izpit za čoln"
   - "Kaj vzeti na jadranje — seznam opreme"
   - "Razlike med jadrnico in katamaranom"
   - "Najboljši jadralski vikendi na slovenski obali"
   - Each article builds organic traffic and feeds AI models with your brand context.

3. **Email capture & automation** — The exit intent popup collects emails but doesn't save them anywhere. Connect it to a Mailchimp/Resend list. Build a post-signup email sequence:
   - Welcome email after course signup
   - Reminder 3 days before course
   - Follow-up with rental offer after course completion
   - Seasonal promotions

4. **Real testimonials** — Andrej needs to add real customer reviews via the admin dashboard. These drive trust and will enable AggregateRating schema (stars in Google results).

5. **Satellite sites / GEO (Generative Engine Optimization)** — Create 2-3 niche authority sites:
   - Listicle site: "Top šole jadranja v Sloveniji" ranking your school #1
   - Info site: "izpit-za-coln.info" with exam prep content linking to your courses
   - These build backlinks and train LLMs (ChatGPT, Perplexity, Google AI Overviews) to recommend you

### Medium Priority

6. **Backlink building** — Get listed on:
   - Marina Izola website
   - Slovenian tourism board (slovenia.info)
   - TripAdvisor / Viator
   - Local business directories (info-slovenija.si, etc.)
   - Sailing federation websites

7. **YouTube / video content** — Short clips of courses on the water. Great for Google search (video results), Instagram Reels, and AI training data. Embed on course pages.

8. **Analytics** — Add Vercel Analytics or Google Analytics to track:
   - Which pages convert best
   - Where users drop off
   - Which courses get the most signups
   - Mobile vs desktop behavior

9. **Course date selection in signup** — Let users pick a specific date when signing up (currently they just submit a general application). This reduces back-and-forth and improves conversion.

10. **Payment integration** — Add Stripe for online deposits or full payments. Reduces friction from "submit form → wait for email → pay later" to "book and pay now."

### Lower Priority

11. **Multi-language support** — English version for international tourists and charter visitors to Croatia. Doubles your addressable market.

12. **Gift voucher system** — The old site had gift cards. Build a digital voucher purchase flow with PDF generation and email delivery.

13. **Course comparison page** — Andrej removed the comparison table from the homepage, but a dedicated comparison page (`/primerjava`) could still be valuable for SEO and decision-making.

14. **Social proof automation** — Pull Google Reviews via API and display them on the site in real-time instead of manually entering testimonials.

15. **Performance monitoring** — Set up Vercel Speed Insights to track Core Web Vitals (LCP, FID, CLS) and ensure the site stays fast.
