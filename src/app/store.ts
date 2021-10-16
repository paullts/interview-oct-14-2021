import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

// reducers
import { countrySlice } from '../features/country-select/countrySelectSlice';
import { covidDataSlice } from '../features/covid-data/covidDataSlice';
import { dateRangeSlice } from '../features/date-range-picker/dateRangePickerSlice';

export const store = configureStore({
  reducer: {
    countries: countrySlice.reducer,
    covidData: covidDataSlice.reducer,
    dateRange: dateRangeSlice.reducer,
  },
  devTools: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
