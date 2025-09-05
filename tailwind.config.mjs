/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'brand-bg': '#FCFBF8', 
                'brand-text': '#4A4A4A', 
                'brand-primary': '#87A96B', 
                'brand-primary-hover': '#76945B',
                'brand-accent': '#EADDCA', 
                'brand-accent-light': '#F0EBE3', 
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                heading: ['Poppins', ...defaultTheme.fontFamily.sans],
                serif: ['EB Garamond', ...defaultTheme.fontFamily.serif],
            },
            boxShadow: {
                'card': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
                'card-hover': '0 8px 24px 0 rgba(135, 169, 107, 0.15)',
            },
        },
    },
    plugins: [
        typography,
    ],
}
