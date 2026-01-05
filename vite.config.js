// hirely/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Use swc plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Your frontend port
    proxy: {
      // Proxy all requests starting with /api to your backend server
      '/api': {
        target: 'http://localhost:3001', // Your backend server address (new port)
        changeOrigin: true, // Needed for virtual hosting
        secure: false, // For development, if backend is http
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Rewrite path if needed
      },
    },
  },
});