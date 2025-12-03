/**
 * Get optimized image URL
 * Vercel automatically optimizes images from the public folder,
 * so we return the original path and let Vercel handle optimization
 * 
 * @param src - Image source path (e.g., "/team/image.jpg")
 * @param width - Optional width in pixels (for future use)
 * @param quality - Image quality (1-100), default 85 (for future use)
 * @returns Image URL
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

  // Vercel automatically optimizes images from the public folder
  // No need to use /_vercel/image API for static Vite builds
  // Just return the original path and Vercel's CDN will optimize it
  return src;
};

