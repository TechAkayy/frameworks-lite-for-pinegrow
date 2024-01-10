/* Pinegrow generated Design Panel Begin */

const pg_colors = {
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  yellow: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  green: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  purple: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  primary: {
    50: '#fbeae0',
    100: '#fcd3bb',
    200: '#fabb98',
    300: '#f5a475',
    400: '#ef8d52',
    500: '#e6752e',
    600: '#be6126',
    700: '#984d1f',
    800: '#733b17',
    900: '#502910',
  },
  secondary: {
    50: '#ecdfde',
    100: '#d9b9b5',
    200: '#c4948e',
    300: '#af7068',
    400: '#974d45',
    500: '#7e2824',
    600: '#68211f',
    700: '#531b19',
    800: '#3f1414',
    900: '#2c0e0d',
  },
  color3: {
    50: '#ffeef4',
    100: '#ffdbe8',
    200: '#ffc8dc',
    300: '#ffb4cf',
    400: '#fea0c3',
    500: '#fc8cb7',
    600: '#d07497',
    700: '#a65d79',
    800: '#7e465c',
    900: '#583140',
  },
  color4: {
    50: '#e7eff1',
    100: '#cbdce0',
    200: '#b0c9cf',
    300: '#95b7bf',
    400: '#79a5af',
    500: '#5d939f',
    600: '#4d7a84',
    700: '#3e6169',
    800: '#2f4a50',
    900: '#213338',
  },
}

const pg_fonts = {
  sans: ["'Lato', sans-serif"],
  serif: ['"Palatino Linotype", "Book Antiqua", Palatino, serif'],
}

const pg_backgrounds = {
  'design-image':
    "url('https://images.unsplash.com/photo-1607478900766-efe13248b125?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDE4OXx8ZnVybml0dXJlfGVufDB8fHx8MTYyNzMzMDA1MA&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=2000&fit=max')",
  'design-image-large':
    "url('https://images.unsplash.com/photo-1607478900766-efe13248b125?ixid=MnwyMDkyMnwwfDF8c2VhcmNofDE4OXx8ZnVybml0dXJlfGVufDB8fHx8MTYyNzMzMDA1MA&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=2000&fit=max')",
}

/* Pinegrow generated Design Panel End */

export default {
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],

  theme: {
    extend: {
      colors: pg_colors,
      fontFamily: pg_fonts,
      backgroundImage: pg_backgrounds,
    },
  },

  corePlugins: {
    get preflight() {
      return !process.env.WP
    },
  },

  /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
  get content() {
    const _content = [
      './index.html',
      './src/**/*.{html,vue,svelte,astro,js,cjs,ts,cts,mts,jsx,tsx,md,mdx}',
    ]
    return process.env.NODE_ENV === 'production'
      ? _content
      : [..._content, './_pginfo/**/*.{html,js}'] // used by Vue Desginer for live-designing during development
  },
}
