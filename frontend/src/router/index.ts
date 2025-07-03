import { createRouter, createWebHistory } from 'vue-router';
import SignupView from '@/views/auth/RegistrarView.vue';
import SigninView from '@/views/auth/LogarView.vue';
import ApplicationView from '@/views/ApplicationView.vue';
import CadastrarView from '@/views/CadastrarView.vue';
import RemoverView from '@/views/RemoverView.vue';
import EditarView from '@/views/EditarView.vue';
import LogarView from '@/views/auth/LogarView.vue';
import RegistrarView from '@/views/auth/RegistrarView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/app',
      name: 'Application',
      component: ApplicationView
    },
    {
      path: '/',
      name: 'Logar',
      component: LogarView
    },
    {
      path: '/registrar',
      name: 'Registrar',
      component: RegistrarView
    },
    {
      path: '/cadastrar',
      name: 'Cadastrar',
      component: CadastrarView
    },
    {
      path: '/editar',
      name: 'Editar',
      component: EditarView
    },
    {
      path: '/remover',
      name: 'Remover',
      component: RemoverView
    },
  ],
})

export default router
