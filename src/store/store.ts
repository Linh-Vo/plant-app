import {combineReducers, configureStore} from '@reduxjs/toolkit';
import utilsSlice from './slices/app';
import collectionSlice from './slices/collection';
import scanHistorySlice from './slices/scan';
import collectionMiddleware from './middlewares/collection';
import thunkMiddleware from 'redux-thunk';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const middlewares = [collectionMiddleware, thunkMiddleware];

const rootReducer = combineReducers({
  collections: collectionSlice,
  appState: utilsSlice,
  scanHistoryState: scanHistorySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  // middleware: middlewares,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export default persistor;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
