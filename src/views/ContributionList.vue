<template>
  <div class="contribution-list">
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1>All Contributions</h1>
          <p>Manage staff contributions</p>
        </div>
        <router-link to="/contributions/create" class="btn btn-primary">
          Add Contribution
        </router-link>
      </div>
    </div>

    <div class="content-container">
      <div v-if="loading" class="state-message loading">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <span>Loading contributions...</span>
        </div>
      </div>
      <div v-else-if="error" class="state-message error">{{ error }}</div>
      <div v-else>
        <div v-if="contributions.length === 0" class="state-message empty">
          <div class="empty-content">
            <h3>No contributions found</h3>
            <p>Start by adding your first contribution</p>
            <router-link to="/contributions/create" class="btn btn-primary">Add First Contribution</router-link>
          </div>
        </div>
        <div v-else class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Date Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contribution in contributions" :key="contribution._id">
              <td>{{ contribution.employee?.name || 'Unknown' }}</td>
              <td>{{ contribution.month }}</td>
              <td class="amount">₦{{ Number(contribution.amount).toFixed(2) }}</td>
              <td>{{ formatDate(contribution.datePaid) }}</td>
              <td class="actions">
                <div class="action-buttons">
                  <router-link :to="`/contributions/${contribution._id}`" class="btn btn-sm btn-info">View</router-link>
                  <router-link :to="`/contributions/${contribution._id}/edit`" class="btn btn-sm btn-warning">Edit</router-link>
                  <button @click="deleteContribution(contribution._id)" class="btn btn-sm btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { contributionService } from '../services/contributionService.js'

const contributions = ref([])
const loading = ref(false)
const error = ref('')

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const loadContributions = async () => {
  try {
    loading.value = true
    error.value = ''
    contributions.value = await contributionService.getAll()
  } catch (err) {
    error.value = 'Failed to load contributions'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deleteContribution = async (id) => {
  if (confirm('Are you sure you want to delete this contribution?')) {
    try {
      await contributionService.delete(id)
      await loadContributions()
    } catch (err) {
      alert('Failed to delete contribution')
      console.error(err)
    }
  }
}

onMounted(() => {
  loadContributions()
})
</script>

<style scoped>
.contribution-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-border);
}

.header-text h1 {
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
  font-size: 2.5rem;
  font-weight: 700;
}

.header-text p {
  margin: 0;
  color: var(--color-text-light);
  font-size: 1.1rem;
}

.content-container {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.state-message {
  padding: 4rem 2rem;
  text-align: center;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--color-text-light);
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid var(--color-gray-200);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error {
  color: var(--color-danger);
  font-weight: 500;
}

.empty-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-content h3 {
  margin: 0 0 1rem 0;
  color: var(--color-text);
  font-size: 1.5rem;
  font-weight: 600;
}

.empty-content p {
  margin: 0 0 2rem 0;
  color: var(--color-text-light);
  font-size: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--color-primary, #3b82f6);
  color: white;
  border: 1px solid var(--color-primary, #3b82f6);
}

.btn-primary:hover {
  background-color: var(--color-primary-dark, #2563eb);
  transform: translateY(-1px);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

.btn-secondary {
  background-color: var(--color-gray-100);
  color: var(--color-text);
}

.btn-secondary:hover {
  background-color: var(--color-gray-200);
}

.table-container {
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table th {
  background-color: var(--color-gray-50);
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--color-text);
  border-bottom: 2px solid var(--color-border);
  font-size: 0.9rem;
}

.modern-table th:nth-child(3) {
  text-align: right;
}

.modern-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.modern-table tr:hover {
  background-color: var(--color-gray-25);
}

.amount {
  text-align: right;
  font-weight: 600;
  color: var(--color-success);
  font-size: 1rem;
}

.actions {
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: var(--space-2, 0.5rem);
  justify-content: center;
}

.action-buttons .btn {
  min-width: 60px;
  padding: var(--space-1, 0.25rem) var(--space-3, 0.75rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius, 6px);
  text-decoration: none;
  transition: all var(--transition-fast, 0.2s ease);
  font-size: var(--font-size-sm, 0.875rem);
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.action-buttons .btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .contribution-list {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    text-align: center;
  }
  
  .modern-table {
    min-width: 600px;
  }
  
  .actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>