import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then(response => response.data)
}

const create = (person) => {
    const response = axios.post(baseUrl, person)
    return response.then(response => response.data)
}

const exclude = (id) => {
    const response = axios.delete(`${baseUrl}/${id}`)
    return response.then(response => response.data)
}

const update = (person) => {
    const response = axios.put(`${baseUrl}/${person.id}`, person)
    return response.then(response => response.data)
}

export default {
    getAll,
    create,
    exclude,
    update
}