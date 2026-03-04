import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    minify: 'esbuild',
    sourcemap: false,
    lib: {
      entry: 'src/lib/index.ts',
      name: 'VirtualListVue',
      fileName: (format) => `virtual-list-vue.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Do not bundle Vue; expect it as a peer dependency.
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
