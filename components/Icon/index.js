import React from 'react';
import PropTypes from 'prop-types';

function Icon(props) {
  const styles = {
    color: props.color,
    fontSize: props.size,
  };

  return <i className={props.name} style={styles} />;
}

Icon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
};

Icon.defaultProps = {
  name: 'fa fa-bell-o',
  color: '#376caf',
  size: 12,
};

export default Icon;
