import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import teal from "@material-ui/core/colors/teal";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: `${grey[300]}`,
      main: `${grey[500]}`,
      dark: `${grey[800]}`,
      contrastText: "#fff",
    },
    secondary: {
      light: `${teal[300]}`,
      main: `${teal[500]}`,
      dark: `${teal[800]}`,
      contrastText: "#fff",
    },
    danger: {
      light: `${red[300]}`,
      main: `${red[500]}`,
      dark: `${red[800]}`,
      contrastText: "#fff",
    },
  },
});

export default theme;
