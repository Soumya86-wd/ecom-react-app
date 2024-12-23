import lineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorPrimary: {
          siteAnchors: {
            bg: "#112D4E",
            headerText: "#F9F7F7",
            footerText: "#B1BABE",
          },
          body: {
            bg: "#DBE2EF",
            bgGray: "#E0E2E8",
            text: {
              blue: "#294970",
              gray: "#444750",
              red: "#BA1C1C",
              green: "#0B5027",
            },
            link: "#112D4E",
            toast: "#0B502F",
          },
          button: {
            primary: {
              bg: "#305582",
              border: "#3F668B",
              content: "#F7F7F7",
            },
            secondary: {
              bg: "#F7F7F7",
              border: "#EFF3EF",
              content: "#294970",
            },
          },
          input: {
            bg: "#F9F7F7",
            text: "#2F5583",
            placeholder: "#545E69",
          },
          border: {
            normal: "#767F98",
            dark: "#5C6678",
          },
          select: {
            bg: "#f3f4f6",
            text: "#112D4E",
            border: "#D1D5DB",
          },
        },
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      spacing: {
        xlGutter: "2rem",
        largeGutter: "1rem",
        smallGutter: "0.5rem",
        xsGutter: "0.25rem",
        noSpace: "0px",
      },
      borderWidth: {
        "1/2": "0.5px",
        1: "1px",
        fade: "0.5px",
        thin: "1px",
        standard: "2px",
        thick: "4px",
      },
      gridTemplateColumns: {
        checkoutBody: "13fr 7fr",
        checkoutPaymentCard: "3fr 2fr",
        checkoutItemCard: "1fr 3fr 2fr",
        deliveryOptions: "auto 1fr",
        ordersBody: "1fr",
        orderCard: "1fr",
        orderDetails: "auto 1fr auto",
        productDetailsBody: "auto 1fr",
        productDetailsBodyStacked: "1fr",
      },
    },
    screens: {
      smartPhone: "425px",
      tablet: "640px",
      miniLaptop: "720px",
      laptop: "1024px",
      desktop: "1280px",
      largeScreen: "1600px",
    },
  },
};
