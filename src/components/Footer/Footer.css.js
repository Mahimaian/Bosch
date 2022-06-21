import { makeStyles } from "@material-ui/core/styles";

export const FooterStyles = makeStyles(theme => ({
    topBrand: {
        height: '7px',
        width: '100%',
        zIndex: theme.zIndex.drawer + 1,
        display: "flex",
    },
    cusFooter: {
        backgroundColor: "#F6F7FF",
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: "100%",
        zIndex: "999"
    },
    cusOwner: {
        textAlign: "center",
        fontWeight: "bold"
    }
}));
