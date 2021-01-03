import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    // console.log("geting data form server")
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const anecdote = {
        content: content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const updateVote = async (id) => {
    const url = baseUrl + `/${id}`
    const result = await axios.get(baseUrl)

    // console.log(typeof (anecdotes))
    // console.log("anecdotes.....:", anecdotes)
    const toVoted = result.data.find(anecdote => anecdote.id === id)
    const votedAnecdote = {
        ...toVoted,
        votes: toVoted.votes + 1
    }
    const response = await axios.put(url, votedAnecdote)
    return response.data
}

export default {
    getAll,
    createAnecdote,
    updateVote
}