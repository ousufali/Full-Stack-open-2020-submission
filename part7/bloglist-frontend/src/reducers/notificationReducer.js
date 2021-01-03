

const notificationReduce = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const setNotification = (message, time) => {
    let id
    return async dispatch => {
        await dispatch({
            type: 'SET_NOTIFICATION',
            data: message
        })
        id = setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: null
            })
        }, time * 1000)
        clearTimeout(id - 1)
    }
    // const actionObject = {
    //     type: 'SET_NOTIFICATION',
    //     data: message
    // }

    // return actionObject
}

export default notificationReduce