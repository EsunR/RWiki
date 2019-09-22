import * as types from './mutation-types';

const mutations = {
  [types.SET_DEVMODE](state, value) {
    state.devMode = value
  },
  [types.SET_LOGIN_STATE](state, value) {
    state.loginState = value
  }
}

export default mutations

