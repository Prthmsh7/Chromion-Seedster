import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  define: {
    'process.env': {
      // Provide default values for environment variables
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
      SUPABASE_URL: process.env.SUPABASE_URL || '',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
      PINATA_API_KEY: process.env.PINATA_API_KEY || '',
      PINATA_API_SECRET: process.env.PINATA_API_SECRET || '',
      FILCDN_API_KEY: process.env.FILCDN_API_KEY || 'demo-key',
      FILCDN_BASE_URL: process.env.FILCDN_BASE_URL || 'https://api.filcdn.io/v1',
      FILCDN_ENABLED: process.env.FILCDN_ENABLED || 'false'
    },
    global: 'globalThis',
  },
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      util: 'util',
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }
})