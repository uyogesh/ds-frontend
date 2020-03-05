import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Media, Image } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { equals, length, split, isEmpty } from 'ramda'
import Dropzone from 'react-dropzone'
import Icon from '../Icon'
import { company } from '../../layouts/Dashboard/images'
import { CardType, CardStatus, fileType } from '../../services/config'
import Quiz from '../LearnChildQuiz'
import './LearnChild.scss'

class LearnChildModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ended: props.status > 2,
      started: false,
      isUploading: false,
      files: [],
      uploadFile: {},
      playing: false,
      enableRequest: false,
      played: props.videoState.played,
      playedSeconds: props.videoState.playedSeconds,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.modalID !== this.props.modalID) {
      const { videoState } = this.props
      this.setState({
        isUploading: false,
        files: [],
        played: videoState.played,
        playedSeconds: videoState.playedSeconds,
      })
    } else if (this.state.isUploading && this.props.attachedURL !== prevProps.attachedURL) {
      const file = {
        name: this.state.uploadFile.name,
        preview: this.state.uploadFile.preview,
        size: this.state.uploadFile.size,
        type: this.state.uploadFile.type,
        url: this.props.attachedURL,
      }
      const files = [...this.state.files, file]
      this.setState({ isUploading: false, files })
    }
  }

  // Video module
  handleStateChange(state) {
    const { ended, started } = this.state
    if (equals(this.props.type, 7)) {
      if (state === 'ended' && !ended && started) {
        this.setState({ ended: true, started: false, playing: false })
        if (this.props.status < 3) {
          this.props.onUpdate('completed')
        }
      }
    }
  }

  handleProgress(state) {
    const { playing } = this.state
    if (playing) {
      this.setState(state)
      this.props.onVideoState(state)
    }
  }

  // Action module
  handleDrop(file) {
    if (equals(length(file), 0)) {
      return
    }
    const payload = {
      attachment_hash: this.props.modalData.attachment_hash,
      file: file[0],
    }
    this.props.onUpload(payload)
    this.setState({ isUploading: true, uploadFile: file[0] })
  }

  remove(index) {
    const { files } = this.state
    const upload = [...files.slice(0, index), ...files.slice(index + 1)]
    this.setState({ files: upload })
  }

  replay() {
    const { started, played } = this.state
    const { onUpdate, status, videoState, modalID, type } = this.props
    this.setState({ ended: false })
    if (!started) {
      this.setState({ started: true, playing: true })
    }
    if (equals(status, 0)) {
      onUpdate('started')
    }
    if (this.player && equals(videoState.card_type_id, type) && equals(videoState.id, modalID)) {
      if (played < 0.9) {
        this.player.seekTo(played)
      }
    }
  }

  onStart() {
    const { started } = this.state
    const { type, onUpdate } = this.props
    if (!started) {
      this.setState({ started: true })
    }
    if (equals(type, 7)) {
      this.replay()
    }
    if (equals(this.props.status, 0) || equals(this.props.status, 2)) {
      onUpdate('started')
    }
  }

  onFinished() {
    this.setState({ ended: true, started: false })
    const { files } = this.state
    const len = length(files)
    if (!equals(len, 0) && equals(this.props.type, 3)) {
      const attachments = []
      for (let index = 0; index < len; index++) {
        attachments.push(files[index].url)
      }
      this.props.onNewAttach(attachments)
    }
    this.props.onUpdate('completed')
    this.props.onSave()
  }

  playerRef = player => {
    this.player = player
  }

  render() {
    const { ended, started, files, playing, enableRequest } = this.state
    const {
      onPrevious,
      onNext,
      onSave,
      onRate,
      onUpdate,
      onGoLockModule,
      status,
      type,
      modalData,
      typeName,
      lockModule,
      updateDate,
    } = this.props
    const dateString = split('-', split(' ', updateDate)[0])
    const statusDate = updateDate
      ? dateString[1] + '/' + dateString[2] + '/' + dateString[0].substr(2, 2)
      : ''

    return (
      <div className={`learn-child border-5 m-0`}>
        <Button
          bsStyle="link"
          className="left-arrow desktop"
          onClick={() => {
            this.setState({ ended: false, started: false, playing: false })
            onPrevious()
          }}
        >
          <Icon name="far fa-chevron-circle-left" size={42} color="#fff" />
        </Button>
        <Button
          bsStyle="link"
          className="right-arrow desktop"
          onClick={() => {
            this.setState({ ended: false, started: false, playing: false })
            onNext()
          }}
        >
          <Icon name="far fa-chevron-circle-right" size={42} color="#fff" />
        </Button>
        <Button
          bsStyle="link"
          className="left-arrow mobile d-none"
          onClick={() => {
            this.setState({ ended: false, started: false, playing: false })
            onPrevious()
          }}
        >
          <Icon name="far fa-chevron-circle-left" size={42} color="#343f4b" />
        </Button>
        <Button
          bsStyle="link"
          className="right-arrow mobile d-none"
          onClick={() => {
            this.setState({ ended: false, started: false, playing: false })
            onNext()
          }}
        >
          <Icon name="far fa-chevron-circle-right" size={42} color="#fff" />
        </Button>
        <div className={`align-items-center ${equals(lockModule, '') ? '' : 'opacity-5'}`}>
          <div className="align-items-center">
            <Icon
              size={30}
              name={`${equals(status, 3) ? 'fas fa-check-circle' : 'far fa-circle'} mr-10`}
              color={`${equals(status, 3) ? '#376caf' : '#c3c7cc'}`}
            />
          </div>
          <div className="justify-content-between module-status">
            <div>
              <p className="dsl-d14 mb-0 align-items-center">
                <Icon name={`${CardType[type].alias}`} color="#c3c7cc" size={15} />
                &nbsp;&nbsp;
                {typeName}
              </p>
              <p className={`dsl-b16 mb-0 ${equals(status, 3) && 'text-line-through'}`}>
                <strong>{modalData.name}</strong>
              </p>
            </div>
            <div className="">
              {!equals(lockModule, '') ? (
                <p className="dsl-d14 mb-0">{'Locked'}</p>
              ) : (
                <p className="dsl-d14 mb-0 text-capitalize text-right">{`${CardStatus[status]}`}</p>
              )}
              {equals(lockModule, '') &&
                !equals(status, 0) && <p className="dsl-d14 mb-0 text-right">{statusDate}</p>}
            </div>
          </div>
        </div>
        <Media>
          <Media.Left
            className={`${
              length(modalData.objectives) > 0 && !isEmpty(modalData.objectives[0])
                ? 'col-md-8 col-xs-12 px-0'
                : 'px-0'
            }`}
          >
            <div className="position-relative">
              <div className="media-content">
                {equals(type, 7) ? (
                  <ReactPlayer
                    ref={this.playerRef}
                    playing={playing}
                    url={modalData.video_url}
                    controls={playing}
                    width="100%"
                    height="100%"
                    onStart={() => this.handleStateChange('started')}
                    onEnded={() => this.handleStateChange('ended')}
                    onProgress={e => this.handleProgress(e)}
                  />
                ) : (
                  <Image
                    className={`border-5`}
                    src={modalData.thumb_url ? modalData.thumb_url : company}
                  />
                )}
              </div>
              {(ended || (!started && equals(status, 3))) && (
                <div className="overlay completed">
                  <div className="h-100 d-flex">
                    <div className="col-xs-4 align-items-center justify-content-center">
                      <Button
                        bsStyle="link"
                        className="align-items-center color-white"
                        onClick={() => this.replay()}
                      >
                        <Icon name="far fa-redo-alt" size={30} color="#fff" />
                        Replay
                      </Button>
                    </div>
                    {/* <div className="w-50 align-items-center justify-content-center">
                      <Button
                        bsStyle="link"
                        className="align-items-center color-white"
                        onClick={() => onRate()}
                      >
                        <Icon name="far fa-redo-alt" size={30} color="#fff" />
                        Rate Module
                      </Button>
                    </div> */}
                    <div className="col-xs-4 align-items-center justify-content-center">
                      <Button
                        bsStyle="link"
                        className="align-items-center color-white"
                        onClick={() => onSave()}
                      >
                        <Icon name="fal fa-times" size={30} color="#fff" />
                        Save & Exit
                      </Button>
                    </div>
                    <div className="col-xs-4 align-items-center justify-content-center">
                      <Button
                        bsStyle="link"
                        className="align-items-center color-white"
                        onClick={() => {
                          this.setState({ ended: false })
                          onNext()
                        }}
                      >
                        <Icon name="fas fa-arrow-alt-right" size={30} color="#fff" />
                        Next Module
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {!started &&
                !ended &&
                status < 3 && (
                  <div className="overlay justify-content-center align-items-center">
                    <div className="d-flex flex-column align-items-center">
                      <div className="module-type-container bg-primary rounded-circle m-20">
                        <Icon name={`${CardType[type].alias}`} color="#fff" size={35} />
                      </div>
                      <div
                        className="bg-primary btn-rounded py-10 px-30 cursor-pointer"
                        onClick={() => this.onStart()}
                      >
                        <p className="mb-0 dsl-b18 color-white mx-20 text-center">{`Start`}</p>
                      </div>
                    </div>
                  </div>
                )}
              {!equals(lockModule, '') && (
                <div className="overlay bg-white align-items-center justify-content-center">
                  <p>
                    Please complete{' '}
                    <a onClick={() => onGoLockModule()} className="cursor-pointer">
                      &laquo;
                      {lockModule}
                      &raquo;
                    </a>
                    module before you proceed.
                  </p>
                </div>
              )}
            </div>
            <div className={`${equals(lockModule, '') ? '' : 'opacity-5'}`}>
              {!started && (
                <div>
                  <p className="dsl-b14 mt-20 bold">{modalData.name}</p>
                  <p className="dsl-b14 mt-10">{modalData.description}</p>
                </div>
              )}
              {started &&
                equals(type, 3) && (
                  <div className="action-container">
                    <p className="dsl-b16 mt-20 mb-10">
                      <strong>{`Once Completed:`}</strong>
                    </p>
                    <Dropzone
                      className="drag-drop"
                      activeClassName="drag-drop active"
                      acceptClassName="drag-drop active"
                      rejectClassName="drag-drop deactivate"
                      onDrop={() => this.handleDrop()}
                      accept="image/jpeg, image/png, application/zip, video/mp4, video/x-msvideo, application/pdf"
                      multiple={false}
                    >
                      <div className="justify-content-center">
                        <p className="dsl-p14 text-underline">Upload</p>
                        <p className="dsl-b14">
                          &nbsp;a supporting files and request approval from your manager
                        </p>
                      </div>
                      <p className="dsl-d12 text-center">
                        Drop your files here, or click to select files to upload.
                      </p>
                    </Dropzone>
                    <aside>
                      <div className="align-items-center">
                        {!equals(length(files), 0) && (
                          <Icon name="fal fa-check-circle" color="#343f4b" size={17} />
                        )}
                        {files.map((f, index) => {
                          return (
                            <span key={`${f.name}-${index}`} className="align-items-center">
                              <Icon name={fileType[f.type].alias} color="#343f4b" size={17} />
                              <p className="mb-0">{f.name}</p>
                              <Button
                                bsStyle="link"
                                className="pt-0 pb-10 px-10 mb-10"
                                onClick={() => this.remove(index)}
                              >
                                <Icon name="far fa-times" color="#376CAF" />
                              </Button>
                            </span>
                          )
                        })}
                      </div>
                      <span
                        className="my-20 d-flex cursor-pointer"
                        onClick={() => {
                          this.setState({ enableRequest: !enableRequest })
                        }}
                      >
                        <Icon
                          color={`${enableRequest ? '#376CAF' : '#c3c7cc'}`}
                          size={17}
                          name={`${enableRequest ? 'fas fa-check-circle' : 'far fa-circle'}`}
                        />
                        <p className="dsl-b14 text-center">{`I have studied the material to be knowledgable about its contents and apply the learning to my work.`}</p>
                      </span>
                      <div className="my-20 justify-content-center">
                        <Button
                          className={`ds-btn ${enableRequest ? 'bg-primary' : 'bg-light-grey'}`}
                          onClick={() => this.onFinished()}
                          disabled={!enableRequest}
                        >{`Request Approval`}</Button>
                      </div>
                    </aside>
                  </div>
                )}
              {started &&
                equals(type, 5) && (
                  <Quiz
                    quizId={modalData.assessment_id}
                    name={modalData.name}
                    onFinish={() => this.onFinished()}
                  />
                )}
              {started &&
                equals(type, 14) && (
                  <div className="bg-light p-20">
                    <p className="dsl-p16 mt-10 bold text-center">{modalData.name}</p>
                    <p className="dsl-b14 mb-20 text-center">{`You need to read it carefully`}</p>
                    <div dangerouslySetInnerHTML={{ __html: modalData.study_content }} />
                    <div className="my-30">
                      <p className="dsl-b14 mb-20 text-center">{`I have studied the material to be knowledgable about its contents and apply the learning to my work.`}</p>
                      <div className="text-center w-100">
                        <Button
                          className="ds-btn bg-primary"
                          onClick={() => {
                            this.setState({ ended: true, started: false })
                            onUpdate('completed')
                          }}
                        >
                          {`Im Finished`}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </Media.Left>
          {length(modalData.objectives) > 0 &&
            !isEmpty(modalData.objectives[0]) && (
              <div
                className={`body pl-30 pr-0 col-md-4 col-xs-12 ${
                  equals(lockModule, '') ? '' : 'opacity-5'
                }`}
              >
                <div className="border-bottom mb-10">
                  <p className="dsl-p18 mb-20 align-items-center justify-content-center">
                    <Icon name={`${CardType[type].alias} mr-20`} size={23} />
                    {`${CardType[type].label} Module`}
                  </p>
                </div>
                <p className="dsl-b16 my-10">
                  <strong>{`Learning Objectives`}</strong>
                </p>
                {modalData.objectives.map((el, index) => {
                  return (
                    <div className="d-flex mb-10" key={`${el + index}`}>
                      <div className="img-circle bg-primary align-items-center justify-content-center nums-content">
                        {index + 1}
                      </div>
                      <p className="dsl-b14 pl-10">{el}</p>
                    </div>
                  )
                })}
                <p className="dsl-b16 mt-20">
                  <strong>{`Downloads`}</strong>
                </p>
                {length(modalData.attachments) > 0 ? (
                  modalData.attachments.map(link => {
                    ;<div>
                      <span>
                        <Icon name="fas fa-file-pdf" color="#376CAF" size={12} />
                        <a className="dsl-b14">{link}</a>
                      </span>
                    </div>
                  })
                ) : (
                  <div>
                    <p className="dsl-d12">{`no attachment/download`}</p>
                  </div>
                )}
              </div>
            )}
        </Media>
      </div>
    )
  }
}

LearnChildModal.propTypes = {
  type: PropTypes.number,
  typeName: PropTypes.string,
  modalData: PropTypes.any,
  dueDate: PropTypes.string,
  status: PropTypes.number,
  lockModule: PropTypes.string,
  updateDate: PropTypes.string,
  videoState: PropTypes.any,
}

LearnChildModal.defaultProps = {
  type: 1,
  typeName: 'New Hire Orientation',
  modalData: {},
  dueDate: '3/26/2018',
  status: 0,
  lockModule: '',
  updateDate: '',
  videoState: {},
  onPrevious: () => {},
  onNext: () => {},
  onRate: () => {},
  onSave: () => {},
  onUpdate: () => {},
  onGoLockModule: () => {},
}

const mapStateToProps = state => ({
  attachedURL: state.develop.learnUploadURL,
  videoState: state.develop.learnVideoState,
})

export default connect(
  mapStateToProps,
  null
)(LearnChildModal)
