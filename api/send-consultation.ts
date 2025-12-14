// Vercel Serverless Function to proxy consultation form submissions
// This avoids CORS issues by making server-to-server requests

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    console.log('Received request body:', req.body);
    
    // Forward the request to the PHP endpoint on cPanel
    const phpUrl = 'https://nasirabsar.com/send-consultation.php';
    console.log('Forwarding to PHP URL:', phpUrl);
    
    const response = await fetch(phpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    console.log('PHP response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PHP API error:', response.status, errorText);
      return res.status(response.status).json({
        success: false,
        error: `Server error: ${response.status}`,
        details: errorText.substring(0, 200),
      });
    }

    const data = await response.json();
    console.log('PHP response data:', data);

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

