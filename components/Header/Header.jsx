import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Button,
  FormControl,
  FormGroup,
  Image,
  InputGroup,
  Nav,
  Navbar,
  NavItem,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap'
import { equals, split } from 'ramda'
import FontIcon from '../Icon'
import {
  logo,
  user,
  manage,
  manageActive,
  develop,
  developActive,
  analytics,
  analyticsActive,
  community,
  communityActive,
  ratings,
  ratingsActive,
  events,
  eventsActive,
} from '../../layouts/Dashboard/images'
import './Header.scss'

const isAvatar = url => {
  if (url.indexOf('.png') > 0 || url.indexOf('.jpg') > 0) {
    return true
  }
  return false
}

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPopup: false,
    }
  }

  handlePopupState() {
    const { isPopup } = this.state
    this.setState({ isPopup: !isPopup })
  }

  render() {
    const { location, avatar, avatarName } = this.props
    const { isPopup } = this.state

    const popoverClickRootClose = (
      <Popover id="profile-popup" className="profile-popup">
        <Row className="item">
          <Col xs={1}>
            <FontIcon name="fas fa-cogs" size={15} />
          </Col>
          <Col xs={10} className="item-label">
            Profile
          </Col>
        </Row>
        <Row className="item">
          <Col xs={1} />
          <Col xs={10} componentClass="a" href="/community" className="item-label">
            Personal Profile (Visitor's View)
          </Col>
        </Row>
        <Row className="item">
          <Col xs={1} />
          <Col xs={10} componentClass="a" href="/community" className="item-label">
            Personal Profile (Self View)
          </Col>
        </Row>
        <Row className="item">
          <Col xs={1} />
          <Col xs={10} componentClass="a" href="/community" className="item-label">
            Company Profile
            <span className="badge premium">Premium</span>
          </Col>
        </Row>
        <Row className="item">
          <Col xs={1} />
          <Col xs={10} componentClass="a" href="/community" className="item-label">
            Company Profile
            <span className="badge standard">Standard</span>
          </Col>
        </Row>
        <Row className="item">
          <Col xs={1} />
          <Col xs={10} componentClass="a" href="/community" className="item-label">
            Company Profile
            <span className="badge basic">Basic</span>
          </Col>
        </Row>
        <Row className="item">
          <Col xs={1}>
            <FontIcon name="fas fa-user-circle" size={15} />
          </Col>
          <Col xs={10} componentClass="a" href="/community" className="item-label">
            My Account (Permissions)
          </Col>
        </Row>
        <Row className="item">
          <Col xs={1}>
            <FontIcon name="fas fa-user-cog" size={15} />
          </Col>
          <Col xs={10} componentClass="a" href="/community" className="item-label">
            SuperAdmin
          </Col>
        </Row>
        <Row className="item">
          <Col xs={1}>
            <FontIcon name="fas fa-sign-out-alt" size={15} />
          </Col>
          <Col xs={10} componentClass="a" href="/" className="item-label">
            Logout
          </Col>
        </Row>
      </Popover>
    )

    return (
      <Navbar className="ds-header" collapseOnSelect>
        <Navbar.Header className="align-items-center mx-0">
          <Navbar.Brand>
            <Image src={logo} className="p-0 ml-0" />
          </Navbar.Brand>
          <Navbar.Toggle className="ml-auto" />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              className={`item ${
                equals(split('/', location.pathname)[1], 'manage') ? 'active' : ''
              }`}
              eventKey={1}
              href="/manage/tasks"
            >
              <Image
                src={equals(split('/', location.pathname)[1], 'manage') ? manageActive : manage}
              />
              Manage
            </NavItem>
            <NavItem
              className={`item ${
                equals(split('/', location.pathname)[1], 'develop') ? 'active' : ''
              }`}
              eventKey={2}
              href="/develop/learn"
            >
              <Image
                src={equals(split('/', location.pathname)[1], 'develop') ? developActive : develop}
              />
              Develop
            </NavItem>
            <NavItem
              className={`item ${
                equals(split('/', location.pathname)[1], 'analytics') ? 'active' : ''
              }`}
              eventKey={3}
              href="/analytics"
            >
              <Image
                src={
                  equals(split('/', location.pathname)[1], 'analytics')
                    ? analyticsActive
                    : analytics
                }
              />
              Analytics
            </NavItem>
            <NavItem
              className={`item ${
                equals(split('/', location.pathname)[1], 'community') ? 'active' : ''
              }`}
              eventKey={4}
              href="/community"
            >
              <Image
                className="community"
                src={
                  equals(split('/', location.pathname)[1], 'community')
                    ? communityActive
                    : community
                }
              />
              Community
            </NavItem>
            <NavItem
              className={`item ${
                equals(split('/', location.pathname)[1], 'ratings') ? 'active' : ''
              }`}
              eventKey={5}
              href="/ratings"
            >
              <Image
                src={equals(split('/', location.pathname)[1], 'ratings') ? ratingsActive : ratings}
              />
              Vendor Ratings
            </NavItem>
            <NavItem
              className={`item ${
                equals(split('/', location.pathname)[1], 'events') ? 'active' : ''
              }`}
              eventKey={6}
              href="/events"
            >
              <Image
                className="events"
                src={equals(split('/', location.pathname)[1], 'events') ? eventsActive : events}
              />
              Events
            </NavItem>
          </Nav>
          <Nav className="controls hidden-sm" pullRight>
            <NavItem eventKey={1}>
              <Button className="bell border-0">
                <FontIcon name="fa fa-bell-o" />
              </Button>
            </NavItem>
            <NavItem eventKey={2}>
              <OverlayTrigger
                trigger="click"
                rootClose
                placement="bottom"
                overlay={popoverClickRootClose}
                onExit={() => this.handlePopupState()}
                onEnter={() => this.handlePopupState()}
              >
                {isPopup ? (
                  <div className="popup-profile">
                    <div className="img-circle uppercase name-avatar">{avatarName}</div>
                    <div>
                      Profile <FontIcon name="far fa-angle-up" size={10} color="white" />
                    </div>
                  </div>
                ) : (
                  <Image className="user img-circle" src={isAvatar(avatar) ? avatar : user} />
                )}
              </OverlayTrigger>
            </NavItem>
            <NavItem eventKey={3}>
              <div className="divider" />
            </NavItem>
            <NavItem eventKey={4} className="search-nav align-items-center">
              <FormGroup className="search-form mb-0">
                <InputGroup className="search-group">
                  <InputGroup.Addon className="search-icon border-0">
                    <FontIcon name="fa fa-search" />
                  </InputGroup.Addon>
                  <FormControl type="text" placeholder="Search..." className="border-0 pl-0" />
                </InputGroup>
              </FormGroup>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  location: PropTypes.any.isRequired,
}

Header.defaultProps = {}

const mapStateToProps = state => ({
  name: state.app.first_name + ' ' + state.app.last_name,
  avatarName: state.app.first_name.charAt(0) + state.app.last_name.charAt(0),
  avatar: state.app.avatar,
})

export default connect(
  mapStateToProps,
  null
)(Header)
