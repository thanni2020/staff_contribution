# Frontend Development: Staff Contributions Management System
## Vue.js 3 + Vue Router + Axios Tutorial

### Table of Contents
1. [Frontend Project Overview](#frontend-project-overview)
2. [Environment Setup & Project Structure](#environment-setup--project-structure)
3. [Vue Router Setup](#vue-router-setup)
4. [API Services Layer](#api-services-layer)
5. [Application Layout & Navigation](#application-layout--navigation)
6. [Employee Components](#employee-components)
7. [Contribution Components](#contribution-components)
8. [Basic Styling](#basic-styling)

---

## Frontend Project Overview

### What We're Building
A single-page application (SPA) for managing staff contributions with:
- Sidebar navigation
- Employee management interface
- Contribution tracking system
- Real-time data display
- Form validation and error handling

### Technology Stack
- **Framework**: Vue.js 3 with Composition API
- **Routing**: Vue Router 4
- **HTTP Client**: Axios for API calls
- **Build Tool**: Vite (fast development and production builds)
- **Styling**: CSS3 with custom properties and modern layouts

### Project Architecture
```
src/
├── assets/               # Static assets (images, icons)
├── components/           # Reusable Vue components
│   └── HelloWorld.vue    # Example component
├── router/               # Vue Router configuration
│   └── index.js          # Route definitions
├── services/             # API service modules
│   ├── employeeService.js
│   └── contributionService.js
├── views/                # Page-level components
│   ├── Home.vue
│   ├── EmployeeList.vue
│   ├── EmployeeCreate.vue
│   ├── EmployeeDetails.vue
│   ├── EmployeeEdit.vue
│   ├── EmployeeContributions.vue
│   ├── ContributionList.vue
│   ├── ContributionCreate.vue
│   ├── ContributionDetails.vue
│   └── ContributionEdit.vue
├── App.vue               # Root component with layout
├── main.js               # Application entry point
└── style.css             # Global styles
```

---

## Environment Setup & Project Structure

### Step 1: Project Initialization

```bash
# Create Vue 3 project with Vite
npm create vue@latest staff-contributions
cd staff-contributions

# Select options:
# TypeScript: No
# JSX: No  
# Vue Router: Yes
# Pinia: No
# Testing: No
# ESLint: No
```

### Step 2: Install Dependencies

```bash
# Install HTTP client for API calls
npm install axios

# Development dependencies (already included)
# - @vitejs/plugin-vue: Vue support for Vite
# - vite: Fast build tool and dev server
```

### Step 3: Package.json Configuration

**File: `package.json`**
```json
{
  "name": "staff-contributions",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",        // Start development server
    "build": "vite build", // Build for production
    "preview": "vite preview" // Preview production build
  },
  "dependencies": {
    "axios": "^1.13.2",        // HTTP client
    "vue": "^3.5.24",          // Vue.js framework
    "vue-router": "^4.6.4"     // Client-side routing
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.1", // Vue support for Vite
    "vite": "^7.2.4"                // Build tool
  }
}
```

**Key Learning Points:**
- **Vite**: Modern build tool with fast hot module replacement (HMR)
- **ES Modules**: Uses modern JavaScript module system
- **Development Server**: Auto-refresh on file changes
- **Production Build**: Optimized bundling and minification (comes pre-configured)

---

## Vue Router Setup

### Router Configuration

**File: `src/router/index.js`**
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EmployeeList from '../views/EmployeeList.vue'
import EmployeeCreate from '../views/EmployeeCreate.vue'
import EmployeeDetails from '../views/EmployeeDetails.vue'
import EmployeeEdit from '../views/EmployeeEdit.vue'
import ContributionList from '../views/ContributionList.vue'
import ContributionCreate from '../views/ContributionCreate.vue'
import ContributionDetails from '../views/ContributionDetails.vue'
import ContributionEdit from '../views/ContributionEdit.vue'
import EmployeeContributions from '../views/EmployeeContributions.vue'

const routes = [
  // Home route
  { 
    path: '/', 
    name: 'Home', 
    component: Home 
  },
  
  // Employee routes
  { 
    path: '/employees', 
    name: 'EmployeeList', 
    component: EmployeeList 
  },
  { 
    path: '/employees/create', 
    name: 'EmployeeCreate', 
    component: EmployeeCreate 
  },
  { 
    path: '/employees/:id', 
    name: 'EmployeeDetails', 
    component: EmployeeDetails 
  },
  { 
    path: '/employees/:id/edit', 
    name: 'EmployeeEdit', 
    component: EmployeeEdit 
  },
  
  // Contribution routes
  { 
    path: '/contributions', 
    name: 'ContributionList', 
    component: ContributionList 
  },
  { 
    path: '/contributions/create', 
    name: 'ContributionCreate', 
    component: ContributionCreate 
  },
  { 
    path: '/contributions/:id', 
    name: 'ContributionDetails', 
    component: ContributionDetails 
  },
  { 
    path: '/contributions/:id/edit', 
    name: 'ContributionEdit', 
    component: ContributionEdit 
  },
  
  // Employee contributions (nested route)
  { 
    path: '/employees/:employeeId/contributions', 
    name: 'EmployeeContributions', 
    component: EmployeeContributions 
  }
]

const router = createRouter({
  history: createWebHistory(), // HTML5 history mode
  routes
})

export default router
```

**Route Parameters:**
- `:id` creates dynamic route segments
- Access via `route.params.id`
- Automatically reactive to changes

---

## API Services Layer

### Base Configuration

**File: `src/services/employeeService.js`**
```javascript
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const employeeService = {
  // Get all employees
  async getAll() {
    const response = await axios.get(`${API_BASE_URL}/employees`)
    return response.data
  },

  // Get single employee by ID
  async getById(id) {
    const response = await axios.get(`${API_BASE_URL}/employees/${id}`)
    return response.data
  },

  // Create new employee
  async create(employeeData) {
    const response = await axios.post(`${API_BASE_URL}/employees`, employeeData)
    return response.data
  },

  // Update existing employee
  async update(id, employeeData) {
    const response = await axios.put(`${API_BASE_URL}/employees/${id}`, employeeData)
    return response.data
  },

  // Delete employee
  async delete(id) {
    const response = await axios.delete(`${API_BASE_URL}/employees/${id}`)
    return response.data
  }
}
```

**File: `src/services/contributionService.js`**
```javascript
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const contributionService = {
  async getAll() {
    const response = await axios.get(`${API_BASE_URL}/contributions`)
    return response.data
  },

  async getById(id) {
    const response = await axios.get(`${API_BASE_URL}/contributions/${id}`)
    return response.data
  },

  async getByEmployeeId(employeeId) {
    const response = await axios.get(`${API_BASE_URL}/contributions/employee/${employeeId}`)
    return response.data
  },

  async create(contributionData) {
    const response = await axios.post(`${API_BASE_URL}/contributions`, contributionData)
    return response.data
  },

  async update(id, contributionData) {
    const response = await axios.put(`${API_BASE_URL}/contributions/${id}`, contributionData)
    return response.data
  },

  async delete(id) {
    const response = await axios.delete(`${API_BASE_URL}/contributions/${id}`)
    return response.data
  }
}
```

**Service Layer Benefits:**
- **Separation of Concerns**: API logic separated from components
- **Reusability**: Same service used across multiple components
- **Centralized Configuration**: Easy to update API endpoints
- **Error Handling**: Consistent error handling patterns

---

## Application Layout & Navigation

### Root Component (App.vue)

**File: `src/App.vue`**
```vue
<template>
  <div id="app">
    <div class="app-layout">
      <!-- Vertical Sidebar Navigation -->
      <nav class="sidebar">
        <div class="sidebar-header">
          <router-link to="/" class="nav-brand">
            <span class="brand-icon">👥</span>
            <span class="brand-text">Staff Management</span>
          </router-link>
        </div>
        
        <ul class="nav-menu">
          <li>
            <router-link to="/" class="nav-link">
              Home
            </router-link>
          </li>
          <li>
            <router-link to="/employees" class="nav-link">
              Employees
            </router-link>
          </li>
          <li>
            <router-link to="/employees/create" class="nav-link nav-link-primary">
              Add Employee
            </router-link>
          </li>
          <li>
            <router-link to="/contributions" class="nav-link">
              Contributions
            </router-link>
          </li>
          <li>
            <router-link to="/contributions/create" class="nav-link nav-link-primary">
              Add Contribution
            </router-link>
          </li>
        </ul>
      </nav>
      
      <!-- Main Content Area -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
// No additional JavaScript needed for basic layout
</script>
```

**Key Navigation Concepts:**
- **router-link**: Declarative navigation component
- **router-view**: Renders matched route component
- **Event Handlers**: `@click` for user interactions

---

## Employee Components

### Employee List Component

**File: `src/views/EmployeeList.vue`**
```vue
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
      <!-- Loading State -->
      <div v-if="loading" class="state-message loading-state">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <span>Loading employees...</span>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="state-message error">
        <span class="error-icon">⚠️</span>
        <span>{{ error }}</span>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="employees.length === 0" class="state-message no-employees">
        <h3>No employees found</h3>
        <p>Get started by adding your first employee</p>
        <router-link to="/employees/create" class="btn btn-primary">
          Add Employee
        </router-link>
      </div>
      
      <!-- Data Table -->
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
import { employeeService } from '../services/employeeService.js'

// Reactive state
const employees = ref([])
const loading = ref(false)
const error = ref('')

// Fetch employees from API
const fetchEmployees = async () => {
  loading.value = true
  error.value = ''
  
  try {
    employees.value = await employeeService.getAll()
  } catch (err) {
    error.value = 'Failed to load employees'
    console.error('Error fetching employees:', err)
  } finally {
    loading.value = false
  }
}

// Delete employee with confirmation
const deleteEmployee = async (id) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    try {
      await employeeService.delete(id)
      // Remove from local array (optimistic update)
      employees.value = employees.value.filter(emp => emp._id !== id)
    } catch (err) {
      alert('Failed to delete employee')
      console.error('Error deleting employee:', err)
    }
  }
}

// Utility function
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

// Lifecycle hook - fetch data when component mounts
onMounted(fetchEmployees)
</script>
```

**Key Display Concepts:**
- **Conditional Rendering**: Different states (loading, error, empty, data)
- **List Rendering**: `v-for` with unique `:key`
- **Event Handling**: Click events for actions
- **Data Formatting**: Utility functions for display
- **Optimistic Updates**: Update UI before API confirmation

---

## Form Components & Validation

### Employee Create Form

**File: `src/views/EmployeeCreate.vue`**
```vue
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
                    v-model="name" 
                    type="text" 
                    required
                    class="form-input"
                    :class="{ 'input-error': errors.name }"
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
                    v-model="department" 
                    required
                    class="form-select"
                    :class="{ 'input-error': errors.department }"
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

              <div class="form-group">
                <label for="phone" class="form-label">Phone Number *</label>
                <div class="input-wrapper">
                  <input 
                    id="phone"
                    v-model="phone" 
                    type="tel" 
                    required
                    class="form-input"
                    :class="{ 'input-error': errors.phone }"
                    placeholder="+1234567890"
                  />
                </div>
                <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" @click="resetForm" class="btn btn-secondary">
              Reset Form
            </button>
            <button type="submit" :disabled="submitting" class="btn btn-primary">
              <span v-if="submitting" class="loading-spinner"></span>
              {{ submitting ? 'Creating...' : 'Create Employee' }}
            </button>
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

// Form data (using ref)
const name = ref('')
const department = ref('')
const phone = ref('')

// Form state
const errors = ref({})
const submitting = ref(false)

// Form validation
const validateForm = () => {
  errors.value = {}
  
  if (!name.value.trim()) {
    errors.value.name = 'Name is required'
  } else if (name.value.trim().length < 2) {
    errors.value.name = 'Name must be at least 2 characters'
  }
  
  if (!department.value) {
    errors.value.department = 'Department is required'
  }
  
  if (!phone.value.trim()) {
    errors.value.phone = 'Phone number is required'
  } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(phone.value)) {
    errors.value.phone = 'Please enter a valid phone number'
  }
  
  return Object.keys(errors.value).length === 0
}

// Submit form
const createEmployee = async () => {
  if (!validateForm()) {
    return
  }
  
  submitting.value = true
  
  try {
    await employeeService.create({
      name: name.value.trim(),
      department: department.value,
      phone: phone.value.trim()
    })
    
    // Redirect to employee list on success
    router.push('/employees')
  } catch (err) {
    // Handle server-side validation errors
    if (err.response?.data?.errors) {
      errors.value = err.response.data.errors
    } else {
      alert('Failed to create employee. Please try again.')
    }
    console.error('Error creating employee:', err)
  } finally {
    submitting.value = false
  }
}

// Reset form to initial state
const resetForm = () => {
  name.value = ''
  department.value = ''
  phone.value = ''
  errors.value = {}
}
</script>
```

**Key Form Concepts:**
- **Two-way Binding**: `v-model` for form inputs
- **Form Validation**: Client-side validation before submission
- **Error Handling**: Display validation errors to user
- **Ref Variables**: `ref()` for individual form fields
- **Submit Prevention**: `@submit.prevent` to handle form submission
- **Loading States**: Disable buttons and show loading during submission

### Employee Details Component

**File: `src/views/EmployeeDetails.vue`**
```vue
<template>
  <div class="employee-details">
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/employees" class="breadcrumb-link">Employees</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Details</span>
        </div>
        
        <div class="header-main">
          <div class="header-text">
            <h1 v-if="employee">{{ employee.name }}</h1>
            <h1 v-else>Employee Details</h1>
            <p>View employee information and contributions</p>
          </div>
          <div class="header-actions">
            <router-link to="/employees" class="btn btn-secondary">
              Back to List
            </router-link>
            <router-link v-if="employee" :to="`/employees/${employee._id}/edit`" class="btn btn-primary">
              Edit Employee
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <!-- Loading State -->
      <div v-if="loading" class="state-message loading">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <span>Loading employee details...</span>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="state-message error">
        {{ error }}
      </div>
      
      <!-- Employee Details -->
      <div v-else-if="employee" class="details-grid">
        <div class="details-card">
          <div class="card-header">
            <h2>Employee Information</h2>
          </div>
          
          <div class="employee-info">
            <div class="detail-item">
              <label class="detail-label">Full Name:</label>
              <div class="detail-value">
                <span class="employee-name">{{ employee.name }}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <label class="detail-label">Department:</label>
              <div class="detail-value">
                <span class="department-badge">{{ employee.department }}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <label class="detail-label">Phone Number:</label>
              <div class="detail-value phone-info">
                <span class="phone-number">{{ employee.phone }}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <label class="detail-label">Date Joined:</label>
              <div class="detail-value date-info">
                {{ formatDate(employee.createdAt) }}
              </div>
            </div>
            
            <div class="detail-item">
              <label class="detail-label">Last Updated:</label>
              <div class="detail-value date-info">
                {{ formatDate(employee.updatedAt) }}
              </div>
            </div>
          </div>
          
          <div class="card-actions">
            <router-link :to="`/employees/${employee._id}/edit`" class="btn btn-warning">
              Edit Employee
            </router-link>
            <router-link :to="`/employees/${employee._id}/contributions`" class="btn btn-success">
              View Contributions
            </router-link>
            <button @click="deleteEmployee" class="btn btn-danger">
              Delete Employee
            </button>
          </div>
        </div>
        
        <!-- Quick Stats Card -->
        <div class="stats-card">
          <div class="card-header">
            <h3>Quick Stats</h3>
          </div>
          
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">{{ contributionCount }}</span>
              <span class="stat-label">Total Contributions</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">₦{{ totalContributions.toFixed(2) }}</span>
              <span class="stat-label">Total Amount</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ daysSinceJoined }}</span>
              <span class="stat-label">Days with Company</span>
            </div>
          </div>
          
          <div class="quick-actions">
            <router-link :to="`/contributions/create`" class="btn btn-primary btn-block">
              Add New Contribution
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { employeeService } from '../services/employeeService.js'
import { contributionService } from '../services/contributionService.js'

const route = useRoute()
const router = useRouter()

// Reactive state
const employee = ref(null)
const contributions = ref([])
const loading = ref(false)
const error = ref('')

// Computed properties
const contributionCount = computed(() => contributions.value.length)
const totalContributions = computed(() => {
  return contributions.value.reduce((sum, contrib) => sum + Number(contrib.amount), 0)
})
const daysSinceJoined = computed(() => {
  if (!employee.value?.createdAt) return 0
  const joinDate = new Date(employee.value.createdAt)
  const today = new Date()
  const timeDiff = today.getTime() - joinDate.getTime()
  return Math.floor(timeDiff / (1000 * 3600 * 24))
})

// Fetch employee details and contributions
const fetchEmployeeData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // Load employee details and contributions in parallel
    const [employeeData, contributionData] = await Promise.all([
      employeeService.getById(route.params.id),
      contributionService.getByEmployeeId(route.params.id)
    ])
    
    employee.value = employeeData
    contributions.value = contributionData
    
  } catch (err) {
    error.value = 'Failed to load employee details'
    console.error('Error fetching employee data:', err)
  } finally {
    loading.value = false
  }
}

// Delete employee
const deleteEmployee = async () => {
  if (confirm(`Are you sure you want to delete ${employee.value.name}? This action cannot be undone.`)) {
    try {
      await employeeService.delete(employee.value._id)
      router.push('/employees')
    } catch (err) {
      alert('Failed to delete employee')
      console.error('Error deleting employee:', err)
    }
  }
}

// Utility function
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

// Load data on component mount
onMounted(fetchEmployeeData)
</script>
```

### Employee Edit Component

**File: `src/views/EmployeeEdit.vue`**
```vue
<template>
  <div class="employee-edit">
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/employees" class="breadcrumb-link">Employees</router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link v-if="employee" :to="`/employees/${employee._id}`" class="breadcrumb-link">
            {{ employee.name }}
          </router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Edit</span>
        </div>
        
        <div class="header-main">
          <div class="header-text">
            <h1>Edit Employee</h1>
            <p>Update employee information</p>
          </div>
          <div class="header-actions">
            <router-link :to="`/employees/${$route.params.id}`" class="btn btn-secondary">
              Cancel
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <!-- Loading State -->
      <div v-if="loading && !employee" class="state-message loading">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <span>Loading employee...</span>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="state-message error">
        {{ error }}
      </div>
      
      <!-- Edit Form -->
      <div v-else-if="employee" class="form-card">
        <form @submit.prevent="updateEmployee" class="employee-form">
          <div class="form-section">
            <h3 class="section-title">Employee Information</h3>
            
            <div class="form-grid">
              <div class="form-group">
                <label for="name" class="form-label">Full Name *</label>
                <div class="input-wrapper">
                  <input 
                    id="name"
                    v-model="name" 
                    type="text" 
                    required
                    class="form-input"
                    :class="{ 'input-error': errors.name }"
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
                    v-model="department" 
                    required
                    class="form-select"
                    :class="{ 'input-error': errors.department }"
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

              <div class="form-group">
                <label for="phone" class="form-label">Phone Number *</label>
                <div class="input-wrapper">
                  <input 
                    id="phone"
                    v-model="phone" 
                    type="tel" 
                    required
                    class="form-input"
                    :class="{ 'input-error': errors.phone }"
                    placeholder="+1234567890"
                  />
                </div>
                <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
              </div>
            </div>
            
            <!-- Display creation date (read-only) -->
            <div class="info-section">
              <div class="info-item">
                <label class="info-label">Date Joined:</label>
                <span class="info-value">{{ formatDate(employee.createdAt) }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">Last Updated:</label>
                <span class="info-value">{{ formatDate(employee.updatedAt) }}</span>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <router-link :to="`/employees/${$route.params.id}`" class="btn btn-secondary">
              Cancel
            </router-link>
            <button type="button" @click="resetForm" class="btn btn-outline">
              Reset Changes
            </button>
            <button type="submit" :disabled="submitting" class="btn btn-primary">
              <span v-if="submitting" class="loading-spinner"></span>
              {{ submitting ? 'Updating...' : 'Update Employee' }}
            </button>
          </div>
        </form>
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

// Form data
const employee = ref(null)
const name = ref('')
const department = ref('')
const phone = ref('')

// Form state
const loading = ref(false)
const errors = ref({})
const submitting = ref(false)
const error = ref('')

// Load employee data
const loadEmployee = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const employeeData = await employeeService.getById(route.params.id)
    employee.value = employeeData
    
    // Populate form with existing data
    name.value = employeeData.name || ''
    department.value = employeeData.department || ''
    phone.value = employeeData.phone || ''
    
  } catch (err) {
    error.value = 'Failed to load employee data'
    console.error('Error loading employee:', err)
  } finally {
    loading.value = false
  }
}

