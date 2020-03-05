import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './ReportHeader.scss'

const reportHeader = props => {
  return (
    <div className="task-report-header wth100 ">
      <DropdownButton
        id={props.id}
        title={props.title}
        className={`border-0 p-10 btn-no-back fnt20`}
        onChange={props.onChange}
      >
        {props.choices.map((choice, index) => {
          if (index === 0) {
            return (
              <MenuItem bsClass="fnt20" eventKey={index} value={choice} active>
                <span>{choice}</span>
              </MenuItem>
            )
          }
          return (
            <MenuItem bsClass="fnt20" eventKey={index} value={choice}>
              <span>{choice}</span>
            </MenuItem>
          )
        })}
      </DropdownButton>
    </div>
  )
}

reportHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  choices: PropTypes.array.isRequired,
}

export default reportHeader
