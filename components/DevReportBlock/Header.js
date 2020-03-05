import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'react-bootstrap';
import './DevReportBlock.scss'

const Header = props => (
  <div className="header">
    <Row className="text-center">
      <span className="dsl-b12 bold">{props.title}&nbsp;Assigned</span>
    </Row>
    <Row className="text-center">
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-b11">Courses</span>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-b11">Open</span>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-b11">Past Due</span>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-b11">Complete</span>
      </Col>
    </Row>
  </div>
)

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: 'Career Assigned',
};

export default Header;