// Form validation
const validateForm = () => {
  errors.value = {}
  
  if (!name.value.trim()) {
    errors.value.name = 'Name is required'
  } else if (name.value.trim().length < 2) {
    errors.value.name = 'Name must be at least 2 characters'
  }
  
  if (!department.value) {
    errors.value.department = 'Department is required'
  }
  
  if (!phone.value.trim()) {
    errors.value.phone = 'Phone number is required'
  } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(phone.value)) {
    errors.value.phone = 'Please enter a valid phone number'
  }
  
  return Object.keys(errors.value).length === 0
}

// Submit form
const updateEmployee = async () => {
  if (!validateForm()) {
    return
  }
  
  submitting.value = true
  
  try {
    await employeeService.update(route.params.id, {
      name: name.value.trim(),
      department: department.value,
      phone: phone.value.trim()
    })
    
    // Redirect to details page on success
    router.push(`/employees/${route.params.id}`)
  } catch (err) {
    if (err.response?.data?.errors) {
      errors.value = err.response.data.errors
    } else {
      alert('Failed to update employee. Please try again.')
    }
    console.error('Error updating employee:', err)
  } finally {
    submitting.value = false
  }
}

// Reset form to original values
const resetForm = () => {
  if (employee.value) {
    name.value = employee.value.name || ''
    department.value = employee.value.department || ''
    phone.value = employee.value.phone || ''
    errors.value = {}
  }
}

