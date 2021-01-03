import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, } from '../reducers/notificationReducer'



const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()


    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // console.log(content, "CONTENT")
        // dispatch(createAnecdote(content))
        // dispatch(setNotification("'" + content + "' added", 5))
        props.createAnecdote(content)
        props.setNotification("'" + content + "' added", 5)
    }



    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" placeholder="new anecdote" /></div>
                <button type="submit">create</button>
            </form>

        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification

}

const ConectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConectedAnecdoteForm