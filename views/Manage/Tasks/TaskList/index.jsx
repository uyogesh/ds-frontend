import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import MngActions from '../../../../actions/manage'
import SectionHeader from '../../../../components/SectionHeader'
import SectionStatus from '../../../../components/SectionStatus'
import HabitSectionStatus from '../../../../components/HabitSectionStatus'
import ListItem from '../../../../components/ListItem'
import ApprovalTaskDetail from '../../../../components/ApprovalTaskDetail'
import TaskDetail from '../../../../components/TaskDetail'
import ConfirmationModal from '../../../../components/ConfirmationModal'

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskStatus: {
        open: 2,
        pastdeu: 0,
        completed: 1,
        mtd: '87%',
      },
      habitStatus: {
        open: 4,
        pastdeu: 1,
        completed: 2,
        mtd: '57%',
      },
      openApprovalTaskDetail: false,
      openTaskDetail: false,
      openArchiveModal: false,
      openDeleteModal: false,
      openMarkCompleteModal: false,
      taskId: '',
    }
  }

  handleOpenApprovalTaskDetail(id) {
    this.setState({ openApprovalTaskDetail: true })
    this.setState({ taskId: id })
  }

  handleOpenTaskDetail(id) {
    this.setState({ openTaskDetail: true })
    this.setState({ taskId: id })
  }

  handleClose() {
    this.setState({ openApprovalTaskDetail: false })
    this.setState({ openTaskDetail: false })
    this.setState({ openArchiveModal: false })
    this.setState({ openDeleteModal: false })
    this.setState({ openMarkCompleteModal: false })
  }

  handleCompleted(id) {
    this.setState({ taskId: id })
    this.setState({ openMarkCompleteModal: true })
  }

  handleMarkasCompleted() {
    this.props.markascompletedRequest('completed', this.state.taskId)
  }

  handleArchive() {
    this.props.markasarchievedRequest('archived', this.state.taskId)
  }

  handleDelete() {
    this.props.deletecardRequest(this.state.taskId)
  }

  handleAction(id, item) {
    this.setState({ taskId: id })
    if (item === 'archive') {
      this.setState({ openArchiveModal: true })
    } else if (item === 'edit') {
      alert('Sorry not yet implemented')
      // this.props.editcardRequest(payload, id)
    } else {
      this.setState({ openDeleteModal: true })
    }
  }

  render() {
    return (
      <div>
        <Row className="mx-0">
          {this.state.openApprovalTaskDetail && (
            <ApprovalTaskDetail
              id={this.state.taskId}
              status={this.state.openApprovalTaskDetail}
              handleClose={e => this.handleClose(e)}
            />
          )}
          {this.state.openTaskDetail && (
            <TaskDetail
              id={this.state.taskId}
              status={this.state.openTaskDetail}
              handleClose={e => this.handleClose(e)}
            />
          )}
          {this.state.openArchiveModal && (
            <ConfirmationModal
              title="Archive"
              body="archive this item"
              action="Archive"
              status={this.state.openArchiveModal}
              handleClose={e => this.handleClose(e)}
              handleArchive={e => this.handleArchive(e)}
            />
          )}
          {this.state.openDeleteModal && (
            <ConfirmationModal
              title="Delete"
              body="delete this item"
              action="Delete"
              status={this.state.openDeleteModal}
              handleClose={e => this.handleClose(e)}
              handleDelete={e => this.handleDelete(e)}
            />
          )}
          {this.state.openMarkCompleteModal && (
            <ConfirmationModal
              title="Mark Complete"
              body=" mark this item as completed"
              action="Mark Complete"
              status={this.state.openMarkCompleteModal}
              handleClose={e => this.handleClose(e)}
              handleMarkasCompleted={e => this.handleMarkasCompleted(e)}
            />
          )}
          <Col xs={12} sm={7} md={7} lg={7}>
            <SectionHeader header="Tasks" />
            <SectionStatus status={this.state.taskStatus} />
            {this.props.tasksCards.map(project => (
              <ListItem
                listItems={project}
                id={project.id}
                handleCompleted={e => this.handleCompleted(e)}
                handleAction={(e, eventKey) => this.handleAction(e, eventKey)}
                handleOpenApprovalTaskDetail={e => this.handleOpenApprovalTaskDetail(e)}
                handleOpenTaskDetail={e => this.handleOpenTaskDetail(e)}
              />
            ))}
          </Col>
          <Col xs={12} sm={5} md={5} lg={5} className="pl-0">
            <SectionHeader header="Daily Habits" />
            <HabitSectionStatus status={this.state.habitStatus} />
            {this.props.habitsCards.map(
              project =>
                project.data.schedule_interval === 'day' && (
                  <ListItem
                    listItems={project}
                    id={project.id}
                    handleCompleted={e => this.handleCompleted(e)}
                    handleAction={(e, eventKey) => this.handleAction(e, eventKey)}
                    handleOpenApprovalTaskDetail={e => this.handleOpenApprovalTaskDetail(e)}
                    handleOpenTaskDetail={e => this.handleOpenTaskDetail(e)}
                  />
                )
            )}
            <SectionHeader header="Weekly Habits" />
            <HabitSectionStatus status={this.state.habitStatus} />
            {this.props.habitsCards.map(
              project =>
                project.data.schedule_interval === 'week' && (
                  <ListItem
                    listItems={project}
                    id={project.id}
                    handleCompleted={e => this.handleCompleted(e)}
                    handleAction={(e, eventKey) => this.handleAction(e, eventKey)}
                    handleOpenApprovalTaskDetail={e => this.handleOpenApprovalTaskDetail(e)}
                    handleOpenTaskDetail={e => this.handleOpenTaskDetail(e)}
                  />
                )
            )}
            <SectionHeader header="Monthly Habits" />
            <HabitSectionStatus status={this.state.habitStatus} />
            {this.props.habitsCards.map(
              project =>
                project.data.schedule_interval === 'month' && (
                  <ListItem
                    listItems={project.data}
                    id={project.id}
                    handleCompleted={e => this.handleCompleted(e)}
                    handleAction={(e, eventKey) => this.handleAction(e, eventKey)}
                    handleOpenApprovalTaskDetail={e => this.handleOpenApprovalTaskDetail(e)}
                    handleOpenTaskDetail={e => this.handleOpenTaskDetail(e)}
                  />
                )
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

TaskList.propTypes = {
  cardsList: PropTypes.shape.isRequired,
}

const mapDispatchToProps = dispatch => ({
  markascompletedRequest: (payload, cardInstanceId) =>
    dispatch(MngActions.markascompletedRequest(payload, cardInstanceId)),
  markasarchievedRequest: (payload, cardInstanceId) =>
    dispatch(MngActions.markasarchievedRequest(payload, cardInstanceId)),
  deletecardRequest: cardInstanceId => dispatch(MngActions.deletecardRequest(cardInstanceId)),
})

export default connect(
  null,
  mapDispatchToProps
)(TaskList)
