import {Router, createRouter, createWebHistory} from 'vue-router';

export const createRouterInstance = (): Router => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/orders',
        alias: '/',
        name: 'Orders',
        component: () => import('./views/Orders.vue'),
        meta: {
          menu: true,
        },
      },
      {
        path: '/orders/:id',
        name: 'Order',
        component: () => import('./views/Order.vue'),
      },
    ],
  });
};
