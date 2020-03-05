import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TrainingList.scss'
import { DropdownButton, MenuItem, Button, Col } from 'react-bootstrap'
import { equals } from 'ramda'
import Icon from '../Icon'

const TrainingList = props => (
  <div>
    <div className="learn-pagination border-5 align-items-center justify-content-between">
      <div className="align-items-center wth100">
        <Col xs={1}>
          <Icon
            size={20}
            name={`${
              equals(props.listItems.completed_at, 'completed')
                ? 'fas fa-check-circle'
                : 'fal fa-circle'
            }`}
            color={`${equals(props.listItems.completed_at, 'completed') ? '#376caf' : '#c3c7cc'}`}
          />
        </Col>
        <Col xs={4}>
          <img className="trainingimage" src="/images/company.png" />
        </Col>
        <Col xs={3} className="plr5">
          {props.listItems.completed_at === 'completed' ? (
            <p className="completed textbold">{props.listItems.description}</p>
          ) : (
            <p className="textbold incomplete">{props.listItems.description}</p>
          )}
          <p>Due {props.listItems.due}</p>
        </Col>
        <Col xs={2} className="textcenter plr5">
          <p>Modules</p>
          {props.listItems.completed_at === 'completed' ? (
            <p className="completed textbold">{props.listItems.modules}</p>
          ) : (
            <p className="textbold incomplete">{props.listItems.modules}</p>
          )}
        </Col>
        <Col xs={2} className="textcenter plr5">
          <p>Completed</p>
          {props.listItems.completed_at === 'completed' ? (
            <p className="completed textbold">{props.listItems.completed}</p>
          ) : (
            <p className="textbold incomplete">{props.listItems.completed}</p>
          )}
        </Col>
        <Col xs={2} className="textcenter plr5">
          <p>PastDue</p>
          {props.listItems.completed_at === 'completed' ? (
            <p className="completed textbold">{props.listItems.pastdue}</p>
          ) : (
            <p className="textbold incomplete">{props.listItems.pastdue}</p>
          )}
        </Col>
      </div>
    </div>
  </div>
)

export default TrainingList
