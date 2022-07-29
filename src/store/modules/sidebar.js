import Cookies from 'js-cookie'
const state = {
  sidebar: {
    opened: Cookies.get('sidebar') === 1 ? true : false,
  },
}
const mutations = {
  SET_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      Cookies.set('sidebar', 1)
    } else {
      Cookies.set('sidebar', 0)
    }
  },
}
const actions = {
  toggleSidebar({ commit }) {
    commit('SET_SIDEBAR')
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
