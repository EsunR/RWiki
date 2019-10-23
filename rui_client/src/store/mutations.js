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
  },
  [types.ADD_KEEP_ACTIVE](state, val) {
    if (state.keepAlive.indexOf(val) === -1) {
      state.keepAlive.push(val)
    }
  },
  [types.REMOVE_KEEP_ACTIVE](state, val) {
    let index = state.keepAlive.indexOf(val)
    if (index === -1) {
      throw new Error(`${val} 不在 keepAlive 数组中，请检查拼写`)
    }
    state.keepAlive.splice(index, 1)
  }
}

export default mutations

