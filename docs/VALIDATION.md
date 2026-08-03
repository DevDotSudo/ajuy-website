# Validation Results

Validated in the packaging environment on August 4, 2026.

## Passed checks

- 34 barangays are present.
- Barangay names and PSGC codes are unique.
- Barangay population total equals 54,100.
- 16 population observations are in increasing year order.
- 10 attraction and visitor entries are present.
- Attraction slugs are unique and every entry has a Google Maps search query.
- 43 TypeScript and TSX source files pass isolated TypeScript syntax transpilation.
- The project CSS parses successfully with PostCSS.
- 67 internal `@/` imports resolve and their named exports were checked.
- 11 public page routes are present.
- `/analytics` redirects to `/population`.
- All 19 referenced local image paths exist.
- All 11 image assets are present and recognized as PNG, JPEG, or SVG files.
- No pasted Gemini API-key pattern was found.
- The chatbot has no floating launcher or public standalone page; it opens from the header button.

## Package-manager limitation

A full dependency installation, ESLint run, semantic TypeScript check, and Next.js production build could not run in this isolated environment. The configured internal npm registry returned a 404 response for required public packages such as `@types/node`.

Run the complete checks on a normal network before deployment:

```powershell
npm install
npm run check
```

The included GitHub Actions workflow can also run the validation, lint, type-check, and build steps after the project is pushed.

## Satellite map and AI location update

Validated on 2026-08-04:

- Main Ajuy Map includes standard and satellite controls.
- Desktop map explorer uses a compact fixed height.
- Mobile results use a fixed-height scrollable list and a shorter map frame.
- AI location detection returns a structured map card only for location-intent questions.
- Tested attraction, barangay, hyphenated barangay, municipal-hall, and resort location queries.
- API fallback returns the same map metadata when Gemini is not configured.
- TypeScript and TSX source syntax passed isolated transpilation for all source files.
- CSS parsed successfully.

A full Next.js build still requires `npm install` in a network-enabled environment.
