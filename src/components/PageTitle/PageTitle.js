import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";


export default function PageTitle(props) {
  var classes = useStyles();
  const history = useHistory()

  const gotoPage = () =>{
    history.push(props.path);
  }

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant={props.variant} style={{color:"#005691"}} size="sm">
        {props.title}
      </Typography>
      {props.button && (
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => {gotoPage()}}
          // startIcon={props.icon ? }
        >
          {props.button}
        </Button>
      )}
    </div>
  );
}
