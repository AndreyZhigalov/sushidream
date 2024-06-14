import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react-swc';

let BASE_URL: string;

switch (process.env.NODE_ENV) {
  case 'development':
    BASE_URL = '/';
    break;
  case 'production':
    BASE_URL = '/sushidream/';
    break;
  default:
    BASE_URL = '/';
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: 'build',
  },
  base: BASE_URL,
});
