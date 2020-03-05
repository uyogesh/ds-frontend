import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { MngTypes } from '../actions/manage'

const initialState = Immutable({
  tasksstatus: '',
  tasksCards: [],
  habitsstatus: '',
  habitsCards: [],
  tasksTotal: 0,
  taskType: 0,
  tasksComplete: 0,
  tasksPerPage: -1,
  tasksPage: 1,
  tasksTotalPages: 0,

  projectsstatus: '',
  projectsList: [],
  projectstasksstatus: '',
  projectTasks: [],
  currentproject: '',
  employeesstatus: '',
  authorstatus: '',
  coursestatus: '',
  taskDetail: null,
  openTaskDetail: false,
  openApprovalTaskDetail: false,
  loading: false,
})

// Tasks Page
const tasksfetchRequest = (state, action) => state.merge({ ...state, tasksstatus: 'pending' })
const tasksfetchSuccess = (state, action) =>
  state.merge({ ...state, tasksstatus: 'done', tasksCards: action.response })
const tasksfetchFailure = (state, action) => state.merge({ ...state, tasksstatus: 'error' })

// Pulling habits
const habitsfetchRequest = (state, action) => state.merge({ ...state, habitsstatus: 'pending' })
const habitsfetchSuccess = (state, action) =>
  state.merge({ ...state, habitsstatus: 'done', habitsCards: action.response })
const habitsfetchFailure = (state, action) => state.merge({ ...state, habitstatus: 'error' })

// Mark Complete
const markascompletedRequest = (state, action) =>
  state.merge({ ...state, markascompletedstatus: 'pending' })
const markascompletedSuccess = (state, action) =>
  state.merge({
    ...state,
    markascompletedstatus: 'done',
  })
const markascompletedFailure = (state, action) =>
  state.merge({ ...state, markascompletedstatus: 'error' })

// Mark Archive
const markasarchievedRequest = (state, action) =>
  state.merge({ ...state, markasarchievedstatus: 'pending' })
const markasarchievedSuccess = (state, action) =>
  state.merge({
    ...state,
    markasarchievedstatus: 'done',
  })
const markasarchievedFailure = (state, action) =>
  state.merge({ ...state, markasarchievedstatus: 'error' })

// Edit Card
const editcardRequest = (state, action) => state.merge({ ...state, editcardstatus: 'pending' })
const editcardSuccess = (state, action) =>
  state.merge({
    ...state,
    editcardstatus: 'done',
  })
const editcardFailure = (state, action) => state.merge({ ...state, editcardstatus: 'error' })

// Delete Card
const deletecardRequest = (state, action) => state.merge({ ...state, deletecardstatus: 'pending' })
const deletecardSuccess = (state, action) =>
  state.merge({
    ...state,
    deletecardstatus: 'done',
  })
const deletecardFailure = (state, action) => state.merge({ ...state, deletecardstatus: 'error' })

// Retrieving TaskDetail
const taskdetailfetchRequest = (state, action) =>
  state.merge({ ...state, tasksdetailstatus: 'pending' })
const taskdetailfetchSuccess = (state, action) =>
  state.merge({ ...state, tasksdetailstatus: 'done', taskdetail: action.response })
const taskdetailfetchFailure = (state, action) =>
  state.merge({ ...state, tasksdetailstatus: 'error' })

// Add Comment
const addcommentRequest = (state, action) => state.merge({ ...state, addcommentstatus: 'pending' })
const addcommentSuccess = (state, action) =>
  state.merge({
    ...state,
    addcommentstatus: 'done',
  })
const addcommentFailure = (state, action) => state.merge({ ...state, addcommentstatus: 'error' })

// Retrieving projects
const projectsfetchRequest = (state, action) => state.merge({ ...state, projectsstatus: 'pending' })
const projectsfetchSuccess = (state, action) =>
  state.merge({ ...state, projectsstatus: 'done', projectsList: action.response })
const projectsfetchFailure = (state, action) => state.merge({ ...state, projectsstatus: 'error' })

// Retrieving employees
const employeesfetchRequest = (state, action) =>
  state.merge({ ...state, employeesstatus: 'pending' })
const employeesfetchSuccess = (state, action) =>
  state.merge({ ...state, employeesstatus: 'done', employeesList: action.response })
const employeesfetchFailure = (state, action) => state.merge({ ...state, employeesstatus: 'error' })

