import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import { json } from './functional';
import { update, getState} from './state';
import { X_ELITEBOUNTY_AUTHENTICATION_HEADER } from './constants';
import toast from './../services/toast';
polyfill()

const remote = (method) => (route, params = {}) => {
  const { headers } = getState((state) => state.api);

  update((state) => {
    const updatedCount = !isNaN(state.api.loading[route])
                       ? state.api.loading[route] + 1
                       : 1;
    return {
      api: {
        ...state.api,
        loading: {
          ...state.api.loading,
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
        if (params.toasts) {
          update(() => {
            return {
              toast: [{text: params.toasts.success.text, type: 'success'}]
            }
          });
        }
        update((state) => {
          return {
            api: {
              ...state.api,
              headers: {
                ...state.api.headers,
                [X_ELITEBOUNTY_AUTHENTICATION_HEADER]: response.headers.get(X_ELITEBOUNTY_AUTHENTICATION_HEADER)
              },
              loading:{
                ...state.api.loading,
                [route]: state.api.loading[route] - 1
              }
            }
          };
        });
        update((state) => {
          return {
            user: {
              ...state.user,
              password: '',
              isLoggedIn: state.api.headers[X_ELITEBOUNTY_AUTHENTICATION_HEADER] && state.api.headers.authentication,
              register: {
                username: '',
                password: '',
                confirmPassword: ''
              }
            }
          };
        })
        resolve(response);
      } else {
        debugger;
        if (params.toasts) {
          update((state) => {
            return {
              toast: [{text: params.toasts.failure.text, type: 'failure'}],
              api: {
                ...state.api,
                loading:{
                  ...state.api.loading,
                  [route]: state.api.loading[route] - 1
                }
              }
            }
          });
        }
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
    update((state) => ({ api: { ...state.api, headers:{ authentication: btoa(`${email}:${password}`) }}}));
    const success = {text: 'You have been registered. Please login.', type: 'success'};
    const failure = {text: 'Registration failed. Please try again.', type: 'failure'};
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
    const success = { text: 'Login successful.', type: 'success' };
    const failure = { text: 'Login Failed. Please try again.', type: 'failure' };
    update((state) => {
      return {
        api: {
          ...state.api,
          headers: {
            authentication: btoa(`${username}:${password}`)
          }
        }
      }
    });

    return post(api.routes.login(), { toasts: { success, failure }})
  }
}
