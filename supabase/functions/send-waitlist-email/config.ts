// Form submission endpoints
export const FORMSPREE_URL = process.env.FORMSPREE_URL;
export const FORMSUBMIT_URL = process.env.FORMSUBMIT_URL;

// Get CORS headers function
export function getCorsHeaders(requestOrigin: string | null) {
  // Default headers for all responses
  const headers = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, origin, referer, x-csrf-token",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Credentials": "true"
  };

  // For all origins, use wildcard CORS
  console.log(`Using wildcard CORS for origin: ${requestOrigin || "unknown"}`);
  return { ...headers, "Access-Control-Allow-Origin": "*" };
}
