import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'store/store';
import {PlantResult} from '../../types';

export interface CollectionState {
  id: string;
  name: string;
  plants: PlantResult[];
}

const initialState: CollectionState[] = [];

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addCollection: (
      state: CollectionState[],
      action: PayloadAction<CollectionState>,
    ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const existCol = state.find(
        e => e.id === action.payload.id || e.name === action.payload.name,
      );
      if (!existCol) {
        state.unshift(action.payload);
      }
    },
    addPlantToCollection: (
      state: CollectionState[],
      action: PayloadAction<{collectionId: string; plant: PlantResult}>,
    ) => {
      state = state.map(col =>
        col.id === action.payload.collectionId
          ? {...col, plants: [action.payload.plant, ...(col.plants || [])]}
          : col,
      );
      return state;
    },
    renameCollection: (
      state: CollectionState[],
      action: PayloadAction<{collectionId: string; name: string}>,
    ) => {
      state = state.map(col =>
        col.id === action.payload.collectionId
          ? {...col, name: action.payload.name}
          : col,
      );
      return state;
    },
    deleteCollection: (
      state: CollectionState[],
      action: PayloadAction<{collectionId: string}>,
    ) => {
      state = state.filter(col => col.id !== action.payload.collectionId);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  deleteCollection,
  addCollection,
  renameCollection,
  addPlantToCollection,
} = collectionSlice.actions;
export const selectCollections = (state: RootState) => state.collections;
export default collectionSlice.reducer;
