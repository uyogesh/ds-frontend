import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Modal } from 'react-bootstrap'
import { clone, equals, length, isNil } from 'ramda'
import DevActions from '../../../actions/develop'
import Course from '../../../components/LibraryCourse'
import Card from '../../../components/LibraryCard'
import Status from '../../../components/LibraryStatus'
import Pagination from '../../../components/LibraryPagination'
import ChildModal from '../../../components/LearnChild'
import Feed from '../../../components/LearnFeed'
import './Library.scss'

class Library extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _index: 0,
      isModal: false,
      isFeed: true,
      courses: [],
      selected: [],
    }
  }

  componentDidMount() {
    const companyId = this.props.companies[0]
    this.props.usersRequest(companyId)
  }

  componentDidCatch() {
    console.log('Error: Library')
  }

  getCurrentModule(e) {
    const data = clone(e.data)
    data.name = e.name
    data.child_count = e.children.length
    return data
  }

  handleFilter(feeds, selected, courses, modules) {
    if (!equals(this.props.libIds, feeds)) {
      this.props.getCourses(feeds, courses, modules)
      this.setState({ selected })
    }
  }

  handleToggleFeed() {
    this.setState({ isFeed: !this.state.isFeed })
  }

  handlePagination() {
    this.props.getCourses(this.props.libIds, this.props.totalCourses, this.props.totalModules)
  }

  hideModal() {
    this.setState({ isModal: false, _index: 0 })
  }

  showModal(e) {
    if (equals(e.children.length, 0) || isNil(e.children)) {
      return
    }
    this.props.resetAttactedURL()
    this.props.setCurrentCourse(e)
    this.props.setCurrentModule(e.children[0])
    this.setState({ isModal: true, _index: 0 })
  }

  showChild(index, card) {
    if (isNil(index)) {
      return
    }
    this.props.resetAttactedURL()
    if (isNil(card)) {
      this.props.setCurrentModule(this.props.currentCard.children[index])
      this.setState({ isModal: true, _index: Number(index) })
    } else {
      this.props.setCurrentCourse(card)
      this.props.setCurrentModule(card.children[index])
      this.setState({ isModal: true, _index: Number(index) })
    }
  }

  nextFeed() {
    const { currentCard } = this.props
    const { _index } = this.state
    if (equals(_index + 1, currentCard.children.length)) {
      return
    }
    this.props.resetAttactedURL()
    this.props.setCurrentModule(currentCard.children[_index + 1])
    this.setState({ _index: _index + 1 })
  }

  previousFeed() {
    const { _index } = this.state
    const { currentCard } = this.props
    if (equals(_index, 0)) {
      return
    }
    this.props.resetAttactedURL()
    this.props.setCurrentModule(currentCard.children[_index - 1])
    this.setState({ _index: _index - 1 })
  }

  fileUpload(payload) {
    this.props.uploadFile(payload)
  }

  addAttachment(attachments) {
    const { currentModule } = this.props
    const newAttachments = [...currentModule.data.attachments, ...attachments]
    const payload = currentModule.setIn(['data', 'attachments'], newAttachments)
    this.props.updateModule(payload)
  }

  saveAndExit() {
    this.setState({ _index: 0, isModal: false })
  }

  updateCard(e) {
    const { currentModule } = this.props
    this.props.cardupdateRequest(e, currentModule.id)
  }

  handleCreate(card, userId) {
    console.log('The endpoint does not work fine. After it working, we can uncomment the blow.')
    // const payload = {
    //   card:
    //     {
    //       card_template_id: null,
    //       card_type_id: card.card_type_id,
    //       parent_id: null,
    //       data: {
    //         name: card.name,
    //         description: card.data.description
    //       }
    //     },
    //   user_id: [userId]
    // }
    // this.props.createRequest(payload)
  }

  render() {
    const {
      courseLists,
      libCourses,
      libIds,
      libUsers,
      totalCourses,
      totalModules,
      per,
      page,
      pageUpdate,
      perUpdate,
      currentCard,
      currentModule,
      showMode,
    } = this.props
    const totalPages = Math.ceil(totalCourses / per)
    const { isModal, isFeed, selected } = this.state

    return (
      <div className="dev-library">
        <Row className="mx-0">
          <Col xs={12} sm={5} md={4} lg={3} className="has-header">
            <Course
              courses={courseLists}
              ids={libIds}
              totalCourses={totalCourses}
              change={(feeds, selected, courses, modules) =>
                this.handleFilter(feeds, selected, courses, modules)
              }
            />
          </Col>
          <Col xs={12} md={8} lg={9} className="pl-0">
            <Status courses={totalCourses} modules={totalModules} selected={selected} />
            {libCourses.map((course, index) => {
              return (
                <Card
                  key={`${course.id}-${index}`}
                  modules={length(course.children)}
                  image={isNil(course.data) ? null : course.data.thumb_url}
                  name={course.name}
                  description={isNil(course.data) ? '' : course.data.description}
                  users={libUsers}
                  onCreate={userId => this.handleCreate(course, userId)}
                  onClick={() => this.showModal(course)}
                />
              )
            })}
            <Pagination
              showing={per}
              current={page}
              pages={totalPages}
              onPrev={() => {
                if (page < 1) {
                  return
                }
                pageUpdate(page - 1)
                this.handlePagination()
              }}
              onNext={() => {
                if (totalPages < page + 1) {
                  return
                }
                pageUpdate(page + 1)
                this.handlePagination()
              }}
              onChange={PerPage => {
                perUpdate(PerPage)
                this.handlePagination()
              }}
            />
          </Col>
        </Row>

        {!isNil(currentCard) && (
          <Modal
            bsSize="large"
            className="modal-dialog-centered learn-child-modal"
            show={isModal}
            onHide={() => this.hideModal()}
          >
            <Modal.Body className="p-0">
              {!isFeed && (
                <ChildModal
                  modalID={currentModule.id}
                  type={currentModule.card_type_id}
                  modalData={this.getCurrentModule(currentCard)}
                  dueDate={currentModule.due_at}
                  status={currentModule.status}
                  updateDate={currentModule.updated_at}
                  // lockModule={`${isNil(lockedBy) ? '' : currentCard.children[lockedBy].data.name}`}
                  // onGoLockModule={() => this.showChild(lockedBy)}
                  onPrevious={() => this.previousFeed()}
                  onNext={() => this.nextFeed()}
                  onRate={() => this.cardRate()}
                  onSave={() => this.saveAndExit()}
                  onUpdate={e => this.updateCard(e)}
                  onUpload={e => this.fileUpload(e)}
                  onNewAttach={e => this.addAttachment(e)}
                />
              )}

              {isFeed && (
                <Feed
                  mode={showMode}
                  type={currentCard.card_type_id}
                  feedData={this.getCurrentModule(currentCard)}
                  modules={currentCard.children}
                  dueDate={currentCard.due_at}
                  onClick={() => this.handleToggleFeed()}
                  onClickChild={index => this.showChild(index, currentCard)}
                />
              )}
            </Modal.Body>
          </Modal>
        )}
      </div>
    )
  }
}

