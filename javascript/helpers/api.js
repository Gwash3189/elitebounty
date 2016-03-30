import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import { json } from './functional';
import { update, getState} from './state';
import { X_ELITEBOUNTY_AUTHENTICATION_HEADER } from './constants';
import toast from './../services/toast';
polyfill()

const remote = (method) => (route, params = {}) => {
  const { headers } = getState((state) => state.api)

  update((state) => {
    const updatedCount = !isNaN(state.api.loading[route])
                       ? state.api.loading[route] + 1
                       : 1;
    return {
      api: {
        loading: {
          [route]: updatedCount
        }
      }
    }
  });

  return new Promise((resolve, reject) => {
    const paramsToSend = {
      headers
    };

    if (params.body) {
      paramsToSend.body = JSON.stringify(params.body)
    }

    method(route, paramsToSend)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        update((state) => {
          return {
            api: {
              headers: {
                [X_ELITEBOUNTY_AUTHENTICATION_HEADER]: response.headers.get(X_ELITEBOUNTY_AUTHENTICATION_HEADER)
              },
              loading:{
                [route]: state.api.loading[route] - 1
              }
            },
            user: {
              password: '',
              isLoggedIn: true,
              register: {
                username: '',
                password: ''
              }
            }
          };
        });
        resolve(response);
      } else {
        reject(response);
      }
    });
  });

};

const get = remote(fetch);
const post = remote((route, params) => fetch(route, { method: "post", ...params }));


export const api = {
  headers:{
    'Authentication': "",
    [X_ELITEBOUNTY_AUTHENTICATION_HEADER]: ""
  },
  routes: {
    bountys: () => '/bountys',
    bounty: (id) => `/bounty/${id}`,
    login: () => '/player/login',
    register: () => '/player/register'
  }
}

export const player = {
  register(email, password, confirmPassword) {
    update({ api: { headers:{ authentication: btoa(`${email}:${password}`) }}});
    const success = 'You have been registered. Please login.';
    const failure = 'Please try again.';

    return post(api.routes.register(), { body: { email, password, confirmPassword }, toasts: { success, failure }})
  }
}

export const bounty = {
  all() {
    return get(api.routes.bountys())
    .then(json)
  },
  find(id){
    return get(api.routes.bounty(id))
  }
};

export const authentication = {
  login(username, password) {
    const success = 'Login successful.';
    const failure = 'Please try again.';
    update({ api: { headers:{ authentication: btoa(`${username}:${password}`) }}});

    return post(api.routes.login(), { toasts: { success, failure }})
      .then((response) => {
        console.log('redirect into app')
      });
  }
}
