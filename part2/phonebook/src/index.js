import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import personsService from "./services/persons"
import './index.css'

const Filter = ({handleSearchChange}) => <div>filter: <input onChange={handleSearchChange}/></div>

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

const Notification = ({notification}) => (
    <div className={`notification ${notification.type}`}>
      <p>{notification.message}</p>
    </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    getAllPersons()
  }, [])

  const getAllPersons = () => {
    // This might not be necessary to always call for db to update could update the state also but this is easier
    personsService.getAll().then(persons => setPersons(persons)).catch()
  }

  const showNotification = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {
          setNotification(null)
        }, 2500
    )
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

  const handleUpdate = (person) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      personsService.updatePerson(person.id, getNewPersonObject()).then(response => {
        if (response.status === 200) {
          getAllPersons()
          unsetValues()
          showNotification(`Person (${person.name}) updated successfully`, 'success')
        }
      })
    }
  }

  const handleDelete = (event) => {
    let personToDelete = persons.find(p => p.id == event.target.value)
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personsService.deletePerson(event?.target.value).then(response => {
        if (response.status === 200) {
          getAllPersons()
          showNotification(`Person (${personToDelete.name}) deleted successfully`, 'success')
        }
      }).catch(error => {
        if (error?.message?.includes("Request failed with status code 404")) {
          showNotification(`Information of ${personToDelete.name} has already been removed from server`, 'error')
          getAllPersons()
        } else {
          showNotification(`Unexpected error ${error.message}`, 'error')
        }
      })
    }
  }

  const getNewPersonObject = () => ({name: newName, number: newNumber})

  const unsetValues = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    let personWitSameName = persons.find(p => p.name === newName)
    if (personWitSameName) {
      handleUpdate(personWitSameName)
    } else if (persons.find(p => p.number === newNumber)) {
      window.alert(`${newNumber} is already added to phonebook`)
    } else {
      let newPersonObject = getNewPersonObject()
      personsService.createPerson(newPersonObject).then(() => {
        getAllPersons()
        unsetValues()
        showNotification(`Person (${newPersonObject.name}) added successfully`, 'success')
      })
    }
  }

  const filteredPersons = newSearch && newSearch.length > 0 ? persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase())) : persons

  return (
      <div>
        <h2>Phonebook</h2>
        <Filter handleSearchChange={handleSearchChange}/>
        <h2>add new</h2>
        {!!notification && <Notification notification={notification}/>}
        <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber}
                    handleNumberChange={handleNumberChange}/>
        <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
      </div>
  )
}

export default App

ReactDOM.render(<App/>, document.getElementById('root'))
