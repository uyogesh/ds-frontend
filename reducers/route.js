import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { LOCATION_CHANGE } from 'connected-react-router'

// Initial routing state
const initialState = Immutable({
  location: null
})

// const locationRequest = (state, action) => state.merge({ ...state, status: 'pending' });
const locationSuccess = (state, action) => {
  console.log('~~~~~~~:   ', action.payload);
  return state.merge({ ...state, location: action.payload });
};
// const locationRequest = (state, action) => state.merge({ ...state, status: 'error' });

export const reducer = createReducer(initialState, {
  LOCATION_CHANGE: locationSuccess
})
