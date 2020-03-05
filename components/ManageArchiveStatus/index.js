import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import './ManageArchiveStatus.scss'

const ManageArchiveStatus = props => (
  <div className="manage-archive-status mt-20 border-5 px-20 align-items-center justify-content-between">
    <div className="align-items-center">
      <span className="light-grey">Select Archive:</span>
      <DropdownButton id="selectArchive" title="Select items" className="border-0 main-blue">
        <MenuItem eventKey="1" active>
          Tasks
        </MenuItem>
        <MenuItem eventKey="2">Habits</MenuItem>
        <MenuItem eventKey="3">Trainings</MenuItem>
      </DropdownButton>
      <span className="light-grey">Status:</span>
      <DropdownButton id="selectStatus" title="Select items" className="border-0 main-blue">
        <MenuItem eventKey="1" active>
          All
        </MenuItem>
        <MenuItem eventKey="2">Checked</MenuItem>
        <MenuItem eventKey="3">Unchecked</MenuItem>
      </DropdownButton>
      <div className="fright">
        <span className="light-grey">Filter by:</span>
        <DropdownButton id="selectStatus" title="Select items" className="border-0 main-blue">
          <MenuItem eventKey="1" active>
            All
          </MenuItem>
          <MenuItem eventKey="2">Checked</MenuItem>
          <MenuItem eventKey="3">Unchecked</MenuItem>
        </DropdownButton>
      </div>
    </div>
  </div>
)

export default ManageArchiveStatus
