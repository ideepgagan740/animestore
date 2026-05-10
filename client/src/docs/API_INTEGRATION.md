# Frontend Backend Integration Contract

## Base URL

The frontend calls the backend through `NEXT_PUBLIC_API_BASE_URL`.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

This matches the Express backend route mounting in `server/src/index.ts`:

- `/api/auth`
- `/api/products`
- `/api/orders`

## Local Ports And CORS

Use separate ports locally:

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:3001`

Set backend CORS for local frontend requests:

```env
CORS_ORIGIN=http://localhost:3001
```

## Route Map

| Frontend Client | Backend Route | Method | Status |
| --- | --- | --- | --- |
| `authApi.register` | `/api/auth/register` | `POST` | Matched |
| `authApi.login` | `/api/auth/login` | `POST` | Matched |
| `productsApi.list` | `/api/products` | `GET` | Matched; frontend adapts backend `products` to UI `data` |
| `productsApi.getById` | `/api/products/:id` | `GET` | Matched; backend currently returns placeholder response |
| `cartApi.checkout` | `/api/orders` | `POST` | Matched; cart checkout creates an order |

## Removed Non-Backend Routes

These frontend assumptions were removed because the backend does not currently expose them:

- `/api/auth/me`
- `/api/cart/sync`

## Data Shape Alignment

### Auth

Backend auth response:

```ts
{
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}
```

Frontend `AuthUser` now matches this shape.

### Products

Backend product list response:

```ts
{
  products: ProductResponseDTO[];
  total: number;
  page: number;
  limit: number;
}
```

Frontend maps this into its UI-friendly paginated response:

```ts
{
  data: Product[];
  total: number;
  page: number;
  limit: number;
}
```

The backend product controller currently returns placeholder responses for `GET /products` and `GET /products/:id`, so the frontend keeps a fallback product list until backend list/detail implementations are completed.

### Orders From Cart

Frontend cart checkout sends the backend `CreateOrderDTO` shape:

```ts
{
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: string;
}
```

## Route Source Of Truth

Frontend route constants live in `src/config/apiRoutes.ts`. Add new backend endpoints there first, then use those constants from feature API clients.
