import { createTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      light: grey[500],
      dark: "#222222",
    },
  },
});
