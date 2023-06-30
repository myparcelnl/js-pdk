import {createRouter, createWebHistory, type Router} from 'vue-router';

export const createRouterInstance = (): Router => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/orders',
        alias: '/',
        name: 'Orders',
        component: () => import('./views/Orders.vue'),
      },
      {
        path: '/orders/:id',
        name: 'Order',
        component: () => import('./views/Order.vue'),
        meta: {
          hidden: true,
        },
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('./views/Products.vue'),
      },
      {
        path: '/products/:id',
        name: 'Product',
        component: () => import('./views/Product.vue'),
        meta: {
          hidden: true,
        },
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('./views/Settings.vue'),
      },
    ],
  });
};
