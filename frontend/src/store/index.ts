import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    isLogin: false,
    username: '',
    password: ''
  },
  mutations: {
    login(state, param) {
      state.isLogin = true;
      state.username = param.username;
      state.password = param.password;
    },
    logout(state) {
      state.isLogin = false;
      state.username = '';
      state.password = '';
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      const param = {
        username: username,
        password: password
      }

      try {
        const loginResult = await axios.post('http://localhost:3000/auth/login', param);
        if (loginResult.data === 'OK') {
          // 認証に成功した場合
          commit('login', param);
        } else {
          // 認証に失敗した場合
          alert('認証に失敗しました。');
        }
      } catch{
        alert('処理に失敗しました。')
      }

    },
    logout({ commit }) {
      commit('logout');
    }
  },
  plugins:[createPersistedState()]
})
