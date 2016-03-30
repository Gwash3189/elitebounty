import React, { Component, cloneElement, PropTypes } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { X_ELITEBOUNTY_AUTHENTICATION_HEADER } from './constants';
import { apply } from './functional';

let state = {
  toasts: {
    success: [],
    failure: []
  },
  api: {
    loading:{},
    headers:{
      'authentication': '',
      [X_ELITEBOUNTY_AUTHENTICATION_HEADER]: '',
      'credentials': 'same-origin',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  user: {
    username: 'admin@admin.com',
    password: 'admin',
    isLoggedIn: false,
    rememberMe: false,
    register: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  bountys: {}
};

const listeners = [];
const middlewares = [];

export const seed = (f) => {
  const seedState = typeof f === 'function' ? f(state) : f;
  state = cloneDeep(merge(state, seedState));
}

export const update = (f, meta = {}) => {
  const newState = typeof f === 'function' ? f(state) : f;
  state = cloneDeep(merge(state, newState));

  const frozenState = Object.freeze(state);

  listeners.forEach(apply(frozenState, meta))
  middlewares.forEach(apply(frozenState, meta))
}

export const getState = (f) => !!f ? f(Object.freeze(state)) : Object.freeze(state);

export const middleware = (f) => (middlewares.push(f)) - 1;
export const listen = (f) => (listeners.push(f)) - 1;
export const silence = (id) => listeners.splice(id, 1)

export class State extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    map: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = props.map(getState());
    this.listenId = listen((state) => this.setState(props.map(state)))
  }

  shouldComponentUpdate(_, nextState) {
    return this.state !== nextState;
  }

  componentWillUnmount() {
    silence(this.listenId);
  }

  render() {
    return cloneElement(this.props.children, {
      ...this.state,
      ...this.props
    });
  }
}
