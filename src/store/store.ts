import {combineReducers, configureStore} from '@reduxjs/toolkit';
import collectionSlice from './slices/collection';
import collectionMiddleware from './middlewares/collection';
import thunkMiddleware from 'redux-thunk';
const middlewares = [collectionMiddleware, thunkMiddleware];

const rootReducer = combineReducers({
  collections: collectionSlice,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
