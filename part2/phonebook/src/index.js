import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-1234567'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else if (persons.find(p => p.number === newNumber)) {
      window.alert(`${newNumber} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
          <div>
            <button type="submit">add</button>
          </div>
          <div>debug: {newName}</div>
        </form>
        <h2>Numbers</h2>
        {persons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
      </div>
  )
}

export default App

ReactDOM.render(<App/>, document.getElementById('root'))
