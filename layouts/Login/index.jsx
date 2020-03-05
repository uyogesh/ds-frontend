import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'
import { equals, isEmpty } from 'ramda'
import Loading from '../../components/LoadingAnimation'
import AppActions from '../../actions/app'
import './Login.scss'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  componentWillMount() {
    if (!isEmpty(this.props.token)) {
      this.props.history.push('/dashboard')
    }
  }

  handleLogin = () => {
    const { email, password } = this.state
    this.props.loginRequest({ email, password })
  }

  render() {
    const { email, password } = this.state
    const { isBusy } = this.props

    return (
      <div className="login">
        <Loading loading={isBusy} />
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={3}>
              Email
            </Col>
            <Col sm={9}>
              <FormControl
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={3}>
              Password
            </Col>
            <Col sm={9}>
              <FormControl
                type="password"
                placeholder="Password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={3} sm={9}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={3} sm={9}>
              <Button type="submit" onClick={this.handleLogin} disabled={isBusy}>
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isBusy: equals(state.app.status, 'pending'),
  token: state.app.token,
})

const mapDispatchToProps = dispatch => ({
  loginRequest: payload => dispatch(AppActions.loginRequest(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
