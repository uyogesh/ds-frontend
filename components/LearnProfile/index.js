import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Image, Media } from 'react-bootstrap'
import Icon from '../Icon'
import { user } from '../../layouts/Dashboard/images'
import './LearnProfile.scss'

const isAvatar = url => {
  if (url.indexOf('.png') > 0 || url.indexOf('.jpg') > 0) {
    return true
  }
  return false
}

const LearnProfile = props => (
  <div className="learn-profile border-5">
    <Media>
      <Media.Left>
        <Image src={isAvatar(props.avatar) ? props.avatar : user} width={67} height={67} circle />
      </Media.Left>
      <Media.Body>
        <Media.Heading className="dsl-b16 bold">{props.name}</Media.Heading>
        <p className="dsl-l14">Position: Sales Consultant</p>
        <p className="dsl-l14">Since: 1/1/18</p>
        <p className="dsl-l14">Manager: {props.job_title}</p>
      </Media.Body>
    </Media>
    <div className="divider" />
    <div className="status">
      <p className="dsl-l12">IN PROGRESS</p>
      <p className="dsl-p14">Sales Consultant</p>
      <p className="dsl-l12 mb-0">
        <span>Started: 1/1/18</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>Target time: 6 months</span>
      </p>
    </div>
    <div className="divider" />
    <div className="block">
      <p className="dsl-l12">Performance Requirements</p>
      <p className="dsl-l14 bold">
        <Icon name="fas fa-check-circle" color="#c3c7cc" size={11} />
        &nbsp;Sell 8 Units Month/Avg
      </p>
      <p className="dsl-l14 bold">
        <Icon name="fas fa-check-circle" color="#c3c7cc" size={11} />
        &nbsp;CSI Above 92%
      </p>
    </div>
    <div className="block">
      <p className="dsl-l12">Required Habits</p>
      <p className="dsl-l14 bold">
        <Icon name="fas fa-check-circle" color="#c3c7cc" size={11} />
        &nbsp;Totally Monthly Completion
      </p>
    </div>
    <div className="block">
      <p className="dsl-l12">Development</p>
      <p className="dsl-l14 bold">
        <Icon name="fas fa-check-circle" color="#c3c7cc" size={11} />
        &nbsp;Delivering Numbers
      </p>
      <p className="dsl-b14 bold">
        <Icon name="unfas fa-check-circle" color="#376caf" size={11} />
        &nbsp;Leave vs Purchase
      </p>
    </div>
    <div className="submit">
      <Button className="dsl-w12 bold">See Career</Button>
    </div>
  </div>
)

LearnProfile.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  job_title: PropTypes.string,
}

LearnProfile.defaultProps = {
  name: '',
}

const mapStateToProps = state => ({
  name: state.app.first_name + ' ' + state.app.last_name,
  avatar: state.app.avatar,
  career_goal: state.app.career_goal,
  job_title: state.app.job_title,
  created_at: state.app.created_at,
  updated_at: state.app.updated_at,
})

export default connect(
  mapStateToProps,
  null
)(LearnProfile)
