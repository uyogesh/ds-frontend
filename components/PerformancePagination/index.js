import React from 'react';
import PropTypes from 'prop-types';
import './PerformancePagination.scss';

const PerformancePagination = props => (
  <div className="library-pagination">
    <span className="dsl-d12" size={12}>Showing:</span>&nbsp;&nbsp;
    {/* <Dropdown
      inline
      options={[
        { text: 'April 2018', value: 0, image: null },
        { text: 'May 2018', value: 1, image: null },
      ]}
      defaultValue={props.showing}
    /> */}
  </div>
);

PerformancePagination.propTypes = {
  showing: PropTypes.number,
};

PerformancePagination.defaultProps = {
  showing: 0,
};

export default PerformancePagination;
