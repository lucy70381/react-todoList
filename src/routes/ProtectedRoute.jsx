import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../components/Context';

const ProtectedRoute = () => {
  const { token } = useAuth();
  console.log(token)
  if (!token) {
    return <Navigate to='/login' replace />
  }
  return <Outlet />
}

export default ProtectedRoute;