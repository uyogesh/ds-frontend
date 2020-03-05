import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Icon from '../Icon';
import './CareerAwards.scss'

const CareerAwards = props => (
  <div className="career-awards">
    <div className="header"><span className="dsb-l14">Accolades & Awards</span></div>
    <div className="content">
      <Row>
        <Col className="dsl-b14 bold" xs={2} sm={2}>
          <Icon name="fa fa-trophy" color="#343f4b" size={18} />
        </Col>
        <Col className="dsl-b14 bold" xs={6} sm={6}>Outstadning CSI</Col>
        <Col className="dsl-d14" xs={4} sm={4}>4/12/18</Col>
      </Row>
      <Row>
        <Col className="dsl-b14 bold" xs={2} sm={2}>
          <Icon name="fa fa-trophy" color="#343f4b" size={18} />
        </Col>
        <Col className="dsl-b14 bold" xs={6} sm={6}>Husler Award</Col>
        <Col className="dsl-d14" xs={4} sm={4}>4/12/18</Col>
      </Row>
      <Row>
        <Col className="dsl-b14 bold" xs={2} sm={2}>
          <Icon name="fa fa-trophy" color="#343f4b" size={18} />
        </Col>
        <Col className="dsl-b14 bold" xs={6} sm={6}>2 Years with the Company</Col>
        <Col className="dsl-d14" xs={4} sm={4}>4/12/18</Col>
      </Row>
    </div>
  </div>
)

CareerAwards.propTypes = {
};

CareerAwards.defaultProps = {
};

export default CareerAwards;
