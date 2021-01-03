import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Notification from '../components/Notification'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'




const LogIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()

        // console.log("button pressed")

        try {
            const loggedInUser = await loginService.login({ username, password })
            // console.log("logged in user:  ", loggedInUser)
            dispatch(setUser(loggedInUser))
            window.localStorage.setItem("LoggedInUser", JSON.stringify(loggedInUser))
            // setUser(loggedInUser)
            blogService.setToken(loggedInUser.token)
            setUsername('')
            setPassword('')

        } catch (exception) {
            // console.log("login failed, invalid credentials")
            // const message1 = `Wrong username or password`
            dispatch(setNotification(`Wrong username or password`, 5))
            // setNotification(message1)
            // setTimeout(() => {
            //   setNotification(null)
            // }, 4000)
        }


    }


    return (
        <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
            <div>
                {/* <Notification message={notificaton}></Notification> */}
                <Notification ></Notification>

            </div>
            <div>Username
        <input name="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>Password
      <input name="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit" >Login</button>

        </form>
    )
}

export default LogIn