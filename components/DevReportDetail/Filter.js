import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, MenuItem, Button } from 'react-bootstrap'
import { equals, isNil } from 'ramda'
import './DevReportDetail.scss'

const filterArray = ['Current month to date', 'Aug', 'July']

const DevReportPagination = ({ data, viewing, filter, onChangeView, onChangeFilter }) => (
  <div className="detail-filter border-5 mt-20 px-20 align-items-center">
    <span className="dsl-d12">Viewing:&nbsp;</span>
    <DropdownButton
      id="status"
      title={isNil(viewing) ? 'All' : data[viewing].user.name}
      className="border-0 main-blue"
    >
      <MenuItem
        key="null"
        eventKey="null"
        active={equals(null, viewing)}
        onClick={() => onChangeView(null)}
      >
        <span>All</span>
      </MenuItem>
      {data.map((report, index) => (
        <MenuItem
          key={report.user.id}
          eventKey={report.user.id}
          active={equals(index, viewing)}
          onClick={() => onChangeView(index)}
        >
          <span className="dsl-p12">{report.user.name}</span>
        </MenuItem>
      ))}
    </DropdownButton>
  </div>
)

DevReportPagination.propTypes = {
  data: PropTypes.any.isRequired,
  viewing: PropTypes.number,
  filter: PropTypes.number,
  onChangeView: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}

DevReportPagination.defaultProps = {
  data: [],
  viewing: null,
  filter: null,
  onChangeView: () => {},
  onChangeFilter: () => {},
}

export default DevReportPagination
