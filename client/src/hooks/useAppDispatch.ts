import { useDispatch } from 'react-redux';
import { RootDispatch } from '../types/rootState';

export const useAppDispatch: () => RootDispatch = useDispatch;
