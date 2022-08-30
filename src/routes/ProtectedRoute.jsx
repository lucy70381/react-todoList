import React, { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../components/Context';

const ProtectedRoute = () => {
  const { userData: { token } } = useAuth();
  if (!token) {
    return <Navigate to='/login' replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
