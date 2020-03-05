import React, { Component } from 'react'
import { Image, Button, Modal, FormGroup, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { equals, length } from 'ramda'
import MngActions from '../../actions/manage'
import './ApprovalTaskDetail.scss'

class ApprovalTaskDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      uploadedFile: '',
      preview: null,
      formValues: {},
    }
  }

  componentDidMount() {
    this.props.taskdetailfetchRequest(this.props.id)
  }

  handleClose() {
    this.props.handleClose()
  }

  handleChange(e) {
    e.preventDefault()
    let formValues = this.state.formValues
    let name = e.target.name
    let value = e.target.value

    formValues[name] = value

    this.setState({ formValues })
  }

  // Action
  handleDrop(file) {
    if (equals(length(file), 0)) {
      return
    }
    this.setState({ preview: file[0].name })
    this.setState({ uploadedFile: file[0] })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addcommentRequest(this.state.formValues.comment, this.props.id)
    this.props.uploadfileRequest(this.state.uploadedFile)
  }

  render() {
    const { preview } = this.state
    const { taskdetailstatus, taskdetail } = this.props
    return (
      <div>
        <div className="static-modal">
          <Modal
            className="approvalStyle"
            show={this.props.status}
            onHide={() => this.handleClose()}
          >
            <Modal.Header className="bg-primary">
              <Modal.Title className="text-center">Approval Task Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-body-approval mb-2">
                <p className="dsl-d12">Title:</p>
                {taskdetailstatus === 'done' && (
                  <p className="dsl-b14 bold">{taskdetail.data.name}</p>
                )}
              </div>
              <div className="modal-body-approval row">
                <div className="col-md-6">
                  <p className="dsl-d12">Due Date:</p>
                  {taskdetailstatus === 'done' && (
                    <p className="dsl-b12 bold">{`${new Date(
                      taskdetail.data.due_date * 1000
                    ).toLocaleDateString('en-US')}`}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <p className="dsl-d12">Created:</p>
                  {taskdetailstatus === 'done' && (
                    <p className="dsl-b12 bold">{taskdetail.created_at.split(' ', 1)}</p>
                  )}
                </div>
              </div>
              <div className="modal-body-approval row">
                <div className="col-md-6">
                  <p className="dsl-d12">Type:</p>
                  {taskdetailstatus === 'done' && (
                    <p className="dsl-b12 bold">{taskdetail.data.type}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <p className="dsl-d12">Created By:</p>
                  {taskdetailstatus === 'done' && taskdetail.data.created_by ? (
                    <p className="dsl-b12 bold">{taskdetail.data.created_by}</p>
                  ) : (
                    <p className="dsl-b12 bold">N/A</p>
                  )}
                </div>
              </div>
              <div className="modal-body-approval">
                <p className="dsl-d12">Description:</p>
                {taskdetailstatus === 'done' && (
                  <p className="dsl-b12">{taskdetail.data.description}</p>
                )}
              </div>
            </Modal.Body>
            <hr className="hrStyle" />
            <form className="bg-white" onSubmit={e => this.handleSubmit(e)}>
              <Modal.Body>
                <div className="rowDiv">
                  <p className="dsl-d12 mr-5">3/26/2018:</p>
                  {taskdetailstatus === 'done' && <p className="dsl-d12">Request Approval</p>}
                </div>
                <div className="modal-body-approval">
                  {taskdetailstatus === 'done' && taskdetail.comments.length ? (
                    <div className="commentDiv">
                      {taskdetail.comments.map(comment => (
                        <div className="rowDiv">
                          <div className="imageDiv">
                            <Image className="imagePlaceholder" src="" circle />
                          </div>
                          <div className="m-10">
                            <p className="dsl-b12 bold">Shreedhar Acharya</p>
                            <p className="dsl-b12">{comment.data.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div />
                  )}
                  <div className="rowDivButton">
                    <Button bsStyle="primary" className="buttonStyleApproveDecline">
                      Approve
                    </Button>
                    <Button bsStyle="primary" className="buttonStyleApproveDecline">
                      Decline
                    </Button>
                  </div>
                  <p className="dsl-d12 mt-20">Send Comment</p>
                  <FormGroup controlId="formInputDescription">
                    <FormControl
                      type="text"
                      name="comment"
                      value={this.state.formValues['comment']}
                      placeholder="Type here"
                      onChange={e => this.handleChange(e)}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="footerClass">
                  <Dropzone
                    className="drag-drop"
                    activeClassName="drag-drop active"
                    acceptClassName="drag-drop active"
                    rejectClassName="drag-drop deactivate"
                    onDrop={e => this.handleDrop(e)}
                    accept="image/jpeg, image/png, application/zip, video/mp4, video/x-msvideo, application/pdf"
                    multiple={false}
                  >
                    <p className="dsl-d12 ml-10" style={{ display: 'flex' }}>
                      <p className="dsl-b12 bold">Attach </p>
                      {preview && (
                        <p className="dsl-d12" style={{ paddingLeft: '2px' }}>
                          {preview} <i class="fal fa-file-alt" />
                        </p>
                      )}
                    </p>
                  </Dropzone>
                  <Button bsStyle="primary" className="buttonStyleApproval" type="submit">
                    Send
                  </Button>
                </div>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  taskdetailstatus: state.manage.tasksdetailstatus,
  taskdetail: state.manage.taskdetail,
})

const mapDispatchToProps = dispatch => ({
  taskdetailfetchRequest: cardInstanceId =>
    dispatch(MngActions.taskdetailfetchRequest(cardInstanceId)),
  addcommentRequest: (payload, cardInstanceId) =>
    dispatch(MngActions.addcommentRequest(payload, cardInstanceId)),
  uploadfileRequest: payload => dispatch(MngActions.uploadfileRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApprovalTaskDetail)
