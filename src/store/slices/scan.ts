import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'store/store';
import {SnapInfo} from '../../types';

const initialState: SnapInfo[] = [];

const scanHistorySlice = createSlice({
  name: 'scan-history',
  initialState,
  reducers: {
    renameScan: (
      state: SnapInfo[],
      action: PayloadAction<{
        scanId: string;
        newName: string;
      }>,
    ) => {
      state = state.map(item =>
        item.id === action.payload.scanId
          ? {
              ...item,
              species: {
                ...item.species,
                customName: action.payload.newName,
              },
            }
          : item,
      );
      return state;
    },
    addScanToHistory: (
      state: SnapInfo[],
      action: PayloadAction<{
        scanHistory: SnapInfo;
      }>,
    ) => {
      state.unshift(action.payload.scanHistory);
    },
    updateScanCollection: (
      state: SnapInfo[],
      action: PayloadAction<{
        scanId: string;
        collectionId: string | undefined;
      }>,
    ) => {
      const scanObj = state.find(e => e.id === action.payload.scanId);
      if (scanObj) {
        state = state.map(e =>
          e.id === action.payload.scanId
            ? {...e, inCollection: action.payload.collectionId}
            : e,
        );
      }
      return state;
    },
    deleteScan: (
      state: SnapInfo[],
      action: PayloadAction<{scanId: string}>,
    ) => {
      state = state.filter(scan => scan.id !== action.payload.scanId);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {renameScan, deleteScan, addScanToHistory, updateScanCollection} =
  scanHistorySlice.actions;
export const selectScanHistoryState = (state: RootState) =>
  state.scanHistoryState;
export default scanHistorySlice.reducer;
