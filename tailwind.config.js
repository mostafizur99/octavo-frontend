/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ["Jost", "serif"],
    },
    extend: {
      container: {
        center: true,
      },
      colors: {
        // themePrimary: "#4F46E5",
        themePrimary: "#ff5722",
        themeSecondary: "#52525b",
        themeLighterAlt: "#f7f8fa",
        themeLighter: "#B8B9BB",
        themeLight: "#6B7280",
        themeDarker: "#2d3748",
        body: "#f2f5f8",
      },
      fontSize: {
        xsss: "12px",
        xss: "13px",
        xss1: "14px",
        xs: "16px",
        xxs: "18px",
        lg2: "20px",
        lg: "24px",
        xl: "32px",
        xxl2: "40px",
        xxl: "45px",
        xxxl: "64px",
      },
    },
    variants: {
      extend: {
        display: ["group-hover"],
        visibility: ["group-hover"],
        transform: ["group-hover"],
        scale: ["group-hover"],
        witdh: ["group-hover"],
      },
    },
  },
  plugins: [],
};
