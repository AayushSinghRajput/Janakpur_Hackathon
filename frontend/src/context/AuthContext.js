import { createContext, useState, useEffect } from 'react';
import { getToken, removeToken } from '../utils/tokenHandler';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    if (token) {
      setUser({ token }); 
    } else {
      setUser(null);
    }
  }, [token]);

  const loginUser = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    setUser({ token });
  };

  const logoutUser = () => {
    removeToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};
