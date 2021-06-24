import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Route
      {...rest}
      render={() => (isAuthenticated() ? children : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedRoute;
