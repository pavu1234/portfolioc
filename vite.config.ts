import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],base:process.env.GITHUB_PAGES === 'true' ? '/Alur-Praveen-3D-Portfolio/' : './',build:{chunkSizeWarningLimit:900}});
