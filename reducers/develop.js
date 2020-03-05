import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { equals, values } from 'ramda'
import { DevTypes } from '../actions/develop'

const initialState = Immutable({
  status: '',
  learnType: 0,
  learnCards: [],
  learnComplete: 0,
  learnTotal: 0,
  learnPerPage: 10,
  learnPage: 1,
  learnTotalPages: 0,
  learnShowMode: 'grid',
  learnQuizQuestions: {
    num: 1,
    type: 1,
    options: [],
    title: '',
    completed: false,
  },
  learnQuizAnswers: {
    correct: 1,
    answer: '',
    error: false,
  },
  learnCurrentCourse: null,
  learnCurrentModule: null,
  learnUploadURL: '',
  learnVideoState: {},

  libraryCourses: [],
  libraryLists: [],
  librarySelectedIds: null,
  libraryPerPage: 10,
  libraryCurPage: 1,
  libraryTotal: 0,
  libraryTotalCourses: 0,
  libraryTotalModules: 0,
  libraryUsers: [],

  reportsUsers: [],
  reportsCareers: {},
  reportsManagers: {},
  reportsSelfs: {},

  careerPrograms: [],
  careerRequirements: [],
  careerHabits: [],
  careerDevelopments: [],
  careerGoals: [],
  careerTasks: [],
  careerTrainings: [],

  archivedFeeds: [],
  archiveTotal: 0,
  archiveCurPage: 0,
  archivePerPage: 10,
})

// Learn Page
const fetchRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const fetchSuccess = (state, action) => state.merge({ ...state, status: 'done' })
const fetchFailure = (state, action) => state.merge({ ...state, status: 'error' })

const feedsRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const feedsSuccess = (state, action) => {
  // eslint-disable-next-line camelcase
  const { data, current_page, per_page, last_page, total } = action.response
  return state.merge({
    ...state,
    status: 'done',
    learnCards: data,
    learnPage: current_page,
    learnPerPage: Number(per_page),
    learnTotalPages: last_page,
    learnTotal: total,
  })
}
const feedsFailure = (state, action) => state.merge({ ...state, status: 'error' })

// current course & module
const setcurrentCourse = (state, action) =>
  state.merge({ ...state, learnCurrentCourse: action.course })
const setcurrentModule = (state, action) =>
  state.merge({ ...state, learnCurrentModule: action.card })
const setVideoState = (state, action) =>
  state.merge({ ...state, learnVideoState: action.cardState })

// update card with card id
const cardUpdateRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const cardUpdateSuccess = (state, action) => state.merge({ ...state, status: 'done' })
const cardUpdateFailure = (state, action) => state.merge({ ...state, status: 'error' })

// update cards of learn feed
const learnCardsUpdate = (state, action) => state.merge({ ...state, learnCards: action.cards })

// quiz module
const questionRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const questionSuccess = (state, action) =>
  state.merge({ ...state, status: 'done', learnQuizQuestions: action.response })
const questionFailure = (state, action) => state.merge({ ...state, status: 'error' })

const answerRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const answerSuccess = (state, action) =>
  state.merge({ ...state, status: 'done', learnQuizAnswers: action.response })
const answerFailure = (state, action) => state.merge({ ...state, status: 'error' })

// file upload
const uploadRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const uploadSuccess = (state, action) =>
  state.merge({ ...state, status: 'done', learnUploadURL: action.response })
const uploadFailure = (state, action) => state.merge({ ...state, status: 'error' })

// module update
const updatemoduleRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const updatemoduleSuccess = (state, action) =>
  state.merge({ ...state, status: 'done', learnCurrentModule: action.response })
const updatemoduleFailure = (state, action) => state.merge({ ...state, status: 'error' })

// -------------------- //

const ctypeUpdate = (state, action) => state.merge({ ...state, learnType: action.id })
const cshowModeUpdate = (state, action) => state.merge({ ...state, learnShowMode: action.showMode })

// Library Page
const libraryRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const librarySuccess = (state, action) => {
  return state.merge({
    ...state,
    status: 'done',
    libraryLists: action.response.libraryLists,
    librarySelectedIds: action.response.librarySelectedIds,
    libraryTotalCourses: action.response.libraryTotalCourses,
    libraryTotalModules: action.response.libraryTotalModules,
  })
}
const libraryFailure = (state, action) => state.merge({ ...state, status: 'error' })

const cardusersRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const cardusersSuccess = (state, action) =>
  state.merge({ ...state, status: 'done', libraryUsers: action.response })
const cardusersFailure = (state, action) => state.merge({ ...state, status: 'error' })

const createcardRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const createcardSuccees = (state, action) => state.merge({ ...state, status: 'done' })
const createcardFailure = (state, action) => state.merge({ ...state, status: 'error' })

