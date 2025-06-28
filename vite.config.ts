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
    'process.env': {},
    global: 'globalThis',
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || ''),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || ''),
    'import.meta.env.VITE_GITHUB_CLIENT_ID': JSON.stringify(process.env.VITE_GITHUB_CLIENT_ID || ''),
    'import.meta.env.VITE_FILCDN_API_KEY': JSON.stringify(process.env.VITE_FILCDN_API_KEY || ''),
    'import.meta.env.VITE_FILCDN_BASE_URL': JSON.stringify(process.env.VITE_FILCDN_BASE_URL || ''),
    'import.meta.env.VITE_FILCDN_ENABLED': JSON.stringify(process.env.VITE_FILCDN_ENABLED || ''),
    'import.meta.env.VITE_PINATA_API_KEY': JSON.stringify(process.env.VITE_PINATA_API_KEY || ''),
    'import.meta.env.VITE_PINATA_API_SECRET': JSON.stringify(process.env.VITE_PINATA_API_SECRET || '')
  },
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      util: 'util',
    },
  },
})