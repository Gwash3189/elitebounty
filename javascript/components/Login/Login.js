import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { authentication, api } from './../../helpers/api.js';
import { getState, update, State } from './../../helpers/state.js';

export default class Login extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props);
    const { user: { isLoggedIn }} = props;

    if (isLoggedIn) { setTimeout(() => context.router.push('/app'), 0) }
  }

  login(e) {
    const { user: { username, password } } = this.props

    e.preventDefault();

    authentication
      .login(username, password)
      .then(() => {
        this.context.router.push('/app')
      });
  }

  handleChangeUsername(e) {
    update((state) => ({user: { ...state.user, username: e.target.value }}));
  }

  handleChangePassword(e) {
    update((state) => ({user: { ...state.user, password: e.target.value }}));
  }

  toggleRememberMe() {
    update((state) => ({user: { ...state.user, rememberMe: !state.user.rememeberMe }}));
  }

  renderButton() {
    const { api: { loading }} = this.props;

    return !!loading[api.routes.login()]
      ? <button disabled type="button" className="btn btn-primary btn-lg btn-block">Logging In...</button>
      : <button onClick={::this.login} type="button" className="btn btn-primary btn-lg btn-block">Login</button>
  }

  handleKeyDown(e) {
    if (e.which === 13) { this.login(e) }
  }

  render() {
    return (
      <div className='container-fluid login-container'>
        <div className='col-xs-offset-4 col-xs-4' onKeyDown={::this.handleKeyDown}>
          <div className='form-group'>
            <label htmlFor='email'>Email address</label>
            <input onChange={::this.handleChangeUsername} type='email' className='form-control' id='email' placeholder='Email' />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input onChange={::this.handleChangePassword} type='password' className='form-control' id='password' placeholder='Password' />
          </div>
          <div className='form-group'>
            <Link to='/register'>Register</Link>
          </div>
          <div className="checkbox">
            <label>
              <input onClick={::this.toggleRememberMe} type="checkbox" /> Remember Me
            </label>
          </div>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}