// Utility function
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

// Load employee on component mount
onMounted(loadEmployee)
</script>
```

**Key Employee Management Concepts:**
- **Details View**: Displaying employee information with related data (contributions)
- **Edit Forms**: Pre-populated forms with existing data
- **Computed Properties**: Calculating statistics (days since joined, total contributions)
- **Parallel Data Loading**: Loading employee and contribution data simultaneously  
- **Form Reset**: Restoring original values when user cancels changes
- **Breadcrumb Navigation**: Clear navigation hierarchy
- **Confirmation Dialogs**: User confirmation for destructive actions (delete)
- **Route Parameters**: Dynamic routing with employee ID
- **Data Relationships**: Showing employee with their contributions

---

## Contribution Components

### Contribution List Component

**File: `src/views/ContributionList.vue`**
```vue
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
      <!-- Loading State -->
      <div v-if="loading" class="state-message loading">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <span>Loading contributions...</span>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="state-message error">
        {{ error }}
      </div>
      
      <!-- Empty State -->
      <div v-else-if="contributions.length === 0" class="state-message empty">
        <div class="empty-content">
          <h3>No contributions found</h3>
          <p>Start by adding your first contribution</p>
          <router-link to="/contributions/create" class="btn btn-primary">
            Add First Contribution
          </router-link>
        </div>
      </div>
      
      <!-- Data Table -->
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
import { ref, onMounted } from 'vue'
import { contributionService } from '../services/contributionService.js'

