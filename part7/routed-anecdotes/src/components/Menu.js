import React from 'react'
import { Route, Link } from 'react-router-dom'

const Menu = () => {
    const padding = {
        padding: 5
    }
    return (
        <Route>
            <Link style={padding} to="/anecdotes">anecdotes</Link>
            <Link style={padding} to="/create">create new</Link>
            <Link style={padding} to="/about">about</Link>
        </Route>
    )
}

export default Menu