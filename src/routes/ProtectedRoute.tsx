import React, { useLayoutEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreI } from '../utils/interfaces';

type PrivateRouteProps = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: PrivateRouteProps) => {
  const auth = useSelector((state: StoreI) => state.auth);

  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return auth?.isAuthenticate ? children : <Navigate to='/login' />;
};
