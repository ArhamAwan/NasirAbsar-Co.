/**
 * Get Vercel optimized image URL
 * Uses Vercel's Image Optimization API for automatic format conversion and compression
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
    const params = new URLSearchParams();
    params.set('url', src);
    if (width) params.set('w', width.toString());
    params.set('q', quality.toString());
    
    return `/_vercel/image?${params.toString()}`;
  }
  
  // In development, return original path
  return src;
};

