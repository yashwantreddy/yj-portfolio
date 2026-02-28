# Yash Jankay Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- `react-icons`
- `next-themes`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint checks

## Project Structure

- `app/` - App Router layout, metadata, and home page entry
- `components/` - UI sections plus app-wide providers (`Navbar`, `HeroSection`, `AboutSection`, `ProjectsSection`, `Footer`, `Providers`)
- `public/` - static image assets used in portfolio sections
- `styles/` - global Tailwind stylesheet
- `tailwind.config.js` - Tailwind theme and animation configuration
- `eslint.config.mjs` - flat ESLint config for Next.js + TypeScript

## Notes

- The project is fully App Router based (`app/`) and does not include legacy `pages/api` boilerplate routes.
- Metadata (title, description, favicon) is defined in `/app/layout.tsx`.
