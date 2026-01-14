<template>
  <div id="app">
    <div class="app-layout">
      <!-- Vertical Sidebar Navigation -->
      <nav class="sidebar" :class="{ 'sidebar-open': mobileMenuOpen }">
        <div class="sidebar-header">
          <router-link to="/" class="nav-brand" @click="closeMobileMenu">
            <span class="brand-icon">👥</span>
            <span class="brand-text">Staff Management</span>
          </router-link>
        </div>
        
        <ul class="nav-menu">
          <li><router-link to="/" class="nav-link" @click="closeMobileMenu">
            Home
          </router-link></li>
          <li><router-link to="/employees" class="nav-link" @click="closeMobileMenu">
            Employees
          </router-link></li>
          <li><router-link to="/employees/create" class="nav-link nav-link-primary" @click="closeMobileMenu">
            Add Employee
          </router-link></li>
          <li><router-link to="/contributions" class="nav-link" @click="closeMobileMenu">
            Contributions
          </router-link></li>
          <li><router-link to="/contributions/create" class="nav-link nav-link-primary" @click="closeMobileMenu">
            Add Contribution
          </router-link></li>
        </ul>
        
        <div class="nav-footer">
          <!-- Future login/logout buttons will go here -->
        </div>
      </nav>
      
      <!-- Mobile Menu Toggle -->
      <button class="mobile-menu-toggle" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <!-- Main Content Area -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style>
/* App Layout */
.app-layout {
  display: flex;
  min-height: 100vh;
}

/* Vertical Sidebar */
.sidebar {
  width: 250px;
  background: linear-gradient(180deg, var(--gray-800) 0%, var(--gray-900) 100%);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 50;
  transition: transform var(--transition);
}

.sidebar-header {
  padding: var(--space-6) var(--space-4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-brand {
  color: var(--white);
  text-decoration: none;
  font-size: var(--font-size-lg);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  transition: transform var(--transition-fast);
  width: 100%;
}

.nav-brand:hover {
  color: var(--white);
  transform: translateX(4px);
}

.brand-icon {
  font-size: var(--font-size-xl);
  flex-shrink: 0;
}

.brand-text {
  white-space: nowrap;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: var(--space-4) 0;
  flex: 1;
  gap: var(--space-1);
}

.nav-menu li {
  padding: 0 var(--space-4);
  margin-bottom: var(--space-1);
}

.nav-link {
  color: var(--gray-300);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--font-size-sm);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius);
  transition: all var(--transition-fast);
  display: block;
  width: 100%;
  position: relative;
  text-align: left;
  border: none;
  background: none;
}

.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background-color: var(--primary-color);
  transition: all var(--transition-fast);
  border-radius: 0 4px 4px 0;
}

.nav-link:hover {
  color: var(--white);
  background-color: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.nav-link:hover::before {
  width: 4px;
}

.nav-link.router-link-active {
  color: var(--white);
  background-color: rgba(59, 130, 246, 0.15);
  font-weight: 600;
}

.nav-link.router-link-active::before {
  width: 4px;
}

.nav-link-primary {
  background-color: var(--primary-color);
  color: var(--white) !important;
  margin-top: var(--space-3);
  font-weight: 600;
}

.nav-link-primary:hover {
  background-color: var(--primary-dark);
  transform: translateX(4px) translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
}

.nav-link-primary::before {
  display: none;
}

.nav-footer {
  padding: var(--space-4);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  /* Future login/logout buttons will go here */
}

/* Main Content Area */
.main-content {
  flex: 1;
  margin-left: 250px;
  min-height: 100vh;
  padding: var(--space-8) var(--space-6);
  background-color: var(--gray-50);
}

.main-content .container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: var(--space-4);
  left: var(--space-4);
  z-index: 60;
  flex-direction: column;
  gap: 3px;
  background: var(--gray-800);
  border: none;
  cursor: pointer;
  padding: var(--space-3);
  border-radius: var(--radius);
  transition: background-color var(--transition-fast);
  box-shadow: var(--shadow);
}

.mobile-menu-toggle:hover {
  background-color: var(--gray-700);
}

.mobile-menu-toggle span {
  width: 18px;
  height: 2px;
  background-color: var(--white);
  transition: all var(--transition-fast);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar-open {
    transform: translateX(0);
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .main-content {
    margin-left: 0;
    padding: var(--space-6) var(--space-4);
    padding-top: 80px; /* Account for mobile menu button */
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100%;
  }
  
  .main-content {
    padding: var(--space-4);
    padding-top: 80px;
  }
  
  .brand-text {
    font-size: var(--font-size-base);
  }
  
  .nav-link {
    font-size: var(--font-size-sm);
    padding: var(--space-3) var(--space-4);
  }
}
</style>
