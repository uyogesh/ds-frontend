import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Profile from '../../../components/LearnProfile'
import ComingSoon from '../../../components/ComingSoon'

class Search extends Component {
  render() {
    return (
      <div>
        <Row className="mx-0">
          {/* <Col xs={12} sm={5} md={4} lg={3} className="px-0">
            <Profile />
          </Col>
          <Col xs={12} md={8} lg={9}> */}
          <Col xs={12}>
            <ComingSoon title="Search" />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Search
