import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Modal } from 'react-bootstrap'
import { equals, split, replace, isNil, length } from 'ramda'
import DevActions from '../../../actions/develop'
import AppActions from '../../../actions/app'
import Profile from '../../../components/LearnProfileInfo'
import Pagination from '../../../components/LearnPagination'
import Feed from '../../../components/LearnFeed'
import ChildModal from '../../../components/LearnChild'
import Icon from '../../../components/Icon'
import './Learn.scss'

class Learn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModal: false,
      _index: 0,
    }
  }

  componentWillMount() {
    this.props.feedsRequest(this.props.userId, this.props.PerPage, this.props.page)
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

  showModal(e) {
    if (equals(e.data.child_count, 0) || isNil(e.data.child_count)) {
      return
    }
    this.props.resetAttactedURL()
    this.props.setCurrentCourse(e)
    this.props.setCurrentModule(e.children[0])
    this.setState({ isModal: true, _index: 0 })
  }

  hideModal() {
    this.setState({ isModal: false, _index: 0 })
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
    if (equals(_index + 1, currentCard.data.child_count)) {
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

  cardRate() {
    console.log('rating module clicked')
  }

  saveAndExit() {
    this.setState({ _index: 0, isModal: false })
  }

  updateCard(e) {
    const { currentModule } = this.props
    this.props.cardupdateRequest(e, currentModule.id)
  }

  getLockedModule() {
    const { currentCard, currentModule } = this.props
    if (isNil(currentCard)) {
      return null
    }
    for (const index in currentCard.children) {
      if (
        equals(currentCard.children[index].id, currentModule.blocked_by) &&
        !equals(currentCard.children[index].status, 3)
      ) {
        return Number(index)
      }
    }
    return null
  }

  setVideoState(e) {
    const { currentModule } = this.props
    const cardState = {
      id: currentModule.id,
      name: currentModule.data.name,
      card_type_id: currentModule.card_type_id,
      card_template_id: currentModule.card_template_id,
      feed_id: currentModule.feed_id,
      parent_id: currentModule.parent_id,
      status: currentModule.status,
      played: e.played,
      playedSeconds: e.playedSeconds,
    }
    this.props.setVideoState(cardState)
  }

  render() {
    const {
      type,
      isBusy,
      currentCard,
      currentModule,
      updateType,
      cards,
      PerPage,
      feedsRequest,
      userId,
      page,
      showMode,
      updateShowMode,
    } = this.props
    const { isModal } = this.state
    const lockedBy = this.getLockedModule()

    return (
      <div className="dev-learn">
        <div className="profile-container left-sidebar">
          <Profile />
        </div>
        <div className="feed-container has-left-sidebar pr-10">
          <Pagination
            mode={showMode}
            type={type}
            perpage={PerPage}
            change={id => {
              updateType(id)
              feedsRequest(userId, PerPage, page)
            }}
            showing={perpage => feedsRequest(userId, perpage, page)}
            changeMode={mode => updateShowMode(mode)}
          />
          {cards.map(card => {
            const dueDate = card.due_at ? replace(/-/g, '/', split(' ', card.due_at)[0]) : ''
            return (
              <Feed
                mode={showMode}
                key={card.id}
                type={card.card_type_id}
                feedData={card.data}
                modules={card.children}
                dueDate={dueDate}
                onClick={() => this.showModal(card)}
                onClickChild={index => this.showChild(index, card)}
              />
            )
          })}
        </div>
        {!isNil(currentModule) && (
          <Modal
            bsSize="large"
            className="modal-dialog-centered learn-child-modal"
            show={isModal}
            onHide={() => this.hideModal()}
          >
            <Modal.Body className="p-0">
              <ChildModal
                modalID={currentModule.id}
                type={currentModule.card_type_id}
                modalData={currentModule.data}
                dueDate={currentModule.due_at}
                status={currentModule.status}
                updateDate={currentModule.updated_at}
                lockModule={`${isNil(lockedBy) ? '' : currentCard.children[lockedBy].data.name}`}
                onGoLockModule={() => this.showChild(lockedBy)}
                onPrevious={() => this.previousFeed()}
                onNext={() => this.nextFeed()}
                onRate={() => this.cardRate()}
                onSave={() => this.saveAndExit()}
                onUpdate={e => this.updateCard(e)}
                onUpload={e => this.fileUpload(e)}
                onNewAttach={e => this.addAttachment(e)}
                onVideoState={e => this.setVideoState(e)}
              />
            </Modal.Body>
          </Modal>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isBusy: equals(state.app.status, 'pending'),
  userId: state.app.id,
  type: state.develop.learnType,
  cards: state.develop.learnCards,
  PerPage: state.develop.learnPerPage,
  page: state.develop.learnPage,
  showMode: state.develop.learnShowMode,
  currentCard: state.develop.learnCurrentCourse,
  currentModule: state.develop.learnCurrentModule,
  attachedURL: state.develop.learnUploadURL,
})

const mapDispatchToProps = dispatch => ({
  feedsRequest: (userId, PerPage, page) => dispatch(DevActions.feedsRequest(userId, PerPage, page)),
  updateType: id => dispatch(DevActions.ctypeUpdate(id)),
  updateShowMode: mode => dispatch(DevActions.cshowmodeUpdate(mode)),
  cardupdateRequest: (event, card_id) => dispatch(DevActions.cardupdateRequest(event, card_id)),
  setCurrentCourse: course => dispatch(DevActions.setcurrentCourse(course)),
  setCurrentModule: card => dispatch(DevActions.setcurrentModule(card)),
  uploadFile: file => dispatch(DevActions.uploadRequest(file)),
  resetAttactedURL: () => dispatch(DevActions.uploadSuccess('')),
  updateModule: payload => dispatch(DevActions.updatemoduleRequest(payload)),
  setVideoState: payload => dispatch(DevActions.setvideoState(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Learn)
