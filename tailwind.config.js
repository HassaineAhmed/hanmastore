/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
       fontFamily: {
        bebas_neue: ['var(--font-bebas-neue)'],
        dm_sans: ['var(--font-dm-sans)'],
        montserrat : ['var(--font-montserrat)'],
        nunito_sans : ['var(--font-nunito-sans)'],
        cairo : [ 'var(--font-cairo)'],
      },
      animation : { 
        wiggle : "khtafa 1s ease  alternate", 
        slideIn : "slideIn 1s ease",
        slideOut : "slideOut 7s ease",
        fadeIn : "fadeIn 1s ease-in-out forwards"
      },
      keyframes : {
      fadeIn  : { 
        "0%" : { opacity : 0},
        "100%" : { opacity : 1},
      },
      slideIn  : { 
        "0%" : { transform : "translateX(300%)"},
        "100%" : { transform : "translateX(0)"},
      },
      slideOut  : { 
        "0%" : { transform : "translateX(0)" },
        "12%" : { transform : "translateX(-300%)", opacity : 1 },
        "13%" : { opacity : 0},
        "100%" : { opacity : 0},
      },
      khtafa : {
        "0%" : { opacity : 1 },
        "50%" : { opacity : 0 },
        "100%" : { opacity : 1 },
      }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
