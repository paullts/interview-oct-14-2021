import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { SelectOption } from '../../models/country-select';
import { covidApi } from '../../services';
import { ICountriesResponse } from './../../models/covid';

interface CountrySelectState {
  countries: ICountriesResponse[];
  selectedCountry: SelectOption;
  error: any;
}

const initialState: CountrySelectState = {
  countries: [],
  selectedCountry: { value: '', label: '' },
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
  initialState,
  reducers: {
    setSelectedCountry(
      state: CountrySelectState,
      action: PayloadAction<SelectOption>
    ) {
      return { ...state, selectedCountry: action.payload };
    },
  },
  extraReducers: {
    [fetchCountriesList.pending.toString()]: (state: CountrySelectState) => {
      state.error = null;
    },
    [fetchCountriesList.fulfilled.toString()]: (
      state: CountrySelectState,
      action: PayloadAction<ICountriesResponse[]>
    ) => {
      return { ...state, error: null, countries: action.payload };
    },
    [fetchCountriesList.rejected.toString()]: (
      state: CountrySelectState,
      action: PayloadAction<{ error: { message: string } }>
    ) => {
      return { ...state, error: action.payload.error.message };
    },
  },
});

export const countryActions = countrySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.countries;

export default countrySlice.reducer;
