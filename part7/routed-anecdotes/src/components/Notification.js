import React from 'react'


const Notification = ({ message }) => {

    const padding = {
        padding: 5
      }
    return (
        <div style={padding}>
            {message}
        </div>
    )
}

export default Notification