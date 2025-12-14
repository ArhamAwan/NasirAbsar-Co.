# Deployment Guide

## Overview

This project has two deployment targets:

1. **Vercel** - React frontend (www.nasirabsar.com)
2. **cPanel** - PHP backend API (api.nasirabsar.com)

## Step 1: Deploy React App to Vercel

The React app is automatically deployed to Vercel when you push to the main branch.

### Commit and Push Changes

```bash
# Add all changes
git add .

# Commit with a descriptive message
git commit -m "Add review slider with infinite scroll and admin panel"

# Push to main branch (triggers Vercel deployment)
git push origin main
```

Vercel will automatically:

- Build the React app
- Deploy serverless functions (`api/send-consultation.ts`, `api/reviews.ts`)
- Deploy to www.nasirabsar.com

**Note:** PHP files in `public/` are automatically excluded from Vercel deployment.

## Step 2: Deploy PHP Files to cPanel

You need to manually upload the PHP files and data files to your cPanel hosting.

### Files to Upload

Upload these files to `api.nasirabsar.com`:

1. **PHP API Endpoint:**

   - `public/api/reviews.php` → `api.nasirabsar.com/api/reviews.php`

2. **Data Files (create directories if needed):**
   - `public/data/pending-reviews.json` → `api.nasirabsar.com/data/pending-reviews.json`
   - `public/data/approved-reviews.json` → `api.nasirabsar.com/data/approved-reviews.json`

### Upload Instructions

1. Log in to cPanel
2. Navigate to **File Manager**
3. Go to the root directory of `api.nasirabsar.com`
4. Create directories if they don't exist:
   - `/api/`
   - `/data/`
5. Upload the files:
   - Upload `public/api/reviews.php` to `/api/reviews.php`
   - Upload `public/data/pending-reviews.json` to `/data/pending-reviews.json`
   - Upload `public/data/approved-reviews.json` to `/data/approved-reviews.json`

### Set File Permissions

Make sure the data files are writable:

- `pending-reviews.json` → **644** or **666** (writable by web server)
- `approved-reviews.json` → **644** or **666** (writable by web server)

In cPanel File Manager:

1. Right-click each JSON file
2. Select "Change Permissions"
3. Set to **644** (or **666** if 644 doesn't work)

## Step 3: Verify Deployment

### Test React App (Vercel)

1. Visit https://www.nasirabsar.com/reviews
2. Check that reviews are displaying and scrolling
3. Test the "Add Review" form

### Test Admin Panel

1. Visit https://www.nasirabsar.com/admin/login
2. Log in with your admin credentials
3. Test approving/rejecting/deleting reviews

### Test PHP API (cPanel)

1. Visit https://api.nasirabsar.com/api/reviews.php?status=approved
2. Should return JSON with approved reviews
3. Check browser console for any CORS errors

## Troubleshooting

### Reviews Not Loading

- Check browser console for errors
- Verify PHP files are uploaded correctly
- Check file permissions on JSON files
- Verify `api/reviews.ts` serverless function is deployed

### Admin Panel Not Working

- Check that environment variables are set in Vercel:
  - `VITE_ADMIN_USER`
  - `VITE_ADMIN_PASS`
- Verify the admin route is accessible

### CORS Errors

- Ensure PHP files have CORS headers at the top
- Check that Vercel serverless functions are proxying correctly
- Verify `api.nasirabsar.com` is accessible

## Quick Deployment Checklist

- [ ] Commit and push React changes to Git
- [ ] Wait for Vercel deployment to complete
- [ ] Upload `public/api/reviews.php` to cPanel
- [ ] Upload `public/data/pending-reviews.json` to cPanel
- [ ] Upload `public/data/approved-reviews.json` to cPanel
- [ ] Set file permissions on JSON files (644 or 666)
- [ ] Test reviews page on production
- [ ] Test admin panel on production
- [ ] Verify PHP API endpoint is accessible
