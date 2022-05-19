import { createTheme } from "@mui/material/styles";
import px2vw from "resources/const/px2vw";
import { purple, red, yellow, deepOrange, blue } from "@mui/material/colors";

export const customColors = {
  gray: "#eaeaea",
  primary: "#2699fb",
};

export const theme = createTheme({
  palette: {
    primary: blue,
    secondary: purple,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          borderRadius: 10,
          fontSize: "1.5rem",
          "@media (min-width: 768px)": {
            fontSize: "1rem",
          },
          "@media (min-width: 1024px)": {
            fontSize: "1.5rem",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", size: "ultrasmall" },
          style: {
            fontSize: "0.5rem",
            color: "primary",
            "@media (min-width: 768px)": {
              fontSize: "0.5rem",
              color: "primary",
            },
            "@media (min-width: 1024px)": {
              fontSize: "1rem",
              color: "primary",
            },
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: customColors.gray,
          borderRadius: 10,
        },
      },
    },
  },
});

const myTheme = {
  fonts: {
    title: {
      size: "17px",
      family: "Helvetica",
      weight: "normal",
    },
    subtitle: {
      family: "Roboto",
      style: "normal",
      weight: "400",
      size: "1rem",
    },
    text: {
      size: "1rem",
      family: "Helvetica",
      weight: "normal",
    },
  },
  size: {
    logo: "100px",
  },
  defaultText: {
    text: "TextoDefault",
    listText: ["texto1", "texto2", "texto3"],
  },
};

export { myTheme };
