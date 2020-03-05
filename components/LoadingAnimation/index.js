import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import './LoadingAnimation.scss';

function LoadingAnimation(props) {
  if (props.loading) {
    return (
      <div className="loading-animation">
        <div className="loading-block">
          <Spinner name={props.name} className={props.size} color={props.color} />
          <span className={props.size}>{props.text}</span>
        </div>
      </div>
    )
  }
  return null;
}

LoadingAnimation.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  loading: PropTypes.bool,
};

LoadingAnimation.defaultProps = {
  name: 'ball-spin-fade-loader',
  size: 'large',
  color: '#376CAF',
  loading: false,
};

export default LoadingAnimation;
