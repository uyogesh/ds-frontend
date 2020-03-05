import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Modal, FormGroup, FormControl, Button, Image } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { equals, length } from 'ramda'
import './taskDetail.scss'

class TaskDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      uploadedFile: '',
      preview: null,
    }
  }

  handleShow() {
    this.setState({ show: true })
  }

  handleClose() {
    this.setState({ show: false })
  }

  // Action
  handleDrop(file) {
    if (equals(length(file), 0)) {
      return
    }
    this.setState({ preview: file[0].name })
    this.setState({ uploadedFile: file[0] })
  }

  render() {
    const { preview } = this.state
    const { open, onHide, card } = this.props

    return (
      <div>
        <div className="static-modal">
          {open ? (
            <Modal className="modalSpan" show={open} onHide={onHide}>
              <Modal.Header className="bg-primary">
                <Modal.Title className="text-center">Task Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-body mb-2">
                  <p className="text-muted">Title:</p>
                  <h5>{card ? card.data.name : '-'}</h5>
                </div>
                <div className="modal-body row">
                  <div className="col-md-4">
                    <p className="text-muted">Created:</p>
                    <h5>
                      {card
                        ? `${new Date(card.data.due_date * 1000).toLocaleDateString('en-US')}`
                        : '-'}
                    </h5>
                  </div>
                  <div className="col-md-4">
                    <p className="text-muted">Due Date:</p>
                    <h5>{card ? this.fixDate(card.created_at) : '-'}</h5>
                  </div>
                  <div className="col-md-4">
                    <p className="text-muted">Completed:</p>
                    <h5>{card ? this.fixDate(card.completed_at) : '-'}</h5>
                  </div>
                </div>
                <div className="modal-body row">
                  <div className="col-md-4">
                    <p className="text-muted">Type:</p>
                    <h5>lorem ipsum</h5>
                  </div>
                  <div className="col-md-4">
                    <p className="text-muted">Created By:</p>
                    <h5>{card ? card.assigned_by : '-'}</h5>
                  </div>
                </div>
                <div className="modal-body">
                  <p className="text-muted">Description:</p>
                  <h5>{card ? card.data.description : '-'}</h5>
                </div>
              </Modal.Body>
              <hr className="hrStyle" />
              <Modal.Body>
                <div className="modal-body">
                  <p className="text-muted">Comments:</p>
                  {card ? (
                    card.comments.map(comment => (
                      <div className="rowDiv">
                        <div className="imageDiv">
                          <Image className="imagePlaceholder" src="" circle />
                        </div>
                        <div>
                          <h5>{comment.user_id}</h5>
                          <p className="text-muted">{comment.data.body}</p>
                          <div className="rowDiv">
                            <p className="text-muted mr-20">{comment.created_at}</p>
                            <p className="text-muted">Reply</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No comments to show</div>
                  )}
                  <FormGroup controlId="formInputDescription">
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="Type here"
                      onChange={this.handleChange}
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
                    <p className="dsl-d12 ml-10">
                      <span className="spanStyle">Attach</span>
                      {preview ? <span> {preview} </span> : <span> no file attached</span>}
                    </p>
                  </Dropzone>
                  <Button bsStyle="primary" className="buttonStyle">
                    Send
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}

TaskDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  card: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  card: state.manage.taskDetail,
})

export default connect(
  mapStateToProps,
  null
)(TaskDetail)
