import React from 'react'
import PropTypes from 'prop-types'
import { equals } from 'ramda'
import { Col } from 'react-bootstrap'
import './SectionItem.scss'
import SIcon from '../SvgIcon'

const SectionItem = props => (
  <div
    className={`learn-pagination border-5 align-items-center justify-content-between flx-col change-hover ${
      equals(props.project.id, props.selectedProject) ? 'card-selected' : ''
    }`}
    onClick={() => {
      props.onChangeCallBack(props.project.id)
    }}
    role="button"
  >
    <div className="flx flx-row wth100 jst-space-between">
      <div className="status-heading pl-20">
        <h5 className="bold">{props.project.name}</h5>
      </div>
      <div className="col-md-1 col-xs-1 col-lg-1 center flx">
        <Col xs={1}>
          <SIcon size={15} name="right" color="grey" />
        </Col>
      </div>
    </div>
    <div className="flx-row wth100 pl-15 pr-5">
      <div className="align-items-center wth100 flx flx-col pl-20 mb-10">
        <div className="heading wth100">
          <Col xs={2} className="textcenter px-0">
            <p>open</p>
          </Col>
          <Col xs={3} className="textcenter px-0">
            <p>Past Due</p>
          </Col>
          <Col xs={3} className="textcenter px-0">
            <p>Completed</p>
          </Col>
          <Col xs={4} className="textcenter px-0">
            <p>MTD-OnTime</p>
          </Col>
        </div>
        <div className="section-body wth100">
          <Col xs={2} className="textcenter">
            <span className="color-sec">{props.project.project_stats.open}</span>
          </Col>
          <Col xs={3} className="textcenter">
            <span className="color-sec">{props.project.project_stats.past_due}</span>
          </Col>
          <Col xs={3} className="textcenter">
            <span className="color-sec">{props.project.project_stats.complete}</span>
          </Col>
          <Col xs={4} className="textcenter">
            <span className="color-sec">{props.project.project_stats.mtd_completion}</span>
          </Col>
        </div>
      </div>
    </div>
  </div>
)

SectionItem.PropTypes = {
  onChangeCallBack: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
}

export default SectionItem