const lcurpageUpdate = (state, action) => state.merge({ ...state, libraryCurPage: action.id })
const lperageUpdate = (state, action) => state.merge({ ...state, libraryPerPage: action.id })
const ltypeUpdate = (state, action) => {
  let librarySelect = state.librarySelect
  const item = { type: action.typeId, subtype: action.subtypeId }
  if (any(el => el.type == item.type && el.subtype === item.subtype)(librarySelect)) {
    librarySelect = filter(
      el => el.type !== item.type || el.subtype !== item.subtype,
      librarySelect
    )
  } else {
    librarySelect = librarySelect.concat([item])
  }

  return state.merge({
    ...status,
    libraryType: action.typeId,
    librarySubType: action.subtypeId,
    librarySelect,
  })
}

// get courses detail
const courseRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const courseSuccess = (state, action) => {
  const { allCourses, totalCourses, totalModules, feeds } = action.response
  return state.merge({
    ...state,
    status: 'done',
    libraryCourses: allCourses,
    libraryTotalCourses: totalCourses,
    libraryTotalModules: totalModules,
    librarySelectedIds: feeds,
  })
}
const courseFailure = (state, action) => state.merge({ ...state, status: 'error' })

// Career Page

// Career Goals
const careergoalsRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const careergoalsSuccess = (state, action) => {
  const { response } = action
  return state.merge({ ...state, status: 'done', careerGoals: response })
}
const careergoalsFailure = (state, action) => state.merge({ ...state, status: 'error' })

const careergoalsaveRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const careergoalsaveSuccess = (state, action) => {
  const { response } = action
  return state.merge({ ...state, status: 'done', careerGoals: response })
}
const careergoalsaveFailure = (state, action) => state.merge({ ...state, status: 'error' })

const careerreportsRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const careerreportsSuccess = (state, action) => {
  const { programs, requirements, habits, developments } = action.response
  return state.merge({
    ...state,
    status: 'done',
    careerPrograms: programs,
    careerRequirements: requirements,
    careerHabits: habits,
    careerDevelopments: developments,
  })
}
const careerreportsFailure = (state, action) => state.merge({ ...state, status: 'error' })

const careertasksRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const careertasksSuccess = (state, action) => {
  const { response } = action
  return state.merge({ ...state, status: 'done', careerTasks: response.data })
}
const careertasksFailure = (state, action) => state.merge({ ...state, status: 'error' })

const careertrainingsRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const careertrainingsSuccess = (state, action) => {
  const { response } = action
  return state.merge({ ...state, status: 'done', careerTrainings: response.data })
}
const careertrainingsFailure = (state, action) => state.merge({ ...state, status: 'error' })

// User Development Reports
const userreportsRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const userreportsSuccess = (state, action) => {
  const { response } = action
  return state.merge({ ...state, status: 'done', reportsUsers: values(response.users) })
}
const userreportsFailure = (state, action) => state.merge({ ...state, status: 'error' })

// Team Development Reports
const teamreportsRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const teamreportsSuccess = (state, action) => {
  // const { response } = action
  return state.merge({ ...state, status: 'done' })
}
const teamreportsFailure = (state, action) => state.merge({ ...state, status: 'pending' })

// Feeds for Individual Development Reports
const reportsfeedsRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const reportsfeedsSuccess = (state, action) => {
  const { response, sort } = action
  if (equals(sort, 'career')) {
    return state.merge({ ...state, status: 'done', reportsCareers: response })
  } else if (equals(sort, 'manager')) {
    return state.merge({ ...state, status: 'done', reportsManagers: response })
  } else {
    return state.merge({ ...state, status: 'done', reportsSelfs: response })
  }
}
const reportsfeedsFailure = (state, action) => state.merge({ ...state, status: 'error' })

// -------------- Archive Page
const archivefetchRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const archivefetchSuccess = (state, action) => {
  const { response } = action
  return state.merge({
    ...state,
    status: 'done',
    archivedFeeds: response.data,
    archiveTotal: response.total,
  })
}
const archivefetchFailure = (state, action) => state.merge({ ...state, status: 'error' })

const acurpageUpdate = (state, action) => state.merge({ ...state, archiveCurPage: action.id })
const aperageUpdate = (state, action) => state.merge({ ...state, archivePerPage: action.id })

