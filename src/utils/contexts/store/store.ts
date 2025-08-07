import { useDispatch } from 'react-redux';
import { useSelector } from './../../../../node_modules/react-redux/src/hooks/useSelector';
import { configureStore } from '@reduxjs/toolkit';
import { useStore } from 'react-redux';
import { sessionSlice } from './session.slice';

export const store = configureStore({
  reducer: sessionSlice.reducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppState = useStore.withTypes<typeof store>();
