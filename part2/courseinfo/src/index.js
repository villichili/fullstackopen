import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return (
      <h1>{course.name}</h1>
  )
}

const Total = ({course}) => {
  const sum = course.parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}))
  return (
      <p><strong>total of {sum.exercises} exercises</strong></p>
  )
}

const Part = ({part}) => {
  return (
      <p>
        {part.name} {part.exercises}
      </p>
  )
}

const Content = ({course}) => {
  const parts = course.parts.map(p => <Part key={p.id} part={p}/>)
  return (
      <div>
        {parts}
        <Total course={course}/>
      </div>
  )
}

const Course = ({course}) => {
  return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
      </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  const courseList = courses.map(c => <Course key={c.id} course={c}/>)
  return <div>{courseList}</div>
}

ReactDOM.render(<App/>, document.getElementById('root'))