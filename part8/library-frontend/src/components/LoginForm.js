import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken ,setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrorsp[0].message)
            // setError(error.graphQLErrors[0].message)

            // setTimeout(() => {
            //     setError(null)

            // }, 3000)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token)
            localStorage.setItem("auther-user-token", token)
            setPage("authors")

        }
    }, [result.data]) // eslint-disable-line


    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
    }

    if (!show) {
        return (<></>)
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm