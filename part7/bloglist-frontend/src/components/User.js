import React, { useEffect, useState } from 'react'
import userServices from '../services/user'
import { useParams } from 'react-router-dom'


const User = () => {
    const userId = useParams().id
    const [user, setUser] = useState(null)
    // console.log("useParams().id :", userId, "zzzzzzzzzzz", user)



    useEffect(() => {
        const setuser = async () => {
            const userData = await userServices.getAll()
            const usr = userData.find(user => user.id === userId)
            // console.log(usr)
            // console.log(usr.name)
            setUser(usr)
        }

        setuser()
    }, [])
    // console.log("User:  ", user)

    if (user === null) {
        return null
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <h4>added blogs</h4>
            <ul >
                {user.blogs.map(blog => {
                    return (
                        <li key={blog.id}>{blog.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default User