import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import './PerformanceRow.scss';

const PerformanceRow = props => (
  <div className="performance-row">
    <div className="status">
      {props.status ? (
        <Icon name="fa fa-circle-o" />
      ) : (
          <Icon name="fa fa-circle-o" />
        )}
    </div>
    <span className="others" text={props.employee} />
    <div className="space" />
    <span className="others" text={`${props.inputs}%`} />
    <div className="score">
      <span className="others" text={props.score ? props.score : '-'} />
      <Icon name="fa fa-circle-o" />
    </div>
  </div>
);

PerformanceRow.propTypes = {
  status: PropTypes.bool.isRequired,
  employee: PropTypes.string.isRequired,
  inputs: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default PerformanceRow;
