import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { covidApi } from '../../services';
import { ILiveCasePerCountry, ICountryStatus } from './../../models/covid';

// Define a type for the slice state
interface CountryCovidData {
  data: ILiveCasePerCountry[];
  error: any;
}

// Define the initial state using that type
const initialState: CountryCovidData = {
  data: [],
  error: null,
};

export const fetchCountryTotalCovidCase = createAsyncThunk(
  'covidData/fetchCountryTotalCovidCase',
  async (country: string) => {
    try {
      const response = await covidApi.getTotalCovidCaseByCountry(country);
      return response.data;
    } catch (error) {
      throw Error(error as string);
    }
  }
);

export const fetchCovidCaseAllStatus = createAsyncThunk(
  'covidData/fetchCovidCaseByType',
  async (args: ICountryStatus) => {
    try {
      const response = await covidApi.getCovidCaseByCountryAndStatus(args);
      return response.data;
    } catch (error) {
      throw Error(error as string);
    }
  }
);

export const covidDataSlice = createSlice({
  name: 'covidData',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: {
    // fetchCountryTotalCovidCase
    [fetchCountryTotalCovidCase.pending.toString()]: (
      state: CountryCovidData
    ) => {
      state.error = null;
    },
    [fetchCountryTotalCovidCase.fulfilled.toString()]: (
      state: CountryCovidData,
      action: PayloadAction<ILiveCasePerCountry[]>
    ) => {
      state.error = null;
      state.data = action.payload;
    },
    [fetchCountryTotalCovidCase.rejected.toString()]: (
      state: CountryCovidData,
      action: PayloadAction<{ error: { message: string } }>
    ) => {
      state.error = action.payload.error.message;
    },
  },
});

export const countryActions = covidDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.countries;

export default covidDataSlice.reducer;
