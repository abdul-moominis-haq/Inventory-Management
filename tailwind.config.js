/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     colors:{
      default:"#172B4D",
      primary:"#00695C",
      secondary:"#F7FAFC",
      info: "#11CDEF",
      success: "#2DCE89",
      danger: "#F5365C",
      warning: "#FB6340",
      active: "#EBFFFD",
      textc: "#525F7F"
     }
    },
  },
  plugins: [],
};
