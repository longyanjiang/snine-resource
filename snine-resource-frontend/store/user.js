export const state = () => ({
    userInfo: {},
})

export const getters = {
    token: (state) => state.userInfo.token
}

export const mutations = {
    SET_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    }
}