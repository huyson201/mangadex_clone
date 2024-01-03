/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme")
const plugin = require('tailwindcss/plugin')
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
        ring: "hsl(var(--ring))",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        backdrop: "rgba(var(--backdrop))",
        status: {
          yellow: "hsl(var(--status-yellow))",
          blue: 'hsl(var(--status-blue))',
          green: 'rgb(var(--status-green))',
          red: 'rgb(var(--status-red))',
          purple: 'rgb(var(--status-purple))',
          gray: 'rgb(var(--status-gray))',
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          foreground: "hsl(var(--input-foreground))"
        },
        button: {
          accent: "hsl(var(--accent-2))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "rgba(var(--primary-foreground))"
        },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
        },
        midTone: "hsl(var(--midTone))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          contrast: 'hsl(var(--muted-contrast))'
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        drawer: {
          DEFAULT: "hsl(var(--accent))",
          accent: "hsl(var(--accent-10))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          hover: "hsl(var(--accent-hover))",
          2: {
            DEFAULT: "hsl(var(--accent-2))",
            hover: "rgb(var(--accent-2-hover))"

          },
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
        "loader-spin": "spin  1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite"
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('tailwind-scrollbar')({ nocompatible: true }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities({
        "animate-delay": (value) => {
          return {
            animationDelay: value
          }
        }
      }, {
        values: theme('animationDelay')
      }, {
        theme: {
          100: "100ms",
          200: "200ms",
          300: "300ms",
          400: "400ms",
          500: "500ms",
          600: "600ms",
          700: "700ms",
          800: "800ms",
          900: "900ms",
        }
      })
    })],
}
