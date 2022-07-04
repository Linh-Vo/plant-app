import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CameraPermissionStatus} from 'react-native-vision-camera';
import {RootState} from 'store/store';

export interface UtilsState {
  isAppFristLoad: boolean;
  cameraPermissionStatus: CameraPermissionStatus;
}

const initialState: UtilsState = {
  isAppFristLoad: true,
  cameraPermissionStatus: 'not-determined',
};

const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setAppState: (
      state: UtilsState,
      action: PayloadAction<{isAppFristLoad: boolean}>,
    ) => {
      state.isAppFristLoad = action.payload.isAppFristLoad;
      return state;
    },
    setCameraStatus: (
      state: UtilsState,
      action: PayloadAction<{cameraPermissionStatus: CameraPermissionStatus}>,
    ) => {
      state.cameraPermissionStatus = action.payload.cameraPermissionStatus;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAppState, setCameraStatus} = utilsSlice.actions;
export const selectAppState = (state: RootState) => state.appState;
export default utilsSlice.reducer;
