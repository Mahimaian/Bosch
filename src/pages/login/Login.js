import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import logo from "../../assets/img/jenkins.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [usernameValue, setUsernameValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>
          JMaaS Self Service
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Typography variant="h1" className={classes.greeting}>
            Welcome
          </Typography>
          <Fade in={error}>
            <Typography color="secondary" className={classes.errorMessage}>
              Something is wrong with your login or password :(
            </Typography>
          </Fade>
          <TextField
            id="ntid"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
            margin="normal"
            placeholder="NT ID"
            type="text"
            fullWidth
          />
          <TextField
            id="password"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                ev.preventDefault();
                loginUser(
                  userDispatch,
                  usernameValue,
                  passwordValue,
                  props.history,
                  setIsLoading,
                  setError
                );
              }
            }}
            margin="normal"
            placeholder="Password"
            type="password"
            fullWidth
          />
          <div className={classes.formButtons}>
            {isLoading ? (
              <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
              <Button
                disabled={
                  usernameValue.length === 0 || passwordValue.length === 0
                }
                onClick={() =>
                  loginUser(
                    userDispatch,
                    usernameValue,
                    passwordValue,
                    props.history,
                    setIsLoading,
                    setError
                  )
                }
                variant="contained"
                color="primary"
                size="large"
              >
                Login
              </Button>
            )}
          </div>
        </div>
        <Typography color="primary" className={classes.copyright}>
          Brought you by JMaaS Team
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
