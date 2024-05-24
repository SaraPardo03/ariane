import { createContext,useState,useEffect } from "react";
import User from "../models/User"
import {jwtDecode} from 'jwt-decode';
import { getToken, setToken, removeToken, isTokenValid } from '../helpers/authHelpers';

export const Context = createContext();

export function AuthContext({children}){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    const auth= async () => {
      if (token && isTokenValid(token)) {
        const decodedToken = jwtDecode(token);
        try {
          const userData = await User.getUserById(decodedToken.sub);
          setUser(userData);
        } catch (error) {
          console.error('Error geting user data:', error);
          setUser(null);
          removeToken();
        }
      } else {
        setUser(null);
        removeToken();
      }

      setLoading(false);
    };

    auth();
  }, []);

  const login = (user) => {
    setToken(user.token);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    removeToken();
  };

  const values = {
    user,
    setUser,
    login,
    logout
  };

  return (
    <Context.Provider value={values}>
      {!loading && children}
    </Context.Provider>
  );
}
