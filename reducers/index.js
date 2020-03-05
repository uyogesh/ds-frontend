import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { connectRouter } from 'connected-react-router'
import storage from 'redux-persist/lib/storage'
import createHistory from 'history/createBrowserHistory'
import configureStore from '../configureStore'
import immutablePersistenceTransform from '../services/transform'

const history = createHistory()

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['route'],
  transforms: [immutablePersistenceTransform],
}

/* ------------- Assemble The Reducers ------------- */
const reducers = combineReducers({
  route: require('./route').reducer,
  app: require('./app').reducer,
  develop: require('./develop').reducer,
  manage: require('./manage').reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const initialState = {}

const store = configureStore(initialState, persistedReducer, history)

const persistor = persistStore(store)

export { store, persistor, history }
