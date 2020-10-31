import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import axios from 'axios'

const Country = ({country}) => (
    <div>
      <h2>{country.name}</h2>
      <p>{country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country?.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
      </ul>
      <img src={country.flag} width={200}/>
    </div>
)

const CountriesSection = ({countries}) => {
  if (countries?.length === 1) {
    return <Country country={countries[0]}/>
  }
  if (countries?.length > 1 && countries.length < 10) {
    return countries.map(c => <p>{c.name}</p>)
  }
  return (
      <p>Too many matches, specify another filter</p>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => setCountries(response.data)).catch()
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filteredCountries = search && search.length > 0 ? countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : countries
  return (
      <div>
        find countries: <input onChange={handleSearchChange}/>
        <CountriesSection countries={filteredCountries}/>
      </div>
  )
}
export default App

ReactDOM.render(<App/>, document.getElementById('root'))
