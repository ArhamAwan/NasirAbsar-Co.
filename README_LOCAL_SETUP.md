# Local Development Setup

## Starting the PHP Server

To test the review admin panel locally, you need to start a PHP development server:

```bash
# Option 1: Use the provided script
./start-php-server.sh

# Option 2: Manual start
cd public
php -S localhost:8000
```

The PHP server should be running on `http://localhost:8000` for the Vite proxy to work.

## Testing

1. Start the PHP server (see above)
2. Start the Vite dev server: `npm run dev`
3. Access the admin panel at: `http://localhost:5173/admin/login`
4. Default credentials:
   - Username: `admin` (or set `VITE_ADMIN_USER` in `.env`)
   - Password: `awan` (or set `VITE_ADMIN_PASS` in `.env`)

## Files Structure

- `public/api/reviews.php` - PHP API endpoint
- `public/data/pending-reviews.json` - Pending reviews storage
- `public/data/approved-reviews.json` - Approved reviews storage (contains 3 legacy reviews)
