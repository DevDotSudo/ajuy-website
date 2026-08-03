# Municipality of Ajuy Website

A modern, responsive public-information website for the Municipality of Ajuy, Iloilo. It is built with Next.js, React, TypeScript, and plain CSS.

## Main features

- Modern animated homepage with improved responsive layouts from small phones to wide desktops
- Interactive Ajuy Profile combining history, facts, economy, geography, population, and map content
- Wider 1400px desktop content area with responsive mobile spacing
- Redesigned desktop and mobile navigation
- Header-only Ajuy AI button that opens a bottom-right chat window
- Searchable directory for all 34 barangays
- Google Maps explorer for barangays and selected attractions
- Expanded attraction guide with safety and verification notes
- Population page with 1903–2024 census and POPCEN records
- Fixed and improved population visuals, interactive chart, tables, barangay rankings, and CSV download
- Local government, culture, gallery, emergency, and contact pages
- Recent official Ajuy-related provincial updates
- Server-side Gemini integration with a local information fallback
- Sitemap, robots rules, accessibility support, and security headers

## Pages

- `/` — Home
- `/about` — Interactive Ajuy Profile
- `/barangays` — Barangay directory
- `/government` — Local government and public services
- `/population` — Population records and charts
- `/map` — Google Maps barangay and attraction explorer
- `/attractions` — Attractions and visitor guidance
- `/culture` — Culture and festivals
- `/gallery` — Visual gallery
- `/emergency` — Emergency contacts and guidance
- `/contact` — Municipal contact information and inquiry form

The old `/analytics` address redirects to `/population`.

## Local setup

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Gemini setup

Create a new Gemini API key. Never use a key that was posted publicly, committed to Git, or placed in frontend code.

Update `.env.local`:

```env
GEMINI_API_KEY=your_new_key
GEMINI_MODEL=gemini-3.5-flash-lite
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The browser sends questions only to `app/api/chat/route.ts`. The server reads the key from the environment and sends selected Ajuy information to Gemini. When no key is configured or Gemini is unavailable, the assistant returns a local answer from the approved website data.

## Google Maps

The map uses standard Google Maps embed and search URLs. It does not require a Google Maps API key for the included features. Search results and pin positions come from Google, so exact entrances, boat routes, road conditions, and island access should still be confirmed locally.

## Content updates

Most public information is stored under `data/`. Review changing officials, telephone numbers, email addresses, schedules, fees, emergency contacts, private business status, and visitor access before publication.

Important content files:

- `data/municipality.ts`
- `data/barangays.ts`
- `data/population.ts`
- `data/services.ts`
- `data/attractions.ts`
- `data/culture.ts`
- `data/emergency.ts`
- `data/community-updates.ts`

## Responsive visual update

- The empty green population box was caused by percentage-height bars inside a flexible container without a fixed plotting height.
- The homepage population graphic now uses real census values, visible bars, grid lines, a current total, a growth badge, and clearer year labels.
- Containers, sections, cards, navigation, maps, tables, charts, footer content, and profile layouts now adapt more cleanly at 1180px, 900px, 720px, 560px, and 380px breakpoints.
- The full population chart uses a unique SVG gradient ID and a safer responsive scroll area.

## Quality checks

```powershell
npm run validate:data
npm run lint
npm run typecheck
npm run build
```

Or run all checks:

```powershell
npm run check
```

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add `GEMINI_API_KEY`, `GEMINI_MODEL`, and `NEXT_PUBLIC_SITE_URL` in Project Settings.
4. Deploy.

## Developer

Designed and developed by **Eric Dave S. Cala-or**.

## Map and AI location features

- The Ajuy Map page has standard map and satellite view controls.
- The map uses a shorter responsive frame so the page remains compact.
- The barangay and attraction results stay inside a scrollable list.
- When a visitor asks the Ajuy AI Assistant for the location of a recognized barangay or attraction, the response includes an embedded Google Map.
- AI map cards include standard and satellite views, a link to the Ajuy Map page, and a direct Google Maps link.
- Map results are based on Google Maps search labels. Island access, entrances, roads, routes, and local travel conditions must still be confirmed locally.

## Homepage video banner

The video file is intentionally excluded from this ZIP. Create the folder `public/videos` if it does not exist, then place the video at:

```text
public/videos/ajuy-home.mp4
```

The same file is used in two ways:

- The homepage banner autoplays it muted and crops the lower caption area through CSS.
- Selecting **Watch full video** opens the complete video in a popup with sound and native controls.

Keep the exact filename `ajuy-home.mp4`. MP4 with H.264 video and AAC audio provides the widest browser support.