export const reducer = createReducer(initialState, {
  // Learn Page
  [DevTypes.FETCH_REQUEST]: fetchRequest,
  [DevTypes.FETCH_SUCCESS]: fetchSuccess,
  [DevTypes.FETCH_FAILURE]: fetchFailure,

  [DevTypes.FEEDS_REQUEST]: feedsRequest,
  [DevTypes.FEEDS_SUCCESS]: feedsSuccess,
  [DevTypes.FEEDS_FAILURE]: feedsFailure,

  [DevTypes.SETCURRENT_COURSE]: setcurrentCourse,
  [DevTypes.SETCURRENT_MODULE]: setcurrentModule,
  [DevTypes.SETVIDEO_STATE]: setVideoState,

  [DevTypes.CARDUPDATE_REQUEST]: cardUpdateRequest,
  [DevTypes.CARDUPDATE_SUCCESS]: cardUpdateSuccess,
  [DevTypes.CARDUPDATE_FAILURE]: cardUpdateFailure,

  [DevTypes.LCARDUPDATE_REQUEST]: learnCardsUpdate,

  [DevTypes.QUESTION_REQUEST]: questionRequest,
  [DevTypes.QUESTION_SUCCESS]: questionSuccess,
  [DevTypes.QUESTION_FAILURE]: questionFailure,

  [DevTypes.ANSWER_REQUEST]: answerRequest,
  [DevTypes.ANSWER_SUCCESS]: answerSuccess,
  [DevTypes.ANSWER_FAILURE]: answerFailure,

  [DevTypes.CTYPE_UPDATE]: ctypeUpdate,
  [DevTypes.CSHOWMODE_UPDATE]: cshowModeUpdate,

  // update module
  [DevTypes.UPDATEMODULE_REQUEST]: updatemoduleRequest,
  [DevTypes.UPDATEMODULE_SUCCESS]: updatemoduleSuccess,
  [DevTypes.UPDATEMODULE_FAILURE]: updatemoduleFailure,

  // upload file
  [DevTypes.UPLOAD_REQUEST]: uploadRequest,
  [DevTypes.UPLOAD_SUCCESS]: uploadSuccess,
  [DevTypes.UPLOAD_FAILURE]: uploadFailure,

  // Library Page
  [DevTypes.LIBRARY_REQUEST]: libraryRequest,
  [DevTypes.LIBRARY_SUCCESS]: librarySuccess,
  [DevTypes.LIBRARY_FAILURE]: libraryFailure,

  [DevTypes.CARDUSERS_REQUEST]: cardusersRequest,
  [DevTypes.CARDUSERS_SUCCESS]: cardusersSuccess,
  [DevTypes.CARDUSERS_FAILURE]: cardusersFailure,

  [DevTypes.CREATECARD_REQUEST]: createcardRequest,
  [DevTypes.CREATECARD_SUCCESS]: createcardSuccees,
  [DevTypes.CREATECARD_FAILURE]: createcardFailure,

  [DevTypes.LCURPAGE_UPDATE]: lcurpageUpdate,
  [DevTypes.LPERPAGE_UPDATE]: lperageUpdate,

  // get courses detail
  [DevTypes.COURSE_REQUEST]: courseRequest,
  [DevTypes.COURSE_SUCCESS]: courseSuccess,
  [DevTypes.COURSE_FAILURE]: courseFailure,

  // Career Page
  // Career Goals
  [DevTypes.CAREERGOALS_REQUEST]: careergoalsRequest,
  [DevTypes.CAREERGOALS_SUCCESS]: careergoalsSuccess,
  [DevTypes.CAREERGOALS_FAILURE]: careergoalsFailure,
  [DevTypes.CAREERGOALSAVE_REQUEST]: careergoalsaveRequest,
  [DevTypes.CAREERGOALSAVE_SUCCESS]: careergoalsaveSuccess,
  [DevTypes.CAREERGOALSAVE_FAILURE]: careergoalsaveFailure,
  // Career Reports
  [DevTypes.CAREERREPORTS_REQUEST]: careerreportsRequest,
  [DevTypes.CAREERREPORTS_SUCCESS]: careerreportsSuccess,
  [DevTypes.CAREERREPORTS_FAILURE]: careerreportsFailure,
  // Career Tasks
  [DevTypes.CAREERTASKS_REQUEST]: careertasksRequest,
  [DevTypes.CAREERTASKS_SUCCESS]: careertasksSuccess,
  [DevTypes.CAREERTASKS_FAILURE]: careertasksFailure,
  // Career Training
  [DevTypes.CAREERTRAININGS_REQUEST]: careertrainingsRequest,
  [DevTypes.CAREERTRAININGS_SUCCESS]: careertrainingsSuccess,
  [DevTypes.CAREERTRAININGS_FAILURE]: careertrainingsFailure,

  // User Development Reports
  [DevTypes.USERREPORTS_REQUEST]: userreportsRequest,
  [DevTypes.USERREPORTS_SUCCESS]: userreportsSuccess,
  [DevTypes.USERREPORTS_FAILURE]: userreportsFailure,

  // Team Development Reports
  [DevTypes.TEAMREPORTS_REQUEST]: teamreportsRequest,
  [DevTypes.TEAMREPORTS_SUCCESS]: teamreportsSuccess,
  [DevTypes.TEAMREPORTS_FAILURE]: teamreportsFailure,

  // Feeds for Individual Reports
  [DevTypes.REPORTSFEEDS_REQUEST]: reportsfeedsRequest,
  [DevTypes.REPORTSFEEDS_SUCCESS]: reportsfeedsSuccess,
  [DevTypes.REPORTSFEEDS_FAILURE]: reportsfeedsFailure,

  // Archive Page
  [DevTypes.ARCHIVEFETCH_REQUEST]: archivefetchRequest,
  [DevTypes.ARCHIVEFETCH_SUCCESS]: archivefetchSuccess,
  [DevTypes.ARCHIVEFETCH_FAILURE]: archivefetchFailure,

  [DevTypes.ACURPAGE_UPDATE]: acurpageUpdate,
  [DevTypes.APERPAGE_UPDATE]: aperageUpdate,
})
