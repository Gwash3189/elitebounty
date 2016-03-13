import reduce from 'lodash/reduce';
import curry from 'lodash/curry';
import set from 'lodash/set';
import get from 'lodash/get';

export const toHash = (items) => reduce(items, (x, item) => set(x, get(item, 'id'), item), {});
export const toObject = curry((name, value) => ({ [name]: value }));
export const setState = curry((context, state) => context.setState(state));
