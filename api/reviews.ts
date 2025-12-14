// Vercel Serverless Function to proxy reviews API requests
// This avoids CORS issues by making server-to-server requests

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  try {
    // Determine the PHP endpoint based on the request
    let phpUrl = 'https://nasirabsar.com/api/reviews.php';
    
    // Check if there's an action in the path (approve, reject, delete)
    const pathname = url.pathname;
    if (pathname.includes('/approve')) {
      phpUrl = 'https://nasirabsar.com/api/reviews.php/approve';
    } else if (pathname.includes('/reject')) {
      phpUrl = 'https://nasirabsar.com/api/reviews.php/reject';
    } else if (pathname.includes('/delete')) {
      phpUrl = 'https://nasirabsar.com/api/reviews.php/delete';
    }

    // Add query parameters for GET requests
    if (req.method === 'GET' && searchParams.toString()) {
      phpUrl += '?' + searchParams.toString();
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add body for POST requests
    if (req.method === 'POST') {
      const body = await req.json();
      fetchOptions.body = JSON.stringify(body);
    }

    // Forward the request to the PHP endpoint
    const response = await fetch(phpUrl, fetchOptions);
    const data = await response.json();

    // Return the response with CORS headers
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process request',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

