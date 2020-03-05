import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { equals } from 'ramda'
import DevActions from '../../../actions/develop'
import CareerGoals from '../../../components/CareerGoals'
import CareerUser from '../../../components/CareerUser'
import CareerMap from '../../../components/CareerMap'
import CareerContent from '../../../components/CareerContent'
import CareerReviews from '../../../components/CareerReviews'
import CareerAwards from '../../../components/CareerAwards'
import CareerCommitments from '../../../components/CareerCommitments'
import CareerPlan from '../../../components/CareerPlan'
import './Career.scss'

const Career = () => (
  <div className="career">
    <div className="left-sidebar">
      <CareerGoals />
    </div>
    <div className="has-left-sidebar mt-20">
      <Row className="mx-0">
        <Col className="px-0" xs={12} sm={5} md={5} lg={5}>
          <CareerUser />
        </Col>
        <Col className="pr-0 map-wrapper" xs={12} sm={7} md={7} lg={7}>
          <CareerMap />
        </Col>
      </Row>
      <Row className="mx-0">
        <CareerContent />
      </Row>
    </div>
    {/* <Col xs={12} sm={6} md={3} lg={3}> */}
    {/* <CareerReviews />
            <CareerAwards />
            <CareerCommitments />
            <CareerPlan /> */}
    {/* </Col> */}
  </div>
)

export default Career
