import { Container, Row, Col, Button } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from './app/hook';

import CountrySelect from './features/country-select';
import CovidList, { ListItem } from './features/covid-list';
import React, { useMemo, useState } from 'react';
import CovidDateRangePicker from './features/date-range-picker';
import { fetchCovidCaseAllStatus } from './features/covid-data/covidDataSlice';

const INFORMATION_LIST = [
  { key: 'Confirmed', label: 'Total Confirmed', value: 0 },
  { key: 'Deaths', label: 'Total Deaths', value: 0 },
  { key: 'Recovered', label: 'Total Recovered', value: 0 },
];

function App() {
  const dispatch = useAppDispatch();
  const { from, to } = useAppSelector((state) => state.dateRange);
  const { country } = useAppSelector((state) => state.countries);
  const { data } = useAppSelector((state) => state.covidData);
  const [errors, setErrors] = useState({ country: false });

  const onSearch = () => {
    if (!country) {
      setErrors({ country: true });
      return;
    }
    if (country) {
      dispatch(fetchCovidCaseAllStatus({ country: country, from, to }));
    }
  };

  const formatedCovidData = useMemo(() => {
    if (!data.length) return [];
    const countryName = data[0]['Country'] as string;

    const dataList = INFORMATION_LIST.map((l) => {
      let count = 0;
      data.forEach((row) => {
        // @ts-ignore
        const totalCase = row[l.key];
        count += totalCase;
      });
      return { ...l, value: count };
    }) as ListItem[];

    return [countryName, dataList];
  }, [data]);

  return (
    <React.Fragment>
      <Container fluid>
        <Row className='d-flex justify-content-center align-item-center mb-5'>
          <h1 className='header p-4'>covid reporting</h1>
        </Row>
      </Container>

      <Container fluid='sm'>
        <Row>
          <Col xs={4}>
            <CountrySelect
              name='country'
              placeholder='Enter country name'
              error={errors.country}
              resetError={setErrors}
            />
          </Col>
          <Col xs={4}>
            <CovidDateRangePicker />
          </Col>
          <Col
            xs={12}
            className='d-flex justify-content-center align-items-center mt-4'
          >
            <Button className='w-200' onClick={onSearch}>
              Search
            </Button>
          </Col>
        </Row>
        <Row className='mt-4'>
          {formatedCovidData.length > 0 && (
            <CovidList
              title={formatedCovidData[0] as string}
              list={formatedCovidData[1] as ListItem[]}
            />
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
