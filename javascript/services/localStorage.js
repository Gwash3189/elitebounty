export const keys = {
  application: 'elite-bounty-state'
}

export default (key) => {
  const api = {
    __value: localStorage.getItem(key) || null,
    get value() {
      return JSON.parse(api.__value)
    },
    set value(value) {
      api.__value = JSON.stringify(value);
      localStorage.setItem(key, api.__value);
    }
  }
  return api;
}
