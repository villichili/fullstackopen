import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-1234567'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
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

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const filteredPersons = newSearch && newSearch.length > 0 ? persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase())) : persons
  return (
      <div>
        <h2>Phonebook</h2>
        <div>
          filter: <input onChange={handleSearchChange}/>
        </div>
        <h2>add new</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {filteredPersons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
      </div>
  )
}

export default App

ReactDOM.render(<App/>, document.getElementById('root'))
