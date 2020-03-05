import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Image, Media } from 'react-bootstrap'
import { user } from '../../layouts/Dashboard/images'
import './LearnProfileInfo.scss'

const isAvatar = url => {
  if (url.indexOf('.png') > 0 || url.indexOf('.jpg') > 0) {
    return true
  }
  return false
}

const LearnProfileInfo = props => (
  <div className="learn-profileinfo border-5">
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
  </div>
)

LearnProfileInfo.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  job_title: PropTypes.string,
}

LearnProfileInfo.defaultProps = {
  name: '',
}

const mapStateToProps = state => ({
  name: state.app.first_name + ' ' + state.app.last_name,
  avatar: state.app.avatar,
  job_title: state.app.job_title,
  created_at: state.app.created_at,
})

export default connect(
  mapStateToProps,
  null
)(LearnProfileInfo)
