import React from 'react'
import './SectionItem.scss'
import { Col } from 'react-bootstrap'
import Icon from '../Icon'

const SectionItem = props => (
  <div className="learn-pagination border-5 align-items-center justify-content-between">
    <div className="align-items-center wth100">
      <Col xs={7}>
        <h6>{props.project.name}</h6>
      </Col>
      <Col xs={3} className="textcenter">
        <p>Quantity</p>
        <span>{props.project.quantity}</span>
      </Col>
      <Col xs={3} className="textcenter">
        <p>Completed</p>
        <span>{props.project.completed}</span>
      </Col>
      <Col xs={1}>
        <Icon size={9} name="fal fa-chevron-right" color="grey" />
      </Col>
      <Col xs={2}>
        <Icon name="fas fa-ellipsis-h" color="#969faa" size={17} />
      </Col>
    </div>
  </div>
)

export default SectionItem
