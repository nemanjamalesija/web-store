import { createContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    console.log(storedToken);

    if (storedToken) {
      setAuth((prev) => ({
        ...prev,
        token: storedToken,
      }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
