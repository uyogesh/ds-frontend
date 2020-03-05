import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  //Pulling tasks
  tasksfetchRequest: ['userId', 'perPage', 'page'],
  tasksfetchSuccess: ['response'],
  tasksfetchFailure: null,

  //Pulling habits
  habitsfetchRequest: ['userId', 'perPage', 'page'],
  habitsfetchSuccess: ['response'],
  habitsfetchFailure: null,

  //Mark Completed
  markascompletedRequest: ['payload', 'cardInstanceId'],
  markascompletedSuccess: ['response'],
  markascompletedFailure: null,

  //Mark Archieved
  markasarchievedRequest: ['payload', 'cardInstanceId'],
  markasarchievedSuccess: ['response'],
  markasarchievedFailure: null,

  //Edit card
  editcardRequest: ['payload', 'cardInstanceId'],
  editcardSuccess: ['response'],
  editcardFailure: null,

  //Delete Card
  deletecardRequest: ['cardInstanceId'],
  deletecardSuccess: ['response'],
  deletecardFailure: null,

  //Pulling Task detail
  taskdetailfetchRequest: ['cardInstanceId'],
  taskdetailfetchSuccess: ['response'],
  taskdetailfetchFailure: null,

  // Add comment
  addcommentRequest: ['payload', 'cardInstanceId'],
  addcommentSuccess: ['response'],
  addcommentFailure: null,

  // Pulling Projects
  projectsfetchRequest: ['companyId'],
  projectsfetchSuccess: ['response'],
  projectsfetchFailure: null,

  // Pulling Tasks Within Projects
  projectsdetailfetchRequest: null,
  projectsdetailfetchSuccess: ['response'],
  projectdetailfetchComplete: null, // This action is needed because, multiple fetch to different url is done to get all project wise tasks
  projectsdetailfetchFailure: null,
  changeSelectedProject: ['projectId'],
  clearProjectTaskList: null,

  // Pulling list of employees current user manages
  employeesfetchRequest: ['companyId'],
  employeesfetchSuccess: ['response'],
  employeesfetchFailure: null,

  // Adding Tasks
  addtasksRequest: ['payload', 'userId'],
  addtasksSuccess: ['response'],
  addtasksFailure: null,

  // upload file
  uploadfileRequest: ['payload'],
  uploadfileSuccess: ['response'],
  uploadfileFailure: null,

  // Pulling Authors
  authorsfetchRequest: ['companyId'],
  authorsfetchSuccess: ['response'],
  authorsfetchFailure: null,

  // pulling Courses
  coursesfetchRequest: ['payload'],
  coursesfetchSuccess: ['response'],
  coursesfetchFailure: null,

  // Add Trainings
  addtrainingRequest: ['payload', 'userId', 'coursesSelected'],
  addtrainingSuccess: ['response'],
  addtrainingFailure: null,
})

export const MngTypes = Types
export default Creators
