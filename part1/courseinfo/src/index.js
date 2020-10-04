import React from 'react'
import ReactDOM from 'react-dom'

/**
 * Create the Header component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Header = (props) => (
    <h1>{props.course}</h1>
)

/**
 * Creates the Content component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Content = (props) => (
    <>
      <Part part={props.part1.name} exercise={props.part1.exercises}/>
      <Part part={props.part2.name} exercise={props.part2.exercises}/>
      <Part part={props.part3.name} exercise={props.part3.exercises}/>
    </>
)

/**
 * Creates a part component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Part = (props) => (
    <p>
      {props.part} {props.exercise}
    </p>
)

/**
 * Creates the Total component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Total = (props) => (
    <p>Number of exercises {props.total}</p>
)

/**
 * Creates the application with Header, Content and Total components
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
      <div>
        <Header course={course}/>
        <Content part1={part1} part2={part2} part3={part3}/>
        <Total total={part1.exercises + part2.exercises + part3.exercises}/>
      </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))