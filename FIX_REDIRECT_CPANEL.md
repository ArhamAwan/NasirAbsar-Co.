# Fix CORS Redirect Error - cPanel Root .htaccess

## The Problem
`nasirabsar.com` is redirecting to `www.nasirabsar.com` (307 redirect) before PHP can send CORS headers, breaking the preflight request.

## The Solution
Add redirect prevention rules to the **ROOT** `.htaccess` file in cPanel.

## Steps

1. **Log into cPanel**
2. **Open File Manager**
3. **Navigate to `public_html`** (this is your root directory)
4. **Open `.htaccess` file** (or create if it doesn't exist)
5. **Add this code at the VERY TOP** (before any other rules):

```apache
RewriteEngine On

# Prevent redirects for PHP API endpoints (MUST BE FIRST)
RewriteCond %{REQUEST_URI} ^/(send-consultation\.php|api/)
RewriteRule ^(.*)$ - [L]
```

6. **Save the file**

## Complete Example

If you have an existing `.htaccess`, it should look like this:

```apache
RewriteEngine On

# Prevent redirects for PHP API endpoints (MUST BE FIRST)
RewriteCond %{REQUEST_URI} ^/(send-consultation\.php|api/)
RewriteRule ^(.*)$ - [L]

# Your existing rules go here (if any)
# Example redirect rule (if you have one):
# RewriteCond %{HTTP_HOST} !^www\. [NC]
# RewriteCond %{REQUEST_URI} !^/(send-consultation\.php|api/)  # Exclude API paths
# RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]
```

## Why This Works

- The root `.htaccess` is processed FIRST by Apache
- Adding the exclusion rule at the top prevents redirects for `/send-consultation.php` and `/api/` paths
- This allows PHP files to execute and send CORS headers before any redirect happens

## Test

After making changes:
1. Visit: `https://nasirabsar.com/send-consultation.php`
   - Should show JSON (not redirect)
2. Submit consultation form
   - Should work without CORS errors

## Important Notes

- The exclusion rule **MUST be at the top** (before any redirect rules)
- This file is in `public_html/.htaccess` (root), NOT in a subdirectory
- If you can't access the root `.htaccess`, contact your hosting provider