// Adding Taks
const addtasksRequest = (state, action) => state.merge({ ...state, addtasksstatus: 'pending' })
const addtasksSuccess = (state, action) =>
  state.merge({
    ...state,
    addtasksstatus: 'done',
  })
const addtasksFailure = (state, action) => state.merge({ ...state, addtasksstatus: 'error' })

// file upload
const uploadfileRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const uploadfileSuccess = (state, action) =>
  state.merge({ ...state, status: 'done', learnUploadURL: action.response })
const uploadfileFailure = (state, action) => state.merge({ ...state, status: 'error' })

// Retrieving authors
const authorsfetchRequest = (state, action) => state.merge({ ...state, authorstatus: 'pending' })
const authorsfetchSuccess = (state, action) =>
  state.merge({ ...state, authorstatus: 'done', authorsList: action.response })
const authorsfetchFailure = (state, action) => state.merge({ ...state, authorstatus: 'error' })

// retrieving Courses
const coursesfetchRequest = (state, action) => state.merge({ ...state, coursestatus: 'pending' })
const coursesfetchSuccess = (state, action) =>
  state.merge({ ...state, coursestatus: 'done', coursesList: action.response })
const coursesfetchFailure = (state, action) => state.merge({ ...state, coursestatus: 'error' })

// Adding Taks
const addtrainingRequest = (state, action) =>
  state.merge({ ...state, addtrainingstatus: 'pending' })
const addtrainingSuccess = (state, action) =>
  state.merge({
    ...state,
    addtrainingstatus: 'done',
  })
const addtrainingFailure = (state, action) => state.merge({ ...state, addtrainingstatus: 'error' })

// Projects Page
const projectsdetailfetchRequest = (state, action) =>
  state.merge({
    ...state,
    projectstasksstatus: 'pending',
  })
const projectsdetailfetchSuccess = (state, action) =>
  state.merge({
    ...state,
    projectTasks: action.response,
  })
const projectdetailfetchComplete = (state, action) =>
  state.merge({
    ...state,
    projectstasksstatus: 'done',
  })
const changeSelectedProject = (state, action) =>
  state.merge({
    ...state,
    currentproject: action.projectId,
  })

// Fetch (Approval) Task Details
const fetchTaskDetail = (state, action) =>
  state.merge({
    ...state,
    loading: true,
  })
const fetchApprovalTaskDetail = (state, action) =>
  state.merge({
    ...state,
    loading: true,
  })
const fetchtaskdetailSuccess = (state, action) =>
  state.merge({
    ...state,
    taskDetail: action.response,
    openTaskDetail: true,
    loading: false,
  })
const fetchapprovaltaskdetailSuccess = (state, action) =>
  state.merge({
    ...state,
    taskDetail: action.response,
    openApprovalTaskDetail: true,
    loading: false,
  })
const fetchtaskdetailFailure = (state, action) =>
  state.merge({
    ...state,
    loading: false,
  })
const fetchapprovaltaskdetailFailure = (state, action) =>
  state.merge({
    ...state,
    loading: false,
  })
const clearTaskDetail = (state, action) =>
  state.merge({
    ...state,
    taskDetail: null,
    openApprovalTaskDetail: false,
    openTaskDetail: false,
  })
const clearProjectTaskList = (state, action) =>
  state.merge({
    ...state,
    projectsList: [],
  })

