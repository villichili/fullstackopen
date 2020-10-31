import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Filter = ({handleSearchChange}) => <div>filter :<input onChange={handleSearchChange}/></div>

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return <form onSubmit={addPerson}>
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
}

const Persons = ({filteredPersons}) => <>{filteredPersons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}</>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => setPersons(response.data)).catch()
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
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

  const filteredPersons = newSearch && newSearch.length > 0 ? persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase())) : persons
  return (
      <div>
        <h2>Phonebook</h2>
        <Filter handleSearchChange={handleSearchChange}/>
        <h2>add new</h2>
        <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber}
                    handleNumberChange={handleNumberChange}/>
        <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons}/>
      </div>
  )
}

export default App

ReactDOM.render(<App/>, document.getElementById('root'))
