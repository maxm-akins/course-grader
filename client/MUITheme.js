import { ThemeProvider, createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#80d8ff",
      secondary: "#6369D1",
      white: "#FFFFFF",
      nav: "#FF8C42",
      char: "#464655",

    },
    background: {
      main: "#7D8491",
      transparentish: " rgba(255, 255, 255, 0.2)",
      barelyTransparent: " rgba(255, 255, 255, 0.8)",
      almostTransparent: " rgba(243, 244, 249, 0.2)",
      transparent: " rgba(243, 244, 249, 0.0)",
      white: "#FFFFFF",
      char: "#464655",
    }
  },
  typography: {
    fontFamily:
      " 'Poppins', sans-serif",
  },


});

export {
  lightTheme,
}
