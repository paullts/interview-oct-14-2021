import React, { Fragment, useEffect } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchCountriesList, countryActions } from './countrySelectSlice';

export interface SelectOption {
  value: string;
  label: string;
}

interface SingleSelectProps {
  defaultValue?: SelectOption;
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
  const { defaultValue, name, placeholder, error, resetError } = props;

  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);

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
      dispatch(countryActions.setCountry(''));
    }

    if (option) {
      dispatch(countryActions.setCountry(option?.value || ''));
    }
    resetError((prev) => ({ ...prev, country: false }));
  };

  useEffect(() => {
    dispatch(fetchCountriesList());
  }, [dispatch]);

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
        defaultValue={defaultValue}
        isClearable={true}
        isSearchable={true}
        name={name}
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
