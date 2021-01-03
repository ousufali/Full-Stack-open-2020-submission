import React from 'react'
import { Route, Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            <Route>
                {anecdotes.map(anecdote => <li key={anecdote.id} >
                    <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link>
                </li>)}
            </Route>
        </ul>
    </div >
)


export default AnecdoteList