import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { SelectOption } from '../../models/country-select';
import { fetchCountriesList, countryActions } from './countrySelectSlice';

export interface SingleSelectProps {
  name: string;
  placeholder?: string;
  error?: boolean;
  resetError: React.Dispatch<
    React.SetStateAction<{
      country: boolean;
    }>
  >;
}

function CountrySelect(props: SingleSelectProps) {
  const params: { country: string } = useParams();
  const { name, placeholder, error, resetError } = props;

  const dispatch = useAppDispatch();
  const { countries, selectedCountry } = useAppSelector(
    (state) => state.countries
  );

  const [defaultValue, setDefaultValue] =
    useState<SelectOption>(selectedCountry);

  // transform response data to SelectOption object
  const options: SelectOption[] = countries.map(({ Slug, Country }) => ({
    value: Slug,
    label: Country,
  }));

  const onChange = (
    option: SingleValue<SelectOption>,
    action: ActionMeta<SelectOption>
  ) => {
    if (action.action === 'clear') {
      dispatch(countryActions.setSelectedCountry({ value: '', label: '' }));
    }

    if (option) {
      dispatch(countryActions.setSelectedCountry(option));
    }
    resetError((prev) => ({ ...prev, country: false }));
  };

  useEffect(() => {
    dispatch(fetchCountriesList());
  }, [dispatch]);

  useEffect(() => {
    const { country } = params;
    const matchedCountry = countries.filter((item) => item.Slug === country);

    if (matchedCountry) {
      const selectedOption = matchedCountry.map((item) => ({
        value: item.Slug,
        label: item.Country,
      }))[0];

      dispatch(countryActions.setSelectedCountry(selectedOption));
      setDefaultValue(selectedOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, countries]);

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: state.isFocused ? '#ddd' : error ? 'red' : '#ddd',
      '&:hover': {
        borderColor: state.isFocused ? '#ddd' : error ? 'red' : '#ddd',
      },
    }),
  };

  return (
    <Fragment>
      <label htmlFor={name}>Country</label>
      <Select
        id={name}
        classNamePrefix='select'
        isClearable={true}
        isSearchable={true}
        name={name}
        value={defaultValue}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        styles={customStyles}
        options={options}
        noOptionsMessage={() => 'No country found'}
      />
      {error && <span className='text-danger'>Required field</span>}
    </Fragment>
  );
}

export default CountrySelect;
