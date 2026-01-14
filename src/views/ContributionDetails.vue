<template>
  <div class="contribution-details">
    <div class="details-header">
      <div class="breadcrumb">
        <router-link to="/contributions">Contributions</router-link>
        <span>/</span>
        <span>Details</span>
      </div>
      <h1 v-if="contribution">{{ contribution.employee?.name }} - {{ contribution.month }}</h1>
      <h1 v-else>Contribution Details</h1>
    </div>

    <div v-if="loading" class="loading">Loading contribution details...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="contribution" class="details-card">
      <div class="details-section">
        <h2>Contribution Information</h2>
        
        <div class="details-grid">
          <div class="detail-item">
            <label>Employee</label>
            <span>{{ contribution.employee?.name || 'Unknown' }}</span>
          </div>

          <div class="detail-item">
            <label>Month</label>
            <span>{{ contribution.month }}</span>
          </div>

          <div class="detail-item">
            <label>Amount</label>
            <span class="amount">₦{{ Number(contribution.amount).toFixed(2) }}</span>
          </div>

          <div class="detail-item">
            <label>Date Paid</label>
            <span>{{ formatDate(contribution.datePaid) }}</span>
          </div>
        </div>
      </div>

      <div class="actions-section">
        <router-link :to="`/contributions/${contribution._id}/edit`" class="btn btn-warning">
          Edit Contribution
        </router-link>
        <button @click="deleteContribution" class="btn btn-danger">
          Delete Contribution
        </button>
        <router-link to="/contributions" class="btn btn-secondary">
          Back to List
        </router-link>
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

const contribution = ref(null)
const loading = ref(false)
const error = ref('')

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const loadContribution = async () => {
  try {
    loading.value = true
    error.value = ''
    contribution.value = await contributionService.getById(route.params.id)
  } catch (err) {
    error.value = 'Failed to load contribution details'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deleteContribution = async () => {
  if (confirm('Are you sure you want to delete this contribution? This action cannot be undone.')) {
    try {
      await contributionService.delete(contribution.value._id)
      router.push('/contributions')
    } catch (err) {
      alert('Failed to delete contribution')
      console.error(err)
    }
  }
}

onMounted(() => {
  loadContribution()
})
</script>

<style scoped>
.contribution-details {
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

.amount {
  color: #16a34a !important;
  font-size: 1.125rem !important;
  font-weight: 600 !important;
}

.actions-section {
  display: flex;
  gap: var(--space-4, 1rem);
  justify-content: center;
  border-top: 1px solid var(--gray-200);
  padding-top: var(--space-6, 1.5rem);
}

.actions-section .btn {
  padding: var(--space-3, 0.75rem) var(--space-6, 1.5rem);
  border-radius: var(--radius-lg, 10px);
  text-decoration: none;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast, 0.2s ease);
}

@media (max-width: 640px) {
  .contribution-details {
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
}
</style>
<style scoped></style>