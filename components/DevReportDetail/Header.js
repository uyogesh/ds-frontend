import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Image } from 'react-bootstrap';
import Icon from '../Icon';
import Title from '../DevReportBlock/Header';
import Line from '../DevReportBlock/Row';
import './DevReportDetail.scss'

const Header = ({ data }) => (
  <div className="report-block">
    <Row className="text-center">
      <Col xs={3} sm={3} md={3} lg={3}>
        <Title title="Career" />
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <Title title="Manager" />
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <Title title="Self" />
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <Title title="Total" />
      </Col>
    </Row>

    <Row className="text-center">
      <Col xs={3} sm={3} md={3} lg={3}>
        <Line courses={data.career.courses} />
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <Line courses={data.manager.courses} />
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <Line courses={data.self.courses} />
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <Line courses={data.metrics.courses} />
      </Col>
    </Row>
  </div>
)

Header.propTypes = {
};

Header.defaultProps = {
};

export default Header;
