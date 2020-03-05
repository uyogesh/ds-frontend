import React, { Component } from 'react'
import '../../layouts/Dashboard/theme.scss'

const style = {
  marginBottom: '4px',
}

const SectionHeader = props => (
  <div
    className="learn-pagination border-5 mt-20 px-20 align-items-center justify-content-between"
    style={style}
  >
    <div className="align-items-center">
      <span className="light-grey">{props.header}</span>
    </div>
  </div>
)

export default SectionHeader
