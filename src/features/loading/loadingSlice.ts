import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface LoadingState {
  loading: boolean;
  isOverlayFullScreen: boolean;
}

const initialState: LoadingState = {
  loading: false,
  isOverlayFullScreen: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(
      state: LoadingState,
      action: PayloadAction<{
        loading?: boolean;
        isOverlayFullScreen?: boolean;
      }>
    ) {
      const { loading = false, isOverlayFullScreen = false } = action.payload;
      return { ...state, loading, isOverlayFullScreen };
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
