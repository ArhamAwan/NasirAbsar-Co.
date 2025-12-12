# Local Testing Guide

## Option 1: Using PHP Built-in Server (Easiest)

1. **Make sure PHP is installed:**
   ```bash
   php --version
   ```
   If not installed, install PHP (comes with macOS, or use Homebrew: `brew install php`)

2. **Start PHP server in the `dist` folder:**
   ```bash
   cd dist
   php -S localhost:8000
   ```

3. **In another terminal, start Vite dev server:**
   ```bash
   npm run dev
   ```

4. **Access your site:**
   - React app: http://localhost:5173
   - PHP endpoints: http://localhost:8000/send-consultation.php

5. **Update form to use local PHP server:**
   Change the fetch URL in `ConsultationForm.tsx` to:
   ```javascript
   const response = await fetch("http://localhost:8000/debug-form.php", {
   ```

## Option 2: Using Vite Proxy (Better for Development)

1. **Update `vite.config.ts`** to proxy PHP requests:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/send-consultation.php': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/debug-form.php': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  // ... rest of config
});
```

2. **Start PHP server:**
   ```bash
   cd dist
   php -S localhost:8000
   ```

3. **Start Vite dev server:**
   ```bash
   npm run dev
   ```

4. **Now you can use relative paths** like `/send-consultation.php` and Vite will proxy to PHP server

## Option 3: Using XAMPP/MAMP (Full Stack)

1. **Install XAMPP** (Mac/Windows) or **MAMP** (Mac)
2. **Copy files:**
   - Copy `dist` folder contents to `htdocs` (XAMPP) or `htdocs` (MAMP)
   - Copy PHP files to same location
3. **Access:** http://localhost/send-consultation.php

## Testing Steps

1. **Check Network Tab:**
   - Open DevTools (F12)
   - Go to **Network** tab
   - Submit form
   - Click on the request to `debug-form.php`
   - Check **Response** tab to see what PHP returned

2. **Check Console:**
   - The updated code now logs debug info to console
   - Look for "=== DEBUG INFO ===" in console

3. **Test Email Locally:**
   - For local testing, emails won't actually send
   - But you can verify the PHP script receives data correctly
   - Check the debug output to see if data is being received

## Troubleshooting

- **PHP not found:** Install PHP or use XAMPP/MAMP
- **Port already in use:** Change port: `php -S localhost:8001`
- **CORS errors:** Make sure PHP server is running and accessible
- **404 errors:** Make sure PHP files are in the `dist` folder

