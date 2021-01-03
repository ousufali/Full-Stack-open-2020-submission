import React from 'react'
import { useSelector } from 'react-redux'

// const Notification = ({ message }) => {
const Notification = () => {

    const message = useSelector(state => state.Notification)

    const notificationstyle = {
        color: 'blue',
        background: 'lightgray',
        fontsize: 20,
        borderradius: 'solid',
        padding: 10,
        marginbottom: '10px'

    }

    if (!message) {
        return null
    }
    return (
        <div style={notificationstyle}>
            {message}
        </div>
    )


}


export default Notification
