import defaultTheme from "./default";

import { createTheme } from "@material-ui/core";

const overrides = {
  typography: {
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.7rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.3rem",
    },
    h5: {
      fontSize: "1.1rem",
    },
    h6: {
      fontSize: "1rem",
    },
  },
};

export default {
  default: createTheme({ ...defaultTheme, ...overrides }),
};
