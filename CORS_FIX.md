# Fix CORS Redirect Issue

## The Problem

`nasirabsar.com` is redirecting to `www.nasirabsar.com` with a 307 redirect, which breaks CORS preflight requests.

## Solution: Prevent Redirect for API Path

You need to modify the root `.htaccess` file in cPanel to exclude the `/api/` path from redirects.

### Steps:

1. **Log into cPanel**
2. **Open File Manager**
3. **Navigate to `public_html` (or your root directory)**
4. **Open or create `.htaccess` file**
5. **Add this rule BEFORE any redirect rules:**

```apache
# Prevent redirects for API endpoints
RewriteEngine On
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^(.*)$ - [L]
```

**Important:** This rule must come BEFORE any www/non-www redirect rules in your `.htaccess` file.

### Example Root `.htaccess`:

```apache
RewriteEngine On

# Prevent redirects for API endpoints (MUST BE FIRST)
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^(.*)$ - [L]

# Your existing redirect rules (if any)
RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteCond %{REQUEST_URI} !^/api/  # Also exclude here
RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]
```

## Alternative: Use Subdomain

If you can't modify the root `.htaccess`, create a subdomain:
- `api.nasirabsar.com` → points to same directory
- Update API URLs to use `https://api.nasirabsar.com/api/reviews.php`

## Files to Upload

Make sure these files are uploaded to cPanel:

1. ✅ `public/api/reviews.php` → `public_html/api/reviews.php`
2. ✅ `public/api/.htaccess` → `public_html/api/.htaccess` (handles CORS)
3. ✅ Root `.htaccess` → Add exception for `/api/` path

## Test

After making changes, test:
1. Visit: `https://nasirabsar.com/api/reviews.php?status=approved`
2. Should return JSON (not redirect)
3. Check browser console - no CORS errors

