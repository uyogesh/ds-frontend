import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './GeneralDropDown.scss'

const GeneralDropDown = props => (
  <div xs="4" className="report-status">
    <p className="al-center">{props.label} </p>
    <DropdownButton
      id={props.id}
      title={props.title}
      className={`border-0 p-10 btn-no-back`}
      onChange={props.onChange}
    >
      {props.choices.map((choice, index) => {
        if (index === 0) {
          return (
            <MenuItem eventKey={index} value={choice} active>
              <span>{choice}</span>
            </MenuItem>
          )
        }
        return (
          <MenuItem eventKey={index} value={choice}>
            <span>{choice}</span>
          </MenuItem>
        )
      })}
    </DropdownButton>
  </div>
)

GeneralDropDown.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}
export default GeneralDropDown
