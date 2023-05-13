import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextProps {
  auth: {
    _id: string;
    email: string;
    name: string;
    role: string;
    token: string;
    passwordChangedAt?: string;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      email: string;
      name: string;
      role: string;
      token: string;
    }>
  >;
}

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

type authRedentialsType = {
  _id: string;
  email: string;
  name: string;
  role: string;
  token: string;
};

const authCredentials: authRedentialsType = {
  _id: '',
  email: '',
  name: '',
  role: '',
  token: '',
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [auth, setAuth] = useState(authCredentials);
  const navigate = useNavigate();

  useEffect(() => {
    const setUser = async () => {
      const storedToken = localStorage.getItem('token');

      if (!storedToken) {
        return navigate('/');
      }

      const response = await axios(
        'http://127.0.0.1:3001/api/v1/users/getUserWithToken',
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

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
