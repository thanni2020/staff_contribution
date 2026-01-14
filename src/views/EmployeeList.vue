<template>
  <div class="employee-list">
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1>Employees</h1>
          <p>Manage your team members</p>
        </div>
        <router-link to="/employees/create" class="btn btn-primary">
          Add Employee
        </router-link>
      </div>
    </div>

    <div class="content-container">
      <div v-if="loading" class="state-message loading-state">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <span>Loading employees...</span>
        </div>
      </div>
      
      <div v-else-if="error" class="state-message error">
        <span class="error-icon">⚠️</span>
        <span>{{ error }}</span>
      </div>
      
      <div v-else-if="employees.length === 0" class="state-message no-employees">
        <h3>No employees found</h3>
        <p>Get started by adding your first employee</p>
        <router-link to="/employees/create" class="btn btn-primary">Add Employee</router-link>
      </div>
      
      <div v-else class="table-card">
        <div class="table-header">
          <div class="table-info">
            <h3>Total Employees</h3>
            <span class="employee-count">{{ employees.length }}</span>
          </div>
        </div>
        
        <div class="table-container">
          <table class="employees-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Joined</th>
                <th class="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee._id" class="table-row">
                <td class="employee-info">
                  <div class="employee-details">
                    <span class="employee-name">{{ employee.name }}</span>
                  </div>
                </td>
                <td>
                  <span class="department-badge">{{ employee.department }}</span>
                </td>
                <td class="phone-cell">{{ employee.phone }}</td>
                <td class="date-cell">{{ formatDate(employee.createdAt) }}</td>
                <td class="actions-cell">
                  <div class="action-buttons">
                    <router-link :to="`/employees/${employee._id}`" class="btn btn-sm btn-info">
                      View
                    </router-link>
                    <router-link :to="`/employees/${employee._id}/contributions`" class="btn btn-sm btn-success">
                      Contributions
                    </router-link>
                    <router-link :to="`/employees/${employee._id}/edit`" class="btn btn-sm btn-warning">
                      Edit
                    </router-link>
                    <button @click="deleteEmployee(employee._id)" class="btn btn-sm btn-danger">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { employeeService } from '../services/employeeService.js'

const router = useRouter()
const employees = ref([])
const loading = ref(false)
const error = ref('')

const fetchEmployees = async () => {
  loading.value = true
  error.value = ''
  
  try {
    employees.value = await employeeService.getAll()
  } catch (err) {
    error.value = 'Failed to load employees'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deleteEmployee = async (id) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    try {
      await employeeService.delete(id)
      employees.value = employees.value.filter(emp => emp._id !== id)
    } catch (err) {
      alert('Failed to delete employee')
      console.error(err)
    }
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(fetchEmployees)
</script>

<style scoped>
.employee-list {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: var(--space-8);
}

.header-content {
  background: var(--white);
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-text h1 {
  margin-bottom: var(--space-2);
  color: var(--gray-900);
  font-size: var(--font-size-3xl);
}

.header-text p {
  color: var(--gray-600);
  margin-bottom: 0;
  font-size: var(--font-size-lg);
}

.btn-icon {
  font-size: var(--font-size-lg);
  font-weight: bold;
}

.content-container {
  min-height: 400px;
}

.state-message {
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: var(--space-12);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  color: var(--gray-600);
  font-size: var(--font-size-lg);
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--gray-200);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  color: var(--error-color);
}

.error-icon {
  font-size: var(--font-size-2xl);
  margin-right: var(--space-3);
}

.no-employees {
  color: var(--gray-600);
}

.no-employees h3 {
  margin-bottom: var(--space-2);
  color: var(--gray-700);
}

.no-employees p {
  margin-bottom: var(--space-6);
  font-size: var(--font-size-lg);
}

.table-card {
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.table-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--gray-200);
  background: var(--gray-50);
}

.table-info {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.table-info h3 {
  margin-bottom: 0;
  color: var(--gray-900);
}

.employee-count {
  background: var(--primary-color);
  color: var(--white);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.table-container {
  overflow-x: auto;
}

.employees-table {
  width: 100%;
  border-collapse: collapse;
}

.employees-table th {
  padding: var(--space-4) var(--space-6);
  text-align: left;
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--gray-700);
  background: var(--gray-50);
  border-bottom: 1px solid var(--gray-200);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.employees-table td {
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--gray-100);
}

.table-row {
  transition: background-color var(--transition-fast);
}

.table-row:hover {
  background-color: var(--gray-50);
}

.employee-info {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.employee-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.employee-name {
  font-weight: 600;
}

.employee-id {
  font-size: var(--font-size-xs);
  color: var(--gray-500);
  font-family: monospace;
}

.department-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background: var(--gray-100);
  color: var(--gray-700);
  border-radius: var(--radius);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.phone-cell {
  font-family: monospace;
  color: var(--gray-600);
}

.date-cell {
  color: var(--gray-600);
  font-size: var(--font-size-sm);
}

.employees-table .actions-header {
  text-align: center;
}

.actions-cell {
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: var(--space-2);
  justify-content: center;
}

.action-buttons .btn {
  min-width: 60px;
  padding: var(--space-1) var(--space-3);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  text-decoration: none;
  transition: all var(--transition-fast);
  font-size: var(--font-size-sm);
}

.action-buttons .btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: var(--space-6);
    text-align: center;
  }

  .table-container {
    border-radius: 0;
    margin: 0 -var(--space-4);
  }

  .employees-table th,
  .employees-table td {
    padding: var(--space-3) var(--space-2);
    font-size: var(--font-size-sm);
  }

  .employee-info {
    flex-direction: row;
    gap: var(--space-2);
    text-align: left;
  }

  .action-buttons {
    flex-direction: row;
    gap: var(--space-1);
  }

  .action-buttons .btn {
    min-width: auto;
    padding: var(--space-1) var(--space-2);
    font-size: var(--font-size-xs);
  }
}

@media (max-width: 480px) {
  .page-header {
    margin-bottom: var(--space-6);
  }

  .header-content {
    padding: var(--space-6);
  }

  .header-text h1 {
    font-size: var(--font-size-2xl);
  }

  .table-card {
    border-radius: 0;
  }

  .employees-table th:nth-child(3),
  .employees-table td:nth-child(3),
  .employees-table th:nth-child(4),
  .employees-table td:nth-child(4) {
    display: none;
  }
}
</style>