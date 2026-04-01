import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- BARIS INI WAJIB ADA

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(), // <-- Pasangan dari baris di atas
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});