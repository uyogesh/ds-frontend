import { put, select, call, all, fork } from 'redux-saga/effects'
import xmljs from 'xml-js'
import { indexOf, isNil, isEmpty, uniq } from 'ramda'
import { push } from 'connected-react-router'
import { assetsURL } from '../services/config'
import MngActions from '../actions/manage'

export function* tasksfetchRequest(api, action) {
  const { userId, perPage, page } = action

  const response = yield api.getTasks(userId, perPage, page)

  if (response.ok) {
    yield put(MngActions.tasksfetchSuccess(response.data))
  } else {
    yield put(MngActions.tasksfetchFailure())
  }
}

export function* habitsfetchRequest(api, action) {
  const { userId, perPage, page } = action
  const response = yield api.getHabits(userId, perPage, page)

  if (response.ok) {
    yield put(MngActions.habitsfetchSuccess(response.data))
  } else {
    yield put(MngActions.habitsfetchFailure())
  }
}

// retrieve Task Detail
export function* taskdetailfetchRequest(api, action) {
  const { cardInstanceId } = action
  const response = yield api.getTaskDetail(cardInstanceId)

  if (response.ok) {
    yield put(MngActions.taskdetailfetchSuccess(response.data))
  } else {
    yield put(MngActions.taskdetailfetchFailure())
  }
}
// Mark Completed
export function* markascompletedRequest(api, action) {
  const { payload, cardInstanceId } = action
  const response = yield api.markasCompleted(payload, cardInstanceId)
  if (response.ok) {
    yield put(MngActions.markascompletedSuccess(response.data))
    alert('This task is marked as completed ') // eslint-disable-line
    yield put(push('/manage'))
  } else {
    yield put(MngActions.markascompletedFailure())
  }
}
// Mark Archieved
export function* markasarchievedRequest(api, action) {
  const { payload, cardInstanceId } = action
  const response = yield api.markasArchieved(payload, cardInstanceId)
  if (response.ok) {
    yield put(MngActions.markasarchievedSuccess(response.data))
    alert('This task is marked as archieved ') // eslint-disable-line
    yield put(push('/manage'))
  } else {
    yield put(MngActions.markasarchievedFailure())
  }
}

// Edit Card
export function* editcardRequest(api, action) {
  const { payload, userId } = action
  let finalData = {
    card: {
      card_type_id: 8,
      parent_id: null,
      data: {},
    },
    user_id: userId,
    save_template: true,
  }
  finalData.card.data.body = payload
  const response = yield api.editCard(finalData)
  if (response.ok) {
    yield put(MngActions.editcardSuccess(response.data))
    alert('Card is updated Successfully ') // eslint-disable-line
    yield put(push('/manage'))
  } else {
    yield put(MngActions.editcardFailure())
  }
}

// Mark Archieved
export function* deletecardRequest(api, action) {
  const { cardInstanceId } = action
  const response = yield api.deleteCard(cardInstanceId)
  if (response.ok) {
    yield put(MngActions.deletecardSuccess(response.data))
    alert('Card is deleted successfully ') // eslint-disable-line
    yield put(push('/manage'))
  } else {
    yield put(MngActions.deletecardFailure())
  }
}

// Add Comment
export function* addcommentRequest(api, action) {
  const { payload, cardInstanceId } = action
  let finalData = {
    comment: {
      card_instance_id: cardInstanceId,
      data: {},
    },
  }
  finalData.comment.data.body = payload
  const response = yield api.addComment(finalData)
  if (response.ok) {
    yield put(MngActions.addcommentSuccess(response.data))
    alert('Comment is added Successfully ') // eslint-disable-line
    yield put(push('/manage'))
  } else {
    yield put(MngActions.addcommentFailure())
  }
}

// retrieve projects
export function* projectsfetchRequest(api, action) {
  const { companyId } = action
  const response = yield api.getProjects(companyId)

  if (response.ok) {
    yield put(MngActions.projectsfetchSuccess(response.data))
  } else {
    yield put(MngActions.projectsfetchFailure())
  }
}

// retrieve employees
export function* employeesfetchRequest(api, action) {
  const { companyId } = action
  const response = yield api.getEmployees(companyId)

  if (response.ok) {
    yield put(MngActions.employeesfetchSuccess(response.data.users))
  } else {
    yield put(MngActions.employeesfetchFailure())
  }
}

