import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Error } from '../../models';
import { covidApi } from '../../services';
import { CovidCaseAllStatus, ICountryStatus } from '../../models/covid';

// Define a type for the slice state
interface CountryCovidData {
  data: CovidCaseAllStatus[];
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
  initialState,
  reducers: {},
  extraReducers: {
    // fetchCovidCaseAllStatus
    [fetchCovidCaseAllStatus.pending.toString()]: (state: CountryCovidData) => {
      state.error = null;
    },
    [fetchCovidCaseAllStatus.fulfilled.toString()]: (
      state: CountryCovidData,
      action: PayloadAction<CovidCaseAllStatus[]>
    ) => {
      const allData = action.payload || [];

      return { ...state, error: null, data: allData };
    },
    [fetchCovidCaseAllStatus.rejected.toString()]: (
      state: CountryCovidData,
      action: PayloadAction<Error>
    ) => {
      state.error = action.payload.message;
    },
  },
});

export const countryActions = covidDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.countries;

export default covidDataSlice.reducer;
