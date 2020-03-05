import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { isEmpty } from 'ramda'
import projectsRoutes from '../../routes/manage'
import Navigation from '../../components/MngNav'
import './Manage.scss'

class Manage extends Component {
  render() {
    const { authenticated, history } = this.props

    return (
      <div className="d-flex">
        <div className="has-sidebar has-header bg-main">
          <Switch>
            {projectsRoutes.map((prop, key) => {
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.to} key={key} />
              }
              if (prop.auth && !authenticated) {
                return <Redirect from={prop.path} to="/" key={key} />
              }
              return <Route exact path={prop.path} component={prop.component} key={key} />
            })}
          </Switch>
        </div>
        <Navigation location={history.location} history={history} />
      </div>
    )
  }
}

Manage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape.isRequired,
}

const mapStateToProps = state => ({
  authenticated: !isEmpty(state.app.token),
})

export default connect(
  mapStateToProps,
  null
)(Manage)
