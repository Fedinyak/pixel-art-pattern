import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import counterCanvas from './counterCanvas';

export const store = configureStore({
  reducer: {
    // posts: postsReducer,
    counter: counterReducer,
    canvas: counterCanvas,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
