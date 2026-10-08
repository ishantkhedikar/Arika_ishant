import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import { apiRouter } from './server/apiRouter.js';

function expressApiPlugin() {
  const app = express();
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));
  app.use('/api', apiRouter);

  return {
    name: 'express-api-plugin',
    configureServer(server) {
      server.middlewares.use(app);
    }
  };
}

export default defineConfig({
  plugins: [react(), expressApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});
