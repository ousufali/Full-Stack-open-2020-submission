import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, } from '../reducers/notificationReducer'
import Filter from './Filter'


const Anecdotes = (props) => {
    // const dispatch = useDispatch()




    // const vote = (id, content) => {
    // console.log('vote', id)
    // dispatch(voteAnecdote(id))

    // dispatch(setNotification("You votes '" + content + "'", 5))
    // setTimeout(() => dispatch(unsetNotification()), 5000)
    // }

    return (
        <div>
            <Filter />
            {props.Anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            props.voteAnecdote(anecdote.id)
                            props.setNotification("You votes '" + anecdote.content + "'", 5)
                        }}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateTOProps = (state) => {
    const Query = state.Filter
    const FilteredAnecdotes = state.Anecdotes.filter((anecdote) => anecdote.content.indexOf(Query) > -1)

    const anecdotes = FilteredAnecdotes.sort((x, y) => y.votes - x.votes)

    return {
        Anecdotes: anecdotes,
        Filter: state.Filter
    }
}
const mapDispatchToProp = {

    voteAnecdote,
    setNotification

}
const ConectedAnecdote = connect(mapStateTOProps, mapDispatchToProp)(Anecdotes)

export default ConectedAnecdote