// Reactive state
const contributions = ref([])
const loading = ref(false)
const error = ref('')

// Fetch contributions from API
const fetchContributions = async () => {
  loading.value = true
  error.value = ''
  
  try {
    contributions.value = await contributionService.getAll()
  } catch (err) {
    error.value = 'Failed to load contributions'
    console.error('Error fetching contributions:', err)
  } finally {
    loading.value = false
  }
}

// Delete contribution with confirmation
const deleteContribution = async (id) => {
  if (confirm('Are you sure you want to delete this contribution?')) {
    try {
      await contributionService.delete(id)
      // Remove from local array (optimistic update)
      contributions.value = contributions.value.filter(contrib => contrib._id !== id)
    } catch (err) {
      alert('Failed to delete contribution')
      console.error('Error deleting contribution:', err)
    }
  }
}

// Utility function
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

// Lifecycle hook - fetch data when component mounts
onMounted(fetchContributions)
</script>
```

### Contribution Create Form

**File: `src/views/ContributionCreate.vue`**
```vue
<template>
  <div class="create-contribution">
    <div class="form-header">
      <h1>Add New Contribution</h1>
      <p>Record employee contribution details</p>
    </div>

    <div class="form-card">
      <form @submit.prevent="createContribution" class="contribution-form">
        <div class="form-row">
          <label for="employee">Employee *</label>
          <select 
            id="employee"
            v-model="employee" 
            required
            :class="{ 'error': errors.employee }"
          >
            <option value="">Select Employee</option>
            <option v-for="emp in employees" :key="emp._id" :value="emp._id">
              {{ emp.name }}
            </option>
          </select>
          <span v-if="errors.employee" class="error-text">{{ errors.employee }}</span>
        </div>

        <div class="form-row">
          <label for="month">Month *</label>
          <select 
            id="month"
            v-model="month" 
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
          <label for="amount">Amount *</label>
          <input 
            id="amount"
            v-model="amount" 
            type="number" 
            min="0" 
            step="0.01" 
            required
            :class="{ 'error': errors.amount }"
            placeholder="Enter contribution amount"
          />
          <span v-if="errors.amount" class="error-text">{{ errors.amount }}</span>
        </div>

        <div class="form-row">
          <label for="datePaid">Date Paid *</label>
          <input 
            id="datePaid"
            v-model="datePaid" 
            type="date" 
            required
            :class="{ 'error': errors.datePaid }"
          />
          <span v-if="errors.datePaid" class="error-text">{{ errors.datePaid }}</span>
        </div>

        <div class="form-actions">
          <router-link to="/contributions" class="btn btn-secondary">
            Cancel
          </router-link>
          <button type="submit" :disabled="submitting" class="btn btn-primary">
            <span v-if="submitting" class="loading-spinner"></span>
            {{ submitting ? 'Creating...' : 'Create Contribution' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { contributionService } from '../services/contributionService.js'
import { employeeService } from '../services/employeeService.js'

const router = useRouter()

// Form data (using ref)
const employee = ref('')
const month = ref('')
const amount = ref('')
const datePaid = ref('')

// Form state
const employees = ref([])
const errors = ref({})
const submitting = ref(false)

// Load employees for dropdown
const loadEmployees = async () => {
  try {
    employees.value = await employeeService.getAll()
  } catch (err) {
    console.error('Error loading employees:', err)
  }
}

// Form validation
const validateForm = () => {
  errors.value = {}
  
  if (!employee.value) {
    errors.value.employee = 'Employee is required'
  }
  
  if (!month.value) {
    errors.value.month = 'Month is required'
  }
  
  if (!amount.value || amount.value <= 0) {
    errors.value.amount = 'Valid amount is required'
  }
  
  if (!datePaid.value) {
    errors.value.datePaid = 'Date paid is required'
  }
  
  return Object.keys(errors.value).length === 0
}

// Submit form
const createContribution = async () => {
  if (!validateForm()) {
    return
  }
  
  submitting.value = true
  
  try {
    await contributionService.create({
      employee: employee.value,
      month: month.value,
      amount: parseFloat(amount.value),
      datePaid: datePaid.value
    })
    
    // Redirect to contributions list on success
    router.push('/contributions')
  } catch (err) {
    if (err.response?.data?.errors) {
      errors.value = err.response.data.errors
    } else {
      alert('Failed to create contribution. Please try again.')
    }
    console.error('Error creating contribution:', err)
  } finally {
    submitting.value = false
  }
}

// Load employees on component mount
onMounted(loadEmployees)
</script>
```

### Contribution Details Component

**File: `src/views/ContributionDetails.vue`**
```vue
<template>
  <div class="contribution-details">
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/contributions" class="breadcrumb-link">Contributions</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Details</span>
        </div>
        
        <div class="header-main">
          <div class="header-text">
            <h1>Contribution Details</h1>
            <p>View contribution information</p>
          </div>
          <div class="header-actions">
            <router-link to="/contributions" class="btn btn-secondary">
              Back to List
            </router-link>
            <router-link v-if="contribution" :to="`/contributions/${contribution._id}/edit`" class="btn btn-primary">
              Edit Contribution
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <!-- Loading State -->
      <div v-if="loading" class="state-message loading">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <span>Loading contribution details...</span>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="state-message error">
        {{ error }}
      </div>
      
      <!-- Contribution Details -->
      <div v-else-if="contribution" class="details-card">
        <div class="card-header">
          <h2>Contribution Information</h2>
        </div>
        
        <div class="details-grid">
          <div class="detail-item">
            <label class="detail-label">Employee:</label>
            <div class="detail-value employee-info">
              <span class="employee-name">{{ contribution.employee?.name || 'Unknown Employee' }}</span>
              <span class="employee-department">{{ contribution.employee?.department || '' }}</span>
            </div>
          </div>
          
          <div class="detail-item">
            <label class="detail-label">Month:</label>
            <div class="detail-value month-badge">
              {{ contribution.month }}
            </div>
          </div>
          
          <div class="detail-item">
            <label class="detail-label">Amount:</label>
            <div class="detail-value amount-display">
              ₦{{ Number(contribution.amount).toFixed(2) }}
            </div>
          </div>
          
          <div class="detail-item">
            <label class="detail-label">Date Paid:</label>
            <div class="detail-value date-display">
              {{ formatDate(contribution.datePaid) }}
            </div>
          </div>
          
          <div class="detail-item">
            <label class="detail-label">Created:</label>
            <div class="detail-value date-display">
              {{ formatDate(contribution.createdAt) }}
            </div>
          </div>
          
          <div class="detail-item">
            <label class="detail-label">Last Updated:</label>
            <div class="detail-value date-display">
              {{ formatDate(contribution.updatedAt) }}
            </div>
          </div>
        </div>
        
        <div class="card-actions">
          <router-link :to="`/contributions/${contribution._id}/edit`" class="btn btn-warning">
            Edit Contribution
          </router-link>
          <button @click="deleteContribution" class="btn btn-danger">
            Delete Contribution
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { contributionService } from '../services/contributionService.js'

const route = useRoute()
const router = useRouter()

// Reactive state
const contribution = ref(null)
const loading = ref(false)
const error = ref('')

// Fetch contribution details
const fetchContribution = async () => {
  loading.value = true
  error.value = ''
  
  try {
    contribution.value = await contributionService.getById(route.params.id)
  } catch (err) {
    error.value = 'Failed to load contribution details'
    console.error('Error fetching contribution:', err)
  } finally {
    loading.value = false
  }
}

// Delete contribution
const deleteContribution = async () => {
  if (confirm('Are you sure you want to delete this contribution?')) {
    try {
      await contributionService.delete(contribution.value._id)
      router.push('/contributions')
    } catch (err) {
      alert('Failed to delete contribution')
      console.error('Error deleting contribution:', err)
    }
  }
}

// Utility function
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

// Load contribution on component mount
onMounted(fetchContribution)
</script>
```

### Contribution Edit Component

**File: `src/views/ContributionEdit.vue`**
```vue
<template>
  <div class="contribution-edit">
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/contributions" class="breadcrumb-link">Contributions</router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link v-if="contribution" :to="`/contributions/${contribution._id}`" class="breadcrumb-link">
            Details
          </router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Edit</span>
        </div>
        
        <div class="header-main">
          <div class="header-text">
            <h1>Edit Contribution</h1>
            <p>Update contribution information</p>
          </div>
          <div class="header-actions">
            <router-link :to="`/contributions/${$route.params.id}`" class="btn btn-secondary">
              Cancel
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <!-- Loading State -->
      <div v-if="loading && !contribution" class="state-message loading">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <span>Loading contribution...</span>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="state-message error">
        {{ error }}
      </div>
      
      <!-- Edit Form -->
      <div v-else-if="contribution" class="form-card">
        <form @submit.prevent="updateContribution" class="contribution-form">
          <div class="form-section">
            <h3 class="section-title">Contribution Information</h3>
            
            <div class="form-grid">
              <div class="form-group">
                <label for="employee" class="form-label">Employee *</label>
                <div class="select-wrapper">
                  <select 
                    id="employee"
                    v-model="employee" 
                    required
                    class="form-select"
                    :class="{ 'input-error': errors.employee }"
                  >
                    <option value="">Select Employee</option>
                    <option v-for="emp in employees" :key="emp._id" :value="emp._id">
                      {{ emp.name }}
                    </option>
                  </select>
                </div>
                <span v-if="errors.employee" class="error-message">{{ errors.employee }}</span>
              </div>

              <div class="form-group">
                <label for="month" class="form-label">Month *</label>
                <div class="select-wrapper">
                  <select 
                    id="month"
                    v-model="month" 
                    required
                    class="form-select"
                    :class="{ 'input-error': errors.month }"
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
                </div>
                <span v-if="errors.month" class="error-message">{{ errors.month }}</span>
              </div>

              <div class="form-group">
                <label for="amount" class="form-label">Amount *</label>
                <div class="input-wrapper">
                  <input 
                    id="amount"
                    v-model="amount" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    required
                    class="form-input"
                    :class="{ 'input-error': errors.amount }"
                    placeholder="Enter contribution amount"
                  />
                </div>
                <span v-if="errors.amount" class="error-message">{{ errors.amount }}</span>
              </div>

              <div class="form-group">
                <label for="datePaid" class="form-label">Date Paid *</label>
                <div class="input-wrapper">
                  <input 
                    id="datePaid"
                    v-model="datePaid" 
                    type="date" 
                    required
                    class="form-input"
                    :class="{ 'input-error': errors.datePaid }"
                  />
                </div>
                <span v-if="errors.datePaid" class="error-message">{{ errors.datePaid }}</span>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <router-link :to="`/contributions/${$route.params.id}`" class="btn btn-secondary">
              Cancel
            </router-link>
            <button type="submit" :disabled="submitting" class="btn btn-primary">
              <span v-if="submitting" class="loading-spinner"></span>
              {{ submitting ? 'Updating...' : 'Update Contribution' }}
            </button>
          </div>
        </form>
      </div>
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

// Form data
const contribution = ref(null)
const employees = ref([])
const employee = ref('')
const month = ref('')
const amount = ref('')
const datePaid = ref('')

// Form state
const loading = ref(false)
const errors = ref({})
const submitting = ref(false)
const error = ref('')

// Load contribution and employees
const loadData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // Load contribution and employees in parallel
    const [contributionData, employeeData] = await Promise.all([
      contributionService.getById(route.params.id),
      employeeService.getAll()
    ])
    
    contribution.value = contributionData
    employees.value = employeeData
    
    // Populate form with existing data
    employee.value = contributionData.employee?._id || contributionData.employee || ''
    month.value = contributionData.month || ''
    amount.value = contributionData.amount || ''
    datePaid.value = contributionData.datePaid ? contributionData.datePaid.split('T')[0] : ''
    
  } catch (err) {
    error.value = 'Failed to load data'
    console.error('Error loading data:', err)
  } finally {
    loading.value = false
  }
}

