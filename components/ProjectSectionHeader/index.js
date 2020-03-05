import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../layouts/Dashboard/theme.scss'

const SectionHeader = props => (
  <div className="learn-pagination border-5 px-20 pt-10 pb-10 align-items-center justify-content-between">
    <div className="align-items-center">
      <span className="light-grey">{props.header}</span>
    </div>
  </div>
)

export default SectionHeader
