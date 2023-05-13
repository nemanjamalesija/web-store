export type AuthContextProps = {
  auth: {
    _id: string;
    email: string;
    name: string;
    role: string;
    token: string;
    passwordChangedAt?: string;
  };
  loading: boolean;
  setAuth: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      email: string;
      name: string;
      role: string;
      token: string;
    }>
  >;
};
