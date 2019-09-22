import * as types from './mutation-types';

export const closeDevMode = function ({ commit }) {
  commit(types.SET_DEVMODE, false)
}

export const openDevMode = function ({ commit }) {
  commit(types.SET_DEVMODE, true)
}

export const changeLoginState = function ({ commit }, val) {
  commit(types.SET_LOGIN_STATE, val)
}
