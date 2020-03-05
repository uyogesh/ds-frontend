import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'react-bootstrap';
import Icon from '../Icon';
import './DevReportBlock.scss'

const Line = ({ courses }) => (
  <div>
    <Row className="text-center">
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-b11">{courses.assigned_count + courses.assigned_count + courses.completed_count}</span>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-b11">{courses.assigned_count}</span>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-b11">{courses.past_due_count}</span>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-b11">{courses.completed_count}</span>
      </Col>
    </Row>
    <Row className="text-center">
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-d11">{courses.assigned_percent + courses.past_due_percent + courses.completed_percent}%</span>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-d11">{courses.assigned_percent}%</span>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-d11">{courses.past_due_percent}%</span>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <span className="dsl-d11">{courses.completed_percent}%</span>
      </Col>
    </Row>
  </div>
)

Line.propTypes = {
  title: PropTypes.string,
};

Line.defaultProps = {
  title: 'Career Assigned',
};

export default Line;
