import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { AppTypes } from '../actions/app'

const initialState = Immutable({
  status: '',
  firebase: '',
  token: '',

  created_at: '',
  updated_at: '',

  id: '',
  avatar: '',
  birthday: '',
  career_goal: '',
  first_name: '',
  last_name: '',
  job_title: '',
  companies: []
})

const loginRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const loginSuccess = (state, action) => {
  const { firebase, token, user } = action.response
  const {
    created_at,
    data,
    deleted_at,
    drivingsales_id,
    email,
    email2,
    feed,
    id,
    profile,
    updated_at
  } = user
  const {
    avatar,
    birthday,
    career_goal,
    email_preference,
    first_name,
    last_name,
    job_title,
    phone
  } = profile
  const companies = Object.keys(data.company)

  return state.merge({
    ...state,
    status: 'done',

    firebase,
    token,

    created_at,
    updated_at,

    id,
    avatar: 'https://s3-us-west-2.amazonaws.com/hcm.drivingsales.com-assets/' + avatar,
    birthday,
    career_goal,
    first_name,
    last_name,
    job_title,
    companies
  })
}
const loginFailure = (state, action) => state.merge({ ...state, status: 'error' })

export const reducer = createReducer(initialState, {
  [AppTypes.LOGIN_REQUEST]: loginRequest,
  [AppTypes.LOGIN_SUCCESS]: loginSuccess,
  [AppTypes.LOGIN_FAILURE]: loginFailure
})
