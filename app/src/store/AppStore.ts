import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import RootReducer, {
  OtherReducers,
  OtherReducersBlacklist,
} from './RootReducer';
import { redditTokenAPI } from '../reddit/RedditService';
import { setupListeners } from '@reduxjs/toolkit/query/react';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [...OtherReducersBlacklist, redditTokenAPI.reducerPath],
};
const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
  reducer: {
    ...OtherReducers,
    root: persistedReducer,
    [redditTokenAPI.reducerPath]: redditTokenAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(redditTokenAPI.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
