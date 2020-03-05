import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, equals } from 'ramda'
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap'
import Icon from '../Icon'
import DevActions from '../../actions/develop'
import './CareerGoals.scss'

class CareerGoals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.goals.length > 0 ? props.goals[0] : '',
      isEditable: false,
      label: isEmpty(props.goals) ? 'What is your 3 year career goal?' : props.goals,
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      label: isEmpty(props.goals) ? 'What is your 3 year career goal?' : props.goals,
    }
  }

  componentDidMount() {
    const userId = this.props.userId
    this.props.goalsRequest(userId)
  }

  getValidationState() {
    const length = this.state.value.length
    if (length > 10) return 'success'
    else if (length > 5) return 'warning'
    else if (length > 0) return 'error'
    return null
  }

  handleSwitch() {
    const { isEditable } = this.state
    this.setState({ isEditable: !isEditable })
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }

  handleSaveGoals() {
    const { value } = this.state
    let { goals, userId } = this.props
    // goals = goals.concat([value]);
    goals = [value]
    this.props.saveGoals(userId, { goals })
    this.setState({ isEditable: false })
    this.setState({ label: value })
  }

  handleKeyPress(e) {
    if (equals(e.key, 'Enter')) {
      e.preventDefault()
      this.handleSaveGoals()
    }
  }

  render() {
    const { isEditable, label, value } = this.state

    return (
      <div className="career-goals">
        <div className="header">
          <span className="dsl-b12">My Career Goal</span>
        </div>
        {isEditable ? (
          <form className="content">
            <p className="dsl-d12">
              State your 3 year career goal here with a time frame that you want to accomplish it
              in. This information will be viewed by your manager.
            </p>
            <FormGroup validationState={this.getValidationState()}>
              <ControlLabel className="my-goal dsl-b14">My goals is...</ControlLabel>
              <FormControl
                autoFocus
                className="my-input"
                type="text"
                value={value}
                onKeyPress={e => this.handleKeyPress(e)}
                onChange={e => this.handleChange(e)}
              />
              <FormControl.Feedback />
              <Button className="dsb save" onClick={() => this.handleSaveGoals()}>
                Save
              </Button>
            </FormGroup>
          </form>
        ) : (
          <form className="content">
            <div className="dsl-b14 pointer" onClick={() => this.handleSwitch()}>
              {label}
              <Icon name="fa fa-edit edit" color="#343f4b" size={14} />
            </div>
          </form>
        )}
      </div>
    )
  }
}

CareerGoals.propTypes = {
  userId: PropTypes.number.isRequired,
  goals: PropTypes.array.isRequired,
  goalsRequest: PropTypes.func.isRequired,
  saveGoals: PropTypes.func.isRequired,
}

CareerGoals.defaultProps = {}

const mapStateToProps = state => ({
  userId: state.app.id,
  goals: state.develop.careerGoals,
})

const mapDispatchToProps = dispatch => ({
  goalsRequest: id => dispatch(DevActions.careergoalsRequest(id)),
  saveGoals: (id, data) => dispatch(DevActions.careergoalsaveRequest(id, data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CareerGoals)