// Form validation
const validateForm = () => {
  errors.value = {}
  
  if (!employee.value) {
    errors.value.employee = 'Employee is required'
  }
  
  if (!month.value) {
    errors.value.month = 'Month is required'
  }
  
  if (!amount.value || amount.value <= 0) {
    errors.value.amount = 'Valid amount is required'
  }
  
  if (!datePaid.value) {
    errors.value.datePaid = 'Date paid is required'
  }
  
  return Object.keys(errors.value).length === 0
}

// Submit form
const updateContribution = async () => {
  if (!validateForm()) {
    return
  }
  
  submitting.value = true
  
  try {
    await contributionService.update(route.params.id, {
      employee: employee.value,
      month: month.value,
      amount: parseFloat(amount.value),
      datePaid: datePaid.value
    })
    
    // Redirect to details page on success
    router.push(`/contributions/${route.params.id}`)
  } catch (err) {
    if (err.response?.data?.errors) {
      errors.value = err.response.data.errors
    } else {
      alert('Failed to update contribution. Please try again.')
    }
    console.error('Error updating contribution:', err)
  } finally {
    submitting.value = false
  }
}

// Load data on component mount
onMounted(loadData)
</script>
```

**Key Contribution Concepts:**
- **Related Data Loading**: Loading employees for dropdown selection
- **Data Types**: Handling numbers (amount) and dates (datePaid)
- **Form Dependencies**: Employee dropdown depends on API data
- **Currency Formatting**: Displaying amounts with proper formatting
- **Date Handling**: Using HTML5 date input for better UX
- **Route Parameters**: Using `route.params.id` for dynamic routes
- **Form Pre-population**: Loading existing data into edit forms
- **Parallel Loading**: Using `Promise.all()` for multiple API calls

---

## Employee Contributions Component

**File: `src/views/EmployeeContributions.vue`**
```vue
<template>
  <div class="employee-contributions">
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/employees" class="breadcrumb-link">Employees</router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link v-if="employee" :to="`/employees/${employee._id}`" class="breadcrumb-link">
            {{ employee.name }}
          </router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Contributions</span>
        </div>
        
        <div class="header-main">
          <div class="header-text">
            <h1 v-if="employee">{{ employee.name }}'s Contributions</h1>
            <h1 v-else>Employee Contributions</h1>
            <p>View all contributions for this employee</p>
          </div>
          <div class="header-actions">
            <router-link to="/contributions/create" class="btn btn-primary">
              Add Contribution
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <!-- Loading State -->
      <div v-if="loading" class="state-message loading">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <span>Loading contributions...</span>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="state-message error">
        {{ error }}
      </div>
      
      <!-- Employee Info Card -->
      <div v-if="employee" class="employee-info-card">
        <div class="employee-summary">
          <div class="employee-details">
            <h2 class="employee-name">{{ employee.name }}</h2>
            <p class="employee-meta">
              <span class="department-badge">{{ employee.department }}</span>
              <span class="phone-number">{{ employee.phone }}</span>
            </p>
          </div>
          <div class="contribution-stats">
            <div class="stat-item">
              <span class="stat-value">{{ contributions.length }}</span>
              <span class="stat-label">Total Contributions</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">₦{{ totalAmount.toFixed(2) }}</span>
              <span class="stat-label">Total Amount</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="!loading && contributions.length === 0" class="state-message empty">
        <div class="empty-content">
          <h3>No contributions found</h3>
          <p v-if="employee">{{ employee.name }} hasn't made any contributions yet</p>
          <router-link to="/contributions/create" class="btn btn-primary">
            Add First Contribution
          </router-link>
        </div>
      </div>
      
      <!-- Contributions Table -->
      <div v-else-if="contributions.length > 0" class="table-container">
        <div class="table-header">
          <h3>Contribution History</h3>
          <p>{{ contributions.length }} contribution{{ contributions.length !== 1 ? 's' : '' }} found</p>
        </div>
        
        <table class="modern-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Amount</th>
              <th>Date Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contribution in contributions" :key="contribution._id">
              <td>
                <span class="month-badge">{{ contribution.month }}</span>
              </td>
              <td class="amount-cell">
                ₦{{ Number(contribution.amount).toFixed(2) }}
              </td>
              <td class="date-cell">
                {{ formatDate(contribution.datePaid) }}
              </td>
              <td class="actions-cell">
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
import { employeeService } from '../services/employeeService.js'
import { contributionService } from '../services/contributionService.js'

