import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Navbar, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap'
import { equals, split, toString } from 'ramda'
import Icon from '../Icon'
import './DevNav.scss'

const DevNav = props => (
  <Navbar className="dev-nav" collapseOnSelect>
    <Navbar.Collapse>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'learn') ? ' active' : ''
        }`}
        href="/develop/learn"
      >
        <div>
          <Icon
            name="fal fa-book-open"
            color={`${
              equals(split('/', props.location.pathname)[2], 'learn') ? '#376caf' : '#969FAA'
            }`}
            size={15}
          />
          &nbsp;&nbsp;Learn
        </div>
        <div className="badge-contents">{props.learnTotal}</div>
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'library') ? ' active' : ''
        }`}
        href="/develop/library"
      >
        <div>
          <Icon
            name="fal fa-book"
            color={`${
              equals(split('/', props.location.pathname)[2], 'library') ? '#376caf' : '#969FAA'
            }`}
            size={15}
          />
          &nbsp;&nbsp;Library
        </div>
        <div className="badge-contents">{props.totalCourses}</div>
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'career') ? ' active' : ''
        }`}
        href="/develop/career"
      >
        <div>
          <Icon
            name="fal fa-briefcase"
            color={`${
              equals(split('/', props.location.pathname)[2], 'career') ? '#376caf' : '#969FAA'
            }`}
            size={15}
          />
          &nbsp;&nbsp;Career
        </div>
        {props.badge && <div className="badge-contents" />}
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'archive') ? ' active' : ''
        }`}
        href="/develop/archive"
      >
        <div>
          <Icon
            name="fal fa-archive"
            color={`${
              equals(split('/', props.location.pathname)[2], 'archive') ? '#376caf' : '#969FAA'
            }`}
            size={15}
          />
          &nbsp;&nbsp;Archive
        </div>
        {props.badge && <div className="badge-contents" />}
      </NavItem>
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'reports') ? ' highlight' : ''
        }`}
        href="/develop/reports"
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
        {props.badge && <div className="badge-contents" />}
      </NavItem>
      {equals(split('/', props.location.pathname)[2], 'reports') && (
        <div>
          <ListGroup>
            <ListGroupItem
              className={`dsl-d12 ${equals(props.location.hash, '#enterprise') ? 'active' : ''}`}
              href="#enterprise"
            >
              Enterprise Development
            </ListGroupItem>
            <ListGroupItem
              className={`dsl-d12 ${equals(props.location.hash, '#group') ? 'active' : ''}`}
              href="#group"
            >
              Group Development
            </ListGroupItem>
            <ListGroupItem
              className={`dsl-d12 ${equals(props.location.hash, '#company') ? 'active' : ''}`}
              href="#company"
            >
              Company Development
            </ListGroupItem>
            <ListGroupItem
              className={`dsl-d12 ${equals(props.location.hash, '#department') ? 'active' : ''}`}
              href="#department"
            >
              Department Development
            </ListGroupItem>
            <ListGroupItem
              className={`dsl-d12 ${equals(props.location.hash, '#team') ? 'active' : ''}`}
              href="#team"
            >
              Team Development
            </ListGroupItem>
            <ListGroupItem
              className={`dsl-d12 ${equals(props.location.hash, '#individual') ? 'active' : ''}`}
              href="#individual"
            >
              Individual Development
            </ListGroupItem>
          </ListGroup>
        </div>
      )}
      <NavItem
        className={`pages ${
          equals(split('/', props.location.pathname)[2], 'search') ? ' active' : ''
        }`}
        href="/develop/search"
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
        {props.badge && <div className="badge-contents" />}
      </NavItem>
      <div className="sidebar-overlay" />
    </Navbar.Collapse>
    <Navbar.Toggle className="sidebar-toggle">
      <Icon name="fal fa-arrows-h" size={20} color="#343f4b" />
    </Navbar.Toggle>
  </Navbar>
)

DevNav.propTypes = {
  location: PropTypes.any.isRequired,
  learnTotal: PropTypes.string.isRequired,
  libraryTotal: PropTypes.string.isRequired,
  totalCourses: PropTypes.number,
}

const mapStateToProps = state => ({
  totalCourses: state.develop.libraryTotalCourses,
  learnTotal:
    state.develop.learnTotal > 1000
      ? Math.floor(state.develop.learnTotal / 1000) + 'k'
      : toString(state.develop.learnTotal),
  libraryTotal:
    state.develop.libraryTotal > 1000
      ? Math.floor(state.develop.libraryTotal / 1000) + 'k'
      : toString(state.develop.libraryTotal),
})

export default connect(
  mapStateToProps,
  null
)(DevNav)