// Add Tasks
export function* addtasksRequest(api, action) {
  const { payload, userId } = action
  let finalData = {
    card: {
      card_type_id: 8,
      parent_id: null,
      data: {},
    },
    user_id: userId,
    save_template: true,
  }
  finalData.card.data.body = payload
  const response = yield api.addTasks(finalData)
  if (response.ok) {
    yield put(MngActions.addtasksSuccess(response.data))
    alert('Task is added Successfully ') // eslint-disable-line
    yield put(push('/manage'))
  } else {
    yield put(MngActions.addtasksFailure())
  }
}

export function* uploadfileRequest(api, action) {
  const { payload } = action
  const res = yield api.getS3Info()

  if (res.ok) {
    // eslint-disable-next-line no-undef
    const formData = new FormData()
    for (const key in res.data.inputs) {
      formData.append(key, res.data.inputs[key])
    }
    formData.set('Content-Type', payload.type)
    formData.append('key', `attachments/${payload.attachment_hash}/${payload.name}`)
    formData.append('file', payload)
    const response = yield api.fileUpload(formData)

    if (response.ok) {
      const data = xmljs.xml2json(response.data, { compact: true, ignoreDeclaration: true })
      const url = JSON.parse(data).PostResponse.Location._text
      yield put(MngActions.uploadfileSuccess(url))
    } else {
      yield put(MngActions.uploadfileFailure())
    }
  } else {
    yield put(MngActions.uploadfileFailure())
  }
}

// retrieve authors
export function* authorsfetchRequest(api, action) {
  const { companyId } = action
  const response = yield api.getAuthors(companyId)

  if (response.ok) {
    yield put(MngActions.authorsfetchSuccess(response.data))
  } else {
    yield put(MngActions.authorsfetchFailure())
  }
}

// retrieve courses
export function* coursesfetchRequest(api, action) {
  const { payload } = action
  const finalData = {
    templates: payload,
  }
  const response = yield api.getCourses(finalData)
  let allCourses = response.data.data
  allCourses = allCourses.map(course => {
    if (
      indexOf('s3-us-west-2.amazonaws.com', course.data.thumb_url) < 0 &&
      (!isNil(course.data.thumb_url) && !isEmpty(course.data.thumb_url))
    ) {
      course.data.thumb_url = assetsURL + course.data.thumb_url
    }
    return course
  })
  const totalCourses = response.data.total
  const data = { allCourses, totalCourses, feeds: payload }
  if (response.ok) {
    yield put(MngActions.coursesfetchSuccess(data))
  } else {
    yield put(MngActions.coursesfetchFailure())
  }
}

// Add Trainings
export function* addtrainingRequest(api, action) {
  const { payload, userId, coursesSelected } = action
  let finalData = {
    card: {
      card_type_id: 1,
      parent_id: null,
      data: {},
    },
    user_id: userId,
    save_template: true,
  }
  finalData.card.data = payload
  ;(finalData.card.data.name = 'Testing add training'),
    (finalData.card.data.course = coursesSelected)
  const response = yield api.addTraining(finalData)
  if (response.ok) {
    yield put(MngActions.addtrainingSuccess(response.data))
    alert('Training is assigned Successfully ') // eslint-disable-line
    yield put(push('/manage'))
  } else {
    yield put(MngActions.addtrainingFailure())
  }
}

function* addToTask(api, taskId) {
  const companyId = yield select(state => state.app.companies[0])
  const response = yield call(api.getProjectTasks, companyId, taskId)
  if (response.ok) {
    const prevData = yield select(state => state.manage.projectTasks)
    const newData = uniq([...prevData, response.data[0]])
    yield put(MngActions.projectsdetailfetchSuccess(newData))
  } else {
  }
}

export function* fetchProjectTaskList(api, action) {
  var projects = yield select(state => state.manage.projectsList)

  const taskIds = projects.map(project => project.id)
  try {
    yield call(fetchProjectTasksAsync, api, taskIds)
    yield call(changeSelectedProject, taskIds[0])
    yield call(projectDetailFetchComplete)
  } catch (e) {
    yield put(MngActions.projectdetailfetchFailure())
  }
}

function* fetchProjectTasksAsync(api, taskIds) {
  yield all(taskIds.map(taskId => fork(addToTask, api, taskId)))
}

function* changeSelectedProject(taskId) {
  yield put(MngActions.changeSelectedProject(taskId))
}

function* projectDetailFetchComplete() {
  yield put(MngActions.projectdetailfetchComplete())
}
