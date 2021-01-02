import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const Button = ({ clickhandle, text }) => {
  return (
    <button onClick={clickhandle}>{text}</button>
  )

}

const Statistics = ({ good, neutral, bad, }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div><h4>No feedback given.</h4></div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic text={'good'} count={good} />
          <Statistic text={'neutral'} count={neutral} />
          <Statistic text={'bad'} count={bad} />

          <Statistic text={'all'} count={good + neutral + bad} />
          <Statistic text={'average'} count={(good - bad) / (good + neutral + bad)} />
          <Statistic text={'positive'} count={(good / (good + neutral + bad)) * 100 + ' %'} />
        </tbody>
      </table>
    </div >
  )
}
const Statistic = ({ text, count }) => {

  return (

    <tr>
      <td>
        {text}
      </td>
      <td>
        {count}
      </td>
    </tr>

  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button clickhandle={() => setGood(good + 1)} text={'good'} />
      <Button clickhandle={() => setNeutral(neutral + 1)} text={'neutal'} />
      <Button clickhandle={() => setBad(bad + 1)} text={'bad'} />
      <h2>Statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)