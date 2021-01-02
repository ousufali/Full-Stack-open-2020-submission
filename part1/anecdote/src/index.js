import React, { useState } from 'react'
import ReactDom from 'react-dom'

const Button = ({ handlebutton, text }) => {
    return (
        <button onClick={handlebutton} >{text}</button>
    )
}

const Most_votes = ({ anecdotes, votes }) => {
    const high_vote = Math.max(...votes)
    const index = votes.indexOf(high_vote)
    return (

        <div>
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[index]}</p>
            <>has {high_vote} votes</>
        </div>
    )

}

const App = (props) => {

    const [selected, setselected] = useState(0)
    const [votes, setvote] = useState(Array(6).fill(0))


    const givevote = () => {

        const copy = [...votes]
        copy[selected] += 1
        setvote(copy)


    }



    return (
        <div>
            <h2>Anecdote of the day</h2>
            <div>{props.anecdotes[selected]}</div>
            <div>has {votes[selected]} votes</div>
            <Button handlebutton={givevote} text={'vote'} />
            <Button handlebutton={() => setselected(Math.floor(Math.random() * 6))} text={'next anecdote'} />
            <Most_votes anecdotes={props.anecdotes} votes={votes} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDom.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
