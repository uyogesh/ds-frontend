import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import MngActions from '../../../actions/manage'
import TaskList from './TaskList'
import Profile from '../../../components/DailyWorkPlanProfile'
import Submenu from '../../../components/Submenu'
import TaskForm from '../../../components/TasksForm'
import Icon from '../../../components/Icon'
import LoadingAnimation from '../../../components/LoadingAnimation'
import '../../../components/MngNav/MngNav.scss'
import './Tasks.scss'
import TrainingForm from '../../../components/TrainingForm'

class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openSubmenu: false,
      openTaskForm: false,
      openTrainingForm: false,
      openForumTopic: false,
    }
  }

  componentDidMount() {
    this.props.tasksfetchRequest(this.props.userId, this.props.PerPage, this.props.page)
    this.props.habitsfetchRequest(this.props.userId, this.props.PerPage, this.props.page)
  }

  handleClick() {
    this.setState({ openSubmenu: !this.state.openSubmenu })
    this.setState({ openTaskForm: false })
  }

  menuItem(item) {
    this.setState({ openSubmenu: !this.state.openSubmenu })
    if (item === 'task') {
      this.setState({ openTaskForm: true })
    } else if (item === 'training') {
      this.setState({ openTrainingForm: true })
    } else if (item === 'forumtopic') {
      this.setState({ openForumtopic: true })
    }
  }

  handleClose() {
    this.setState({ openTaskForm: false })
    this.setState({ openTrainingForm: false })
  }

  render() {
    const { taskcards, habitscards, tasksstatus, habitstatus } = this.props

    return (
      <div>
        <div className="dev-learn">
          <Row className="mx-0">
            <Col xs={12} sm={5} md={4} lg={3} className="px-0 pl-20 mt-20">
              <Profile />
            </Col>
            <Col xs={12} sm={6} md={8} lg={9} className="px-0">
              {tasksstatus === 'done' && habitstatus === 'done' ? (
                <TaskList tasksCards={taskcards.data} habitsCards={habitscards.data} />
              ) : (
                <div className="loadingSpinnerDiv">
                  <LoadingAnimation loading />
                </div>
              )}
            </Col>
          </Row>
        </div>
        <div className="mng-nav tasknavbtn">
          {this.state.openSubmenu ? <Submenu menuItem={e => this.menuItem(e)} /> : <div />}
          {this.state.openTaskForm && <TaskForm handleClose={e => this.handleClose(e)} />}
          {this.state.openTrainingForm && <TrainingForm handleClose={e => this.handleClose(e)} />}
          <div className="navbtncenter">
            <button type="button" className="ButtonFab" onClick={() => this.handleClick()}>
              <div className="iconDiv">
                <Icon size={25} name="fal fa-plus" color="white" />
              </div>
              <div className="titleDiv">Add</div>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Tasks.propTypes = {
  tasksfeedsRequest: PropTypes.func.isRequired,
  cards: PropTypes.shape.isRequired,
  userId: PropTypes.string.isRequired,
  PerPage: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  tasksstatus: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  userId: state.app.id,
  type: state.manage.tasksType,
  taskcards: state.manage.tasksCards,
  habitscards: state.manage.habitsCards,
  PerPage: state.manage.tasksPerPage,
  page: state.manage.tasksPage,
  tasksstatus: state.manage.tasksstatus,
  habitstatus: state.manage.habitsstatus,
})

const mapDispatchToProps = dispatch => ({
  tasksfetchRequest: (userId, PerPage, page) =>
    dispatch(MngActions.tasksfetchRequest(userId, PerPage, page)),
  habitsfetchRequest: (userId, PerPage, page) =>
    dispatch(MngActions.habitsfetchRequest(userId, PerPage, page)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks)
