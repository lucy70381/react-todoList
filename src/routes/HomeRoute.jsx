import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../components/Context';

const HomeRoute = () => {
  const { token } = useAuth();
  if (token) {
    return <Navigate to='/todo' replace />
  }
  return <Outlet />
}

export default HomeRoute;