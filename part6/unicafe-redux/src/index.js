import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './redusers/counterReducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <table>
        <tbody>
          <tr>
            <td>{'good'}</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>{'neutral'}</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>{'bad'}</td>
            <td>{store.getState().bad}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)