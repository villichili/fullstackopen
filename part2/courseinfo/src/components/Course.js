import React from "react"

/**
 * Course component consisting of Header, Content (Parts and Total)
 * @param course
 * @returns {JSX.Element}
 * @constructor
 */
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
export default Course