Library.propTypes = {
  page: PropTypes.number,
  per: PropTypes.number,
  courseLists: PropTypes.array,
  libCourses: PropTypes.array,
  libIds: PropTypes.array,
  totalCourses: PropTypes.number,
  totalModules: PropTypes.number,
  pageUpdate: PropTypes.func,
  perUpdate: PropTypes.func,
  getCourses: PropTypes.func,
}

Library.defaultProps = {
  page: 0,
  per: 10,
  courseLists: [],
  libCourses: [],
  libIds: [],
  totalCourses: 0,
  totalModules: 0,
  pageUpdate: () => {},
  perUpdate: () => {},
  getCourses: () => {},
}

const mapStateToProps = state => ({
  companies: state.app.companies,
  page: state.develop.libraryCurPage,
  per: state.develop.libraryPerPage,
  libUsers: state.develop.libraryUsers,
  courseLists: state.develop.libraryLists,
  libCourses: state.develop.libraryCourses,
  libIds: state.develop.librarySelectedIds,
  totalCourses: state.develop.libraryTotalCourses,
  totalModules: state.develop.libraryTotalModules,
  currentCard: state.develop.learnCurrentCourse,
  currentModule: state.develop.learnCurrentModule,
  showMode: state.develop.learnShowMode,
})

const mapDispatchToProps = dispatch => ({
  createRequest: e => dispatch(DevActions.createcardRequest(e)),
  usersRequest: e => dispatch(DevActions.cardusersRequest(e)),
  pageUpdate: e => dispatch(DevActions.lcurpageUpdate(e)),
  perUpdate: e => dispatch(DevActions.lperpageUpdate(e)),
  getCourses: (ids, courses, modules) =>
    dispatch(DevActions.courseRequest({ ids, courses, modules })),
  setCurrentModule: card => dispatch(DevActions.setcurrentModule(card)),
  setCurrentCourse: course => dispatch(DevActions.setcurrentCourse(course)),
  resetAttactedURL: () => dispatch(DevActions.uploadSuccess('')),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
