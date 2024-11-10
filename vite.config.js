import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Define a configuraçao do Vite
export default defineConfig({
  plugins: [react()],  // Adiciona o plugin React para suporte a React
  server: {
    proxy: {
      '/api': {  // Define o proxy para redirecionar chamadas que começam com "/api"
        target: 'https://viacep.com.br',  // URL de destino para o proxy
        changeOrigin: true,  // Permite alterar a origem da solicitação para o destino
        rewrite: path => path.replace(/^\/api/, '')  // Reescreve a URL removendo "/api"
      }
    }
  }
});
