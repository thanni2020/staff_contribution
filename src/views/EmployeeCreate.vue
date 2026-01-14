<template>
  <div class="employee-create">
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/employees" class="breadcrumb-link">Employees</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Add Employee</span>
        </div>
        
        <div class="header-main">
          <div class="header-text">
            <h1>Add New Employee</h1>
            <p>Create a new employee profile for your team</p>
          </div>
          <div class="header-actions">
            <router-link to="/employees" class="btn btn-secondary">
              Back to List
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="form-card">
        <form @submit.prevent="createEmployee" class="employee-form">
          <div class="form-section">
            <h3 class="section-title">Employee Information</h3>
            
            <div class="form-grid">
              <div class="form-group">
                <label for="name" class="form-label">Full Name *</label>
                <div class="input-wrapper">
                  <input 
                    id="name"
                    v-model="form.name" 
                    type="text" 
                    required
                    :class="['form-input', { 'input-error': errors.name }]"
                    placeholder="Enter employee's full name"
                  />
                </div>
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>

              <div class="form-group">
                <label for="department" class="form-label">Department *</label>
                <div class="select-wrapper">
                  <select 
                    id="department"
                    v-model="form.department" 
                    required
                    :class="['form-select', { 'input-error': errors.department }]"
                  >
                    <option value="">Select Department</option>
                    <option value="Teaching">Teaching</option>
                    <option value="Cleaning Service">Cleaning Service</option>
                    <option value="Management">Management</option>
                    <option value="Security">Security</option>
                  </select>
                </div>
                <span v-if="errors.department" class="error-message">{{ errors.department }}</span>
              </div>
              <div class="form-group form-group-full">
                <label for="phone" class="form-label">Phone Number *</label>
                <div class="input-wrapper">
                  <input 
                    id="phone"
                    v-model="form.phone" 
                    type="tel" 
                    required
                    :class="['form-input', { 'input-error': errors.phone }]"
                    placeholder="Enter phone number"
                  />
                </div>
                <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
              </div>
            </div>
          </div>

          <div v-if="error" class="alert alert-error">
            {{ error }}
          </div>
          
          <div v-if="success" class="alert alert-success">
            {{ success }}
          </div>

          <div class="form-footer">
            <div class="form-actions">
              <router-link to="/employees" class="btn btn-secondary">
                Cancel
              </router-link>
              <button type="submit" :disabled="submitting" class="btn btn-primary">
                <span v-if="submitting" class="btn-spinner"></span>
                {{ submitting ? 'Creating...' : 'Create Employee' }}
              </button>
            </div>
            
            <div class="form-help">
              <p>All fields marked with * are required</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { employeeService } from '../services/employeeService.js'

const router = useRouter()

const form = ref({
  name: '',
  department: '',
  phone: ''
})

const errors = ref({})
const submitting = ref(false)
const error = ref('')
const success = ref('')

const validateForm = () => {
  const newErrors = {}
  
  if (!form.value.name.trim()) {
    newErrors.name = 'Name is required'
  }
  
  if (!form.value.department) {
    newErrors.department = 'Department is required'
  }
  
  if (!form.value.phone.trim()) {
    newErrors.phone = 'Phone is required'
  } else if (!/^[0-9+\-\s()]{10,15}$/.test(form.value.phone)) {
    newErrors.phone = 'Please enter a valid phone number'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const createEmployee = async () => {
  if (!validateForm()) return
  
  submitting.value = true
  error.value = ''
  success.value = ''
  
  try {
    await employeeService.create(form.value)
    success.value = 'Employee created successfully!'
    
    setTimeout(() => {
      router.push('/employees')
    }, 1500)
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to create employee'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.employee-create {
  max-width: 1000px;
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
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  font-size: var(--font-size-sm);
}

.breadcrumb-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.breadcrumb-link:hover {
  color: var(--primary-dark);
}

.breadcrumb-separator {
  color: var(--gray-400);
}

.breadcrumb-current {
  color: var(--gray-600);
  font-weight: 500;
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-6);
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

.header-actions {
  display: flex;
  gap: var(--space-3);
  flex-shrink: 0;
}

.btn-icon {
  font-size: var(--font-size-sm);
}

.content-container {
  min-height: 400px;
}

.form-card {
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.employee-form {
  padding: var(--space-8);
}

.form-section {
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-3);
  border-bottom: 2px solid var(--gray-100);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group-full {
  grid-column: 1 / -1;
}

.form-label {
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
}

.input-wrapper, .select-wrapper {
  position: relative;
}

.form-input, .form-select {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  padding-right: var(--space-10);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  background-color: var(--white);
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: var(--gray-400);
}

.input-error {
  border-color: var(--error-color) !important;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.input-icon, .select-icon {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
  font-size: var(--font-size-lg);
  pointer-events: none;
}

.error-message {
  color: var(--error-color);
  font-size: var(--font-size-sm);
  margin-top: var(--space-1);
  font-weight: 500;
}

.alert {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-6);
  font-weight: 500;
}

.alert-error {
  background-color: #fef2f2;
  color: var(--error-color);
  border: 1px solid #fecaca;
}

.alert-success {
  background-color: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.alert-icon {
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.form-footer {
  background: var(--gray-50);
  margin: var(--space-8) -var(--space-8) -var(--space-8);
  padding: var(--space-6) var(--space-8);
  border-top: 1px solid var(--gray-200);
}

.form-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
  margin-bottom: var(--space-4);
}

.btn-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: var(--space-2);
}

.form-help {
  text-align: center;
}

.form-help p {
  color: var(--gray-500);
  font-size: var(--font-size-sm);
  margin: 0;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .header-main {
    flex-direction: column;
    gap: var(--space-4);
  }

  .header-actions {
    width: 100%;
    justify-content: center;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .form-group-full {
    grid-column: 1;
  }

  .employee-form {
    padding: var(--space-6);
  }

  .form-footer {
    margin: var(--space-6) -var(--space-6) -var(--space-6);
    padding: var(--space-4) var(--space-6);
  }

  .form-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: var(--space-6);
  }

  .header-text h1 {
    font-size: var(--font-size-2xl);
  }

  .employee-form {
    padding: var(--space-4);
  }

  .form-footer {
    margin: var(--space-4) -var(--space-4) -var(--space-4);
    padding: var(--space-4);
  }
}
</style>