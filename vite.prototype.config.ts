import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
export default defineConfig({base:'./',plugins:[react()],resolve:{alias:{'@':fileURLToPath(new URL('.',import.meta.url))}},build:{outDir:'prototype-dist',emptyOutDir:true,assetsInlineLimit:1000000,rollupOptions:{input:'preview.html',output:{inlineDynamicImports:true}}}});
