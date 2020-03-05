import React, { Component } from 'react'
import { Button, Grid, Row, Col, Modal } from 'react-bootstrap'
import WorkPlan from './WorkPlan'
import WorkHabits from './WorkHabits'
import WorkTraining from './WorkTraining'
import './WorkPlanList.scss'

class DailyWorkPlanList extends Component {
  render() {
    return (
      <div>
        <Row className="mx-0">
          <Col xs={12} sm={12} md={6} lg={6} className="px-0">
            <Col xs={12}>
              <WorkPlan />
            </Col>
            <Col xs={12}>
              <WorkTraining />
            </Col>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className="pl-0">
            <WorkHabits />
            <div className="submit">
              <Button className="dsl-w12 bold">Check Out</Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default DailyWorkPlanList
