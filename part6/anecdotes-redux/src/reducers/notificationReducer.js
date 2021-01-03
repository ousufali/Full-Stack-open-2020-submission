
const notificationReducer = (state = '', action) => {

    switch (action.type) {
        case 'SET_NOTIFICATION':

            return action.data
    }
    return state

}

export const setNotification = (message, duration) => {
    let time_id
    return async dispatch => {
        clearTimeout(time_id)
        await dispatch({
            type: 'SET_NOTIFICATION',
            data: message
        })
        time_id= setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: ''
            })
        }, duration * 1000)
        clearTimeout(time_id-1)
        // console.log(time_id)

    }
}

export default notificationReducer