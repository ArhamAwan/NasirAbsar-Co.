# How to Check Vercel Serverless Functions

## 1. Check Functions in Vercel Dashboard

1. **Log into Vercel Dashboard**: https://vercel.com
2. **Select your project**: `nasir-absar-portfolio` (or your project name)
3. **Go to "Functions" tab** (in the top navigation)
4. **You should see**:
   - `/api/send-consultation`
   - `/api/reviews`

## 2. Check Function Logs

1. In Vercel Dashboard → Your Project
2. Go to **"Deployments"** tab
3. Click on the latest deployment
4. Go to **"Functions"** tab
5. Click on a function (e.g., `api/send-consultation`)
6. You'll see:
   - **Logs** - Real-time function execution logs
   - **Invocations** - How many times it was called
   - **Duration** - How long each execution took

## 3. Test Functions Directly

You can test the functions directly in your browser:

- **Consultation API**: `https://www.nasirabsar.com/api/send-consultation`
  - Should return: `{"success":false,"error":"Method not allowed"}` (for GET)
- **Reviews API**: `https://www.nasirabsar.com/api/reviews?status=approved`
  - Should return JSON with reviews

## 4. Check Browser Console

After submitting the form:

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. You should see logs:

   - `Sending request to: /api/send-consultation`
   - `Response status: 200`
   - `Response data: {...}`

4. Go to **Network** tab
5. Look for `/api/send-consultation` request
6. Check:
   - **Status**: Should be 200 (not stuck)
   - **Response**: Should show JSON response
   - **Headers**: Check if CORS headers are present

## 5. Common Issues

### Function Not Found (404)

- **Cause**: Functions not deployed yet
- **Fix**: Push to Git, Vercel will auto-deploy

### Function Timeout

- **Cause**: PHP endpoint taking too long
- **Fix**: Check PHP endpoint is responding

### Stuck on "Sending"

- **Cause**: Function not responding or error
- **Fix**: Check Vercel function logs for errors

## 6. Debug Steps

1. **Check if functions exist**:

   ```bash
   # After deployment, visit:
   https://www.nasirabsar.com/api/send-consultation
   ```

2. **Check function logs in Vercel**:

   - Dashboard → Project → Deployments → Latest → Functions → Logs

3. **Test PHP endpoint directly**:

   ```bash
   curl -X POST https://nasirabsar.com/send-consultation.php \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","message":"Test"}'
   ```

4. **Check browser network tab**:
   - Look for the `/api/send-consultation` request
   - Check status code and response

## 7. Verify Deployment

After pushing to Git:

1. Vercel will automatically deploy
2. Wait for deployment to complete
3. Check deployment logs for any errors
4. Functions should appear in the "Functions" tab
