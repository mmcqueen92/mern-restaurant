/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {colors: {
      darkGrey: '#333333',
      lightGrey: '#F5F5F5',
      navy: '#000080',
      
    },
  backgroundImage: {
    'au-cheval': "url('/public/au-cheval-burger.jpg')"
  }},

  },
  plugins: [],
}

