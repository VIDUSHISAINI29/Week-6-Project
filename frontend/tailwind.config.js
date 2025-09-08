/** @type {import('tailwindcss').Config} */
export default {
   important: true,
   darkMode: "class",
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            border: "#e5e7eb",
            card: "#ffffff",
            background: "#f9fafb",
            foreground: "#111827",
            muted: {
               DEFAULT: "#f5f5f5",
               foreground: "#6b7280", // 👈 now `text-muted-foreground` works
            },
            primary: {
               DEFAULT: "#2651c1",
               light: "#3b82f6",
               dark: "#1e40af",
               foreground: "#ffffff", // 👈 `text-primary-foreground`
            },
             secondary: {
          DEFAULT: "#3471e3",   // add this 💜
          dark: "#7e22ce",
          light: "#a855f7",
        },
         },
         backgroundImage: {
            "gradient-soft":
               "radial-gradient(circle at top left, #dbeafe, #ede9fe, #fdf4ff)", // 👈 same gradient as your dashboard
         },
         boxShadow: {
            card: "0 8px 24px rgba(0,0,0,0.08)", // smooth card shadow
            button: "0 4px 14px rgba(37,99,235,0.3)", // glow effect for buttons
         },
         fontFamily: {
            sans: ["Inter", "sans-serif"], // global font
         },
      },
   },

   daisyui: {
      themes: ["light", "dark", "coffee", "cupcake"], // list the themes you want
      darkTheme: "dark", // set default dark theme
   },
   plugins: [],
   //   require("daisyui")
   // prefix: 'tw-'
};
