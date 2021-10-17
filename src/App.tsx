import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from './app/hook';

// features
import CountrySelect from './features/country-select';
import CovidDateRangePicker from './features/date-range-picker';
import DataTable from './features/covid-list';
import { Loading } from './features/loading';

// actions
import { fetchCovidCaseAllStatus } from './features/covid-list/covidDataSlice';
import { loadingActions } from './features/loading/loadingSlice';

function App() {
  const dispatch = useAppDispatch();
  const { from, to } = useAppSelector((state) => state.dateRange);
  const { country } = useAppSelector((state) => state.countries);
  const { loading } = useAppSelector((state) => state.loading);
  const [errors, setErrors] = useState({ country: false });

  const onSearch = () => {
    dispatch(loadingActions.setLoading({ loading: true }));
    if (!country) {
      setErrors({ country: true });
      dispatch(loadingActions.setLoading({ loading: false }));
      return;
    }
    if (country) {
      dispatch(fetchCovidCaseAllStatus({ country: country, from, to })).then(
        () => {
          dispatch(loadingActions.setLoading({ loading: false }));
        }
      );
    }
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row className='d-flex justify-content-center align-item-center mb-5'>
          <h1 className='header p-4'>covid reporting</h1>
        </Row>
      </Container>

      <Container fluid='sm'>
        <Row>
          <Col sm={12} md={4}>
            <CountrySelect
              name='country'
              placeholder='Enter country name'
              error={errors.country}
              resetError={setErrors}
            />
          </Col>
          <Col sm={12} md={4} className='xs-mt-2 lg-mt-0'>
            <CovidDateRangePicker />
          </Col>
          <Col
            sm={12}
            className='d-flex justify-content-center align-items-center mt-4'
          >
            <Button
              className='w-200'
              onClick={onSearch}
              disabled={loading}
              variant='primary'
            >
              Search
              <Loading className='mx-2' />
            </Button>
          </Col>
        </Row>
        <Row className='mt-4'>
          <DataTable />
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
