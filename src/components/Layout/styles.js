import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: `calc(100vw - 240px)`,
    minHeight: "95vh"
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    // ...theme.mixins.toolbar,
    minHeight: 48,
  },
  cusScroll: {
    zIndex: 111
  }
}));
