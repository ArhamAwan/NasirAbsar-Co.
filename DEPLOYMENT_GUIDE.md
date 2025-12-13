# Deployment Guide - Review Management Feature

This guide will help you deploy the review management feature to production.

## Prerequisites

- Access to cPanel for PHP files
- Access to Vercel (or your hosting) for React app
- Domain: `nasirabsar.com` (already configured)

## Step 1: Deploy PHP API Files to cPanel

### 1.1 Upload PHP Files

1. Log into your cPanel account
2. Navigate to **File Manager**
3. Go to your website's root directory (usually `public_html` or `www`)
4. Create/upload the following structure:
   ```
   public_html/
   ├── api/
   │   ├── reviews.php
   │   └── .htaccess        ← IMPORTANT: Upload this too!
   └── data/
       ├── approved-reviews.json
       └── pending-reviews.json
   ```

### 1.2 Upload Files

**Upload `public/api/reviews.php`** to `public_html/api/reviews.php`

**Upload `public/api/.htaccess`** to `public_html/api/.htaccess` (This handles CORS at server level)

**Create `public/data/` directory** and upload:

- `approved-reviews.json` (already has sample reviews)
- `pending-reviews.json` (empty array `[]`)

### 1.3 Set File Permissions

In cPanel File Manager:

1. Right-click on `data` folder → **Change Permissions**
2. Set to **755** (readable/writable by owner, readable by others)
3. Right-click on `approved-reviews.json` → **Change Permissions** → **666** (readable/writable)
4. Right-click on `pending-reviews.json` → **Change Permissions** → **666** (readable/writable)

**Important:** The `data` folder must be writable by PHP!

### 1.4 Verify PHP Version

1. In cPanel, go to **Select PHP Version**
2. Ensure PHP 7.4 or higher is selected
3. Enable required extensions (JSON should be enabled by default)

### 1.5 Fix CORS Issues (If Domain Redirects)

If `nasirabsar.com` redirects to `www.nasirabsar.com` (or vice versa), you have two options:

**Option A: Use Same Domain (Recommended)**

- Put PHP files on the same domain as your React app
- If React is on `www.nasirabsar.com`, ensure PHP is also accessible there
- Or use a subdomain like `api.nasirabsar.com`

**Option B: Disable Redirect for API**

- In cPanel, check for `.htaccess` in root that redirects
- Add exception for `/api/` path:
  ```apache
  RewriteCond %{REQUEST_URI} !^/api/
  ```

## Step 2: Deploy React App to Vercel

### 2.1 Build the App Locally (Optional - for testing)

```bash
npm run build
```

This creates a `dist` folder with production-ready files.

### 2.2 Deploy to Vercel

**Option A: Via Vercel CLI**

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Deploy
vercel --prod
```

**Option B: Via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel will auto-detect Vite and deploy

### 2.3 Set Environment Variables (if needed)

In Vercel Dashboard → Project Settings → Environment Variables:

**For Admin Authentication:**

- `VITE_ADMIN_USER` = your admin username
- `VITE_ADMIN_PASS` = your admin password

**Note:** These are optional. If not set, defaults are:

- Username: `admin`
- Password: `admin123`

## Step 3: Verify Domain Configuration

### 3.1 Check Domain Setup

Your React app should be accessible at:

- `www.nasirabsar.com` → Vercel (React app)
- `nasirabsar.com` → cPanel (PHP API)

**IMPORTANT:** If there's a redirect between www and non-www, it will break CORS. Ensure:

- Either both domains point to the same place
- Or the API is accessible on the same domain as the React app
- Or use a subdomain like `api.nasirabsar.com`

### 3.2 Test API Endpoint

Visit: `https://nasirabsar.com/api/reviews.php?status=approved`

You should see JSON response with reviews.

**If you get a redirect:** Check your domain settings in cPanel and ensure `/api/` path doesn't redirect.

## Step 4: Test the Feature

### 4.1 Test Review Submission

1. Go to `https://www.nasirabsar.com/reviews`
2. Click "Add Review"
3. Fill out the form and submit
4. Check `pending-reviews.json` in cPanel to see the new review

### 4.2 Test Admin Panel

1. Go to `https://www.nasirabsar.com/admin/login`
2. Login with your admin credentials
3. Go to `https://www.nasirabsar.com/admin/reviews`
4. You should see pending reviews
5. Test Approve, Reject, and Delete functions

### 4.3 Test Approved Reviews Display

1. Approve a review in admin panel
2. Go back to `https://www.nasirabsar.com/reviews`
3. The approved review should appear in the slider

## Step 5: Clean Up (Optional)

### Remove Test Files

You can delete these test files from cPanel:

- `public/api/test-reviews.php` (only needed for debugging)

## Troubleshooting

### Issue: CORS Error - "Redirect is not allowed for a preflight request"

**Cause:** The domain is redirecting (www to non-www or vice versa) before the PHP file can send CORS headers.

**Solutions:**

1. **Use same domain:** Ensure both React app and PHP API use the same domain (both www or both non-www)
2. **Disable redirect for API:** Add exception in root `.htaccess`:
   ```apache
   RewriteCond %{REQUEST_URI} !^/api/
   ```
3. **Use subdomain:** Create `api.nasirabsar.com` subdomain for PHP files
4. **Check `.htaccess` in api folder:** Ensure `public/api/.htaccess` is uploaded (handles CORS at server level)

### Issue: 500 Error on API

**Solution:**

1. Check file permissions on `data` folder (should be 755)
2. Check file permissions on JSON files (should be 666)
3. Check PHP error logs in cPanel
4. Verify PHP version is 7.4+
5. Ensure `.htaccess` file is in the `api` folder

### Issue: Reviews Not Saving

**Solution:**

1. Ensure `data` folder is writable (permissions 755)
2. Check if JSON files are writable (permissions 666)
3. Verify the path in `reviews.php` is correct

### Issue: CORS Errors

**Solution:**

- The PHP file and `.htaccess` both include CORS headers
- If issues persist, check cPanel security settings
- Verify domain redirects aren't interfering
- Check browser console for specific error messages

### Issue: Admin Login Not Working

**Solution:**

1. Check environment variables in Vercel
2. Clear browser localStorage
3. Try default credentials: `admin` / `admin123`

## File Structure Summary

```
cPanel (nasirabsar.com):
├── api/
│   ├── reviews.php          ← Upload this
│   └── .htaccess            ← Upload this (IMPORTANT for CORS)
└── data/
    ├── approved-reviews.json ← Upload this (with sample reviews)
    └── pending-reviews.json  ← Upload this (empty array)

Vercel (www.nasirabsar.com):
└── dist/                    ← Auto-deployed from Git
    ├── index.html
    └── assets/
        └── ...
```

## Quick Checklist

- [ ] PHP files uploaded to cPanel
- [ ] `.htaccess` file uploaded to `api` folder (IMPORTANT!)
- [ ] Data folder created with correct permissions (755)
- [ ] JSON files created with correct permissions (666)
- [ ] React app deployed to Vercel
- [ ] Environment variables set (optional)
- [ ] Domain redirects checked (www vs non-www)
- [ ] Test API endpoint directly in browser
- [ ] Test review submission
- [ ] Test admin panel login
- [ ] Test approve/reject/delete functions
- [ ] Verify reviews appear in slider

## Support

If you encounter issues:

1. Check browser console for errors
2. Check PHP error logs in cPanel
3. Test API endpoint directly: `https://nasirabsar.com/api/reviews.php?status=approved`
4. Verify file permissions are correct
5. Check if domain redirects are interfering with CORS
