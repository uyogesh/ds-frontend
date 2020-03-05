import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { isEmpty, isNil } from 'ramda'
import DevActions from '../../actions/develop'
import developRoutes from '../../routes/develop'
import Navigation from '../../components/DevNav'

class Develop extends Component {
  componentDidMount() {
    if (isNil(this.props.libIds)) {
      this.props.libraryRequest()
    }
  }

  render() {
    const { authenticated, history } = this.props

    return (
      <div className="d-flex">
        <div className="has-sidebar has-header bg-main">
          <Switch>
            {developRoutes.map((prop, key) => {
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
        <Navigation location={history.location} />
      </div>
    )
  }
}

Develop.propTypes = {
  authenticated: PropTypes.bool,
  history: PropTypes.any,
  libraryRequest: PropTypes.func,
}

Develop.defaultProps = {
  authenticated: false,
  history: () => {},
  libraryRequest: () => {},
}

const mapStateToProps = state => ({
  authenticated: !isEmpty(state.app.token),
  libIds: state.develop.librarySelectedIds,
})

const mapDispatchToProps = dispatch => ({
  libraryRequest: () => dispatch(DevActions.libraryRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Develop)
