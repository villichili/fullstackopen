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
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
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
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
)

/**
 * Creates the application with Header, Content and Total components
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))