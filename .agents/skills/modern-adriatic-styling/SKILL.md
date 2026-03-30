---
name: Modern Adriatic Styling
description: The premium styling system and UI guidelines for Navtični tečaji Izola ("Modern Adriatic" aesthetic)
---

# Modern Adriatic Design System
This skill defines the exact styling conventions, typography, color palette, and UI components used on the "Navtični tečaji Izola" website. You MUST adhere to these rules strictly whenever updating the frontend.

## 1. Core Principles
- **Aesthetic:** Premium, airy, minimalist, and nautical lifestyle.
- **Conversion-Focused:** High contrast for CTAs, trustworthy elements, and generous whitespace.
- **Vibe:** Exclusive sailing academy and yacht charter, not a cheap utility course.

## 2. Typography
We use a high-end pairing initialized in `layout.tsx` and configured via Tailwind CSS variables in `globals.css`:
- **Headings (`font-display`):** `Outfit` — elegant, wide, and light. 
  - Standard usage: `<h2 className="font-display font-light text-navy text-4xl">`
- **Body / Accents (`font-sans`):** `DM Sans` — highly legible and modern. 
  - Standard usage: `<p className="font-sans font-light text-slate-500">`

## 3. Color Palette
Always use these exact Tailwind CSS 4 variables (defined in `globals.css`):
- `bg-navy`, `text-navy` (`#0B192C`): The primary dark brand color. Used for all primary headings, strong backgrounds, and dark overlays.
- `bg-coral`, `text-coral` (`#F76C5E`): The primary action and urgency color. Used strictly for CTAs, highlight badges, and links. Hover state: `hover:bg-coral-dark` (`#E55B4D`).
- `bg-sky`, `text-sky` (`#E5EEF1`): Very soft, icy nautical blue, mostly used for subtle borders or highlights.
- `bg-ocean`, `bg-ocean-light` (`#1F4E79`, `#3A7CA5`): Secondary blues, mostly used for UI accents and older buttons. Transition toward Coral for primary actions.
- `bg-sand` (`#F9F8F6`): A warm, high-end off-white. Use this instead of pure white `bg-white` for alternating section backgrounds (e.g., Testimonials, FAQ).

## 4. UI Layout & Spacing Rules
- **Negative Space is Required:** Standard sections MUST use massive vertical padding: `py-32` is favored over `py-16` or `py-20`.
- **Text Centering:** Use `max-w-xl mx-auto text-center` for standard section headers.
- **Subheadings:** Use `text-slate-500 font-light text-lg` for descriptive subheadings under `font-display` section titles.
- **Background Alternation:** Alternate between `bg-white` and `bg-sand`, occasionally anchoring sections with `bg-navy text-white`.

## 5. Component Patterns
### Primary Buttons
Buttons must look sharp and intentional (often square-ish). Do not use pill shapes (`rounded-full`) for main sales CTAs.
```tsx
<button className="px-6 py-3.5 bg-coral hover:bg-coral-dark text-white font-medium text-xs tracking-widest uppercase rounded-sm shadow-md transition-all duration-400">
  Rezerviraj termin
</button>
```

### Cards (Course Cards)
- **Structure:** Full-bleed image cards instead of "image + white box below".
- **Gradients:** Use soft bottom-up gradients (`bg-gradient-to-t from-navy/90 via-navy/30 to-transparent`) to contrast white text.
- **Badges:** Use glassmorphic pills (`bg-white/10 backdrop-blur-md border border-white/20`) for prices/badges overlaying images.
- **Typography on Cards:** `font-display` for the title in white, `font-light text-white/80` for the description.

### Forms & Inputs
- Minimalist fields: `bg-white border border-slate-200 rounded-sm text-base focus:ring-1 focus:ring-navy font-light`.
- Required asterisks: Style with `<span className="text-coral">*</span>`.

### Badges & Tiny Text
- Small utility texts (like "Glavni Inštruktor", "Samo še 2 mesti") should be very tight: `text-[10px]` or `text-xs uppercase tracking-widest font-bold`.

## 6. Trust & Conversion Anchors
- Whenever placing a button, attempt to place trust anchors immediately below it.
- **Example Trust Anchors:** `Garancija na znanje`, `Plačilo po predlogi`, `Varna prijava`. Use small SVG icons beside the text.
- Use Exit Intent logic, Sticky Mobile booking bars, and FOMO (seat availability) to drive urgency without cheapening the brand.
