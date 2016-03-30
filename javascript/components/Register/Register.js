import React, { Component } from 'react';
import { Link } from 'react-router';

import { player, api } from './../../helpers/api.js'
import { getState, update, State } from './../../helpers/state.js'

export default class Login extends Component {
  register() {
    const { user: { register: { username, password, confirmPassword }}} = this.props

    this.doPasswordsMatch() && player.register(username, password, confirmPassword)
      .then(() => console.log('Woo!'), () => console.log('fail'))
  }

  handleChangeUsername(e) {
    update({user: { register: { username: e.target.value }}});
  }

  handleChangePassword(e) {
    update({user: { register: { password: e.target.value }}});
  }

  handleChangeConfirmPassword(e) {
    update({user: { register: { confirmPassword: e.target.value }}});
  }

  renderButton() {
    const { api: { loading }} = this.props;

    return !!loading[api.routes.register()]
      ? <button disabled type="button" className="btn btn-primary btn-lg btn-block">Registering...</button>
      : <button onClick={::this.register} type="button" className="btn btn-primary btn-lg btn-block">Register</button>
  }

  doPasswordsMatch() {
    const { user: { register: { password, confirmPassword }}} = this.props
    return password === confirmPassword;
  }

  render() {
    const passwordErrorClass = this.doPasswordsMatch()
                             ? ''
                             : 'has-error';
    return (
      <div className='container-fluid login-container'>
        <div className='col-xs-offset-4 col-xs-4'>
          <div className='form-group'>
            <label htmlFor='email'>Email address</label>
            <input onChange={::this.handleChangeUsername} type='email' className='form-control' id='email' placeholder='Email' />
          </div>
          <div className={`form-group ${passwordErrorClass}`}>
            <label htmlFor='password'>Password</label>
            <input onChange={::this.handleChangePassword} type='password' className='form-control' id='password' placeholder='Password' />
          </div>
          <div className={`form-group ${passwordErrorClass}`}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input onChange={::this.handleChangeConfirmPassword} type='password' className='form-control' id='confirmPassword' placeholder='Confirm Password' />
          </div>
          <div className='form-group'>
            <Link to='/'>Login</Link>
          </div>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}
