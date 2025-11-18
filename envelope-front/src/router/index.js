import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '@/stores/auth'

import LoginView from '@/views/LoginView.vue'
import AccountListView from '@/views/accounts/AccountListView.vue'
import AccountDetailView from '@/views/accounts/AccountDetailView.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/accounts',
        name: 'accounts',
        component: AccountListView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/accounts/:id',
        component: AccountDetailView,
        meta: { requiresAuth: true }
    },
    // {
    //     path: '/accounts/:accountId/envelopes',
    //     component: EnvelopeListView,
    //     meta: { requiresAuth: true }
    // },
    // {
    //     path: '/accounts/:accountId/envelopes/:envelopeId/transactions',
    //     component: TransactionListView,
    //     meta: { requiresAuth: true }
    // },
    // {
    //     path: '/accounts/:accountId/transfers',
    //     component: TransferListView,
    //     meta: { requiresAuth: true }
    // },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return '/login'
  }

  return true
})

export default router
