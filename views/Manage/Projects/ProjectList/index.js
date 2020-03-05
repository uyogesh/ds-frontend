import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectDetail from './ProjectDetail'
import ProjectSection from './ProjectSection'

class ProjectList extends Component {
  render() {
    return (
      <div>
        <Row className="mx-0">
          <Col xs={12} sm={7} md={7} lg={7}>
            <ProjectSection />
          </Col>
          <Col xs={12} sm={5} md={5} lg={5} className="pl-0">
            <ProjectDetail />
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProjectList
