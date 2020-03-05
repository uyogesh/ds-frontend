import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Icon from '../Icon';
import './CareerReviews.scss'

const CareerReviews = props => (
  <div className="career-reviews">
    <div className="header"><span className="dsl-b12">Performance Reviews</span></div>
    <div className="content">
      <Row>
        <Col className="dsl-b14" xs={3} sm={3}>Month</Col>
        <Col className="dsl-b14" xs={3} sm={3}>Score</Col>
        <Col className="dsl-b14" xs={3} sm={2}>A</Col>
        <Col className="dsl-b14" xs={3} sm={2}>B</Col>
        <Col className="dsl-b14" xs={3} sm={2}>C</Col>
      </Row>
      <Row>
        <Col className="dsl-b14" xs={3} sm={3}>July</Col>
        <Col className="dsl-b14" xs={3} sm={3}>4.5</Col>
        <Col className="dsl-b14" xs={3} sm={2}>69</Col>
        <Col className="dsl-b14" xs={3} sm={2}>0</Col>
        <Col className="dsl-b14" xs={3} sm={2}>2</Col>
      </Row>
      <Row>
        <Col className="dsl-b14" xs={3} sm={3}>June</Col>
        <Col className="dsl-b14" xs={3} sm={3}>4.5</Col>
        <Col className="dsl-b14" xs={3} sm={2}>69</Col>
        <Col className="dsl-b14" xs={3} sm={2}>0</Col>
        <Col className="dsl-b14" xs={3} sm={2}>2</Col>
      </Row>
      <div className="bottom">
        <span className="dsl-p14">
          &nbsp;&nbsp;See all&nbsp;<Icon name="fa fa-chevron-right" color="#376CAF" size={12} />
        </span>
      </div>
    </div>
  </div>
)

CareerReviews.propTypes = {
};

CareerReviews.defaultProps = {
};

export default CareerReviews;
