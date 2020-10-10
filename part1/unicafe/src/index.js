import React, {useState} from 'react'
import ReactDOM from 'react-dom'

/**
 * Statistic component for showing feedback amount, average and positive percentage
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Statistics = (props) => {
  const {good, neutral, bad} = props

  const getAllFeedbackAmount = () => {
    return good + neutral + bad
  }
  const getAverageFeedback = () => {
    return (good - bad) / getAllFeedbackAmount()
  }
  const getPositiveFeedbackPercent = () => {
    return (good / getAllFeedbackAmount()) * 100
  }

  return (
      <>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {getAllFeedbackAmount()}</p>
        <p>Average {getAverageFeedback()}</p>
        <p>Positive {getPositiveFeedbackPercent()} %</p>
      </>
  )
}
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
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))