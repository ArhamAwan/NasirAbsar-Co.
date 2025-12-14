// Vercel Serverless Function to proxy consultation form submissions
// This avoids CORS issues by making server-to-server requests

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  const method = req.method?.toUpperCase();

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    // Parse request body if it's a string
    let requestBody = req.body;
    if (typeof requestBody === "string") {
      try {
        requestBody = JSON.parse(requestBody);
      } catch (e) {
        // Invalid JSON, continue with original body
      }
    }

    // Forward the request to the PHP endpoint on cPanel
    const phpUrl = "https://api.nasirabsar.com/send-consultation.php";

    const response = await fetch(phpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Vercel-Serverless-Function",
      },
      body: JSON.stringify(requestBody),
      redirect: "manual",
    });

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
