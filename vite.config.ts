import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',  // Certifique-se de que o diretório de saída é 'build'
  },
  base: '/PomodoroReact/'  // Adicione isso se estiver usando um repositório do GitHub
});