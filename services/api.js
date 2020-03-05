// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { equals } from 'ramda'

const env = 'qa'
const Config = {
  API_URL: equals(env, 'qa')
    ? 'https://qa.hcm.drivingsales.com/api/'
    : 'https://hcm.drivingsales.com/api/',
  S3_URL: 'https://s3-us-west-2.amazonaws.com/',
  S3_API: equals(env, 'qa') ? 'hcm-qa.drivingsales.com-assets' : 'hcm.drivingsales.com-assets',
}

const authenticated = api => {
  api.setHeader('Authorization', 'Bearer ' + window.token)

  return api
}

const create = (baseURL = Config.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // 50 second timeout...
    timeout: 50000,
  })

  const s3API = apisauce.create({
    baseURL: Config.S3_URL,
    headers: {
      Accept: 'application/xml',
      'Content-Type': 'multipart/form-data',
    },
    // 50 second timeout...
    timeout: 50000,
  })

  // Login API
  const loginByEmail = payload => api.post('auth/login', payload)

  // card
  const getCardById = cardId => api.get(`cards/${cardId}`)

  // module update
  const updateModule = payload =>
    authenticated(api).post(`cards/${payload.id}/update`, payload.data)

  // Develop
  const getLearnFeed = (
    userId,
    perPage = 10,
    page = 1,
    assignType,
    order = 'due_at',
    sort = 'ASC'
  ) =>
    authenticated(api).get(
      `develop/learn/${userId}?per_page=${perPage}&page=${page}&assigned=${assignType}&order=${order}&sort=${sort}`
    )
  const updateCard = (event, cardId) => authenticated(api).post(`cards/${cardId}/event/${event}`)
  const getLibraries = companyId => authenticated(api).get(`develop/library/list/${companyId}`)
  const getCardTemplate = templateId => authenticated(api).get(`cards/template/${templateId}`)
  const getQuizQuestion = quizId => authenticated(api).get(`assessments/question/${quizId}`) // get question by quiz(assessment) id
  const submitAnswer = (quizId, payload) =>
    authenticated(api).post(`assessments/answer/${quizId}`, payload)
  const fileUpload = payload => s3API.post(Config.S3_API, payload)
  const getS3Info = () => authenticated(api).get('media/s3info')

  // Career
  const getCareerMap = companyId => authenticated(api).get(`standards/${companyId}`)
  const getCareerGoals = userId => authenticated(api).get(`users/${userId}/goals`)
  const postCareerGoals = (userId, data) =>
    authenticated(api).post(`users/${userId}/goals/save`, data)
  const getCareerReports = (companyId, userId) =>
    authenticated(api).get(`develop/career/${companyId}/${userId}`)

  // Reports
  const getUserReports = (userId, companyId) =>
    authenticated(api).get(`users/${userId}/user_development_report/${companyId}`)
  const getTeamReports = (userId, companyId) =>
    authenticated(api).get(`users/${userId}/team_development_report/${companyId}`)
  const getFeedsReports = (userId, sort) =>
    authenticated(api).get(`develop/learn/${userId}?per_page=5000&page=1&assigned=${sort}`)

  // Archive
  const getArchivedFeeds = (userId, perPage = 10, page = 1) =>
    authenticated(api).get(
      `develop/learn/${userId}?card_type_id=1&archived=1&per_page=${perPage}&page=${page}`
    )

  // Library
  const getLibraryCourses = templates => authenticated(api).post('develop/library', templates)
  const getCardUsers = companyId => authenticated(api).get(`users/manages/list/${companyId}`)
  const postLibraryCard = payload => authenticated(api).post('cards/create', payload)

  // Manage
  const getTasks = (userId, perPage, page) =>
    authenticated(api).get(`develop/tasks/${userId}?per_page=${perPage}&page=${page}`)
  const getHabits = (userId, perPage, page) =>
    authenticated(api).get(`develop/habits/${userId}?per_page=${perPage}&page=${page}`)
  const markasCompleted = (payload, cardInstanceId) =>
    authenticated(api).post(`/cards/${cardInstanceId}/event/${payload}`)
  const markasArchieved = (payload, cardInstanceId) =>
    authenticated(api).post(`/cards/${cardInstanceId}/event/${payload}`)
  const editCard = payload => authenticated(api).post('cards/create', payload)
  const deleteCard = cardInstanceId => authenticated(api).post(`/cards/${cardInstanceId}/delete`)
  const getTaskDetail = cardInstanceId => authenticated(api).get(`cards/${cardInstanceId}`)
  const addComment = payload => authenticated(api).post(`/comments/create`, payload)
  const getProjects = companyId => authenticated(api).get(`company/${companyId}/projects`)
  const getEmployees = companyId => authenticated(api).get(`users/manages/list/${companyId}`)

  // Add Tasks
  const addTasks = payload => authenticated(api).post('cards/create', payload)

  // Add Training
  const addTraining = payload => authenticated(api).post('cards/create', payload)

  // get Authors
  const getAuthors = companyId => authenticated(api).get(`develop/library/list/${companyId}`)
  //get Courses
  const getCourses = templates => authenticated(api).post('develop/library', templates)

  // get Projects
  const getProjectTasks = (companyId, projectId) =>
    authenticated(api).get(`company/${companyId}/projects/${projectId}/tasks`)

  const getTaskDetail = cardInstanceId => authenticated(api).get(`cards/${cardInstanceId}`)

  return {
    loginByEmail,

    // cards
    getCardById,

    // module
    updateModule,

    // Develop
    getLearnFeed,
    updateCard,
    getLibraries,
    getCardTemplate,
    getQuizQuestion,
    submitAnswer,

    // Career
    getCareerMap,
    getCareerGoals,
    postCareerGoals,
    getCareerReports,

    // Reports
    getUserReports,
    getTeamReports,
    getFeedsReports,

    // Library
    getLibraryCourses,
    getCardUsers,
    postLibraryCard,

    // Manage
    getTasks,
    getHabits,
    markasCompleted,
    markasArchieved,
    editCard,
    deleteCard,
    getTaskDetail,
    addComment,
    getProjects,
    getEmployees,
    getProjectTasks,

    // Task and Approval Task Detail
    getTaskDetail,

    // Add Tasks
    addTasks,
    //Add Training
    addTraining,
    getAuthors,
    getCourses,

    // File upload
    fileUpload,
    getS3Info,

    // Archived
    getArchivedFeeds,
  }
}

export default {
  create,
}
