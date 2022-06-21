import React from "react";
import { userLogin } from '../services/services';

let UserStateContext = React.createContext();
let UserDispatchContext = React.createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const UserProvider = ({ children }) => {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

const useUserState = () => {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

const useUserDispatch = () => {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

// ###########################################################

const loginUser = (dispatch, username, password, history, setIsLoading, setError) => {
  setError(false);
  setIsLoading(true);

  if (!!username && !!password) {
    userLogin({ username: username, password: password }).then(response => {
      console.log(response);
      const resData = response.data;
      localStorage.setItem('id_token', resData.token)
      localStorage.setItem('username', resData.username.username)
      localStorage.setItem('displayname', resData.displayname)
      localStorage.setItem('role', resData.permission)
      localStorage.setItem('email', resData.email)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })
      history.push('/app/home')
    }).catch(error => {
      if (error.message.includes('timeout')) {
        console.log("Server Down! " + error.message);
      } else if (error.response !== undefined) {
        if (error.response.status === 401) {
          signOut()
        }
      } else {
        console.log(error.message);
      }
      setIsLoading(false)
    });
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

const signOut = (dispatch, history) => {
  localStorage.removeItem("id_token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };
