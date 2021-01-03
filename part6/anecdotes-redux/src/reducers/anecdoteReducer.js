import anecdoteServices from '../services/anecdote'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.id
      const Anecdote = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = { ...Anecdote, votes: Anecdote.votes + 1 }

      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)

    case 'CREATE-ANECDOTE':
      return [...state, action.data]

    case 'INIT-STATE':
      return action.data

  }
  return state

}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createAnecdote(content)
    dispatch({
      type: 'CREATE-ANECDOTE',
      data: newAnecdote
    })
  }
}
export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteServices.updateVote(id)
    dispatch({
      type: 'VOTE',
      id: id
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT-STATE',
      data: anecdotes
    })
  }
}

export default anecdoteReducer