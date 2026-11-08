import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1' },
  // Discover icons used by lazy chunks up front so the first library/page open
  // does not trigger dependency re-optimization and reload the development app.
  optimizeDeps: {
    include: ['ArrowRight', 'ArrowUpRight', 'ArrowLeft', 'MagnifyingGlass', 'X']
      .map(icon => `@phosphor-icons/react/dist/csr/${icon}`),
  },
});
