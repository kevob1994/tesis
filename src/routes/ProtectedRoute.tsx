import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreI } from '../utils/interfaces';

type PrivateRouteProps = {
  children: JSX.Element;
};


export const ProtectedRoute = ({ children }: PrivateRouteProps) => {
  const auth = useSelector((state: StoreI) => state.auth);
  return auth?.isAuthenticate ? children : <Navigate to="/login" />;
};