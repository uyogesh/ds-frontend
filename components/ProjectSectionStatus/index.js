import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, MenuItem, Button, Col, Row } from 'react-bootstrap'
import { equals } from 'ramda'
import './SectionStatus.scss'
import SIcon from '../SvgIcon'

const style = {
  flexDirection: 'column',
}

class SectionStatus extends Component {
  constructor(props) {
    super(props)
    if (props.index === 0) {
      this.state = {
        statusHeaders: ['Open', 'Past Due', 'Completed Today', 'MTD On-Time'],
        width: [2, 3, 4, 3],
      }
    } else {
      this.state = {
        statusHeaders: ['Open', 'Completed Today', 'MTD On-Time'],
        width: [4, 4, 4],
      }
    }
  }

  render() {
    const { width } = this.state

    return (
      <div
        className="learn-pagination border-5 mt-2 px-20 align-items-center justify-content-between"
        style={style}
      >
        <div className="wth100">
          {this.state.statusHeaders.map((item, index) => (
            <Col xs={width[index]} className="px-0 flx center">
              <p className="center txt-center mb-0">{item}</p>
            </Col>
          ))}
        </div>
        <div className="align-items-center textcenter wth100 mb-10">
          <Col xs={width[0]}>
            <span className="bold">{this.props.status.open}</span>
          </Col>
          {this.props.index === 0 ? (
            <Col xs={3}>
              <span className="bold">{this.props.status.past_due}</span>
            </Col>
          ) : null}
          <Col xs={width[1]}>
            <span className="bold">{this.props.status.complete}</span>
          </Col>
          <Col xs={width[2]}>
            <span className="bold">{this.props.status.mtd_completion}</span>
          </Col>
        </div>
      </div>
    )
  }
}

SectionStatus.propTypes = {
  status: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default SectionStatus
