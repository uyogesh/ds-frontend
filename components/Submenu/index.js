import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icon'
import './Submenu.scss'

class Submenu extends Component {
  static propTypes = {
    menuItem: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      openInputForm: false,
    }
  }

  handleClick(name) {
    this.props.menuItem(name)
  }

  render() {
    return (
      <ul className="list-group m-0">
        <li />
        <li className="list-group-item bg-none text-white" onClick={() => this.handleClick('task')}>
          <div>
            <Icon name="fas fa-check-circle" color="white" />
            &nbsp;&nbsp; Task
          </div>
        </li>
        <li
          className="list-group-item bg-none text-white"
          onClick={() => this.handleClick('training')}
        >
          <div>
            <Icon name="fas fa-graduation-cap" color="white" />
            &nbsp;&nbsp; Training
          </div>
        </li>
        <li className="list-group-item text-white" onClick={() => this.handleClick('forumtopic')}>
          <div>
            <Icon name="fal fa-briefcase" color="white" />
            &nbsp;&nbsp; Forum Topic
          </div>
        </li>
        <li className="list-group-item  text-white" onClick={() => this.handleClick('blogpost')}>
          <div>
            <Icon name="fal fa-briefcase" color="white" /> &nbsp;&nbsp; Blog Post{' '}
          </div>
        </li>
        <li className="list-group-item text-white" onClick={() => this.handleClick('vendorrating')}>
          <div>
            <Icon name="fas fa-star" color="white" /> &nbsp;&nbsp; Vendor Rating{' '}
          </div>
        </li>
        <hr />
        <li className="list-group-item text-white" onClick={() => this.handleClick('recruit')}>
          <div>
            <Icon name="fal fa-briefcase" color="white" />
            &nbsp;&nbsp; Recruit
          </div>
        </li>
        <li className="list-group-item text-white" onClick={() => this.handleClick('user')}>
          <div>
            <Icon name="fal fa-briefcase" color="white" />
            &nbsp;&nbsp; User
          </div>
        </li>
        <li className="list-group-item text-white" onClick={() => this.handleClick('alert')}>
          <div>
            <Icon name="fal fa-briefcase" color="white" />
            &nbsp;&nbsp; Alert
          </div>
        </li>
        <li />
      </ul>
    )
  }
}

export default Submenu
