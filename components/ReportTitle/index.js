import React from 'react'
import DropDown from '../GeneralDropDown'
import './ReportTitle.scss'

const ReportTitle = props => (
  <div className="report-main-title wth100 flx border-5 learn-pagination">
    <DropDown
      label="Viewing: "
      choices={['Ken Artt Automotive', 'Other Choices']}
      onChange={() => {}}
      title="Ken Artt Automotive"
      id="viewing"
    />

    <DropDown
      label="Filter by Date: "
      choices={['Current month to date', 'Other Choices']}
      onChange={() => {}}
      title="Current month to date"
      id="filter"
    />
  </div>
)

export default ReportTitle
