import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  const CLIENT_PORT = parseInt(env.VITE_CLIENT_PORT)

  return defineConfig({
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      strictPort: true,
      port: CLIENT_PORT,
    },
  })
}
