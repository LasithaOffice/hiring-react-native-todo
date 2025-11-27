import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import taskSlice from './slices/Tasks';

const store = configureStore({
  reducer: {
    taskSlice: taskSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
