import React, {useState} from 'react'
import ReactDOM from 'react-dom'

/**
 * Anecdotes app, shows random anecdote when clicking button, collects votes given for each
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const max = props.anecdotes?.length ?? 0
  const [votes, setVotes] = useState(new Array(max).fill(0))

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  function handleRandomClick() {
    setSelected(getRandomInt(max))
  }

  function handleVote() {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  return (
      <div>
        <p>{props.anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={() => handleVote()}>vote</button>
        <button onClick={() => handleRandomClick()}>next random anecdote</button>
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

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root'))