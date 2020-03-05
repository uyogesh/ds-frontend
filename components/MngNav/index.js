import React from 'react'
import PropTypes from 'prop-types'
import { Button, Navbar, NavItem } from 'react-bootstrap'
import { equals, split } from 'ramda'
import Icon from '../Icon'
import './MngNav.scss'

const MngNav = props => (
  <Navbar className="mng-nav" collapseOnSelect>
    <Navbar.Collapse>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'dailyworkplan') ? ' active' : ''
        }`}
        href="/manage/dailyworkplan"
      >
        <div>
          <Icon
            name="fal fa-briefcase"
            color={`${
              equals(split('/', props.location.pathname)[2], 'dailyworkplan')
                ? '#376caf'
                : '#969FAA'
            }`}
            size={15}
          />
          &nbsp;&nbsp;Daily Work Plan
        </div>
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'goals') ? ' active' : ''
        }`}
      >
        <div>
          <Icon
            name="fal fa-briefcase"
            color={`${
              equals(split('/', props.location.pathname)[2], 'goals') ? '#376caf' : '#969FAA'
            }`}
            href="/manage/goals"
            size={15}
          />
          &nbsp;&nbsp;Goals
        </div>
        <div className="badge-contents">9</div>
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'projects') ? ' active' : ''
        }`}
        href="/manage/projects"
      >
        <div>
          <Icon
            name="fal fa-briefcase"
            color={`${
              equals(split('/', props.location.pathname)[2], 'projects') ? '#376caf' : '#969FAA'
            }`}
            size={15}
          />
          &nbsp;&nbsp;Projects
        </div>
        <div className="badge-contents">13</div>
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'tasks') ? ' active' : ''
        }`}
        href="/manage/tasks"
      >
        <div>
          <Icon
            name="fas fa-check-circle"
            color={`${
              equals(split('/', props.location.pathname)[2], 'tasks') ? '#376caf' : '#969FAA'
            }`}
            size={15}
          />
          &nbsp;&nbsp;Tasks
        </div>
        <div className="badge-contents" />
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'meetings') ? ' active' : ''
        }`}
      >
        <div>
          <Icon
            name="fal fa-archive"
            color={`${
              equals(split('/', props.location.pathname)[2], 'meetings') ? '#376caf' : '#969FAA'
            }`}
            href="/manage/meetings"
            size={15}
          />
          &nbsp;&nbsp;Meetings
        </div>
        <div className="badge-contents" />
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'performance') ? ' active' : ''
        }`}
        href="/manage/performance"
      >
        <div>
          <Icon
            name="fal fa-chart-bar"
            color={`${
              equals(split('/', props.location.pathname)[2], 'performance') ? '#376caf' : '#969FAA'
            }`}
            size={15}
          />
          &nbsp;&nbsp;Performance Reviews
        </div>
        <div className="badge-contents" />
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'archive') ? ' active' : ''
        }`}
        href="/manage/archive"
      >
        <div>
          <Icon
            name="fal fa-archive"
            color={`${
              equals(split('/', props.location.pathname)[2], 'archive') ? '#376caf' : '#969FAA'
            }`}
            href="/manage/archive"
            size={15}
          />
          &nbsp;&nbsp;Archive
        </div>
        <div className="badge-contents" />
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'reports') ? ' active' : ''
        }`}
        href="/manage/reports"
      >
        <div>
          <Icon
            name="fal fa-chart-bar"
            color={`${
              equals(split('/', props.location.pathname)[2], 'reports') ? '#376caf' : '#969FAA'
            }`}
            size={15}
          />
          &nbsp;&nbsp;Reports
        </div>
        <div className="badge-contents" />
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'search') ? ' active' : ''
        }`}
        href="/manage/search"
      >
        <div>
          <Icon
            name="fal fa-search"
            color={`${
              equals(split('/', props.location.pathname)[2], 'search') ? '#376caf' : '#969FAA'
            }`}
            size={15}
          />
          &nbsp;&nbsp;Search
        </div>
        <div className="badge-contents" />
      </NavItem>
      <div className="sidebar-overlay" />
    </Navbar.Collapse>
    <Navbar.Toggle className="sidebar-toggle">
      <Icon name="fal fa-arrows-h" size={20} color="#343f4b" />
    </Navbar.Toggle>
  </Navbar>
)

MngNav.propTypes = {
  location: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
}

export default MngNav
