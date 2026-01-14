import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const employeeService = {
  async getAll() {
    const response = await axios.get(`${API_BASE_URL}/employees`)
    return response.data
  },

  async getById(id) {
    const response = await axios.get(`${API_BASE_URL}/employees/${id}`)
    return response.data
  },

  async create(employeeData) {
    const response = await axios.post(`${API_BASE_URL}/employees`, employeeData)
    return response.data
  },

  async update(id, employeeData) {
    const response = await axios.put(`${API_BASE_URL}/employees/${id}`, employeeData)
    return response.data
  },

  async delete(id) {
    const response = await axios.delete(`${API_BASE_URL}/employees/${id}`)
    return response.data
  }
}