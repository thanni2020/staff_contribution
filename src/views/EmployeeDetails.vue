<template>
  <div class="employee-details">
    <div class="details-header">
      <div class="breadcrumb">
        <router-link to="/employees">Employees</router-link>
        <span>/</span>
        <span>Details</span>
      </div>
      <h1 v-if="employee">{{ employee.name }}</h1>
      <h1 v-else>Employee Details</h1>
    </div>

    <div v-if="loading" class="loading">Loading employee details...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="employee" class="details-card">
      <div class="details-section">
        <h2>Employee Information</h2>
        
        <div class="details-grid">
          <div class="detail-item">
            <label>Name</label>
            <span>{{ employee.name }}</span>
          </div>

          <div class="detail-item">
            <label>Department</label>
            <span>{{ employee.department }}</span>
          </div>

          <div class="detail-item">
            <label>Phone</label>
            <span>{{ employee.phone }}</span>
          </div>

          <div class="detail-item">
            <label>Employee ID</label>
            <span class="employee-id">{{ employee._id.slice(-8) }}</span>
          </div>

          <div class="detail-item">
            <label>Created</label>
            <span>{{ formatDate(employee.createdAt) }}</span>
          </div>

          <div v-if="employee.updatedAt !== employee.createdAt" class="detail-item">
            <label>Updated</label>
            <span>{{ formatDate(employee.updatedAt) }}</span>
          </div>
        </div>
      </div>

      <div class="actions-section">
        <router-link :to="`/employees/${employee._id}/contributions`" class="btn btn-success">
          View Contributions
        </router-link>
        <router-link :to="`/employees/${employee._id}/edit`" class="btn btn-warning">
          Edit Employee
        </router-link>
        <button @click="deleteEmployee" class="btn btn-danger">
          Delete Employee
        </button>
        <router-link to="/employees" class="btn btn-secondary">
          Back to List
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { employeeService } from '../services/employeeService.js'

const route = useRoute()
const router = useRouter()

const employee = ref(null)
const loading = ref(false)
const error = ref('')

const fetchEmployee = async () => {
  loading.value = true
  error.value = ''
  
  try {
    employee.value = await employeeService.getById(route.params.id)
  } catch (err) {
    error.value = 'Employee not found'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deleteEmployee = async () => {
  if (confirm(`Are you sure you want to delete ${employee.value.name}?`)) {
    try {
      await employeeService.delete(employee.value._id)
      router.push('/employees')
    } catch (err) {
      alert('Failed to delete employee')
      console.error(err)
    }
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}

onMounted(fetchEmployee)
</script>

<style scoped>
.employee-details {
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
}

.details-header {
  text-align: center;
  margin-bottom: 2rem;
}

.breadcrumb {
  margin-bottom: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: #3b82f6;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb span {
  margin: 0 0.5rem;
}

.details-header h1 {
  margin: 0;
  color: #1f2937;
  font-size: 2rem;
  font-weight: 600;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.error {
  color: #dc2626;
}

.details-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.details-section h2 {
  margin: 0 0 1.5rem 0;
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.5rem;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item label {
  font-weight: 500;
  color: #6b7280;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-item span {
  color: #1f2937;
  font-size: 1rem;
  font-weight: 500;
}

.employee-id {
  font-family: monospace;
  color: #7c3aed !important;
  font-size: 0.9rem !important;
  font-weight: 600 !important;
}

.actions-section {
  display: flex;
  gap: var(--space-4, 1rem);
  justify-content: center;
  border-top: 1px solid var(--gray-200);
  padding-top: var(--space-6, 1.5rem);
  flex-wrap: wrap;
}

.actions-section .btn {
  padding: var(--space-3, 0.75rem) var(--space-4, 1rem);
  border-radius: var(--radius-lg, 10px);
  text-decoration: none;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast, 0.2s ease);
  min-width: 120px;
  text-align: center;
}

@media (max-width: 640px) {
  .employee-details {
    margin: 1rem;
    padding: 1rem;
  }
  
  .details-card {
    padding: 1.5rem;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .actions-section {
    flex-direction: column;
    align-items: center;
  }

  .actions-section .btn {
    min-width: 200px;
  }
}
</style>