export const reducer = createReducer(initialState, {
  // Tasks Page
  [MngTypes.TASKSFETCH_REQUEST]: tasksfetchRequest,
  [MngTypes.TASKSFETCH_SUCCESS]: tasksfetchSuccess,
  [MngTypes.TASKSFETCH_FAILURE]: tasksfetchFailure,

  // Habits
  [MngTypes.HABITSFETCH_REQUEST]: habitsfetchRequest,
  [MngTypes.HABITSFETCH_SUCCESS]: habitsfetchSuccess,
  [MngTypes.HABITSFETCH_FAILURE]: habitsfetchFailure,

  // Mark Completed
  [MngTypes.MARKASCOMPLETED_REQUEST]: markascompletedRequest,
  [MngTypes.MARKASCOMPLETED_SUCCESS]: markascompletedSuccess,
  [MngTypes.MARKASCOMPLETED_FAILURE]: markascompletedFailure,

  //Mark Archieved
  [MngTypes.MARKASARCHIEVED_REQUEST]: markasarchievedRequest,
  [MngTypes.MARKASARCHIEVED_SUCCESS]: markasarchievedSuccess,
  [MngTypes.MARKASARCHIEVED_FAILURE]: markasarchievedFailure,

  //Edit card
  [MngTypes.EDITCARD_REQUEST]: editcardRequest,
  [MngTypes.EDITCARD_SUCCESS]: editcardSuccess,
  [MngTypes.EDITCARD_FAILURE]: editcardFailure,

  //Delete card
  [MngTypes.DELETECARD_REQUEST]: deletecardRequest,
  [MngTypes.DELETECARD_SUCCESS]: deletecardSuccess,
  [MngTypes.DELETECARD_FAILURE]: deletecardFailure,

  //Task Detail
  [MngTypes.TASKDETAILFETCH_REQUEST]: taskdetailfetchRequest,
  [MngTypes.TASKDETAILFETCH_SUCCESS]: taskdetailfetchSuccess,
  [MngTypes.TASKDETAILFETCH_FAILURE]: taskdetailfetchFailure,

  // Add Comment
  [MngTypes.ADDCOMMENT_REQUEST]: addcommentRequest,
  [MngTypes.ADDCOMMENT_SUCCESS]: addcommentSuccess,
  [MngTypes.ADDCOMMENT_FAILURE]: addcommentFailure,

  // Add Tasks
  [MngTypes.PROJECTSFETCH_REQUEST]: projectsfetchRequest,
  [MngTypes.PROJECTSFETCH_SUCCESS]: projectsfetchSuccess,
  [MngTypes.PROJECTSFETCH_FAILURE]: projectsfetchFailure,
  [MngTypes.EMPLOYEESFETCH_REQUEST]: employeesfetchRequest,
  [MngTypes.EMPLOYEESFETCH_SUCCESS]: employeesfetchSuccess,
  [MngTypes.EMPLOYEESFETCH_FAILURE]: employeesfetchFailure,
  [MngTypes.ADDTASKS_REQUEST]: addtasksRequest,
  [MngTypes.ADDTASKS_SUCCESS]: addtasksSuccess,
  [MngTypes.ADDTASKS_FAILURE]: addtasksFailure,

  // upload file
  [MngTypes.UPLOADFILE_REQUEST]: uploadfileRequest,
  [MngTypes.UPLOADFILE_SUCCESS]: uploadfileSuccess,
  [MngTypes.UPLOADFILE_FAILURE]: uploadfileFailure,

  //Add Training
  [MngTypes.AUTHORSFETCH_REQUEST]: authorsfetchRequest,
  [MngTypes.AUTHORSFETCH_SUCCESS]: authorsfetchSuccess,
  [MngTypes.AUTHORSFETCH_FAILURE]: authorsfetchFailure,
  [MngTypes.COURSESFETCH_REQUEST]: coursesfetchRequest,
  [MngTypes.COURSESFETCH_SUCCESS]: coursesfetchSuccess,
  [MngTypes.COURSESFETCH_FAILURE]: coursesfetchFailure,
  [MngTypes.ADDTRAINING_REQUEST]: addtrainingRequest,
  [MngTypes.ADDTRAINING_SUCCESS]: addtrainingSuccess,
  [MngTypes.ADDTRAINING_FAILURE]: addtrainingFailure,

  // Projects page
  [MngTypes.PROJECTSDETAILFETCH_SUCCESS]: projectsdetailfetchSuccess,
  [MngTypes.PROJECTDETAILFETCH_COMPLETE]: projectdetailfetchComplete,
  [MngTypes.CHANGE_SELECTED_PROJECT]: changeSelectedProject,
  [MngTypes.PROJECTSDETAILFETCH_REQUEST]: projectsdetailfetchRequest,
  [MngTypes.CLEAR_PROJECT_TASK_LIST]: clearProjectTaskList,

  // Task Details and Approval Task detail Modals
  [MngTypes.TASKDETAILFETCH_REQUEST]: fetchTaskDetail,
  [MngTypes.APPROVALTASKDETAILFETCH_REQUEST]: fetchApprovalTaskDetail,
  [MngTypes.TASKDETAILFETCH_SUCCESS]: fetchtaskdetailSuccess,
  [MngTypes.APPROVALTASKDETAILFETCH_SUCCESS]: fetchapprovaltaskdetailSuccess,
  [MngTypes.TASKDETAILFETCH_FAILURE]: fetchtaskdetailFailure,
  [MngTypes.CLEAR_TASK_DETAIL]: clearTaskDetail,
})
