import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'store/store';
import {PlantResult} from '../../types';

export interface CollectionState {
  id: string;
  name: string;
  count?: number;
  plants?: PlantResult[];
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
      state.push(action.payload);
    },
    addPlantToCollection: (
      state: CollectionState[],
      action: PayloadAction<{collectionId: string; plant: PlantResult}>,
    ) => {
      state.map(col =>
        col.id === action.payload.collectionId
          ? {...col, plants: col.plants.push(action.payload.plant)}
          : col,
      );
    },
    renameCollection: (
      state: CollectionState[],
      action: PayloadAction<{collectionId: string; name: string}>,
    ) => {
      state.map(col =>
        col.id === action.payload.collectionId
          ? {...col, name: action.payload.name}
          : col,
      );
    },
    deleteCollection: (
      state: CollectionState[],
      action: PayloadAction<{collectionId: string}>,
    ) => {
      state.filter(col => col.id !== action.payload.collectionId);
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
