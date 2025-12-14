// Vercel Serverless Function to proxy reviews API requests
// This avoids CORS issues by making server-to-server requests

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Max-Age", "86400");

  const method = req.method?.toUpperCase();

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Determine the PHP endpoint based on the request path
    let phpUrl = "https://api.nasirabsar.com/api/reviews.php";
    const path = req.url || "";

    // Check if there's an action in the path
    if (path.includes("/approve") || path.endsWith("/approve")) {
      phpUrl = "https://api.nasirabsar.com/api/reviews.php/approve";
    } else if (path.includes("/reject") || path.endsWith("/reject")) {
      phpUrl = "https://api.nasirabsar.com/api/reviews.php/reject";
    } else if (path.includes("/delete") || path.endsWith("/delete")) {
      phpUrl = "https://api.nasirabsar.com/api/reviews.php/delete";
    }

    // Add query parameters for GET requests
    if (method === "GET" && Object.keys(req.query).length > 0) {
      const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
      if (queryString && !phpUrl.includes("?")) {
        phpUrl += "?" + queryString;
      }
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Add body for POST requests
    if (method === "POST" && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    // Add authorization header if present
    const authHeader = req.headers.authorization;
    if (authHeader) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: authHeader,
      };
    }

    // Forward the request to the PHP endpoint
    const response = await fetch(phpUrl, fetchOptions);

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
