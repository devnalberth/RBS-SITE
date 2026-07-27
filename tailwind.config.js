/** @type {import('tailwindcss').Config} */

/**
 * Design System — RBS Consultoria Inteligente
 * Fonte da verdade: Figma "LANDING PAGE - RBS" › pagina Estilos (node 3:2939)
 * Tokens extraidos via Figma MCP (get_variable_defs).
 */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/layouts/**/*.{js,jsx}",
    "./src/sections/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Manrope: corpo, UI, botoes
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Playfair Display: todos os titulos (H1-H4)
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
      },

      colors: {
        // --- Tokens de marca (1:1 com as variaveis do Figma) ---
        brand: {
          primary: '#FFFFFF',   // brand-color-primary
          secondary: '#0A0A0A', // brand-color-secondary
          third: '#D1A84B',     // brand-color-third (dourado RBS)
        },

        // --- Escala de cinzas do Figma ---
        // Sob 'neutral' e nao 'gray': a escala do Figma e invertida
        // (950 = claro, 200 = quase preto) e sobrescrever 'gray' quebraria
        // os 27 usos de 'border-gray-200' herdados do template.
        neutral: {
          200: '#121214', // Gray/gray-200
          900: '#C4C4CC', // Gray/gray-900
          950: '#E1E1E6', // Gray/gray-950
        },
        'color-white': '#f2f2f2',

        // --- Cinzas de UI da biblioteca Foundation do Figma ---
        muted: '#6B6B69',    // Foundation/Gray/Dark — texto secundario
        hairline: '#D9D9DB', // Foundation/Black/Light — divisorias

        // --- Aliases semanticos herdados do template ---
        // Mantidos para que os 448 usos existentes ja adotem a marca.
        primary: '#0A0A0A', // era #0f172a
        accent: '#D1A84B',  // era #4f46e5
        light: '#f2f2f2',   // era #f8fafc
      },

      fontSize: {
        // Desktop — Playfair Display Bold, line-height 120%
        h1: ['4rem', { lineHeight: '1.2', fontWeight: '700' }],      // 64px
        h2: ['3rem', { lineHeight: '1.2', fontWeight: '700' }],      // 48px
        h3: ['2rem', { lineHeight: '1.2', fontWeight: '700' }],      // 32px
        h4: ['1.625rem', { lineHeight: '1.2', fontWeight: '700' }],  // 26px

        // Mobile — H4 nao tem override no design system
        'h1-m': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],  // 40px
        'h2-m': ['1.5rem', { lineHeight: '1.2', fontWeight: '700' }],  // 24px
        'h3-m': ['1.25rem', { lineHeight: '1.2', fontWeight: '700' }], // 20px

        // Manrope — identicos em desktop e mobile
        paragraph: ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px / 160%
        span: ['0.875rem', { lineHeight: '1', fontWeight: '500' }],    // 14px / 100%
        button: ['1.125rem', { lineHeight: '1', fontWeight: '600' }],  // 18px / 100%
      },
    },
  },
  plugins: [],
};
