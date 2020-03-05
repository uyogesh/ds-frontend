import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Image, Media, Col } from 'react-bootstrap'
import Icon from '../Icon'
import { user } from '../../layouts/Dashboard/images'
import './DailyWorkPlanProfile.scss'

const isAvatar = url => {
  if (url.indexOf('.png') > 0 || url.indexOf('.jpg') > 0) {
    return true
  }
  return false
}

const DailyWorkPlanProfile = props => (
  <div className="workplan-profile border-5">
    <Media>
      <Media.Left>
        <Image src={isAvatar(props.avatar) ? props.avatar : user} width={67} height={67} circle />
      </Media.Left>
      <Media.Body>
        <Media.Heading className="dsl-b16 bold">{props.name}</Media.Heading>
        <p className="dsl-l12">Position: Sales Consultant</p>
        <p className="dsl-l12">
          <a href="#">View Career ></a>
        </p>
      </Media.Body>
    </Media>
    <div className="divider" />
    <div className="status">
      <p className="dsl-b14 bold">Sales Consultant</p>
    </div>

    <div className="block">
      <p className="dsl-b12">
        Tasks 4/6
        <a href="#" className="aln-right">
          See all >
        </a>
      </p>
      <div className="divider" />
      <p className="dsl-l12 bold">
        <Icon name="fas fa-check-circle" color="#c3c7cc" size={13} />
        &nbsp;Delivering Numbers
      </p>
      <p className="dsl-b12 bold">
        <Icon name="fal fa-circle" size={13} />
        &nbsp;Leave vs Purchase
      </p>
    </div>

    <div className="block">
      <p className="dsl-b12">
        Habits 2/2
        <a href="#" className="aln-right">
          See all >
        </a>
      </p>
      <div className="divider" />
      <p className="dsl-l12 bold">
        <Icon name="fas fa-check-circle" color="#c3c7cc" size={13} />
        &nbsp;Delivering Numbers
      </p>
      <p className="dsl-b12 bold">
        <Icon name="fal fa-circle" size={13} />
        &nbsp;Leave vs Purchase
      </p>
    </div>

    <div className="block">
      <p className="dsl-b12">
        Training 2/2
        <a href="#" className="aln-right">
          See all >
        </a>
      </p>
      <div className="divider" />
      <div className="dsl-l12 bold aln-content">
        <Icon name="fas fa-check-circle" color="#c3c7cc" size={13} />
        <Col xs={4} className="px-5">
          <img src="/images/company.png" alt="image" className="trainingimage" />
        </Col>
        <Col xs={7} className="px-5">
          <Col xs={12} className="px-0">
            &nbsp;Leave vs Purchase
          </Col>
          <Col xs={12} className="font-normal px-0">
            &nbsp;Modules: 5
          </Col>
          <Col xs={12} className="font-normal px-0">
            &nbsp;Completed: 6
          </Col>
        </Col>
      </div>
      <div className="dsl-b12 bold aln-content">
        <Icon name="fal fa-circle" size={13} />
        <Col xs={4} className="px-5">
          <img src="/images/company.png" alt="image" className="trainingimage" />
        </Col>
        <Col xs={7} className="px-5">
          <Col xs={12} className="px-0">
            &nbsp;Leave vs Purchase
          </Col>
          <Col xs={12} className="font-normal px-0">
            &nbsp;Modules: 5
          </Col>
          <Col xs={12} className="font-normal px-0">
            &nbsp;Completed: 6
          </Col>
        </Col>
      </div>
    </div>
  </div>
)

DailyWorkPlanProfile.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  job_title: PropTypes.string,
}

DailyWorkPlanProfile.defaultProps = {
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
)(DailyWorkPlanProfile)
