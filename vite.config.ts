import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
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
        SUPABASE_URL: JSON.stringify(env.SUPABASE_URL || ''),
        SUPABASE_ANON_KEY: JSON.stringify(env.SUPABASE_ANON_KEY || ''),
        GITHUB_CLIENT_ID: JSON.stringify(env.GITHUB_CLIENT_ID || ''),
        PINATA_API_KEY: JSON.stringify(env.PINATA_API_KEY || ''),
        PINATA_API_SECRET: JSON.stringify(env.PINATA_API_SECRET || ''),
        FILCDN_API_KEY: JSON.stringify(env.FILCDN_API_KEY || 'demo-key'),
        FILCDN_BASE_URL: JSON.stringify(env.FILCDN_BASE_URL || 'https://api.filcdn.io/v1'),
        FILCDN_ENABLED: JSON.stringify(env.FILCDN_ENABLED || 'false')
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
  }
})