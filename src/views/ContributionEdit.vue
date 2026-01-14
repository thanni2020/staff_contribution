<template>
  <div class="edit-contribution">
    <div class="form-header">
      <h1>Edit Contribution</h1>
      <p>Update contribution details</p>
    </div>

    <div v-if="loading" class="loading">Loading contribution...</div>
    <div v-else-if="error && !contribution" class="error">{{ error }}</div>
    <div v-else class="form-card">
      <form @submit.prevent="updateContribution" class="contribution-form">
        <div class="form-row">
          <label for="employee">Employee</label>
          <select 
            id="employee"
            v-model="form.employee" 
            required
            :class="{ 'error': errors.employee }"
          >
            <option value="">Select Employee</option>
            <option v-for="employee in employees" :key="employee._id" :value="employee._id">
              {{ employee.name }}
            </option>
          </select>
          <span v-if="errors.employee" class="error-text">{{ errors.employee }}</span>
        </div>

        <div class="form-row">
          <label for="month">Month</label>
          <select 
            id="month"
            v-model="form.month" 
            required
            :class="{ 'error': errors.month }"
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <span v-if="errors.month" class="error-text">{{ errors.month }}</span>
        </div>

        <div class="form-row">
          <label for="amount">Amount (₦)</label>
          <input 
            id="amount"
            v-model.number="form.amount" 
            type="number" 
            step="0.01"
            min="0"
            required
            :class="{ 'error': errors.amount }"
            placeholder="0.00"
          />
          <span v-if="errors.amount" class="error-text">{{ errors.amount }}</span>
        </div>

        <div class="form-row">
          <label for="datePaid">Date Paid</label>
          <input 
            id="datePaid"
            v-model="form.datePaid" 
            type="date" 
            required
            :class="{ 'error': errors.datePaid }"
          />
          <span v-if="errors.datePaid" class="error-text">{{ errors.datePaid }}</span>
        </div>

        <div v-if="error" class="alert-error">
          {{ error }}
        </div>
        
        <div v-if="success" class="alert-success">
          {{ success }}
        </div>

        <div class="form-actions">
          <router-link to="/contributions" class="btn-cancel">Cancel</router-link>
          <button type="submit" :disabled="submitting" class="btn-submit">
            {{ submitting ? 'Updating...' : 'Update Contribution' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { contributionService } from '../services/contributionService.js'
import { employeeService } from '../services/employeeService.js'

const route = useRoute()
const router = useRouter()

const form = ref({
  employee: '',
  month: '',
  amount: '',
  datePaid: ''
})

const employees = ref([])
const contribution = ref(null)
const errors = ref({})
const error = ref('')
const success = ref('')
const submitting = ref(false)
const loading = ref(false)

const formatDateForInput = (date) => {
  if (!date) return ''
  return new Date(date).toISOString().split('T')[0]
}

const loadData = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Load employees and contribution data
    const [employeesData, contributionData] = await Promise.all([
      employeeService.getAll(),
      contributionService.getById(route.params.id)
    ])
    
    employees.value = employeesData
    contribution.value = contributionData
    
    // Populate form with existing data
    form.value = {
      employee: contributionData.employee?._id || '',
      month: contributionData.month || '',
      amount: contributionData.amount || '',
      datePaid: formatDateForInput(contributionData.datePaid)
    }
    
  } catch (err) {
    error.value = 'Failed to load contribution data'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.employee) {
    errors.value.employee = 'Please select an employee'
  }
  
  if (!form.value.month) {
    errors.value.month = 'Please select a month'
  }
  
  if (!form.value.amount || form.value.amount <= 0) {
    errors.value.amount = 'Please enter a valid amount'
  }
  
  if (!form.value.datePaid) {
    errors.value.datePaid = 'Please select a date paid'
  }
  
  return Object.keys(errors.value).length === 0
}

const updateContribution = async () => {
  error.value = ''
  success.value = ''
  
  if (!validateForm()) {
    return
  }
  
  try {
    submitting.value = true
    
    const contributionData = {
      employee: form.value.employee,
      month: form.value.month,
      amount: form.value.amount,
      datePaid: form.value.datePaid
    }
    
    await contributionService.update(route.params.id, contributionData)
    
    success.value = 'Contribution updated successfully!'
    
    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/contributions')
    }, 2000)
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update contribution'
    console.error(err)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.edit-contribution {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h1 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.875rem;
  font-weight: 600;
}

.form-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
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

.form-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.form-row {
  margin-bottom: 1.5rem;
}

.form-row label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-row input,
.form-row select {
  width: 100%;
  padding: 0.875rem;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #fff;
}

.form-row input:focus,
.form-row select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-row input.error,
.form-row select.error {
  border-color: #ef4444;
}

.error-text {
  display: block;
  margin-top: 0.25rem;
  color: #ef4444;
  font-size: 0.875rem;
}

.alert-error {
  padding: 1rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  color: #dc2626;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.alert-success {
  padding: 1rem;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  color: #16a34a;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-cancel {
  flex: 1;
  padding: 0.875rem 1.5rem;
  background-color: #f9fafb;
  color: #4b5563;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.btn-submit {
  flex: 1;
  padding: 0.875rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-submit:hover:not(:disabled) {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 640px) {
  .edit-contribution {
    margin: 1rem;
    padding: 1rem;
  }
  
  .form-card {
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>