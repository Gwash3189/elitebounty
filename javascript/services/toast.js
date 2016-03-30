import { middleware } from './../helpers/state';

export default (promise, updater = () => {}, messages = {}) => {
  promise.then(() => {
    updater(({ toasts }) => {
      return {
        toasts: {
          success: toasts.success.concat(messages.success)
        }
      }
    });
  }, () => {
    updater(({ toasts }) => {
      return {
        toasts: {
          failure: toasts.failure.concat(messages.failure)
        }
      }
    })
  });
}
