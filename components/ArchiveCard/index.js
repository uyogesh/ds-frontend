import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-bootstrap'
import Icon from '../Icon'
import './ArchiveCard.scss'

const ArchiveCard = ({ data }) => (
  <div className="archive-card">
    <div className="header">
      <Icon name="fas fa-check-circle" size={30} />
    </div>
    <Image className="tiny" src={data.data.thumb_url} rounded />
    <div className="status-content">
      <span className="content-header">
        <Icon name="fas fa-graduation-cap" color="#47525E" />
        &nbsp;&nbsp;&nbsp;
        <span className="dsl-d14">{data.data.type}</span>
      </span>
      <span className="dsl-d14 archived">
        <strong>{data.data.name}</strong>
      </span>
      <span>{data.data.description}</span>
      <div>
        <span className="dsl-d14 pr-20">{data.due_at}</span>
        <span className="dsl-d14">{data.completed_at}</span>
      </div>
    </div>
  </div>
)

ArchiveCard.propTypes = {
  data: PropTypes.any,
}

export default ArchiveCard
