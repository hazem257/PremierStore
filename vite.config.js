import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 const viteConfig = {
  eslint : {
    ignoreDuringBuildes : true ,
  }
 }
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
module.exports = viteConfig
