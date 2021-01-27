export const state = () => ({
    isDrawerOpen: false,
})

export const getters = {
    isDrawerOpen: (state) => state.isDrawerOpen
}

export const mutations = {
    SET_ISDRAWEROPEN(state, isDrawerOpen) {
        state.isDrawerOpen = isDrawerOpen
    },
}