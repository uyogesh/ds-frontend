import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, MenuItem, Button } from 'react-bootstrap'
import { equals, isNil } from 'ramda'
import './DevReportPagination.scss'

const filterArray = ['Current month to date', 'Aug', 'July']

const DevReportPagination = ({ data, viewing, filter, onChangeView, onChangeFilter }) => (
  <div className="report-pagination border-5 mt-20 px-20 align-items-center justify-content-between">
    <div className="align-items-center">
      <span className="light-grey">Viewing:&nbsp;</span>
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
          All
        </MenuItem>
        {data.map((report, index) => (
          <MenuItem
            key={report.user.id}
            eventKey={report.user.id}
            active={equals(index, viewing)}
            onClick={() => onChangeView(report)}
          >
            {report.user.name}
          </MenuItem>
        ))}
      </DropdownButton>
    </div>
    <div className="align-items-center">
      <span className="light-grey">Filter by Date:&nbsp;</span>
      <DropdownButton id="status" title={filterArray[filter]} className="border-0 main-blue">
        {filterArray.map((item, index) => (
          <MenuItem
            key={index}
            eventKey={index}
            active={equals(filter, index)}
            onClick={() => onChangeFilter(index)}
          >
            {item}
          </MenuItem>
        ))}
      </DropdownButton>
    </div>
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
