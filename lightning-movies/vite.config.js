import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const port = process.env.PORT || 'http://localhost:8080';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: port,
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	plugins: [vue()],
});
