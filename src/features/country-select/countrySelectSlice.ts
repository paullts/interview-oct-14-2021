import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { covidApi } from '../../services';
import { ICountriesResponse } from './../../models/covid';

// Define a type for the slice state
interface CountrySelectState {
  countries: ICountriesResponse[];
  country: string | null;
  error: any;
}

// Define the initial state using that type
const initialState: CountrySelectState = {
  countries: [],
  country: null,
  error: null,
};

export const fetchCountriesList = createAsyncThunk(
  'countries/fetchCountriesList',
  async () => {
    try {
      const response = await covidApi.getCountriesList();
      return response.data;
    } catch (error) {
      throw Error(error as string);
    }
  }
);

export const countrySlice = createSlice({
  name: 'countries',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCountry(state: CountrySelectState, action: PayloadAction<string>) {
      return { ...state, country: action.payload };
    },
  },
  extraReducers: {
    // fetchCountriesList
    [fetchCountriesList.pending.toString()]: (state: CountrySelectState) => {
      state.error = null;
    },
    [fetchCountriesList.fulfilled.toString()]: (
      state: CountrySelectState,
      action: PayloadAction<ICountriesResponse[]>
    ) => {
      state.error = null;
      state.countries = action.payload;
    },
    [fetchCountriesList.rejected.toString()]: (
      state: CountrySelectState,
      action: PayloadAction<{ error: { message: string } }>
    ) => {
      state.error = action.payload.error.message;
    },
  },
});

export const countryActions = countrySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.countries;

export default countrySlice.reducer;
