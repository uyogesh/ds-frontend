import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty, equals } from 'ramda'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import ManageActions from '../../../actions/manage'
import ProjectDetail from './ProjectList/ProjectDetail'
import ProjectSection from './ProjectList/ProjectSection'
import LoadingAnimation from '../../../components/LoadingAnimation'
import './Projects.scss'

class Projects extends Component {
  componentDidMount() {
    if (isEmpty(this.props.projects)) {
      this.props.projectsfetchRequest(this.props.company_id)
    } else {
      this.props.projectsdetailfetchRequest()
    }
  }

  componentDidUpdate(prevProps) {
    if (equals(this.props.project_status, 'done') && isEmpty(this.props.tasks)) {
      this.props.projectsdetailfetchRequest()
    }
  }

  getTaskById(tasks, id) {
    return tasks.filter(task => equals(task.id, id))[0]
  }

  render() {
    const { authenticated, history, projects, tasks, status, id, loading } = this.props
    if (equals(status, 'done')) {
      const task = this.getTaskById(tasks, id)
      return (
        <div className="dev-learn">
          <Row className="mx-0">
            <Col xs={12} sm={3} md={3} lg={3} className="px-0">
              <ProjectSection projects={tasks} />
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className="px-0">
              <ProjectDetail task={task} />
            </Col>
          </Row>
          {loading ? (
            <div className="loadingSpinnerDiv">
              <LoadingAnimation loading />
            </div>
          ) : null}
        </div>
      )
    } else {
      return (
        <div className="loadingSpinnerDiv">
          <LoadingAnimation loading />
        </div>
      )
    }
  }
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  project_status: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  company_id: PropTypes.number.isRequired,
  projectsdetailfetchRequest: PropTypes.func.isRequired,
  projectsfetchRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  projects: state.manage.projectsList,
  tasks: state.manage.projectTasks,
  status: state.manage.projectstasksstatus,
  project_status: state.manage.projectsstatus,
  id: state.manage.currentproject,
  company_id: state.app.companies[0],
  loading: state.manage.loading,
})

const mapDispatchToProps = dispatch => ({
  projectsfetchRequest: companyId => dispatch(ManageActions.projectsfetchRequest(companyId)),
  projectsdetailfetchRequest: () => dispatch(ManageActions.projectsdetailfetchRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects)
