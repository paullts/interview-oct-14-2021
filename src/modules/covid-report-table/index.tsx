import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import CountrySelect from '../../features/country-select';
import DataTable from '../../features/covid-data-table';
import { fetchCovidCaseAllStatus } from '../../features/covid-data-table/covidDataSlice';
import CovidDateRangePicker from '../../features/date-range-picker';
import { Loading } from '../../features/loading';
import { loadingActions } from '../../features/loading/loadingSlice';
import { useQueryParams } from '../../hooks/useQueryParams';

export default function CovidTable() {
  const { push } = useHistory();
  const params: { country: string } = useParams();
  const query = useQueryParams();

  const dispatch = useAppDispatch();
  const { from, to } = useAppSelector((state) => state.dateRange);
  const { loading } = useAppSelector((state) => state.loading);
  const { selectedCountry } = useAppSelector((state) => state.countries);

  const [errors, setErrors] = useState({ country: false });

  const onSearch = () => {
    const { value: country } = selectedCountry || {};
    dispatch(loadingActions.setLoading({ loading: true }));
    if (!country) {
      setErrors({ country: true });
      dispatch(loadingActions.setLoading({ loading: false }));
      return;
    }
    if (country) {
      push(`/${country}?date_from=${from}&date_to=${to}`);
      dispatch(fetchCovidCaseAllStatus({ country: country, from, to })).then(
        () => {
          dispatch(loadingActions.setLoading({ loading: false }));
        }
      );
    }
  };

  useEffect(() => {
    const { country } = params;
    const dateFrom = query.get('date_from');
    const dateTo = query.get('date_to');

    if (country && dateFrom && dateTo) {
      dispatch(loadingActions.setLoading({ loading: true }));
      dispatch(
        fetchCovidCaseAllStatus({
          country: country,
          from: dateFrom,
          to: dateTo,
        })
      ).then(() => {
        dispatch(loadingActions.setLoading({ loading: false }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
}
