import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'store/store';

export interface UtilsState {
  isAppFristLoad: boolean;
}

const initialState: UtilsState = {
  isAppFristLoad: true,
};

const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    setUtilsSate: (
      state: UtilsState,
      action: PayloadAction<{isAppFristLoad: boolean}>,
    ) => {
      state.isAppFristLoad = action.payload.isAppFristLoad;
      console.log({state});
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUtilsSate} = utilsSlice.actions;
export const selectAppState = (state: RootState) => state.appState;
export default utilsSlice.reducer;
