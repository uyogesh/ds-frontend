import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { equals } from 'ramda'
import Header from '../../components/Header'
import Loading from '../../components/LoadingAnimation'
import dashboardRoutes from '../../routes/dashboard'
import './Dashboard.scss'

const Dashboard = props => {
  window.token = props.token
  return (
    <div className='dashboard'>
      <Header location={props.location} />
      <Switch>
        {dashboardRoutes.map((route, key) => {
          if (route.redirect) return <Redirect from={route.path} to={route.to} key={key} />
          return <Route path={route.path} component={route.component} key={key} />
        })}
      </Switch>
      <Loading loading={props.isBusy} />
    </div>
  )
}

Dashboard.propTypes = {
  isBusy: PropTypes.bool,
  token: PropTypes.string,
  location: PropTypes.any
}

Dashboard.defaultProps = {
  isBusy: false,
  token: '',
  location: {}
}

const mapStateToProps = state => ({
  isBusy: equals(state.develop.status, 'pending'),
  token: state.app.token
})

export default connect(
  mapStateToProps,
  null
)(Dashboard)
