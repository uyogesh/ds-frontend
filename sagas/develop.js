import { put, select } from 'redux-saga/effects'
import xmljs from 'xml-js'
import DevActions from '../actions/develop'
import { concat, equals, split, indexOf, isNil, isEmpty, keysIn, values } from 'ramda'
import moment from 'moment'
import { assetsURL, assignType } from '../services/config'

export function* feedsRequest(api, action) {
  const { userId, perPage, page } = action
  const getLearnType = state => state.develop.learnType
  const learnTypeId = yield select(getLearnType)
  const learnType = assignType[learnTypeId].name
  const response = yield api.getLearnFeed(userId, perPage, page, learnType)

  if (response.ok) {
    for (let card of response.data.data) {
      let completed = 0
      let remaining = 0
      let pastDue = 0
      card.due_at = card.due_at ? moment(split(' ', card.due_at)[0]).format('MM/DD/YYYY') : ''
      // card.data.thumb_url = replace(/^http:\/\//i, 'https://', card.data.thumb_url);
      for (let child of card.children) {
        // child.data.video_url = replace(/^http:\/\//i, 'https://', child.data.video_url);
        // child.data.thumb_url = replace(/^http:\/\//i, 'https://', child.data.thumb_url);
        child.due_at = child.due_at ? moment(split(' ', child.due_at)[0]).format('MM/DD/YYYY') : ''
        if (
          indexOf('drivingsales.com', child.data.video_url) < 0 &&
          indexOf('amazonaws.com', child.data.video_url) < 0
        ) {
          child.data.video_url = assetsURL + child.data.video_url
        }
        if (
          indexOf('drivingsales.com', child.data.thumb_url) < 0 &&
          indexOf('amazonaws.com', child.data.video_url) < 0
        ) {
          child.data.thumb_url = assetsURL + child.data.thumb_url
        }
        if (equals(child.status, 3)) {
          completed++
        } else if (equals(child.status, 2)) {
          pastDue++
        } else {
          remaining++
        }
      }
      card.data.completed = completed
      card.data.remaining = remaining
      card.data.past_due = pastDue
    }
    yield put(DevActions.feedsSuccess(response.data))
  } else {
    yield put(DevActions.feedsFailure())
  }
}

export function* libraryRequest(api, action) {
  // get company id
  const getCompanies = state => state.app.companies
  const companies = yield select(getCompanies)

  // get library courses
  const response = yield api.getLibraries(companies[0])

  if (response.ok) {
    // All Courses
    const allCourses = {
      id: 0,
      name: 'All Courses',
      courses: response.data.totals.courses,
      modules: response.data.totals.modules,
      templates: response.data.totals.templates,
    }

    const authorCourses = {
      id: 1,
      name: 'Courses by Author',
      meta: response.data.authors,
    }

    const departmentCourses = {
      id: 2,
      name: 'Courses by Department',
      meta: response.data.departments,
    }

    const competencyCourses = {
      id: 3,
      name: 'Courses by Competency',
      meta: response.data.competencies,
    }

    const categoryCourses = {
      id: 4,
      name: 'Courses by Category',
      meta: response.data.categories.factors,
    }

    const result = [
      allCourses,
      authorCourses,
      departmentCourses,
      competencyCourses,
      categoryCourses,
    ]

    let librarySelectedIds = []
    let libraryTotalCourses = 0
    let libraryTotalModules = 0

    result.forEach(course => {
      let item
      if (isNil(course.meta)) {
        librarySelectedIds = concat(librarySelectedIds, course.templates)
        libraryTotalCourses += course.courses
        libraryTotalModules += course.modules
      } else {
        keysIn(course.meta).map((key, index) => {
          librarySelectedIds = concat(librarySelectedIds, course.meta[key].templates)
          libraryTotalCourses += course.meta[key].courses
          libraryTotalModules += course.meta[key].modules
        })
      }
    })

    yield put(
      DevActions.librarySuccess({
        libraryLists: result,
        librarySelectedIds,
        libraryTotalCourses,
        libraryTotalModules,
      })
    )
    yield put(
      DevActions.courseRequest({
        ids: librarySelectedIds,
        courses: libraryTotalCourses,
        modules: libraryTotalModules,
      })
    )
  } else {
    yield put(DevActions.libraryFailure())
  }
}

export function* cardusersRequest(api, action) {
  const { payload } = action
  const response = yield api.getCardUsers(payload)

  if (response.ok) {
    yield put(DevActions.cardusersSuccess(response.data.users))
  } else {
    yield put(DevActions.cardusersFailure())
  }
}

