import { takeEvery, takeLatest, all } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import API from '../services/api'

import { AppTypes } from '../actions/app'
import { DevTypes } from '../actions/develop'
import { MngTypes } from '../actions/manage'

import { loginRequest } from './app'
import { locationRequest } from './route'
import {
  feedsRequest,
  libraryRequest,
  courseRequest,
  questionRequest,
  answerRequest,
  careergoalsGet,
  careergoalsPost,
  careerreportsGet,
  careertasksGet,
  careertrainingsGet,
  userreportsRequest,
  teamreportsRequest,
  reportsfeedsRequest,
  uploadRequest,
  archivefetchRequest,
  updateModuleRequest,
  updateCardRequest,
  cardusersRequest,
  createcardRequest,
} from './develop'
import {
  tasksfetchRequest,
  habitsfetchRequest,
  markascompletedRequest,
  markasarchievedRequest,
  editcardRequest,
  deletecardRequest,
  taskdetailfetchRequest,
  addcommentRequest,
  projectsfetchRequest,
  employeesfetchRequest,
  addtasksRequest,
  uploadfileRequest,
  authorsfetchRequest,
  coursesfetchRequest,
  addtrainingRequest,
  fetchProjectTaskList,
  approvaltaskdetailfetchRequest,
} from './manage'

const api = API.create()

export default function* root() {
  yield all([
    // ------------------------- Develop Sagas
    takeLatest(LOCATION_CHANGE, locationRequest, api),
    takeLatest(AppTypes.LOGIN_REQUEST, loginRequest, api),
    takeLatest(DevTypes.FEEDS_REQUEST, feedsRequest, api),
    takeLatest(DevTypes.CARDUPDATE_REQUEST, updateCardRequest, api),
    takeLatest(DevTypes.LIBRARY_REQUEST, libraryRequest, api),
    takeLatest(DevTypes.COURSE_REQUEST, courseRequest, api),
    takeLatest(DevTypes.QUESTION_REQUEST, questionRequest, api),
    takeLatest(DevTypes.ANSWER_REQUEST, answerRequest, api),
    takeLatest(DevTypes.CAREERGOALS_REQUEST, careergoalsGet, api),
    takeLatest(DevTypes.CAREERGOALSAVE_REQUEST, careergoalsPost, api),
    takeLatest(DevTypes.CAREERREPORTS_REQUEST, careerreportsGet, api),
    takeLatest(DevTypes.CAREERTASKS_REQUEST, careertasksGet, api),
    takeLatest(DevTypes.CAREERTRAININGS_REQUEST, careertrainingsGet, api),
    takeLatest(DevTypes.USERREPORTS_REQUEST, userreportsRequest, api),
    takeLatest(DevTypes.TEAMREPORTS_REQUEST, teamreportsRequest, api),
    takeEvery(DevTypes.REPORTSFEEDS_REQUEST, reportsfeedsRequest, api),
    takeLatest(DevTypes.UPLOAD_REQUEST, uploadRequest, api),
    takeLatest(DevTypes.ARCHIVEFETCH_REQUEST, archivefetchRequest, api),
    takeLatest(DevTypes.UPDATEMODULE_REQUEST, updateModuleRequest, api),
    takeLatest(DevTypes.CARDUSERS_REQUEST, cardusersRequest, api),
    takeLatest(DevTypes.CREATECARD_REQUEST, createcardRequest, api),
    // --------------------------- Manage Sagas
    takeLatest(MngTypes.TASKSFETCH_REQUEST, tasksfetchRequest, api),
    takeLatest(MngTypes.HABITSFETCH_REQUEST, habitsfetchRequest, api),
    takeLatest(MngTypes.MARKASCOMPLETED_REQUEST, markascompletedRequest, api),
    takeLatest(MngTypes.MARKASARCHIEVED_REQUEST, markasarchievedRequest, api),
    takeLatest(MngTypes.EDITCARD_REQUEST, editcardRequest, api),
    takeLatest(MngTypes.DELETECARD_REQUEST, deletecardRequest, api),
    takeLatest(MngTypes.TASKDETAILFETCH_REQUEST, taskdetailfetchRequest, api),
    takeLatest(MngTypes.ADDCOMMENT_REQUEST, addcommentRequest, api),
    takeLatest(MngTypes.PROJECTSFETCH_REQUEST, projectsfetchRequest, api),
    takeLatest(MngTypes.EMPLOYEESFETCH_REQUEST, employeesfetchRequest, api),
    takeLatest(MngTypes.ADDTASKS_REQUEST, addtasksRequest, api),
    takeLatest(MngTypes.UPLOADFILE_REQUEST, uploadfileRequest, api),
    takeLatest(MngTypes.AUTHORSFETCH_REQUEST, authorsfetchRequest, api),
    takeLatest(MngTypes.COURSESFETCH_REQUEST, coursesfetchRequest, api),
    takeLatest(MngTypes.ADDTRAINING_REQUEST, addtrainingRequest, api),
    takeLatest(MngTypes.PROJECTSDETAILFETCH_REQUEST, fetchProjectTaskList, api),
    takeLatest(MngTypes.TASKDETAILFETCH_REQUEST, taskdetailfetchRequest, api),
    takeLatest(MngTypes.APPROVALTASKDETAILFETCH_REQUEST, approvaltaskdetailfetchRequest, api),
  ])
}
