import { useAppSelector } from './useAppSelector';

export const useGetGlobalInfo = () => {
  const user = useAppSelector((state) => state.authReducer.user);
  const loading = useAppSelector((state) => state.authReducer.loading);
  const error = useAppSelector((state) => state.authReducer.error);

  return { user, loading, error };
};
