import * as types from './mutation-types';

const mutations = {
  [types.SET_DEVMODE](state, value) {
    state.devMode = value
  }
}

export default mutations

