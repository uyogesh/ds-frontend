import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import { store, persistor, history } from './reducers'
import indexRoutes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import 'video-react/dist/video-react.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'
import 'react-super-treeview/dist/style.css'
import 'react-datepicker/dist/react-datepicker.css'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            if (prop.name === 'Home') {
              return <Route to={prop.path} component={prop.component} key={key} />
            } else return <Route exact path={prop.path} component={prop.component} key={key} />
          })}
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: window.App.Pusher.key,
  cluster: window.App.Pusher.cluster,
  encrypted: window.App.Pusher.encrypted,
})
