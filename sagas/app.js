import { call, put } from 'redux-saga/effects'
import AppActions from '../actions/app'
import DevActions from '../actions/develop'
import { push } from 'connected-react-router'

export function * loginRequest (api, action) {
  const { payload } = action
  const response = yield api.loginByEmail(payload)

  if (response.ok) {
    yield put(AppActions.loginSuccess(response.data))
    yield put(push('/dashboard'))
  } else {
    yield put(AppActions.loginFailure())
  }
}
