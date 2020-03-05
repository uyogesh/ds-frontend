import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Dropdown, MenuItem } from 'react-bootstrap'
import Icon from '../Icon'
import './ListItem.scss'

const cardStyle = {
  height: '80px',
}

class ListItem extends Component {
  handleCompleted(id) {
    this.props.handleCompleted(id)
  }

  handleAction(eventKey) {
    this.props.handleAction(this.props.id, eventKey)
  }

  handleOpenApprovalTaskDetail(id) {
    this.props.handleOpenApprovalTaskDetail(id)
  }

  handleOpenTaskDetail(id) {
    this.props.handleOpenTaskDetail(id)
  }

  render() {
    return (
      <div>
        {this.props.listItems.completed_at ? (
          <div className="learn-pagination border-5 align-items-center justify-content-between">
            <div className="align-items-center wth100" style={cardStyle}>
              <Col xs={1} onClick={() => this.handleCompleted(this.props.id)}>
                <Icon size={21} name="fas fa-check-circle" color="#969faa" />
              </Col>
              <Col xs={6} onClick={() => this.handleOpenTaskDetail(this.props.id)}>
                <p className="dsl-d12">{this.props.listItems.data.name}</p>
                {this.props.listItems.data.description && (
                  <p className="dsl-d12 bold">{`${this.props.listItems.data.description.substr(
                    0,
                    300
                  )}...`}</p>
                )}
              </Col>
              <Col xs={3} className="textcenter">
                <p className="dsl-d12">Due Date</p>
                <p className="dsl-d12 bold">{`${new Date(
                  this.props.listItems.data.due_date * 1000
                ).toLocaleDateString('en-US')}`}</p>
              </Col>
              <Col xs={1}>
                <Icon
                  name={`fa-comment ${this.props.listItems.data.comments ? 'far' : 'fas'}`}
                  size={20}
                />
              </Col>
              <Col xs={2}>
                <Dropdown
                  className="border-0"
                  noCaret
                  pullRight
                  onSelect={eventKey => this.handleAction(eventKey)}
                >
                  <Dropdown.Toggle className="border-0" noCaret pullRight>
                    <Icon name="fas fa-ellipsis-h" color="#969faa" size={15} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <MenuItem eventKey="archive" active>
                      Archive
                    </MenuItem>
                    <MenuItem eventKey="edit">Edit</MenuItem>
                    <MenuItem eventKey="delete">Delete</MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </div>
          </div>
        ) : (
          <div className="learn-pagination border-5 align-items-center justify-content-between">
            <div className="align-items-center wth100" style={cardStyle}>
              <Col xs={1} onClick={() => this.handleCompleted(this.props.id)}>
                <Icon size={21} name="fal fa-circle" />
              </Col>
              <Col xs={6} onClick={() => this.handleOpenApprovalTaskDetail(this.props.id)}>
                <p className="dsl-d12">{this.props.listItems.data.name}</p>
                {this.props.listItems.data.description && (
                  <p className="dsl-b12 bold">{`${this.props.listItems.data.description.substr(
                    0,
                    300
                  )}...`}</p>
                )}
              </Col>
              <Col xs={3} className="textcenter">
                <p className="dsl-d12">Due Date</p>
                <span className="dsl-b12 bold">{`${new Date(
                  this.props.listItems.data.due_date * 1000
                ).toLocaleDateString('en-US')}`}</span>
              </Col>
              <Col xs={1}>
                <Icon
                  name={`fa-comment ${this.props.listItems.data.comments ? 'far' : 'fas'}`}
                  size={20}
                />
              </Col>
              <Col xs={2}>
                <Dropdown
                  className="border-0 bg-white"
                  noCaret
                  pullRight
                  onSelect={eventKey => this.handleAction(eventKey)}
                >
                  <Dropdown.Toggle className="border-0 bg-white" noCaret pullRight>
                    <Icon name="fas fa-ellipsis-h" color="#969faa" size={15} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <MenuItem eventKey="archive" active>
                      Archive
                    </MenuItem>
                    <MenuItem eventKey="edit">Edit</MenuItem>
                    <MenuItem eventKey="delete">Delete</MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </div>
          </div>
        )}
      </div>
    )
  }
}

ListItem.propTypes = {
  listItems: PropTypes.shape.isRequired,
}

export default ListItem
