// Vercel Serverless Function to handle review rejection
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Max-Age", "86400");

  const method = req.method?.toUpperCase();

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return res.status(200).end();
  }

  if (method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const phpUrl = "https://api.nasirabsar.com/api/reviews.php/reject";

    // Debug: Log all headers to see what we're receiving
    console.log('Received headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Add body for POST requests
    if (req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    // Add authorization header if present (Vercel normalizes headers to lowercase)
    // Check all possible variations
    const authHeader = 
      (req.headers.authorization as string) || 
      (req.headers['authorization'] as string) ||
      (req.headers.Authorization as string) ||
      (req.headers['Authorization'] as string) ||
      '';
    
    console.log('Extracted authHeader:', authHeader ? 'Found' : 'Missing');
    
    if (!authHeader) {
      // Log for debugging
      console.error('Missing Authorization header. Available headers:', Object.keys(req.headers));
      return res.status(401).json({
        success: false,
        error: 'Authorization header missing',
        debug: {
          availableHeaders: Object.keys(req.headers),
          headers: req.headers
        }
      });
    }
    
    fetchOptions.headers = {
      ...fetchOptions.headers,
      Authorization: authHeader,
    };

    console.log('Sending to PHP with headers:', JSON.stringify(fetchOptions.headers, null, 2));
    console.log('PHP URL:', phpUrl);

    // Forward the request to the PHP endpoint
    const response = await fetch(phpUrl, fetchOptions);
    
    console.log('PHP response status:', response.status);
    console.log('PHP response headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));

    // Handle redirects
    if (response.status >= 300 && response.status < 400) {
      return res.status(500).json({
        success: false,
        error: "Server configuration error",
      });
    }

    // Get response text
    let responseText = "";
    try {
      responseText = await response.text();
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: "Failed to read server response",
      });
    }

    // Check if response is HTML (error page) instead of JSON
    if (responseText.trim().startsWith("<")) {
      return res.status(500).json({
        success: false,
        error: "Server configuration error",
      });
    }

    if (!response.ok) {
      // Try to parse as JSON even if status is not ok
      let errorData;
      try {
        errorData = JSON.parse(responseText);
        return res.status(response.status).json({
          success: false,
          error: errorData.error || "Server error occurred",
        });
      } catch (e) {
        return res.status(response.status).json({
          success: false,
          error: "Server error occurred",
        });
      }
    }

    // Parse JSON response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      return res.status(500).json({
        success: false,
        error: "Invalid server response",
      });
    }

    // Return the response
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to process request",
    });
  }
}

