import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, MenuItem, Button, Col } from 'react-bootstrap'
import { equals } from 'ramda'
import Icon from '../Icon'
import './taskArchive.scss'

const TaskArchive = props => (
  <Col xs={12} md={6} className="fl px-0 archive-task">
    <div className="task-archive border-5">
      <div className="align-items-center w-100">
        <Col xs={1}>
          <Icon
            size={20}
            name={`${
              equals(props.archiveItems.completed_at, 'completed')
                ? 'fas fa-check-circle'
                : 'fal fa-circle'
            }`}
            color={`${
              equals(props.archiveItems.completed_at, 'completed') ? '#969faa' : '#c3c7cc'
            }`}
          />
        </Col>
        <Col xs={6}>
          <p>{props.archiveItems.name}</p>
          {props.archiveItems.completed_at === 'completed' ? (
            <p className="completed textbold">{props.archiveItems.description}</p>
          ) : (
            <p className="textbold incomplete">{props.archiveItems.description}</p>
          )}
        </Col>
        <Col xs={3} className="textcenter plr5">
          <p>Due Date</p>
          {props.archiveItems.completed_at === 'completed' ? (
            <span className="completed">{`${new Date(
              props.archiveItems.due_date * 1000
            ).toLocaleDateString('en-US')}`}</span>
          ) : (
            <span>{`${new Date(props.archiveItems.due_date * 1000).toLocaleDateString(
              'en-US'
            )}`}</span>
          )}
        </Col>
        <Col xs={2} className="plr5">
          <Icon name={`${props.archiveItems.comments ? 'fal' : 'fas'} fa-comment`} size={20} />
        </Col>
      </div>
    </div>
  </Col>
)

export default TaskArchive
