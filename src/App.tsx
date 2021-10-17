import React from 'react';
import { Switch, Route } from 'react-router';
import { Container, Row } from 'react-bootstrap';
import CovidTable from './modules/covid-report-table';

function App() {
  return (
    <React.Fragment>
      <Container fluid>
        <Row className='d-flex justify-content-center align-item-center mb-5'>
          <h1 className='header p-4'>covid reporting</h1>
        </Row>
      </Container>

      <Switch>
        <Route exact path='/'>
          <CovidTable />
        </Route>
        <Route path='/:country'>
          <CovidTable />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
