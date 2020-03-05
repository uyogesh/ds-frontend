import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Image, Button, Modal, FormGroup, FormControl } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { equals, length, split } from 'ramda'
import './ApprovalTaskDetail.scss'

class ApprovalTaskDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      uploadedFile: '',
      preview: null,
    }
  }

  fixDate(date) {
    const d = split('-', split(' ', date)[0])
    return `${d[2]}/${d[1]}/${d[0]}`
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleShow() {
    this.setState({ show: true })
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
      <Modal className="modalSpan" show={open} onHide={onHide}>
        <Modal.Header className="bg-primary">
          <Modal.Title className="text-center">Approval Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-approval mb-2">
            <p className="text-muted">Title:</p>
            <h5>{card ? card.data.name : '-'}</h5>
          </div>
          <div className="modal-body-approval row">
            <div className="col-md-6">
              <p className="text-muted">Due Date:</p>
              <h5>
                {card ? `${new Date(card.data.due_date * 1000).toLocaleDateString('en-US')}` : '-'}
              </h5>
            </div>
            <div className="col-md-6">
              <p className="text-muted">Created:</p>
              <h5>{card ? this.fixDate(card.created_at) : '-'}</h5>
            </div>
          </div>
          <div className="modal-body-approval row">
            <div className="col-md-6">
              <p className="text-muted">Type:</p>
              <h5>Approval</h5>
            </div>
            <div className="col-md-6">
              <p className="text-muted">Created By:</p>
              <h5>{card ? card.assigned_by : '-'}</h5>
            </div>
          </div>
          <div className="modal-body-approval">
            <p className="text-muted">Description:</p>
            <h5>{card ? card.data.description : '-'}</h5>
          </div>
        </Modal.Body>
        <hr className="hrStyle" />
        <Modal.Body>
          <div className="rowDiv">
            <p className="text-muted mr-5">3/26/2018:</p>
            <p className="text-muted">Request Approval</p>
          </div>
          <div className="modal-body-approval">
            <div className="rowDiv">
              <div className="imageDiv">
                <Image className="imagePlaceholder" src="" circle />
              </div>
              <div>
                <h5>Shreedhar Acharya</h5>
                <p className="text-muted">
                  Styles the modal properly with border, background-color, etc. Use this class to
                  add the modal's header, body, and footer.Styles the modal properly with border,
                  background-color, etc. Use this class to add the modal's header, body, and
                  footer.Styles the modal properly with border, background-color, etc. Use this
                  class to add the modal's header, body, and footer.
                </p>
                <div className="rowDiv">
                  <p className="text-muted mr-5">Attached:</p>
                  <p className="text-muted">The filename-here.mov</p>
                </div>
              </div>
            </div>
            <div className="rowDivButton">
              <Button bsStyle="primary" className="buttonStyleApproveDecline">
                Approve
              </Button>
              <Button bsStyle="primary" className="buttonStyleApproveDecline">
                Decline
              </Button>
            </div>
            <p className="text-muted mt-20">Send Comment</p>
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
            <Button bsStyle="primary" className="buttonStyleApproval">
              Send
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

ApprovalTaskDetail.propTypes = {
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
)(ApprovalTaskDetail)
