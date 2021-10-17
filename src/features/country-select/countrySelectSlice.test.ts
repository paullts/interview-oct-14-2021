import { store } from '../../app/store';
import { countryActions, fetchCountriesList } from './countrySelectSlice';
import { covidApi } from '../../services';

const countriesList = [
  { Country: 'Latvia', ISO2: 'LV', Slug: 'latvia' },
  { Country: 'Seychelles', ISO2: 'SC', Slug: 'seychelles' },
];

describe('fetch countries list', () => {
  it('should pass', async () => {
    const getSpy = jest
      .spyOn(covidApi, 'getCountriesList')
      .mockResolvedValueOnce({ data: countriesList });

    await store.dispatch(fetchCountriesList());
    expect(getSpy).toBeCalledTimes(1);
  });
});

it('Set selected country', () => {
  let state = store.getState().countries;

  store.dispatch(
    countryActions.setSelectedCountry({ value: 'vietnam', label: 'VietNam' })
  );
  state = store.getState().countries;

  let selectedCountry = state.selectedCountry;
  expect(selectedCountry).toStrictEqual({ value: 'vietnam', label: 'VietNam' });
});
