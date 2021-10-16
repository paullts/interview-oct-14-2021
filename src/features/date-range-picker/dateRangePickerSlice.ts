import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface DateRange {
  from: string;
  to: string;
  error: any;
}

// Define the initial state using that type
const initialState: DateRange = {
  from: new Date().toISOString(),
  to: new Date().toISOString(),
  error: null,
};

export const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState,
  reducers: {
    setDate(
      state: DateRange,
      action: PayloadAction<{ from: string; to: string }>
    ) {
      const { from, to } = action.payload || {};
      return { ...state, from, to };
    },
  },
});

export const dateRangeActions = dateRangeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.countries;

export default dateRangeSlice.reducer;