const route = useRoute()

// Reactive state
const employee = ref(null)
const contributions = ref([])
const loading = ref(false)
const error = ref('')

// Computed property for total amount
const totalAmount = computed(() => {
  return contributions.value.reduce((sum, contrib) => sum + Number(contrib.amount), 0)
})

// Load employee and their contributions
const loadEmployeeData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // Load employee details and contributions in parallel
    const [employeeData, contributionData] = await Promise.all([
      employeeService.getById(route.params.employeeId),
      contributionService.getByEmployeeId(route.params.employeeId)
    ])
    
    employee.value = employeeData
    contributions.value = contributionData
    
  } catch (err) {
    error.value = 'Failed to load employee data'
    console.error('Error loading employee data:', err)
  } finally {
    loading.value = false
  }
}

// Delete contribution with confirmation
const deleteContribution = async (contributionId) => {
  if (confirm('Are you sure you want to delete this contribution?')) {
    try {
      await contributionService.delete(contributionId)
      // Remove from local array (optimistic update)
      contributions.value = contributions.value.filter(contrib => contrib._id !== contributionId)
    } catch (err) {
      alert('Failed to delete contribution')
      console.error('Error deleting contribution:', err)
    }
  }
}

// Utility function
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

// Load data on component mount
onMounted(loadEmployeeData)
</script>
```

**Key Employee Contributions Concepts:**
- **Nested Routes**: Using `route.params.employeeId` for employee-specific data
- **Computed Properties**: Calculating total amount from contributions array
- **Parallel API Calls**: Loading employee and contributions simultaneously
- **Related Data Display**: Showing employee info with their contributions
- **Statistics Display**: Total contributions count and amount
- **Conditional Pluralization**: "1 contribution" vs "2 contributions"

---

## Basic Styling

### Simple Global Styles

**File: `src/style.css`**
```css
/* Basic Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f4;
}

/* Basic Button Styles */
.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-warning {
  background-color: #ffc107;
  color: black;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

/* Basic Form Styles */
.form-input,
.form-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
}
```

### Component-Scoped Styles

```vue
<template>
  <div class="employee-card">
    <h3 class="card-title">{{ employee.name }}</h3>
    <p class="card-department">{{ employee.department }}</p>
  </div>
</template>

<style scoped>
.employee-card {
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.card-department {
  color: #666;
  font-size: 14px;
}
</style>
```

**Key Styling Concepts:**
- **Component Scoped Styles**: `<style scoped>` prevents style leaking
- **Simple CSS**: Basic properties for layout and appearance
- **Semantic Classes**: Meaningful class names for components

This frontend guide covers all essential Vue.js 3 concepts needed to build your staff contributions application, with practical examples from your actual codebase.