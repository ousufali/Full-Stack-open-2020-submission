import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import userServices from '../services/user'


const Users = () => {
    const [users, setUser] = useState([])

    useEffect(() => {
        const setUsers = async () => {
            const data = await userServices.getAll()
            console.log("ddddddddddddddddddddddddd")
            console.log("user data: ", data)
            console.log("ddddddddddddddddddddddddd")
            setUser(data)
        }
        setUsers()

    }, [])

    const deatails = () => {
        return (
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th><b>blogs created</b></th>
                    </tr>
                    {users.map(
                        user =>
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td><b>{user.blogs.length}</b></td>
                            </tr>


                    )}
                </tbody>
            </table>


        )
    }

    return (
        <div>
            <h2>Users</h2>
            {deatails()}
        </div>
    )
}

export default Users