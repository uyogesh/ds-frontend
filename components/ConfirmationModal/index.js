import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './ConfirmationModal.scss'

class ConfirmationModal extends Component {
  handleClose() {
    this.props.handleClose()
  }

  handleAction(action) {
    if (action === 'Mark Complete') {
      this.props.handleMarkasCompleted()
    } else if (action === 'Archive') {
      this.props.handleArchive()
    } else if (action === 'Delete') {
      this.props.handleDelete()
    }
  }

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog
          className="confirmationModal"
          show={this.props.status}
          onHide={() => this.handleClose()}
        >
          <div className="modal-header text-center bg-primary text-white">{this.props.title}</div>

          <Modal.Body>Are you sure you want to {this.props.body} ?</Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button bsStyle="primary" onClick={() => this.handleAction(this.props.action)}>
              {this.props.action}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    )
  }
}

export default ConfirmationModal
