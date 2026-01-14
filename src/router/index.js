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
  { path: '/', name: 'Home', component: Home },
  { path: '/employees', name: 'EmployeeList', component: EmployeeList },
  { path: '/employees/create', name: 'EmployeeCreate', component: EmployeeCreate },
  { path: '/employees/:id', name: 'EmployeeDetails', component: EmployeeDetails },
  { path: '/employees/:id/edit', name: 'EmployeeEdit', component: EmployeeEdit },
  {path: '/contributions', name: 'ContributionList', component: ContributionList },
  {path: '/contributions/create', name: 'ContributionCreate', component: ContributionCreate },
  {path: '/contributions/:id', name: 'ContributionDetails', component: ContributionDetails },
  {path: '/contributions/:id/edit', name: 'ContributionEdit', component: ContributionEdit },
  {path: '/employees/:employeeId/contributions', name: 'EmployeeContributions', component: EmployeeContributions }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router