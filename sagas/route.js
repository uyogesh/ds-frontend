// import { select } from 'redux-saga/effects'
// import { push } from 'connected-react-router'
// import { find, propEq } from 'ramda'
// import developRoutes from '../routes/develop'

export function * locationRequest (api, action) {
  const { pathname } = action.payload.location
  // const getToken = state => state.app.token
  // const token = yield select(getToken)
  // const route = find(propEq('path', pathname), developRoutes)

  console.log('------>>>>>   ', pathname)
  // if (isNil(route) || isEmpty(route)) {
  //   console.log('There are no such routes.');
  //   return;
  // }

  // if (route.auth && isEmpty(token)) {
  //   console.log('This page requires authentication.');
  //   yield put(push('/'));
  //   return;
  // }

  console.log('Navigation success!')
}
