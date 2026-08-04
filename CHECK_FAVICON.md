# How to Fix Favicon Not Showing

The Ajuy seal has been configured as the favicon, but browsers heavily cache favicons. Here's how to see it:

## Step 1: Restart Dev Server

```bash
# Stop the current server (Ctrl+C in terminal)
npm run dev
```

## Step 2: Clear Browser Cache

### Chrome/Edge
1. **Hard Refresh**: Press `Ctrl + Shift + R` (or `Ctrl + F5`)
2. **Or Clear Site Data**:
   - Press `F12` to open DevTools
   - Right-click the refresh button
   - Select "Empty Cache and Hard Reload"

### Firefox
1. **Hard Refresh**: Press `Ctrl + Shift + R`
2. **Or Clear Cache**:
   - Press `Ctrl + Shift + Delete`
   - Select "Cached Web Content"
   - Click "Clear Now"

### Safari
1. **Hard Refresh**: Press `Cmd + Option + R`
2. **Or Clear Cache**:
   - Safari menu → Preferences → Advanced
   - Enable "Show Develop menu"
   - Develop → Empty Caches

## Step 3: Force Favicon Reload

Visit these URLs directly in your browser:
- `http://localhost:3000/images/ajuy-seal.png` (should show the seal)
- `http://localhost:3000/favicon.ico` (should show the seal)

If both show the Ajuy seal, the configuration is correct.

## Step 4: Close and Reopen Browser Tab

Sometimes browsers need a fresh tab:
1. Close the localhost tab completely
2. Open a new tab
3. Navigate to `http://localhost:3000`

## Step 5: Try Incognito/Private Mode

Open the site in incognito/private browsing mode:
- Chrome/Edge: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`
- Safari: `Cmd + Shift + N`

This will show if caching is the issue.

## Verify in DevTools

1. Open DevTools (`F12`)
2. Go to **Network** tab
3. Filter by "favicon" or "ico"
4. Refresh the page
5. Check if `/favicon.ico` or `/images/ajuy-seal.png` loads successfully (200 status)

## Common Issues

### ❌ Still showing default Next.js icon
- **Solution**: Clear browser cache completely
- **Solution**: Close all browser windows and restart browser

### ❌ 404 error for favicon
- **Solution**: Make sure `public/images/ajuy-seal.png` exists
- **Solution**: Restart dev server

### ❌ Icon appears but wrong image
- **Solution**: Browser cached old icon, use hard refresh

### ❌ Works in incognito but not normal browsing
- **Solution**: Clear all browser cache and cookies for localhost

## Production Build

If testing a production build:

```bash
npm run build
npm run start
```

Then check `http://localhost:3000`

## Manual Verification

The favicon is configured in multiple places:

1. **app/layout.tsx** - Direct `<link>` tags in `<head>`
2. **app/icon.png** - Next.js file-based icon
3. **app/apple-icon.png** - iOS touch icon
4. **public/favicon.ico** - Fallback legacy favicon
5. **app/manifest.ts** - PWA manifest icons

All should point to the Ajuy seal.

## Testing Commands

Check if files exist:
```bash
dir public\images\ajuy-seal.png
dir public\favicon.ico
dir app\icon.png
dir app\apple-icon.png
```

All should show the files exist.

## Still Not Working?

If after all these steps the favicon still doesn't show:

1. Check browser console for errors (F12 → Console)
2. Check Network tab for failed requests (F12 → Network)
3. Try a different browser
4. Check if the PNG file is corrupted by opening it in an image viewer

## Expected Result

After following these steps, you should see the **green and gold Ajuy municipal seal** in:
- Browser tab/title bar ✅
- Bookmarks ✅
- History ✅
- Tab preview on hover ✅
