import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // -----------   Learn Page
  fetchRequest: ['payload'],
  fetchSuccess: ['response'],
  fetchFailure: null,

  // Pulling learn feeds
  feedsRequest: ['userId', 'perPage', 'page'],
  feedsSuccess: ['response'],
  feedsFailure: null,

  // set current card
  setcurrentCourse: ['course'],
  setcurrentModule: ['card'],
  setvideoState: ['cardState'],

  // update cards
  cardupdateRequest: ['event', 'cardId'],
  cardupdateSuccess: null,
  cardupdateFailure: null,

  // update learn cards
  lcardupdateRequest: ['cards'],

  // get question in Quiz module
  questionRequest: ['quizId'],
  questionSuccess: ['response'],
  questionFailure: null,

  // post answer in Quiz module
  answerRequest: ['quizId', 'payload'],
  answerSuccess: ['response'],
  answerFailure: null,

  // upload file
  uploadRequest: ['payload'],
  uploadSuccess: ['response'],
  uploadFailure: null,

  // Change Current Card Types
  ctypeUpdate: ['id'],
  cshowmodeUpdate: ['showMode'],

  // update module
  updatemoduleRequest: ['payload'],
  updatemoduleSuccess: ['response'],
  updatemoduleFailure: null,

  // Library Page
  // pulling library
  libraryRequest: ['companyId'],
  librarySuccess: ['response'],
  libraryFailure: null,

  // get card template
  templateRequest: ['templateId'],
  templateSuccess: null,
  templateFailure: null,

  // get course by template id
  courseRequest: ['payload'],
  courseSuccess: ['response'],
  courseFailure: null,

  cardusersRequest: ['payload'],
  cardusersSuccess: ['response'],
  cardusersFailure: null,

  createcardRequest: ['payload'],
  createcardSuccess: ['response'],
  createcardFailure: null,

  // Change Current Library Page
  lcurpageUpdate: ['id'],
  // Change Current Library Per Page
  lperpageUpdate: ['id'],

  // -----------   Career Page
  // Career Goals
  careergoalsRequest: ['id'],
  careergoalsSuccess: ['response'],
  careergoalsFailure: null,
  careergoalsaveRequest: ['id', 'data'],
  careergoalsaveSuccess: ['response'],
  careergoalsaveFailure: null,
  // Career Reports
  careerreportsRequest: ['companyId', 'userId'],
  careerreportsSuccess: ['response'],
  careerreportsFailure: null,

  // Career Tasks
  careertasksRequest: ['userId', 'perPage', 'page'],
  careertasksSuccess: ['response'],
  careertasksFailure: null,
  // Career Trainings
  careertrainingsRequest: ['userId', 'perPage', 'page'],
  careertrainingsSuccess: ['response'],
  careertrainingsFailure: null,

  // Individual Development Reports
  userreportsRequest: ['id'],
  userreportsSuccess: ['response'],
  userreportsFailure: null,

  // Team Development Reports
  teamreportsRequest: ['id'],
  teamreportsSuccess: ['response'],
  teamreportsFailure: null,

  // Feeds for Individual Reports
  reportsfeedsRequest: ['id', 'sort'],
  reportsfeedsSuccess: ['response', 'sort'],
  reportsfeedsFailure: null,

  // -----------   Archive Page
  archivefetchRequest: ['userId', 'perPage', 'page'],
  archivefetchSuccess: ['response'],
  archivefetchFailure: null,

  // Change Current Library Page
  acurpageUpdate: ['id'],
  // Change Current Library Per Page
  aperpageUpdate: ['id'],
})

export const DevTypes = Types
export default Creators
