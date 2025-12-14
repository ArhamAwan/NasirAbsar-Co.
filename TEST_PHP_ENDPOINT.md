# Testing PHP Endpoint

The Vercel logs show "PHP API error: 405" which means PHP is returning 405 Method Not Allowed.

## Possible Causes:

1. **Redirect converting POST to GET**: If `nasirabsar.com` redirects to `www.nasirabsar.com`, POST becomes GET
2. **PHP file not accepting POST**: The PHP file might have different code on cPanel
3. **cPanel configuration**: Some cPanel settings might be interfering

## Test the PHP Endpoint Directly:

```bash
# Test with curl
curl -X POST https://nasirabsar.com/send-consultation.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'

# Check for redirects
curl -I -X POST https://nasirabsar.com/send-consultation.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'
```

## What to Check:

1. **Verify PHP file on cPanel**: Make sure `send-consultation.php` is uploaded to cPanel and has the correct code
2. **Check for redirects**: Test if `nasirabsar.com` redirects to `www.nasirabsar.com`
3. **Check PHP version**: Ensure PHP is enabled and running on cPanel
4. **Check file permissions**: PHP file should be readable and executable

## Solution:

If there's a redirect, we need to:
1. Either fix the redirect at cPanel level
2. Or use a different approach (like direct email from Vercel function)

