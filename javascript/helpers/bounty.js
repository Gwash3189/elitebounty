import fetch from 'isomorphic-fetch';

const api = {
  all: '/bountys'
}

const json = (x) => x.json()

export const bounty = {
  all() {
    return fetch(api.all)
    .then(json)
  }
}
