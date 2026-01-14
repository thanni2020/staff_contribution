<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-info">
        <h1>{{ employeeName }} Contributions</h1>
        <div v-if="!loading && contributions.length > 0" class="total-summary">
          <span class="total-label">Total Contributions:</span>
          <span class="total-amount">₦{{ totalContributions.toFixed(2) }}</span>
        </div>
      </div>
      <router-link to="/contributions/create" class="btn btn-primary">Add Contribution</router-link>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-if="contributions.length === 0" class="empty-state">
        <p>No contributions found for this employee.</p>
        <router-link to="/contributions/create" class="btn btn-primary">Add First Contribution</router-link>
      </div>
      <div v-else class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Amount</th>
              <th>Date Paid</th>
              <th class="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contribution in contributions" :key="contribution._id">
              <td>{{ contribution.month }}</td>
              <td class="amount">₦{{ Number(contribution.amount).toFixed(2) }}</td>
              <td>{{ formatDate(contribution.datePaid) }}</td>

              <td class="actions">
                <div class="action-buttons">
                  <router-link :to="`/contributions/${contribution._id}`" class="btn btn-sm btn-info">
                    View
                  </router-link>
                  <router-link :to="`/contributions/${contribution._id}/edit`" class="btn btn-sm btn-warning">
                    Edit
                  </router-link>
                  <button @click="deleteContribution(contribution._id)" class="btn btn-sm btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { contributionService } from '../services/contributionService.js'
import { employeeService } from '../services/employeeService.js'

const route = useRoute()

const contributions = ref([])
const loading = ref(false)
const error = ref('')
const employeeName = ref('')

const totalContributions = computed(() => {
  return contributions.value.reduce((total, contribution) => {
    return total + Number(contribution.amount)
  }, 0)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const loadContributions = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const employeeId = route.params.employeeId
    
    // Load employee name
    const employee = await employeeService.getById(employeeId)
    employeeName.value = employee.name
    
    // Load contributions for this employee
    contributions.value = await contributionService.getByEmployeeId(employeeId)
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
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-border);
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.page-header h1 {
  margin: 0;
  color: var(--color-text);
  font-size: 2rem;
  font-weight: 600;
}

.total-summary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
  font-size: 0.9rem;
}

.total-label {
  color: #0369a1;
  font-weight: 500;
}

.total-amount {
  color: #0c4a6e;
  font-weight: 700;
  font-size: 1.1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
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

.btn-danger {
  background-color: var(--color-danger);
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-light);
}

.error {
  color: var(--color-danger);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-light);
}

.empty-state p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

.modern-table th:nth-child(2) {
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

.actions-header {
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



@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .header-info {
    text-align: center;
  }

  .total-summary {
    justify-content: center;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  .modern-table {
    min-width: 500px;
  }
  
  .action-buttons {
    flex-direction: row;
    gap: var(--space-1, 0.25rem);
  }

  .action-buttons .btn {
    min-width: auto;
    padding: var(--space-1, 0.25rem) var(--space-2, 0.5rem);
    font-size: var(--font-size-xs, 0.75rem);
  }
}
</style>