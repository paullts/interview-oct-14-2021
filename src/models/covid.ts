export interface ICountriesResponse {
  Country: string;
  Slug: string;
  ISO2: string;
}

export interface CovidCaseAllStatus {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: 14323;
  Country: string;
  CountryCode: string;
  Date: string;
  Deaths: 72;
  ID: string;
  Lat: string;
  Lon: string;
  Province: string;
  Recovered: number;
}

type CovidCaseType = 'confirmed' | 'recovered' | 'deaths';

export interface ICountryStatus {
  country: string;
  from: string;
  to: string;
  type?: CovidCaseType;
}
