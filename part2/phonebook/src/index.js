import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import personsService from "./services/persons"

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

const Person = ({person, handleDelete}) =>
    <div>{person.name} {person.number}
      <button value={person.id} onClick={handleDelete}>delete</button>
    </div>

const Persons = ({filteredPersons, handleDelete}) => <>{filteredPersons.map(p => <Person key={p.name} person={p} handleDelete={handleDelete}/>)}</>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    getAllPersons()
  }, [])

  const getAllPersons = () => {
    // This might not be necessary to always call for db to update could update the state also but this is easier
    personsService.getAll().then(persons => setPersons(persons)).catch()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleDelete = (event) => {
    if (window.confirm(`Delete ${persons.find(p => p.id == event.target.value).name}`)) {
      personsService.deletePerson(event?.target.value).then(response => {
        if (response.status === 200) {
          getAllPersons()
        }
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else if (persons.find(p => p.number === newNumber)) {
      window.alert(`${newNumber} is already added to phonebook`)
    } else {
      let newPersonObject = {name: newName, number: newNumber}
      personsService.createPerson(newPersonObject).then(() => getAllPersons())
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
        <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
      </div>
  )
}

export default App

ReactDOM.render(<App/>, document.getElementById('root'))
