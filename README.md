# DIARA - Fine Silver Jewellery Brand Website

A premium, single-page website for DIARA silver jewellery brand, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Luxury minimal aesthetic with warm ivory tones and elegant typography
- **Fully Responsive**: Mobile-first design that looks stunning on all devices
- **Single Page Layout**: Smooth scrolling sections for seamless navigation
- **SEO Optimized**: Proper metadata, semantic HTML, and Open Graph tags
- **Accessible**: ARIA labels, keyboard navigation, and screen reader friendly
- **Performance**: Fast loading with Next.js optimization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Playfair Display + Inter)

## Project Structure

```
diara-jewellery/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main single-page layout
│   └── globals.css         # Global styles & animations
├── components/
│   ├── Header.tsx          # Sticky header with navigation
│   ├── MobileMenu.tsx      # Mobile hamburger menu
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About/Story section
│   ├── Collections.tsx     # Collections preview
│   ├── CollectionCard.tsx  # Collection card component
│   ├── Craft.tsx           # Craft/Materials section
│   ├── Accordion.tsx       # Reusable accordion
│   ├── Gallery.tsx         # Lookbook gallery
│   ├── Contact.tsx         # Contact form & info
│   └── Footer.tsx          # Footer with modal links
├── data/
│   └── content.ts          # All site content & data
└── public/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd diara-jewellery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Sections

1. **Header** - Sticky navigation with smooth scrolling
2. **Hero** - Brand introduction with CTAs
3. **About** - Brand story and pillars
4. **Collections** - Three collection previews
5. **Craft** - Trust features and jewellery care guide
6. **Gallery** - 12-image lookbook grid
7. **Contact** - Contact info and form
8. **Footer** - Links and social media

## Customization

### Update Content

All content is centralized in `data/content.ts`. Update:
- Brand pillars
- Collection descriptions
- Gallery placeholders
- Care guide items
- Trust features

### Update Contact Info

Edit the contact details in `components/Contact.tsx`:
- Instagram handle
- Email address
- WhatsApp number
- Location/city

### Update Colors

Modify colors in `tailwind.config.ts` and the background color in `app/page.tsx`.

### Add Real Images

Replace gradient placeholders with real images:
1. Add images to `/public/images/`
2. Update components to use Next.js Image component
3. Update `galleryImages` in `data/content.ts`

## Design Tokens

- **Background**: `#FAF8F5` (warm ivory)
- **Text**: `#2D2D2D` to `#78716c` (charcoal/stone)
- **Accents**: Stone gray variants
- **Fonts**:
  - Headings: Playfair Display (serif)
  - Body: Inter (sans-serif)

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Alt text for images
- Reduced motion support

## SEO

- Proper meta tags
- Open Graph protocol
- Twitter Card support
- Semantic heading hierarchy
- Descriptive page title and description

## Performance Optimizations

- Next.js automatic code splitting
- Font optimization with next/font
- Lazy loading ready
- Optimized bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

Private project for DIARA brand.

## Support

For issues or questions, please contact the development team.

---

Built with ♥ for modern elegance