export function* createcardRequest(api, action) {
  const { payload } = action
  console.log(action)
  const response = yield api.postLibraryCard(payload)

  if (response.ok) {
    yield put(DevActions.createcardSuccess())
  } else {
    yield put(DevActions.createcardFailure())
  }
}

export function* courseRequest(api, action) {
  const { payload } = action
  // get display counts per page, current page, library lists
  const getPerPage = state => state.develop.libraryPerPage
  const perPage = yield select(getPerPage)
  const getCurPage = state => state.develop.libraryCurPage
  const curPage = yield select(getCurPage)

  const response = yield api.getLibraryCourses({
    templates: payload.ids,
    per_page: perPage,
    page: curPage,
  })

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
  const totalCourses = payload.courses
  const totalModules = payload.modules
  // console.log('---   ', totalCourses, totalModules)
  const data = { allCourses, totalCourses, totalModules, feeds: payload.ids }

  yield put(DevActions.courseSuccess(data))
}

export function* questionRequest(api, action) {
  const initAns = {
    correct: 1,
    answer: '',
    error: false,
  }
  yield put(DevActions.answerSuccess(initAns))
  const { quizId } = action
  const response = yield api.getQuizQuestion(quizId)

  if (response.ok) {
    const res = {
      num: 0,
      type: 0,
      options: [],
      title: '',
      completed: false,
    }
    if (response.data.complete) {
      res.completed = true
    } else {
      res.num = response.data.current.item
      res.type = Number(response.data.item.type)
      res.options = values(response.data.item.rules.options)
      res.title = response.data.item.wording
    }
    yield put(DevActions.questionSuccess(res))
  } else {
    yield put(DevActions.questionFailure())
  }
}

export function* answerRequest(api, action) {
  const { quizId, payload } = action
  const response = yield api.submitAnswer(quizId, payload)

  if (response.ok) {
    const res = {
      correct: 0,
      answer: '',
      error: false,
    }
    const nextQuestion = {
      num: 0,
      type: 0,
      options: [],
      title: '',
      completed: false,
    }
    if (response.data.correct) {
      res.correct = response.data.correct.correct
      res.answer = response.data.correct.answer
      yield put(DevActions.answerSuccess(res))
    } else {
      res.error = true
      yield put(DevActions.answerSuccess(res))
    }
    if (response.data.complete) {
      nextQuestion.completed = true
    } else {
      nextQuestion.num = response.data.current.item
      nextQuestion.type = Number(response.data.item.type)
      nextQuestion.options = values(response.data.item.rules.options)
      nextQuestion.title = response.data.item.wording
    }
    yield put(DevActions.questionSuccess(nextQuestion))
  } else {
    yield put(DevActions.answerFailure())
  }
}

export function* careergoalsGet(api, action) {
  const { id } = action
  const response = yield api.getCareerGoals(id)

  if (response.ok) {
    yield put(DevActions.careergoalsSuccess(response.data))
  } else {
    yield put(DevActions.careergoalsFailure())
  }
}

export function* careergoalsPost(api, action) {
  const { id, data } = action
  const response = yield api.postCareerGoals(id, data)

  if (response.ok) {
    yield put(DevActions.careergoalsaveSuccess(data.goals))
  } else {
    yield put(DevActions.careergoalsaveFailure())
  }
}

export function* careerreportsGet(api, action) {
  const { companyId, userId } = action
  const response = yield api.getCareerReports(companyId, userId)

  console.log(response)

  if (response.ok) {
    const programs = []
    const habits = []
    const requirements = []
    const developments = []
    values(response.data.job_titles).forEach(job => {
      programs.push({
        title: job.program.title,
        created_at: job.program.created_at,
        completed_at: job.program.completed_at,
      })
      requirements.push(values(job.program.data.achievements))
      habits.push(job.habits)
      developments.push({
        courses: job.course_totals.TOTAL[0],
        modules: job.module_totals.TOTAL[0],
        complete: 'N/A',
      })
    })
    yield put(DevActions.careerreportsSuccess({ programs, requirements, habits, developments }))
  } else {
    yield put(DevActions.careerreportsFailure())
  }
}

export function* careertasksGet(api, action) {
  const { userId, perPage, page } = action
  const response = yield api.getLearnFeed(userId, perPage, page, 8)
  if (response.ok) {
    yield put(DevActions.careertasksSuccess(response.data))
  } else {
    yield put(DevActions.careertasksFailure())
  }
}

