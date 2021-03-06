import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createPerson = person => {
  const request = axios.post(baseUrl, person)
  return request.then(response => response.data)
}

const updatePerson = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person).then(response => response)
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response)
}

export default {getAll, createPerson, updatePerson, deletePerson}