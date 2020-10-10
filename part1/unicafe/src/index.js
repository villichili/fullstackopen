import React, {useState} from 'react'
import ReactDOM from 'react-dom'

/**
 * Feedback app, enables user to give feedback (good, neutral or bad) and shows their statistics
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
      <div>
        <h2>Give feedback</h2>
        <button onClick={handleGoodClick}>Good</button>
        <button onClick={handleNeutralClick}>Neutral</button>
        <button onClick={handleBadClick}>Bad</button>
        <h2>Statistic</h2>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
      </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))