import * as types from './mutation-types';
import axios from '../plugins/axios';

export const closeDevMode = function ({ commit }) {
  commit(types.SET_DEVMODE, false)
}

export const openDevMode = function ({ commit }) {
  commit(types.SET_DEVMODE, true)
}

export const changeLoginState = function ({ commit }, val) {
  commit(types.SET_LOGIN_STATE, val)
}

export const setUserInfo = function ({ commit }, val) {
  commit(types.SET_USER_INFO, val)
}

export const setFullScreen = function ({ commit }, val) {
  commit(types.SET_FULL_SCREEN, val)
}

export const addKeepActive = function ({ commit }, val) {
  commit(types.ADD_KEEP_ACTIVE, val)
}

export const removeKeepActive = function ({ commit }, val) {
  commit(types.REMOVE_KEEP_ACTIVE, val)
}

export const setProjectPermission = function ({ commit }, pid) {
  axios.get(`/project/checkPermission?pid=${pid}`).then((result) => {
    commit(types.ALTER_PROJECT_PERMISSION, result.data.data)
  }).catch((err) => {
    console.error("Vuex actions setProjectPermission Error:", err)
    commit(types.ALTER_PROJECT_PERMISSION, false)
  });
}
