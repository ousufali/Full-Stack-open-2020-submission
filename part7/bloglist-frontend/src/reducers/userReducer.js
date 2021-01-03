
const userReducer = (state = null, action) => {

    switch (action.type) {
        case 'SET_USER':
            return action.data
        case 'UNSET_USER':
            return action.data
        default:
            return state
    }
}

export const setUser = (user) => {
    return async dispatch => {
        await dispatch({
            type: "SET_USER",
            data: user
        })
    }
}
export const removeUser = () => {
    return async dispatch => {
        dispatch({
            type: 'UNSET_USER',
            data: null
        })
    }
}

export default userReducer