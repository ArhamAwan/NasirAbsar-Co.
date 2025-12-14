# Fix for Vercel Serverless Functions Not Appearing

## The Problem
- Getting 405 (Method Not Allowed) when calling `/api/send-consultation`
- Functions don't appear in Vercel dashboard

## Solution Steps

### 1. Ensure API folder is committed to Git
```bash
git add api/
git commit -m "Add Vercel serverless functions"
git push
```

### 2. Verify vercel.json configuration
The `vercel.json` should have:
- `functions` section pointing to `api/**/*.ts` with `@vercel/node` runtime
- Rewrite rules that exclude `/api` from redirecting to index.html

### 3. Check Vercel Build Settings
In Vercel Dashboard:
1. Go to Project Settings → General
2. Check **Build Command**: Should be `npm run build` or `vite build`
3. Check **Output Directory**: Should be `dist`
4. Check **Install Command**: Should be `npm install`

### 4. Verify Functions After Deployment
After pushing:
1. Wait for deployment to complete
2. Go to Deployments → Latest → Functions tab
3. You should see:
   - `api/send-consultation`
   - `api/reviews`

### 5. Test the Function
Visit in browser:
- `https://www.nasirabsar.com/api/send-consultation`
- Should return: `{"success":false,"error":"Method not allowed"}` (for GET)
- This confirms the function exists

### 6. If Functions Still Don't Appear

**Option A: Check Build Logs**
- Go to Vercel Dashboard → Deployments → Latest
- Check build logs for errors
- Look for messages about functions

**Option B: Manual Function Creation**
If automatic detection fails, you can:
1. Go to Vercel Dashboard → Project Settings → Functions
2. Manually configure the runtime for `api/**/*.ts` to `@vercel/node`

**Option C: Use JavaScript instead of TypeScript**
Rename files to `.js` and remove TypeScript types:
- `api/send-consultation.js`
- `api/reviews.js`

### 7. Alternative: Use Vercel CLI to Test Locally
```bash
npm i -g vercel
vercel dev
```
This will run functions locally and show if they're detected.

## Current Configuration

✅ `vercel.json` has functions configuration
✅ `@vercel/node` is installed
✅ Functions are in `api/` folder
✅ Functions use correct Vercel format

## Next Steps
1. **Commit and push** the changes
2. **Wait for deployment** to complete
3. **Check Functions tab** in Vercel dashboard
4. **Test the endpoint** in browser

