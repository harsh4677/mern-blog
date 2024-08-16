// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         secure: true,
//       },
//     },
//   },
//   plugins: [react()],
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false, // Set to false if the target is HTTP
        changeOrigin: true, // Ensures the origin of the host header matches the target
      },
    },
  },
  plugins: [react()],
});
