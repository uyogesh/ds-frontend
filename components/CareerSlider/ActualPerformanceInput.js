import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './CareerSlider.scss'

class PInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      editable: false,
    }
  }

  handleToggle(event) {
    if (!this.state.editable) {
      this.setState({ editable: !this.state.editable }, () => {
        this.textInput.focus()
      })
    }
  }

  handleSave() {
    this.setState({ editable: false })
  }

  render() {
    const { editable, value } = this.state
    return (
      <div
        className={`cursor-pointer ${editable ? '' : 'text-underline'}`}
        onClick={() => this.handleToggle()}
        onBlur={() => this.handleSave()}
      >
        {editable ? (
          <FormControl
            type="text"
            inputRef={c => {
              this.textInput = c
            }}
            value={value}
            onChange={e => this.setState({ value: e.target.value })}
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
    )
  }
}

PInput.propTypes = {
  value: PropTypes.number,
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PInput)
