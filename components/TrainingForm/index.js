import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { equals } from 'ramda'
import { Modal, Col, Image, DropdownButton, MenuItem } from 'react-bootstrap'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import MngActions from '../../actions/manage'
import './TrainingForm.scss'
import Icon from '../Icon'

const cardStyle = {
  'flex-direction': 'column',
  height: '190px',
  'overflow-y': 'scroll',
}

const innercardStyle = {
  'padding-top': '5px',
  'padding-bottom': '5px',
}

class TrainingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      formValues: {
        author: 'Select',
        department: 'Select',
        competency: 'Select',
        category: 'Select',
      },
      preview: null,
      options: [],
      due_date: moment(),
      userId: [],
      show: true,
      coursesSelected: [],
    }
  }

  componentWillMount() {
    this.props.authorsfetchRequest(this.props.companyId)
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

  handleDropdownSelect(eventKey, name) {
    const formValues = this.state.formValues
    const value = eventKey
    formValues[name] = value
    if (name === 'author') {
      this.props.coursesfetchRequest(this.props.authorsList.authors[eventKey].templates)
      this.setState({ coursesSelected: [] })
    }
    this.setState({ formValues })
  }

  handleDateSelected(date) {
    const formatedDate = date.format('YYYY-MM-DD')
    this.setState({
      due_date: date,
    })
    const formValues = this.state.formValues
    formValues['due_date'] = formatedDate
    this.setState({ formValues })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addtrainingRequest(
      this.state.formValues,
      this.state.userId,
      this.state.coursesSelected
    )
  }

  handleClose() {
    this.props.handleClose()
    this.setState({ show: false })
  }

  handleShow() {
    this.setState({ show: true })
  }

  handleCourseSelection(course) {
    const coursesSelected = this.state.coursesSelected
    coursesSelected.push(course)
    this.setState({ coursesSelected })
  }

  handleCourseUnSelect(course) {
    const coursesSelected = this.state.coursesSelected
    const filteredItems = coursesSelected.filter(function(item) {
      return item !== course
    })
    this.setState({ coursesSelected: filteredItems })
  }

  render() {
    const { authorstatus, authorsList, courses, coursestatus } = this.props
    const { selectedOption } = this.state
    return (
      <div className="nav-border">
        <div className="static-modal">
          <Modal
            className="trainingFormModal"
            show={this.state.show}
            onHide={() => this.handleClose()}
          >
            <form className="bg-white" onSubmit={e => this.handleSubmit(e)}>
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
                <h8>Assign Training </h8>
              </div>
              <div className="modal-body row">
                <div className="col-md-6">
                  <p className="dropDownLabel">Author</p>
                  <DropdownButton
                    id="author"
                    title={this.state.formValues['author']}
                    className="border-0 main-blue"
                    value={this.state.formValues['author']}
                    name="author"
                    onSelect={eventKey => this.handleDropdownSelect(eventKey, 'author')}
                  >
                    {authorstatus === 'done' &&
                      Object.keys(authorsList.authors).map(author => (
                        <MenuItem
                          key={author}
                          eventKey={author}
                          active={equals(author, this.state.formValues['author'])}
                        >
                          {author}
                        </MenuItem>
                      ))}
                  </DropdownButton>
                </div>
                <div className="col-md-6">
                  <p className="dropDownLabel">Department</p>
                  <DropdownButton
                    id="department"
                    title={this.state.formValues['department']}
                    className="border-0 main-blue"
                    value={this.state.formValues['department']}
                    name="department"
                    onSelect={eventKey => this.handleDropdownSelect(eventKey, 'department')}
                  >
                    {authorstatus === 'done' &&
                      Object.keys(authorsList.departments).map(department => (
                        <MenuItem
                          key={department}
                          eventKey={department}
                          active={equals(department, this.state.formValues['department'])}
                        >
                          {department}
                        </MenuItem>
                      ))}
                  </DropdownButton>
                </div>
              </div>
              <div className="modal-body row">
                <div className="col-md-6">
                  <p className="dropDownLabel">Competency</p>
                  <DropdownButton
                    id="competency"
                    title={this.state.formValues['competency']}
                    className="border-0 main-blue"
                    value={this.state.formValues['competency']}
                    name="competency"
                    onSelect={eventKey => this.handleDropdownSelect(eventKey, 'competency')}
                  >
                    {authorstatus === 'done' &&
                      Object.keys(authorsList.competencies).map(competency => (
                        <MenuItem
                          key={competency}
                          eventKey={competency}
                          active={equals(competency, this.state.formValues['competency'])}
                        >
                          {competency}
                        </MenuItem>
                      ))}
                  </DropdownButton>
                </div>
                <div className="col-md-6">
                  <p className="dropDownLabel">Category</p>
                  <DropdownButton
                    id="category"
                    title={this.state.formValues['category']}
                    className="border-0 main-blue"
                    value={this.state.formValues['category']}
                    name="category"
                    onSelect={eventKey => this.handleDropdownSelect(eventKey, 'category')}
                  >
                    {authorstatus === 'done' &&
                      Object.keys(authorsList.categories).map(category => (
                        <MenuItem
                          key={category}
                          eventKey={category}
                          active={equals(category, this.state.formValues['category'])}
                        >
                          {category}
                        </MenuItem>
                      ))}
                  </DropdownButton>
                </div>
              </div>
              <div className="modal-body row">
                <div className="countDiv">
                  {coursestatus === 'done' && (
                    <p className="titleMargin">Viewing: {courses.totalCourses}</p>
                  )}
                  <p className="titleMargin">Selected: {this.state.coursesSelected.length}</p>
                </div>
                <div
                  className="learn-pagination border-5 align-items-center justify-content-between mt-5 mb-5 ml-20 mr-20"
                  style={cardStyle}
                >
                  <p>To see Courses please select filters above</p>
                  {coursestatus === 'done' &&
                    this.state.formValues['author'] != 'Select' &&
                    courses.allCourses.map(course => (
                      <div className="border-5 wth100" style={innercardStyle}>
                        <Col className="imageCOl" xs={3}>
                          <Image className="imageStyle" src={course.data.thumb_url} />
                        </Col>
                        <Col xs={6}>
                          <p className="titleStyle">{course.name}</p>
                          <p className="subtitleStyle">
                            Modules:
                            {course.children.length}
                          </p>
                        </Col>
                        <Col xs={2}>
                          {this.state.coursesSelected.includes(course.id) ? (
                            <div
                              className="iconStyle"
                              onClick={() => this.handleCourseUnSelect(course.id)}
                            >
                              <Icon name="fas fa-plus-square" size={45} />
                            </div>
                          ) : (
                            <div
                              className="iconStyle"
                              onClick={() => this.handleCourseSelection(course.id)}
                            >
                              <Icon name="far fa-plus-square" size={45} color="#969faa" />
                            </div>
                          )}
                        </Col>
                      </div>
                    ))}
                </div>
              </div>
              <div className="modal-body row">
                <div className="col-md-6">
                  <p className="dropDownLabel">Assign to:</p>
                  <div className="assign-box">
                    <Icon name="fal fa-user-plus" color="#376CAF" size={14} />
                    <Select
                      name="multiselect"
                      isMulti
                      isSearchable
                      value={selectedOption}
                      onChange={e => this.handleSelect(e)}
                      options={this.state.options}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="dsl-d12 due">Due date:</p>
                  <div className="date-box">
                    <Icon name="fal fa-calendar-alt" color="#376CAF" size={14} />
                    <DatePicker
                      name="due_date"
                      value={this.state.due_date}
                      selected={this.state.due_date}
                      onSelect={e => this.handleDateSelected(e)}
                    />
                    <Icon name="fal fa-angle-down" color="#376CAF" size={18} />
                  </div>
                </div>
              </div>
              <div className="text-center mb-20 ">
                {this.state.coursesSelected.length ? (
                  <button className="buttontActiveStyle" type="submit">
                    Assign Training
                  </button>
                ) : (
                  <button className="buttontStyle" type="submit">
                    Assign Training
                  </button>
                )}
              </div>
            </form>
          </Modal>
        </div>
      </div>
    )
  }
}

TrainingForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
  authors: PropTypes.shape.isRequired,
  authorstatus: PropTypes.bool.isRequired,
  employees: PropTypes.shape.isRequired,
  employeesfetchRequest: PropTypes.func.isRequired,
  employeesstatus: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  companyId: state.app.companies[0],
  authorstatus: state.manage.authorstatus,
  authorsList: state.manage.authorsList,
  employees: state.manage.employeesList,
  employeesstatus: state.manage.employeesstatus,
  courses: state.manage.coursesList,
  coursestatus: state.manage.coursestatus,
})

const mapDispatchToProps = dispatch => ({
  authorsfetchRequest: companyId => dispatch(MngActions.authorsfetchRequest(companyId)),
  employeesfetchRequest: companyId => dispatch(MngActions.employeesfetchRequest(companyId)),
  coursesfetchRequest: templates => dispatch(MngActions.coursesfetchRequest(templates)),
  addtrainingRequest: (payload, userId, coursesSelected) =>
    dispatch(MngActions.addtrainingRequest(payload, userId, coursesSelected)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingForm)
