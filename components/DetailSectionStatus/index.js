import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './DetailSectionStatus.scss'
import { DropdownButton, MenuItem, Button, Col, Row } from 'react-bootstrap'
import { equals } from 'ramda'

const style = {
  flexDirection: 'column',
}

const DetailSectionStatus = props => (
  <div
    className="learn-pagination border-5 mt-2 px-20 align-items-center justify-content-between"
    style={style}
  >
    <div className="align-items-center textcenter wth100">
      <div className="col-sm-3">
        <p>Open</p>
        <p>{props.status.open}</p>
      </div>
      <div className="col-sm-3">
        <p>Past Due</p>
        <p>{props.status.pastdeu}</p>
      </div>
      <div className="col-sm-3">
        <p>Completed Today</p>
        <p>{props.status.completed}</p>
      </div>
      <div className="col-sm-3">
        <p>MTD On-Time</p>
        <p>{props.status.mtd}</p>
      </div>
    </div>
  </div>
)

export default DetailSectionStatus
