import { getProjectDictionary, getSqList } from '@/api/keyproject'
const state = {
  dicTionary: {},
  communityList: []
}

const mutations = {
  setDicTionary(state, val) {
    state.dicTionary = val
  },
  setCommunity(state, val) {
    state.communityList = val
  }
}

const actions = {
  getProjectDictionaryList: async function({ commit }) {
    const { data } = await getProjectDictionary()
    commit('setDicTionary', data)
    return data
  },
  getCommunityList: async function({ commit }) {
    const { result } = await getSqList()
    commit('setCommunity', result)
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
