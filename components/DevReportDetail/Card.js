import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Image } from 'react-bootstrap'
import Icon from '../Icon'
import Pagination from './Pagination'
import Filter from './Filter'
import './DevReportDetail.scss'

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNumber: 0,
      perCounts: 5,
    }
  }

  handlePageCounts(e) {
    this.setState({ perCounts: e })
  }

  handlePageNumber(e) {
    this.setState({ pageNumber: e })
  }

  render() {
    const { perCounts, pageNumber } = this.state
    const { data, title } = this.props

    return (
      <div>
        <div>
          <Filter />
        </div>
        <div className="card">
          <Row className="line">
            <Col xs={4} sm={4} md={4} lg={4} className="no-left">
              <span className="dsl-b12 bold">{title} Assigned</span>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Row className="text-center">
                <Col xs={3} sm={3} md={3} lg={3}>
                  <span className="dsl-b12 bold">Modules</span>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <span className="dsl-b12 bold">Completed</span>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <span className="dsl-b12 bold">Remaining</span>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <span className="dsl-b12 bold">Due</span>
                </Col>
              </Row>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} className="text-center">
              <span className="dsl-b12 bold">Status</span>
            </Col>
          </Row>
          {data.map((item, index) => {
            if (index >= pageNumber * perCounts && index < (pageNumber + 1) * perCounts) {
              return (
                <Row className="line align-items-center" key={`card${index}`}>
                  <Col xs={4} sm={4} md={4} lg={4} className="no-left">
                    <Row className="align-items-center">
                      <Col xs={2} sm={2} md={2} lg={2}>
                        <Icon name="fas fa-check-circle" size={19} color="#969faa" />
                      </Col>
                      <Col xs={3} sm={3} md={3} lg={3} className="no-left">
                        <Image src={item.data.thumb_url} width={80} height={50} rounded />
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6} className="no-right">
                        <span className="dsl-b12">{item.data.description}</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <Row className="text-center">
                      <Col xs={3} sm={3} md={3} lg={3}>
                        <span className="dsl-b12">20</span>
                        <br />
                        <span className="dsl-d12">100%</span>
                      </Col>
                      <Col xs={3} sm={3} md={3} lg={3}>
                        <span className="dsl-b12">20</span>
                        <br />
                        <span className="dsl-d12">100%</span>
                      </Col>
                      <Col xs={3} sm={3} md={3} lg={3}>
                        <span className="dsl-b12">20</span>
                        <br />
                        <span className="dsl-d12">100%</span>
                      </Col>
                      <Col xs={3} sm={3} md={3} lg={3}>
                        <span className="dsl-b12">20</span>
                        <br />
                        <span className="dsl-d12">100%</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={2} sm={2} md={2} lg={2} className="text-center">
                    <span className="dsl-b12 bold">Not Started</span>
                  </Col>
                </Row>
              )
            }
          })}
        </div>

        <Pagination
          page={pageNumber}
          showing={perCounts}
          total={data.length}
          onCounts={e => this.handlePageCounts(e)}
          onPage={e => this.handlePageNumber(e)}
        />
      </div>
    )
  }
}
