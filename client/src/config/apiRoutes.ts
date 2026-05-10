export const apiRoutes = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
  },
  products: {
    list: '/products',
    detail: (id: string) => `/products/${id}`,
    create: '/products',
  },
  orders: {
    create: '/orders',
    list: '/orders',
  },
} as const;