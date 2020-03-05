import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Glyphicon } from 'react-bootstrap'
import { equals, split } from 'ramda'
import './ListItem.scss'
import SIcon from '../SvgIcon'
import comment from '../SvgIcon/comment.svg'
import commentfilled from '../SvgIcon/commentfilled.svg'
import ApprovalTaskDetail from '../ProjectsApprovalTaskDetail'
import TaskDetail from '../ProjectsTaskDetail'
import ManageActions from '../../actions/manage'

const fixDate = date => {
  const d = split('-', split(' ', date)[0])
  return `${d[2]}/${d[1]}/${d[0]}`
}

class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.fetchTaskDetailClicked = this.fetchTaskDetailClicked.bind(this)
    this.closeTaskDetail = this.closeTaskDetail.bind(this)
  }

  fetchTaskDetailClicked(taskType, cardId) {
    if (equals(taskType, 1)) {
      this.props.fetchTaskDetail(cardId)
    } else {
      this.props.fetchApprovalTaskDetail(cardId)
    }
  }

  closeTaskDetail() {
    this.props.clearTaskDetail()
  }

  render() {
    const { listItems, openApprovalTaskDetail, openTaskDetail, taskType } = this.props

    return (
      <div>
        <ApprovalTaskDetail open={openApprovalTaskDetail} onHide={this.closeTaskDetail} />
        <TaskDetail open={openTaskDetail} onHide={this.closeTaskDetail} />
        {listItems.map(item => (
          <div className="learn-pagination border-5 align-items-center justify-content-between pr-5">
            <div className="align-items-center wth100">
              <Col xs={1}>
                <SIcon
                  size={25}
                  name={item.completed_at ? 'checked' : 'unchecked'}
                  color={item.completed_at ? '#c3c7cc' : '#376caf'}
                />
              </Col>
              <a
                role="button"
                className="dsply-content"
                onClick={() => this.fetchTaskDetailClicked(taskType, item.id)}
              >
                <div className="col-md-9 col-lg-9">
                  <div className="row">
                    <Col xs={8} className="pr-0">
                      <p>{item.data.name}</p>
                    </Col>
                    <Col xs={4} className="textcenter">
                      <p>Due Date</p>
                    </Col>
                  </div>
                  <div className="row">
                    <Col xs={8} className="pr-0">
                      <h6>{item.data.description}</h6>
                    </Col>
                    <Col xs={4} className="textcenter mt-10">
                      <span>{fixDate(item.due_at)}</span>
                    </Col>
                  </div>
                </div>
                <Col xs={1}>
                  {item.comment === 'no' ? (
                    <img src={comment} alt="Silver View Icon" height={15} width={15} />
                  ) : (
                    <img src={commentfilled} alt="Silver View Icon" height={15} width={15} />
                  )}
                </Col>
                <Col xs={1} className="textcenter">
                  <Glyphicon glyph="option-horizontal" className="grey" />
                </Col>
              </a>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

ListItem.propTypes = {
  listItems: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  openTaskDetail: state.manage.openProjectsTaskDetail,
  openApprovalTaskDetail: state.manage.openApprovalTaskDetail,
})

const mapDispatchToProps = dispatch => ({
  fetchTaskDetail: cardId => dispatch(ManageActions.taskdetailfetchRequest(cardId)),
  fetchApprovalTaskDetail: cardId => dispatch(ManageActions.approvaltaskdetailfetchRequest(cardId)),
  clearTaskDetail: () => dispatch(ManageActions.clearTaskDetail()),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem)
