import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, Media } from 'react-bootstrap'
import { equals } from 'ramda'
import Icon from '../Icon'
import LearnChildField from '../LearnChildField'
import { CardType } from '../../services/config'
import { company } from '../../layouts/Dashboard/images'
import './LearnFeed.scss'

class LearnFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      direction: 'bottom',
    }
  }

  handleScroll(event) {
    const { feedData } = this.props
    if (feedData.child_count < 5) {
      return
    }
    const bottom = (feedData.child_count - 4) * 85
    if (event.currentTarget.scrollTop >= bottom) {
      this.setState({ direction: 'top' })
    } else if (equals(event.currentTarget.scrollTop, 0)) {
      this.setState({ direction: 'bottom' })
    }
  }

  render() {
    const { mode, feedData, type, typeName, dueDate, modules, onClick, onClickChild } = this.props
    const { direction } = this.state

    return (
      <div className={`learn-feed border-5 ${equals(mode, 'list') ? 'list-mode' : 'mb-15'}`}>
        <Media
          onClick={() => {
            equals(mode, 'list') && onClick()
          }}
        >
          <Media.Left
            className={`col-md-7 col-sm-6 col-xs-12 mb-10 pl-0 ${equals(
              feedData.child_count,
              feedData.completed
            ) && 'completed'}`}
          >
            <div className="align-items-center grid-card-top mb-10">
              <div className="course-status">
                <Icon
                  size={21}
                  name={`${
                    equals(feedData.child_count, feedData.completed)
                      ? 'fas fa-check-circle'
                      : 'fal fa-circle'
                  } mr-10`}
                  color={`${
                    equals(feedData.child_count, feedData.completed) ? '#376CAF' : '#969faa'
                  }`}
                />
              </div>
              {equals(mode, 'grid') && (
                <div className="justify-content-between course-top-title">
                  <div className="course-title">
                    <p className="dsl-d13 mb-0 align-items-center">
                      <Icon name={`${CardType[type].alias} mr-10`} color="#c3c7cc" />
                      {typeName}
                    </p>
                    <p className="dsl-b14">
                      <strong>{feedData.name}</strong>
                    </p>
                  </div>
                  <div className="due-date">
                    <p className="dsl-d13 mb-0 text-right">Due Date:</p>
                    <p className="dsl-b14 text-right">
                      <strong>{dueDate}</strong>
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="image-container">
              <Image
                responsive
                className="cursor-pointer border-5"
                src={feedData.thumb_url ? feedData.thumb_url : company}
                onClick={() => {
                  equals(mode, 'grid') && onClick()
                }}
              />
            </div>
            <div className="pt-30 feed-description">
              {equals(mode, 'list') && (
                <div className="justify-content-between mb-10">
                  <div className="course-title">
                    <p className="dsl-d13 mb-0 align-items-center">
                      <Icon name={`${CardType[type].alias} mr-10`} color="#c3c7cc" />
                      {typeName}
                    </p>
                    <p className="dsl-b14">
                      <strong>{feedData.name}</strong>
                    </p>
                  </div>
                  <div className="due-date">
                    <p className="dsl-d13 mb-0 text-right">Due Date:</p>
                    <p className="dsl-b14 text-right">
                      <strong>{dueDate}</strong>
                    </p>
                  </div>
                </div>
              )}
              <p className="dsl-b14 description">{feedData.description}</p>
            </div>
          </Media.Left>
          <div className="body pl-20 pr-0 col-md-5 col-sm-6 col-xs-12">
            <div className="mheader">
              <div className="">
                <p className="dsl-d12">Modules</p>
                <p className="dsl-b16 text-center bold">{feedData.child_count | 0}</p>
              </div>
              <div className="pl-10">
                <p className="dsl-d12">Completed</p>
                <p className="dsl-b16 text-center bold">{feedData.completed}</p>
              </div>
              <div className="pl-10">
                <p className="dsl-d12">Remaining</p>
                <p className="dsl-b16 text-center bold">{feedData.remaining}</p>
              </div>
            </div>
            <div className="mcontent" onScroll={e => this.handleScroll(e)}>
              {modules.map((child, index) => {
                return (
                  <LearnChildField
                    key={child.id}
                    type={child.card_type_id}
                    name={child.data.name}
                    status={child.status}
                    onClick={() => onClickChild(index)}
                  />
                )
              })}
            </div>
            {equals(mode, 'grid') &&
              feedData.child_count > 4 && (
                <div className="main-blue justify-content-center align-items-center">
                  More{' '}
                  <Icon
                    name={`fal ml-10 ${equals(direction, 'top') ? 'fa-angle-up' : 'fa-angle-down'}`}
                    size={28}
                  />
                </div>
              )}
          </div>
        </Media>
      </div>
    )
  }
}

LearnFeed.propTypes = {
  mode: PropTypes.string,
  type: PropTypes.number,
  typeName: PropTypes.string,
  feedData: PropTypes.any,
  modules: PropTypes.any,
  dueDate: PropTypes.string,
  onClick: PropTypes.func,
  onClickChild: PropTypes.func,
}

LearnFeed.defaultProps = {
  mode: '',
  type: 1,
  typeName: 'New Hire Orientation',
  feedData: {},
  modules: {},
  dueDate: '3/26/2018',
  onClick: () => {},
  onClickChild: () => {},
}

export default LearnFeed
