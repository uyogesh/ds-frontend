import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import Steps, { Step } from 'rc-steps';
import Icon from '../Icon';
import './CareerMap.scss';

const CareerMap = props => (
  <div className="career-map">
    <div className="header">
      <span className="dsl-b12">Career Map</span>
      <span className="dsl-p14 right">See all&nbsp;<Icon name="fa fa-chevron-right" color="#376CAF" size={12} /></span>
    </div>
    <div className="content border-5">
      <Row className="mb-20 mx-0">
        <Col xs={6} sm={6} md={6} lg={6}>
          <span className="dsl-b14">Level</span>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} className="text-center">
          <span className="dsl-b14">Started</span>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} className="text-center">
          <span className="dsl-b14">Completed</span>
        </Col>
      </Row>
      {props.programs.map((program, key) => (
        <Row key={key} className="mb-10 mx-0">
          <Col xs={6} sm={6} md={6} lg={6} className={key == 1 ? 'ovfhidden line active' : 'ovfhidden line'}>
            {key == 1 ? (
              <span className="dsl-b14">
                <Icon
                  name="fa fa-circle circle"
                  color="#343f4b"
                  size={14}
                />&nbsp;&nbsp;&nbsp;{program.title}
              </span>
            ) : (
                <span className="dsl-b14">
                  <Icon
                    name="fa fa-circle"
                    color="#969faa"
                    size={14}
                  />&nbsp;&nbsp;&nbsp;{program.title}
                </span>
              )}

            {key != (props.programs.length - 1) && <div className={key == (props.programs.length - 2) ? "connection active" : "connection"} />}
          </Col>
          <Col xs={3} sm={3} md={3} lg={3} className="line text-center">
            <span className="dsl-b14">{moment(program.created_at).format('MM/DD/YYYY')}</span>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3} className="line text-center">
            <span className="dsl-b14">{program.completed_at ? moment(program.completed_at).format('MM/DD/YYYY') : 'N/A'}</span>
          </Col>
        </Row>
      ))}
    </div>
  </div>
)

CareerMap.propTypes = {
};

CareerMap.defaultProps = {
};

const mapStateToProps = state => ({
  programs: state.develop.careerPrograms,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CareerMap);
