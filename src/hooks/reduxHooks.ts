import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../slices/store';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
