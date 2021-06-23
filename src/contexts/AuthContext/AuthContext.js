import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from '../../module/Auth';

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const history = useHistory();

  const AuthData = Auth();
  const token = AuthData.getToken();
  const userInfo = AuthData.getUserData();

  const [authState, setAuthState] = useState({
    token,
    userInfo,
  });

  const setAuthInfo = ({ token, userInfo }) => {
    AuthData.setToken(token);
    AuthData.setUserData(userInfo);

    setAuthState({
      token,
      userInfo,
    });

    history.push('/dashboard');
  };

  const logout = () => {
    AuthData.clearToken();
    AuthData.clearUserData();

    setAuthState({});
    history.push('/login');
  };

  const isAuthenticated = () => {
    return authState.token && authState.userInfo;
  };

  const authObject = {
    user: authState?.userInfo,
    setAuthInfo,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
