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
            2: {
              DEFAULT: "hsl(var(--accent-hover-2))",
            },
          },
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
