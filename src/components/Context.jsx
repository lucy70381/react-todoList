import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ token: null, nickname: null });
  const foo = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  return (
    <AuthContext.Provider value={foo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
