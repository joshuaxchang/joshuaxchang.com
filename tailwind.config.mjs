/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // New "Tree" Theme Palette
                'brand-bg': '#F4F1E9', // A soft, earthy beige
                'brand-text': '#2A2A2A', // Dark charcoal for high contrast
                'brand-primary': '#22543D', // A deep forest green
                'brand-primary-hover': '#1A4331', // A darker shade of the green for hover
                'brand-accent': '#4A7C59', // A lighter, leafy green for links/accents
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                heading: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                'card': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
                'card-hover': '0 6px 20px 0 rgba(0, 0, 0, 0.07)',
            }
        },
    },
    plugins: [
        typography,
    ],
}

