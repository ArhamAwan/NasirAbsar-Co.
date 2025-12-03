/**
 * Get Vercel optimized image URL
 * Uses Vercel's Image Optimization API for automatic format conversion and compression
 * This will show up in Vercel's Image Optimization dashboard
 * 
 * @param src - Image source path (e.g., "/team/image.jpg")
 * @param width - Optional width in pixels
 * @param quality - Image quality (1-100), default 85
 * @returns Optimized image URL
 */
export const getVercelOptimizedImage = (
  src: string,
  width?: number,
  quality: number = 85
): string => {
  // Return as-is if it's an external URL, data URL, or empty
  if (!src || src.startsWith('http') || src.startsWith('data:') || src.startsWith('https://via.placeholder.com')) {
    return src;
  }

  // Check if we're in production (Vercel) or development
  const isProduction = import.meta.env.PROD;
  
  if (isProduction) {
    // Use Vercel's image optimization API in production
    // This will track transformations in the dashboard
    const params = new URLSearchParams();
    // For Vite static sites, we need to provide the full URL
    // Use window.location.origin if available, otherwise construct from src
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = baseUrl + src;
    params.set('url', fullUrl);
    if (width) params.set('w', width.toString());
    params.set('q', quality.toString());
    
    return `/_vercel/image?${params.toString()}`;
  }
  
  // In development, return original path
  return src;
};

