// Vercel Serverless Function to proxy consultation form submissions
// This avoids CORS issues by making server-to-server requests

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  // Log the method for debugging
  const method = req.method?.toUpperCase();
  console.log("Request method:", method);
  console.log("Request URL:", req.url);
  console.log("Request headers:", req.headers);

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests (case-insensitive)
  if (method !== "POST") {
    console.log("Method not allowed:", method);
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
      receivedMethod: method,
    });
  }

  try {
    // Parse request body if it's a string
    let requestBody = req.body;
    if (typeof requestBody === "string") {
      try {
        requestBody = JSON.parse(requestBody);
      } catch (e) {
        console.error("Failed to parse request body:", e);
      }
    }

    console.log("Received request body:", requestBody);
    console.log("Request body type:", typeof requestBody);

    // Forward the request to the PHP endpoint on cPanel
    // Use api subdomain to avoid redirects that convert POST to GET
    const phpUrl = "https://api.nasirabsar.com/send-consultation.php";
    console.log("Forwarding to PHP URL:", phpUrl);
    console.log(
      "Sending POST request with body:",
      JSON.stringify(requestBody).substring(0, 200)
    );

    const response = await fetch(phpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Vercel-Serverless-Function",
      },
      body: JSON.stringify(requestBody),
      redirect: "manual", // Prevent redirects that convert POST to GET
    });

    console.log("PHP response status:", response.status);
    console.log(
      "PHP response headers:",
      Object.fromEntries(response.headers.entries())
    );

    // Handle redirects manually
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      console.error("PHP endpoint redirected to:", location);
      return res.status(500).json({
        success: false,
        error: "PHP endpoint redirected, which may have converted POST to GET",
        redirectLocation: location,
      });
    }

    // Get response text first (can only read once)
    let responseText = "";
    try {
      responseText = await response.text();
      console.log(
        "PHP response text (first 500 chars):",
        responseText.substring(0, 500)
      );
    } catch (e) {
      console.error("Failed to read response text:", e);
      return res.status(500).json({
        success: false,
        error: "Could not read response from PHP endpoint",
      });
    }

    // Check if response is HTML (error page) instead of JSON
    if (responseText.trim().startsWith("<")) {
      console.error("PHP endpoint returned HTML instead of JSON");
      console.error("HTML response:", responseText.substring(0, 1000));
      return res.status(500).json({
        success: false,
        error: "PHP endpoint returned HTML error page instead of JSON",
        details:
          "The endpoint may not exist or there's a server configuration issue. Check that send-consultation.php exists at https://api.nasirabsar.com/send-consultation.php",
        htmlPreview: responseText.substring(0, 300),
      });
    }

    if (!response.ok) {
      console.error("PHP API error:", response.status, responseText);
      // Try to parse as JSON even if status is not ok
      let errorData;
      try {
        errorData = JSON.parse(responseText);
        return res.status(response.status).json({
          success: false,
          error: errorData.error || `Server error: ${response.status}`,
          details: errorData.details || responseText.substring(0, 200),
        });
      } catch (e) {
        // Not JSON, return as text
        return res.status(response.status).json({
          success: false,
          error: `Server error: ${response.status}`,
          details: responseText.substring(0, 200),
        });
      }
    }

    // Try to parse JSON response
    let data;
    try {
      data = JSON.parse(responseText);
      console.log("PHP response data:", data);
    } catch (parseError) {
      console.error("Failed to parse PHP response as JSON:", parseError);
      console.error(
        "Response text that failed to parse:",
        responseText.substring(0, 500)
      );
      return res.status(500).json({
        success: false,
        error: "PHP endpoint returned invalid JSON response",
        details:
          parseError instanceof Error ? parseError.message : String(parseError),
        responsePreview: responseText.substring(0, 200),
      });
    }

    // Return the response
    return res.status(200).json(data);
  } catch (error) {
    console.error("Serverless function error:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    return res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to process request",
      details: error instanceof Error ? error.stack : String(error),
    });
  }
}
