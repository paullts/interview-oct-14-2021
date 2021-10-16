import axiosClient from '../config/axiosClient';
import { ICountriesResponse, ICountryStatus, ListResponse } from '../models';

export const covidApi = {
  getCountriesList(): Promise<ListResponse<ICountriesResponse>> {
    const url = '/countries';
    return axiosClient.get(url);
  },
  getTotalCovidCaseByCountry(country: string) {
    const url = `/live/country/${country}`;
    return axiosClient.get(url);
  },
  getCovidCaseByCountryAndStatus({ country, from, to }: ICountryStatus) {
    const url = `/country/${country}`;
    return axiosClient.get(url, {
      params: {
        from,
        to,
      },
    });
  },
};
