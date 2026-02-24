# Quick Setup Guide for DIARA Website

## Step-by-Step Setup

### 1. Install Dependencies

Open your terminal in the `diara-jewellery` folder and run:

```bash
npm install
```

This will install all required packages (Next.js, React, TypeScript, Tailwind CSS, etc.)

### 2. Run the Development Server

```bash
npm run dev
```

The site will be available at: **http://localhost:3000**

### 3. What You'll See

- ✅ Sticky header with smooth-scrolling navigation
- ✅ Hero section with brand name and CTAs
- ✅ About section with brand story
- ✅ Collections preview (3 cards)
- ✅ Craft & Care section with accordion
- ✅ Gallery/Lookbook with 12 image placeholders
- ✅ Contact section with form
- ✅ Footer with modal links

## Customization Checklist

### Essential Updates:

- [ ] **Contact Information** (`components/Contact.tsx`):
  - Update Instagram handle (currently: @diara.jewels)
  - Update email (currently: hello@diara.in)
  - Update WhatsApp number (currently: +91 98765 43210)
  - Update location (currently: Mumbai, India)

- [ ] **Footer** (`components/Footer.tsx`):
  - Update Instagram link

- [ ] **Gallery** (`components/Gallery.tsx`):
  - Update Instagram handle and link

### Optional Updates:

- [ ] Replace gradient placeholders with real product images
- [ ] Update collection descriptions in `data/content.ts`
- [ ] Customize brand story in `components/About.tsx`
- [ ] Add actual privacy policy, returns policy content in `components/Footer.tsx`
- [ ] Create and add OG image at `/public/og-image.jpg` (1200x630px)

## File Structure Overview

```
Key files to customize:
├── data/content.ts          ← All content (collections, gallery, care guide)
├── components/Contact.tsx   ← Contact info & form
├── components/About.tsx     ← Brand story
├── components/Footer.tsx    ← Footer links & modals
└── app/layout.tsx           ← SEO metadata
```

## Build for Production

When ready to deploy:

```bash
npm run build
npm start
```

## Deploy

You can deploy this Next.js app to:
- **Vercel** (recommended, made by Next.js creators)
- **Netlify**
- **Railway**
- Any hosting that supports Node.js

For Vercel:
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## Need Help?

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

---

**Ready to go!** Run `npm install && npm run dev` to see your site live.
