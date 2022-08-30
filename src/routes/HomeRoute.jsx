import React, { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../components/Context';

const HomeRoute = () => {
  const { userData: { token } } = useAuth();
  if (token) {
    return <Navigate to='/todo' replace />;
  }
  return <Outlet />;
};

export default HomeRoute;
