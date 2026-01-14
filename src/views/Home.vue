<template>
  <div class="home">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Staff Management
        </h1>
        
        <p class="hero-subtitle">
          Streamlined employee management for modern teams
        </p>
        
        <div class="quick-actions">
          <router-link to="/employees" class="btn btn-primary">
            View Employees
          </router-link>
          <router-link to="/employees/create" class="btn btn-secondary">
            Add Employee
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.hero-content {
  text-align: center;
  max-width: 500px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 300;
  color: var(--gray-900);
  margin-bottom: var(--space-6);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--gray-600);
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: var(--space-10);
}

.quick-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: var(--font-size-lg);
  }

  .quick-actions {
    flex-direction: column;
    align-items: center;
  }

  .quick-actions .btn {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .home {
    padding: var(--space-6) var(--space-4);
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: var(--font-size-base);
  }
}
</style>