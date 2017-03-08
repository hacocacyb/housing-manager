import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import BuildingWidget from './BuildingWidget'
import BedWidget from './BedWidget'
import BillingWidget from './BillingWidget'
import { getAll as getAllBeds } from '../../data/actions/bed'
import { getAll as getAllBuildings } from '../../data/actions/building'
import store from '../../data/store.js'


class Dashboard extends React.Component {

  componentWillMount() {
    store.dispatch(getAllBeds())
    store.dispatch(getAllBuildings())
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={6} md={5}>
            <BuildingWidget/>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <BedWidget/>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <BillingWidget/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Dashboard;
