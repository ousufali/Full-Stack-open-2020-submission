import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import * as serviceWorker from './serviceWorker';

const Header = (props) => {
  console.log(props)
  return (
    <h2>{props.course.name}</h2>
  )
}
const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.numbers}</p>
    </div>


  )
}
const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} numbers={props.parts[0].exercises} />
      <Part name={props.parts[1].name} numbers={props.parts[1].exercises} />
      <Part name={props.parts[2].name} numbers={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const App = () => {

  const course = {
    name: 'Half stack application development',

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to passing data',
        exercises: 7
      },
      {
        name: 'State of component',
        exercises: 14
      }
    ]
  }
  /*const part2 = 'Using props to passing data'
  const exercise2 = 7
  const part3 = 'State of component'
  const exercise3 = 14  */

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div >
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
