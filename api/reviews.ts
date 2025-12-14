// Vercel Serverless Function to proxy reviews API requests
// This avoids CORS issues by making server-to-server requests

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Determine the PHP endpoint based on the request
    let phpUrl = 'https://nasirabsar.com/api/reviews.php';
    
    // Check if there's an action in the query or path
    const action = req.query.action || req.query.path;
    if (action === 'approve' || req.url?.includes('/approve')) {
      phpUrl = 'https://nasirabsar.com/api/reviews.php/approve';
    } else if (action === 'reject' || req.url?.includes('/reject')) {
      phpUrl = 'https://nasirabsar.com/api/reviews.php/reject';
    } else if (action === 'delete' || req.url?.includes('/delete')) {
      phpUrl = 'https://nasirabsar.com/api/reviews.php/delete';
    }

    // Add query parameters for GET requests
    if (req.method === 'GET' && Object.keys(req.query).length > 0) {
      const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
      if (queryString && !phpUrl.includes('?')) {
        phpUrl += '?' + queryString;
      }
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add body for POST requests
    if (req.method === 'POST' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    // Forward the request to the PHP endpoint
    const response = await fetch(phpUrl, fetchOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('PHP API error:', response.status, errorText);
      return res.status(response.status).json({
        success: false,
        error: `Server error: ${response.status}`,
      });
    }

    const data = await response.json();

    // Return the response
    return res.status(200).json(data);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process request',
    });
  }
}

