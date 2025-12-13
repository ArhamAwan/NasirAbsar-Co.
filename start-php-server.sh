#!/bin/bash
# Start PHP development server for API endpoints
cd "$(dirname "$0")/public"
php -S localhost:8000
