import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'react-bootstrap';
import Icon from '../Icon';
import Header from './Header';
import Line from './Row';
import './DevReportBlock.scss'

const DevReportBlock = ({ data, onUserClick }) => (
  <div className="report-block">
    <Row>
      <Col xs={1} sm={1} md={1} lg={1}></Col>
      <Col xs={11} sm={11} md={11} lg={11}>
        <Row className="text-center">
          <Col xs={3} sm={3} md={3} lg={3}>
            <Header title="Career" />
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <Header title="Manager" />
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <Header title="Self" />
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <Header title="Total" />
          </Col>
        </Row>
      </Col>
    </Row>
    {data.map(report => (
      <Row key={report.user.id}>
        <Col xs={1} sm={1} md={1} lg={1} className="dsl-p12 align-items-center single" onClick={() => onUserClick(report)}>
          {report.user.name}&nbsp;<Icon name="fa fa-chevron-down" size={10} />
        </Col>
        <Col xs={11} sm={11} md={11} lg={11}>
          <Row className="text-center">
            <Col xs={3} sm={3} md={3} lg={3}>
              <Line courses={report.career.courses} />
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <Line courses={report.manager.courses} />
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <Line courses={report.self.courses} />
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <Line courses={report.metrics.courses} />
            </Col>
          </Row>
        </Col>
      </Row>
    ))}
  </div>
)

DevReportBlock.propTypes = {
};

DevReportBlock.defaultProps = {
};

export default DevReportBlock;
