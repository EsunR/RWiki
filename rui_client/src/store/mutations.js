import * as types from './mutation-types';

const mutations = {
  [types.SET_DEVMODE](state, val) {
    state.devMode = val
  },
  [types.SET_LOGIN_STATE](state, val) {
    state.loginState = val
  },
  [types.SET_USER_INFO](state, val) {
    state.userInfo = val
  },
  [types.SET_FULL_SCREEN](state, val) {
    state.fullScreen = val
  }
}

export default mutations

