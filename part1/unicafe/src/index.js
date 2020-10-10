import React, {useState} from 'react'
import ReactDOM from 'react-dom'

/**
 * Button component for showing button with given click handler and text
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)
/**
 * Statistic component for showing single statistic with given text and value
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Statistic = (props) => (
    <p>{props.text} {props.value}</p>
)

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

  if (good || neutral || bad) {
    return (
        <>
          <Statistic text={'Good'} value={good}/>
          <Statistic text={'Neutral'} value={neutral}/>
          <Statistic text={'Bad'} value={bad}/>
          <Statistic text={'All'} value={getAllFeedbackAmount()}/>
          <Statistic text={'Average'} value={getAverageFeedback()}/>
          <Statistic text={'Positive'} value={getPositiveFeedbackPercent() + '%'}/>
        </>
    )
  } else {
    return (
        <p>No feedback given</p>
    )
  }
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
        <Button handleClick={() => handleGoodClick()} text={'Good'}/>
        <Button handleClick={() => handleNeutralClick()} text={'Neutral'}/>
        <Button handleClick={() => handleBadClick()} text={'Bad'}/>
        <h2>Statistic</h2>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))