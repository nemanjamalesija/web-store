import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from './constants/baseURL';
import { AuthContextProps } from './types/authContextProps';
import { authCredentials } from './types/authCredentials';
import axios from 'axios';

const AuthContext = createContext<AuthContextProps>({
  auth: {
    _id: '',
    email: '',
    name: '',
    role: '',
    token: '',
  },
  setAuth: () => {
    throw new Error('setAuth function not implemented');
  },
});

const authState: authCredentials = {
  _id: '',
  email: '',
  name: '',
  role: '',
  token: '',
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [auth, setAuth] = useState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    const setUser = async () => {
      try {
        const storedToken = localStorage.getItem('token');

        if (!storedToken) {
          return navigate('/');
        }

        const response = await axios(`${baseURL}/users/getUserWithToken`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const {
          data: { data },
        } = response;

        const { _id, email: userEmail, name, role } = data.user;

        setAuth({
          _id,
          email: userEmail,
          name,
          role,
          token: storedToken,
        });
      } catch (error) {
        console.log(error);
      }
    };

    setUser();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
