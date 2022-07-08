import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'store/store';
import {PlantResult} from '../../types';
import Toast from 'react-native-toast-message';
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
      const updatePlant = (col: CollectionState, plant: PlantResult) => {
        const existedPlant = col.plants.find(
          item => item.species?.scientificName === plant.species.scientificName,
        );
        if (existedPlant) {
          Toast.show({
            type: 'info',
            position: 'top',
            autoHide: true,
            visibilityTime: 2000,
            text2: 'The plant already exsits!',
          });
          return col.plants;
        }
        return [plant, ...(col.plants || [])];
      };
      state = state.map(col =>
        col.id === action.payload.collectionId
          ? {...col, plants: updatePlant(col, action.payload.plant)}
          : col,
      );
      return state;
    },
    renamePlant: (
      state: CollectionState[],
      action: PayloadAction<{
        collectionId: string;
        plant: PlantResult;
        newName: string;
      }>,
    ) => {
      const updatePlant = (col: CollectionState) => {
        const plantIndex = col.plants.findIndex(
          item =>
            item.species?.scientificName ===
            action.payload.plant.species.scientificName,
        );
        if (plantIndex !== -1) {
          const updatedPlants = col.plants.map((plant, idx) =>
            idx === plantIndex
              ? {
                  ...plant,
                  species: {
                    ...plant.species,
                    scientificName: action.payload.newName,
                  },
                }
              : plant,
          );
          return updatedPlants;
        }
        return [action.payload.plant, ...(col.plants || [])];
      };
      state = state.map(col =>
        col.id === action.payload.collectionId
          ? {...col, plants: updatePlant(col)}
          : col,
      );
      return state;
    },
    deletePlant: (
      state: CollectionState[],
      action: PayloadAction<{collectionId: string; plant: PlantResult}>,
    ) => {
      const deletePlant = (col: CollectionState, plant: PlantResult) => {
        const plantIndex = col.plants.findIndex(
          item => item.species?.scientificName === plant.species.scientificName,
        );
        if (plantIndex !== -1) {
          const updatedPlants = col.plants.filter(
            (_, idx) => idx !== plantIndex,
          );
          return updatedPlants || [];
        }
        return [plant, ...(col.plants || [])];
      };
      state = state.map(col =>
        col.id === action.payload.collectionId
          ? {...col, plants: deletePlant(col, action.payload.plant)}
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
  deletePlant,
  renamePlant,
} = collectionSlice.actions;
export const selectCollections = (state: RootState) => state.collections;
export default collectionSlice.reducer;
