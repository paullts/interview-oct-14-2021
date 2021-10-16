import { Container, Row, Col, Button } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from './app/hook';

import CountrySelect from './features/country-select';
import CovidList from './features/covid-list';
import React, { useMemo, useState } from 'react';
import CovidDateRangePicker from './features/date-range-picker';
import { fetchCovidCaseAllStatus } from './features/covid-data/covidDataSlice';

const INFORMATION_LIST = [
  { key: 'Confirmed', label: 'Total Confirmed', count: 0 },
  { key: 'Deaths', label: 'Total Deaths', count: 0 },
  { key: 'Recovered', label: 'Total Recovered', count: 0 },
];

function App() {
  const dispatch = useAppDispatch();
  const { from, to } = useAppSelector((state) => state.dateRange);
  const { country } = useAppSelector((state) => state.countries);
  const { data } = useAppSelector((state) => state.covidData);
  const [errors, setErrors] = useState({ country: false });

  console.log(data);

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
    return INFORMATION_LIST.map((l) => {
      let count = 0;
      data.forEach((row) => {
        // @ts-ignore
        const totalCase = row[l.key];
        count += totalCase;
      });
      return { ...l, count };
    });
  }, [data]);
  console.log(formatedCovidData);

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
          {formatedCovidData.length && (
            <CovidList
              title='shindo'
              list={[
                { title: 'Total confirmed', value: 100 },
                { title: 'Total Deaths', value: 50 },
                { title: 'Total Recovered', value: 10 },
              ]}
            />
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
