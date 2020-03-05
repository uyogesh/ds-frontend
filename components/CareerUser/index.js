import React from 'react'
import { connect } from 'react-redux'
import { Media } from 'react-bootstrap'
import { user } from '../../layouts/Dashboard/images'
import './CareerUser.scss'

const isAvatar = url => {
  if (url.indexOf('.png') > 0 || url.indexOf('.jpg') > 0) {
    return true
  }
  return false
}

const CareerUser = props => (
  <div className="career-user">
    <div className="header">
      <span className="dsl-b12">User Info</span>
    </div>
    <Media>
      <Media.Left>
        <img
          width={64}
          height={64}
          src={isAvatar(props.avatar) ? props.avatar : user}
          alt="thumbnail"
        />
      </Media.Left>
      <Media.Body>
        <p className="dsl-b20 bold">
          {props.firstName}
          &nbsp;
          {props.lastName}
        </p>
        <p className="dsl-b14">Position: Sales Consultant</p>
        <p className="dsl-b14">Since: 1/1/18</p>
        <p className="dsl-b14">Manager: Borat Tchzonic</p>
      </Media.Body>
    </Media>
  </div>
)

CareerUser.propTypes = {}

CareerUser.defaultProps = {}

const mapStateToProps = state => ({
  firstName: state.app.first_name,
  lastName: state.app.last_name,
  avatar: state.app.avatar
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CareerUser)
