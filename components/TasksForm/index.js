import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { FormGroup, FormControl, ControlLabel, form, Col } from 'react-bootstrap'
import Select from 'react-select'
import { equals, length } from 'ramda'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import upload from '../SvgIcon/upload.png'
import MngActions from '../../actions/manage'
import Icon from '../Icon'
import './taskform.scss'

class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      formValues: {},
      uploadedFile: '',
      preview: null,
      userId: [],
      options: [],
      due_date: moment(),
    }
  }

  componentWillMount() {
    this.props.projectsfetchRequest(this.props.companyId)
    this.props.employeesfetchRequest(this.props.companyId)

    this.props.employeesstatus === 'done' &&
      this.props.employees.forEach(element => {
        this.state.options.push({ value: element.id, label: element.email })
      })
  }

  handleSelect(selectedOption) {
    selectedOption.forEach(element => {
      this.state.userId.push(element.value)
    })
  }

  handleChange(e) {
    e.preventDefault()
    let formValues = this.state.formValues
    let name = e.target.name
    let value = e.target.value

    formValues[name] = value

    this.setState({ formValues })
  }

  handleDateSelected(date) {
    this.setState({
      due_date: date,
    })
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
    this.props.addtasksRequest(this.state.formValues, this.state.userId)
    this.props.uploadfileRequest(this.state.uploadedFile)
  }

  handleClose() {
    this.props.handleClose()
  }

  render() {
    const { projectsstatus, employeesstatus } = this.props
    const { preview } = this.state
    const { selectedOption } = this.state
    return (
      <div className="nav-border">
        <form className="add-task bg-white" onSubmit={e => this.handleSubmit(e)}>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            onClick={() => this.handleClose()}
          >
            &times;
          </button>
          <div className="modal-header text-center bg-primary text-white">
            <Icon name="fal fa-plus-circle mr-10" color="white" size={17} />
            <h8>Add Task</h8>
          </div>
          <div className="modal-body clearfix">
            <Col xs={12}>
              <FormGroup controlId="formInputTitle">
                <ControlLabel className="label">Task Title</ControlLabel>
                <FormControl
                  type="text"
                  name="name"
                  value={this.state.formValues['name']}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e)}
                  className="bottom-shadow"
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>
            <Col xs={12}>
              <FormGroup controlId="formInputDescription">
                <ControlLabel className="label">Task Description</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  rows={3}
                  name="description"
                  value={this.state.formValues['description']}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e)}
                  className="bottom-shadow"
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup controlId="formControlsProject">
                <ControlLabel className="label">Project</ControlLabel>
                <FormControl
                  onChange={e => this.handleChange(e)}
                  value={this.state.formValues['project_id']}
                  componentClass="select"
                  placeholder="select"
                  name="project_id"
                >
                  <option>Select Project</option>
                  {projectsstatus === 'done' &&
                    this.props.projects.map(project => (
                      <option value={project.id}>{project.name}</option>
                    ))}
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <ControlLabel className="label">Due Date</ControlLabel>
              <div className="icon-title">
                <Icon name="fal fa-briefcase" color="#969FAA" size={17} />
                <DatePicker
                  name="due_date"
                  value={this.state.fdue_date}
                  className="datePicker w-100"
                  selected={this.state.due_date}
                  onSelect={e => this.handleDateSelected(e)}
                  dateFormat="YYYY/MM/DD"
                />
              </div>
            </Col>
            <Col xs={12}>
              <ControlLabel className="label">Assign to</ControlLabel>
              <Select
                name="multiselect"
                isMulti
                isSearchable
                value={selectedOption}
                onChange={e => this.handleSelect(e)}
                options={this.state.options}
              />
            </Col>
            <Col xs={12}>
              <ControlLabel className="label">Upload File</ControlLabel>
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
                  <span className="spanStyle">
                    <img src={upload} /> Browse
                  </span>
                  {preview ? <span> {preview} </span> : <span> no file uploaded yet</span>}
                </p>
              </Dropzone>
            </Col>
          </div>
          <div className="text-center">
            <button className="addTaskbuttontStyle mt-10" type="submit">
              Add Task
            </button>
          </div>
        </form>
      </div>
    )
  }
}

TaskForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  projectsfetchRequest: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
  projects: PropTypes.shape.isRequired,
  employees: PropTypes.shape.isRequired,
  employeesfetchRequest: PropTypes.func.isRequired,
  projectsstatus: PropTypes.bool.isRequired,
  employeesstatus: PropTypes.bool.isRequired,
  addtasksRequest: PropTypes.func.isRequired,
  uploadfileRequest: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  companyId: state.app.companies[0],
  projects: state.manage.projectsList,
  employees: state.manage.employeesList,
  projectsstatus: state.manage.projectsstatus,
  employeesstatus: state.manage.employeesstatus,
  userId: state.app.id,
})

const mapDispatchToProps = dispatch => ({
  projectsfetchRequest: companyId => dispatch(MngActions.projectsfetchRequest(companyId)),
  employeesfetchRequest: companyId => dispatch(MngActions.employeesfetchRequest(companyId)),
  addtasksRequest: (payload, userId) => dispatch(MngActions.addtasksRequest(payload, userId)),
  uploadfileRequest: payload => dispatch(MngActions.uploadfileRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm)
