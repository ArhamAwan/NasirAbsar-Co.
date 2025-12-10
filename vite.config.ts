import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from other devices on the network
    port: 5173,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Multiple passes for better minification
      },
      mangle: {
        safari10: true,
      },
    },
    cssCodeSplit: true, // Enable CSS code splitting
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'lucide-icons': ['lucide-react'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ogl-vendor': ['ogl'],
        },
        assetFileNames: (assetInfo) => {
          // Optimize CSS file naming for better caching
          if (assetInfo.name === 'style.css') {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    sourcemap: false, // Disable sourcemaps in production for smaller bundles
  },
});
