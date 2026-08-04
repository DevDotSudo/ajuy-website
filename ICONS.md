# Website Icons Configuration

The Ajuy Municipality website uses the official Ajuy seal as the website icon across all platforms.

## Icon Files

### App Directory (Next.js 13+ Convention)
- `app/icon.png` - Main favicon (automatically generated as favicon.ico)
- `app/apple-icon.png` - Apple touch icon for iOS devices
- `app/favicon.ico` - Legacy favicon fallback

### Source Image
- `public/images/ajuy-seal.png` (1000x1000px) - Original high-resolution seal

## Configuration

### Layout Metadata (`app/layout.tsx`)
```typescript
icons: {
  icon: [
    { url: "/images/ajuy-seal.png", type: "image/png" },
    { url: "/favicon.ico", sizes: "any" },
  ],
  apple: [
    { url: "/images/ajuy-seal.png", sizes: "180x180", type: "image/png" },
  ],
  shortcut: "/images/ajuy-seal.png",
}
```

### Web Manifest (`app/manifest.ts`)
```typescript
icons: [
  { src: "/images/ajuy-seal.png", sizes: "1000x1000", type: "image/png", purpose: "any" },
  { src: "/images/ajuy-seal.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
  { src: "/images/ajuy-seal.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
]
```

## Where Icons Appear

✅ **Browser Tab** - Shows the Ajuy seal in the browser tab/window  
✅ **Bookmarks** - Appears when users bookmark the site  
✅ **Mobile Home Screen** - iOS/Android add to home screen icon  
✅ **Search Results** - May appear in Google search results  
✅ **Social Sharing** - Used when sharing links on social media  
✅ **PWA Install** - Progressive Web App installation icon

## Next.js File-Based Icons

Next.js 13+ supports file-based metadata icons:

- Place `icon.png` or `icon.ico` in the `app` directory
- Next.js automatically serves it as `/favicon.ico`
- Supports multiple sizes: `icon-192.png`, `icon-512.png`, etc.
- Apple touch icons: `apple-icon.png`

## Browser Support

- ✅ Chrome/Edge - Uses icon.png and manifest icons
- ✅ Firefox - Uses icon.png and manifest icons  
- ✅ Safari - Uses apple-icon.png for iOS devices
- ✅ Legacy browsers - Falls back to favicon.ico

## Updating the Icon

To change the website icon:

1. Replace `public/images/ajuy-seal.png` with your new logo
2. Copy it to `app/icon.png` and `app/apple-icon.png`
3. Restart the dev server
4. Clear browser cache to see changes

```bash
# Copy new icon
copy public\images\ajuy-seal.png app\icon.png
copy public\images\ajuy-seal.png app\apple-icon.png

# Restart server
npm run dev
```

## Recommended Icon Sizes

For best results, provide multiple sizes:

- **16x16** - Browser tab (favicon.ico)
- **32x32** - Taskbar/bookmark
- **180x180** - Apple touch icon
- **192x192** - PWA icon (Android)
- **512x512** - PWA icon (high-res)
- **1000x1000** - Open Graph/social sharing

The current implementation uses the 1000x1000 seal and lets browsers scale it as needed.

## Testing

To verify icons are working:

1. **Browser Tab**: Check the browser tab shows the Ajuy seal
2. **Bookmark**: Bookmark the page and check the icon
3. **Mobile**: Open on mobile and "Add to Home Screen"
4. **DevTools**: Open Network tab and check for favicon requests (should not 404)

## Notes

- Icons are cached heavily by browsers - may need hard refresh (Ctrl+Shift+R)
- PWA icons need to be square (1:1 aspect ratio)
- Transparent backgrounds work best for dark mode support
- The Ajuy seal has a transparent background, perfect for all themes
