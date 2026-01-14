import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const contributionService = {
    async getAll() {
        const response = await axios.get(`${API_BASE_URL}/contributions`);
        return response.data;
    },

    async getById(id) {
        const response = await axios.get(`${API_BASE_URL}/contributions/${id}`);
        return response.data;
    },

    async getByEmployeeId(employeeId) {
        const response = await axios.get(`${API_BASE_URL}/contributions/employee/${employeeId}`);
        return response.data;
    },

    async create(contributionData) {
        const response = await axios.post(`${API_BASE_URL}/contributions`, contributionData);
        return response.data;
    },

    async update(id, contributionData) {
        const response = await axios.put(`${API_BASE_URL}/contributions/${id}`, contributionData);
        return response.data;
    },

    async delete(id) {
        const response = await axios.delete(`${API_BASE_URL}/contributions/${id}`);
        return response.data;
    }
};