import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Custom plugin to exclude PHP files from build
const excludePhpFiles = () => {
  return {
    name: 'exclude-php-files',
    writeBundle() {
      // After build, remove PHP files from dist directory
      const distPath = join(process.cwd(), 'dist');
      const filesToRemove = [
        join(distPath, 'send-consultation.php'),
        join(distPath, 'api'),
        join(distPath, 'data'),
      ];
      
      filesToRemove.forEach((file) => {
        try {
          if (existsSync(file)) {
            const fs = require('fs');
            const stat = fs.statSync(file);
            if (stat.isDirectory()) {
              fs.rmSync(file, { recursive: true, force: true });
            } else {
              fs.unlinkSync(file);
            }
            console.log(`Removed from build: ${file}`);
          }
        } catch (error) {
          // Ignore errors
        }
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), excludePhpFiles()],
  server: {
    host: '0.0.0.0', // Allow access from other devices on the network
    port: 5173,
    // Proxy PHP requests to local PHP server for development
    // Start PHP server with: cd dist && php -S localhost:8000
    proxy: {
      '/send-consultation.php': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
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
