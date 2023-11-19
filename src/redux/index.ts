import { configureStore } from '@reduxjs/toolkit';
import SearchSlice from './SearchSlice';
import { pokemonApi } from './pokemonApi';

const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    search: SearchSlice
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;