import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import './ArchiveStatus.scss';

const ArchiveStatus = props => (
  <div className="archive-status mt-20 border-5">
    <DropdownButton
      id="status"
      title="Current Month to Date"
      className="border-0 p-10"
    >
      <MenuItem eventKey="1" active>Current Month to Date</MenuItem>
      <MenuItem eventKey="2">June 2018</MenuItem>
      <MenuItem eventKey="3">May 2018</MenuItem>
      <MenuItem eventKey="4">April 2018</MenuItem>
      <MenuItem eventKey="5">March 2018</MenuItem>
    </DropdownButton>
    <div className="space" />
    <div className="pr-20">
      <span className="dsl-b14"><strong>{props.courses}</strong></span>
      &nbsp;&nbsp;
      <span className="dsl-b14">Courses</span>
    </div>
    <div>
      <span className="dsl-b14"><strong>{props.modules}</strong></span>
      &nbsp;&nbsp;
      <span className="dsl-b14">Modules</span>
    </div>
  </div>
);

ArchiveStatus.propTypes = {
  courses: PropTypes.number,
  modules: PropTypes.number,
  viewing: PropTypes.number,
};

ArchiveStatus.defaultProps = {
  courses: 1326,
  modules: 4182,
  viewing: 0,
};

export default ArchiveStatus;
