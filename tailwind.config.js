/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        "xs": "360px"
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",

        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "md-background": "hsl(var(--md-background))",
        "button-hover": "rgb( 79 79 79 / 1 )",
        backdrop: "rgba(var(--backdrop))",
        status: {
          yellow: "hsl(var(--status-yellow))",
          blue: 'hsl(var(--status-blue))',
          green: 'rgb(var(--status-green))'
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          foreground: "hsl(var(--input-foreground))"
        },
        button: {
          DEFAULT: "hsl(var(--button))",
          foreground: "hsl(var(--button-foreground))",
          hover: "hsl(var(--button-hover))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        midTone: "hsl(var(--midTone))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          contrast: 'hsl(var(--muted-contrast))'
        },
        skeleton: "hsl(var(--skeleton-bg))",
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        // },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        drawer: {
          DEFAULT: "hsl(var(--drawer))",
          accent: "hsl(var(--drawer-accent))",
          "accent-2": "hsl(var(--drawer-accent-2))"
        },
        customs: {
          accent: {
            DEFAULT: "hsl(var(--accent))",
            hover: "hsl(var(--accent-hover))"
          }
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          hover: {
            DEFAULT: "hsl(var(--accent-hover))",
            2: "hsl(var(--accent-hover-2))",
          },
          2: "hsl(var(--accent-2))",
          3: "hsl(var(--accent-3))",
          10: "hsl(var(--accent-10))"

        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('tailwind-scrollbar')({ nocompatible: true }),],
}