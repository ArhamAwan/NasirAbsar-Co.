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
   │   └── reviews.php
   └── data/
       ├── approved-reviews.json
       └── pending-reviews.json
   ```

### 1.2 Upload Files

**Upload `public/api/reviews.php`** to `public_html/api/reviews.php`

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

### 3.2 Test API Endpoint

Visit: `https://nasirabsar.com/api/reviews.php?status=approved`

You should see JSON response with reviews.

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

### Issue: 500 Error on API

**Solution:**

1. Check file permissions on `data` folder (should be 755)
2. Check file permissions on JSON files (should be 666)
3. Check PHP error logs in cPanel
4. Verify PHP version is 7.4+

### Issue: Reviews Not Saving

**Solution:**

1. Ensure `data` folder is writable (permissions 755)
2. Check if JSON files are writable (permissions 666)
3. Verify the path in `reviews.php` is correct

### Issue: CORS Errors

**Solution:**

- The PHP file already includes CORS headers
- If issues persist, check cPanel security settings

### Issue: Admin Login Not Working

**Solution:**

1. Check environment variables in Vercel
2. Clear browser localStorage
3. Try default credentials: `admin` / `admin123`

## File Structure Summary

```
cPanel (nasirabsar.com):
├── api/
│   └── reviews.php          ← Upload this
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
- [ ] Data folder created with correct permissions (755)
- [ ] JSON files created with correct permissions (666)
- [ ] React app deployed to Vercel
- [ ] Environment variables set (optional)
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