export function* careertrainingsGet(api, action) {
  const { userId, perPage, page } = action
  const response = yield api.getLearnFeed(userId, perPage, page, 1)
  if (response.ok) {
    yield put(DevActions.careertrainingsSuccess(response.data))
  } else {
    yield put(DevActions.careertrainingsFailure())
  }
}

export function* userreportsRequest(api, action) {
  const { id } = action
  const getUserId = state => state.app.id
  const userId = yield select(getUserId)
  const response = yield api.getUserReports(userId, id)

  if (response.ok) {
    yield put(DevActions.userreportsSuccess(response.data))
  } else {
    yield put(DevActions.userreportsFailure())
  }
}

export function* teamreportsRequest(api, action) {
  const { id } = action
  const getUserId = state => state.app.id
  const userId = yield select(getUserId)
  const response = yield api.getTeamReports(userId, id)
  if (response.ok) {
    yield put(DevActions.teamreportsSuccess(response.data))
  } else {
    yield put(DevActions.teamreportsFailure())
  }
}

export function* reportsfeedsRequest(api, action) {
  const { id, sort } = action
  const response = yield api.getFeedsReports(id, sort)
  if (response.ok) {
    yield put(DevActions.reportsfeedsSuccess(response.data, sort))
  } else {
    yield put(DevActions.reportsfeedsFailure())
  }
}

export function* uploadRequest(api, action) {
  const { payload } = action
  const res = yield api.getS3Info()

  if (res.ok) {
    // eslint-disable-next-line no-undef
    const formData = new FormData()
    for (const key in res.data.inputs) {
      formData.append(key, res.data.inputs[key])
    }
    formData.set('Content-Type', payload.file.type)
    formData.append('key', `attachments/${payload.attachment_hash}/${payload.file.name}`)
    formData.append('file', payload.file)
    const response = yield api.fileUpload(formData)

    if (response.ok) {
      const data = xmljs.xml2json(response.data, { compact: true, ignoreDeclaration: true })
      const url = JSON.parse(data).PostResponse.Location._text
      yield put(DevActions.uploadSuccess(url))
    } else {
      yield put(DevActions.uploadFailure())
    }
  } else {
    yield put(DevActions.uploadFailure())
  }
}

export function* archivefetchRequest(api, action) {
  const { userId, perPage, page } = action
  const response = yield api.getArchivedFeeds(userId, perPage, page)
  if (response.ok) {
    yield put(DevActions.archivefetchSuccess(response.data))
  } else {
    yield put(DevActions.archivefetchFailure())
  }
}

export function* updateModuleRequest(api, action) {
  const { payload } = action
  const request = {
    id: payload.id,
    data: {
      card: {
        card_template_id: payload.card_template_id,
        data: payload.data,
      },
    },
  }
  const response = yield api.updateModule(request)
  if (response.ok) {
    yield put(DevActions.updatemoduleSuccess(response.data))
  } else {
    yield put(DevActions.updatemoduleFailure())
  }
}

export function* updateCardRequest(api, action) {
  const { event, cardId } = action
  const response = yield api.updateCard(event, cardId)
  if (response.ok) {
    const res = yield api.getCardById(cardId)
    if (res.ok) {
      if (!equals(event, 'started')) {
        const getCurrentCourse = state => state.develop.learnCurrentCourse
        const currentCourse = yield select(getCurrentCourse)
        let children = []
        let completed = 0
        for (const child of currentCourse.children) {
          if (equals(child.id, cardId)) {
            children.push(res.data)
          } else if (child.blocked_by === cardId) {
            const temp = Object.assign({}, child, { locked: 0 })
            children.push(temp)
          } else {
            children.push(child)
          }
        }
        for (const child of children) {
          if (equals(child.status, 3)) {
            completed++
          }
        }
        const cardData = Object.assign({}, currentCourse.data, { completed: completed })
        const updatedCourse = Object.assign(
          {},
          currentCourse,
          { children: children },
          { data: cardData }
        )
        yield put(DevActions.setcurrentCourse(updatedCourse))

        const getLearnCards = state => state.develop.learnCards
        const currentCards = yield select(getLearnCards)
        const updatedCards = []
        for (const card of currentCards) {
          if (equals(card.id, updatedCourse.id)) {
            updatedCards.push(updatedCourse)
          } else {
            updatedCards.push(card)
          }
        }
        yield put(DevActions.lcardupdateRequest(updatedCards))
      }
      yield put(DevActions.setcurrentModule(res.data))
      yield put(DevActions.cardupdateSuccess())
    }
  } else {
  }
}
