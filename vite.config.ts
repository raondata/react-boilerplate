import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === 'development';
  const env = loadEnv(configEnv.mode, process.cwd());

  let baseUrl: string = '';
  if (configEnv.mode === 'prod') {
    baseUrl = '/web';
  } else if (configEnv.mode === 'dev') {
    baseUrl = '/';
  }

  return {
    base: baseUrl,
    plugins: [react(), svgr()],
    server: {
      port: 3000,
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: './src/infrastructure/tests.setup.ts',
    },
    resolve: {
      alias: {
        '@atoms': resolve(__dirname, 'src', 'atoms'),
        '@assets': resolve(__dirname, 'src', 'assets'),
        '@components': resolve(__dirname, 'src', 'components'),
        '@hooks': resolve(__dirname, 'src', 'hooks'),
        '@layouts': resolve(__dirname, 'src', 'layouts'),
        '@pages': resolve(__dirname, 'src', 'pages'),
        '@providers': resolve(__dirname, 'src', 'providers'),
        '@configs': resolve(__dirname, 'src', 'configs'),
        '@@types': resolve(__dirname, 'src', 'types'),
        '@utils': resolve(__dirname, 'src', 'utils'),
      },
    },
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? '[name]__[local]__[hash:base64:5]'
          : '[hash:base64:5]',
      },
    },
  };
});
