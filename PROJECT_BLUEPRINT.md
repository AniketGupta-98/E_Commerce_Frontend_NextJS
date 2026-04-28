# E-Commerce Dashboard — Project Blueprint

> **Purpose:** Single-file reference. Read this before touching any code.
> Last updated: 2026-04-28

---

## 1. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | MUI (Material UI) v7 + Emotion |
| Styling | Tailwind CSS v4 (utility classes in JSX) |
| State (server) | **TanStack Query** v5 (`@tanstack/react-query`) |
| State (client/auth) | Redux Toolkit + React Redux |
| HTTP | Axios (via centralized `lib/api.ts`) |
| Charts | Recharts |
| Date formatting | date-fns |
| Backend URL | `http://localhost:5100` (dev) · `https://e-commerce-backend-nodejs.onrender.com` (prod) |

---

## 2. Directory Structure

```
app/
├── layout.tsx                  ← Root layout; mounts <AppProviders>
├── page.tsx                    ← Root redirect (→ /login or /dashboard)
├── globals.css
├── url.config.json             ← { url, url2 } — API base URLs
├── (auth)/
│   ├── login/page.tsx
│   └── signup/page.tsx
└── (dashboard)/
    ├── layout.tsx              ← Auth guard (reads localStorage → Redux), Sidebar + Header shell
    ├── dashboard/page.tsx      ← Overview stats page (static/mock data)
    ├── category/page.tsx       ← CRUD categories — uses TanStack Query hooks
    ├── products/
    │   ├── page.tsx            ← Products list — uses useProducts()
    │   └── add/page.tsx        ← Add product form
    ├── users/page.tsx          ← CRUD users — uses TanStack Query hooks
    └── orders/page.tsx         ← Orders list (partially implemented)

components/
├── Sidebar.tsx                 ← Collapsible nav sidebar
├── Header.tsx                  ← Top bar with menu toggle
├── auth/                       ← Login / Signup form components
└── dashboard/
    ├── StatCard.tsx
    ├── RevenueChart.tsx
    ├── RecentOrders.tsx
    ├── TopProducts.tsx
    ├── category/
    │   ├── CategoryPageHeader.tsx   ← Title + "Add Category" button
    │   ├── CategorySearchFilter.tsx ← Search input
    │   ├── CategoryTable.tsx        ← MUI Table with Edit/Delete buttons
    │   ├── AddCategoryDialog.tsx    ← MUI Dialog for create
    │   └── EditCategoryDialog.tsx   ← MUI Dialog for update
    └── users/
        ├── UserPageHeader.tsx
        ├── UserSearchFilter.tsx     ← Search + Role + Status filters
        ├── UserTable.tsx            ← MUI Table with Edit/Delete
        ├── EditUserDialog.tsx
        ├── InviteUserDialog.tsx     ← Create user dialog
        └── userUtils.ts

lib/
├── api.ts                      ← ⭐ Centralized Axios instance
├── queryClient.ts              ← ⭐ Shared QueryClient config
├── providers.tsx               ← AppProviders = Redux + QueryClientProvider + Devtools
├── store.ts                    ← Redux store (single slice: user)
├── useAppselector.ts           ← Typed useSelector hook
├── theme.ts                    ← MUI theme tokens, muiSx helpers, color palettes
├── features/Auth/authSlice.ts  ← { user: { accessToken, name } | null }
├── services/
│   ├── categoryService.ts      ← fetchCategories / createCategory / updateCategory / deleteCategory
│   ├── productService.ts       ← fetchProducts
│   └── userService.ts          ← fetchUsers / createUser / updateUser / deleteUser
└── hooks/
    ├── useCategories.ts        ← useCategories · useCreateCategory · useUpdateCategory · useDeleteCategory
    ├── useProducts.ts          ← useProducts
    └── useUsers.ts             ← useUsers · useCreateUser · useUpdateUser · useDeleteUser
```

---

## 3. API Layer — How It Works

```
Redux Store ──► lib/api.ts ──► lib/services/*.ts ──► lib/hooks/*.ts ──► Pages
```

### `lib/api.ts`
- Single `axios.create({ baseURL: url.config.json → url })`
- **Request interceptor:** auto-attaches `Authorization: store.getState().user.user?.accessToken`
- **Never** pass `headerConfig` manually — the interceptor handles it everywhere

### `lib/queryClient.ts`
```ts
new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: true } } })
```

### Query Keys
| Domain | Key |
|--------|-----|
| Categories | `['categories']` |
| Products | `['products']` |
| Users | `['users']` |

---

## 4. API Endpoints

| Method | Path | Hook / Service |
|--------|------|----------------|
| GET | `/all/category` | `fetchCategories` |
| POST | `/category` | `createCategory` |
| PUT | `/category/:id` | `updateCategory` |
| DELETE | `/category/:id` | `deleteCategory` |
| GET | `/productslist` | `fetchProducts` |
| GET | `/users` | `fetchUsers` |
| POST | `/admin/usercreate` | `createUser` |
| PUT | `/admin/userupdate` | `updateUser` |
| DELETE | `/admin/deleteuser/:userId/:email` | `deleteUser` |

---

## 5. Redux Store Shape

```ts
{
  user: {
    user: {
      accessToken: string;
      name?: string;
    } | null
  }
}
```

- Populated by `dispatch(currentUser(parsedUser))` in `(dashboard)/layout.tsx` from `localStorage.getItem("user")`
- Cleared by `dispatch(clearAccessToken())`
- Read in pages via: `const user = useAppSelector(state => state.user.user)` — **only needed for non-API things** (display name, etc.) since the token is now auto-attached by `lib/api.ts`

---

## 6. Auth Flow

1. User logs in via `/login` → token saved to `localStorage` as `"user"` key
2. `(dashboard)/layout.tsx` `useEffect` reads `localStorage`, dispatches `currentUser` into Redux
3. If no `localStorage` entry → redirect to `/login`
4. `lib/api.ts` interceptor reads token from Redux on every API request

---

## 7. Page Patterns

### Data Page (e.g. Category, Users)
```tsx
// 1. Fetch
const { data: items = [], isLoading } = useItems();

// 2. Mutate — cache auto-invalidates on success
const createItem = useCreateItem();
createItem.mutate(payload, { onSuccess: () => ..., onError: () => ... });

// 3. Loading state
{isLoading ? <CircularProgress /> : <ItemTable ... />}
```

### No manual refetch needed — mutations call `qc.invalidateQueries` internally.

---

## 8. Styling Conventions

- **Tailwind** utility classes on HTML/JSX elements
- **MUI `sx` prop** for MUI component overrides — reuse tokens from `lib/theme.ts`:
  - `muiSx.primaryContainedButton`
  - `muiSx.primaryOutlinedButton`
  - `muiSx.dangerOutlinedButton`
  - `primaryColor[50 | 500]` — indigo palette
  - `categoryColors` — array of Tailwind bg classes for icon badges
- Layout: `max-w-7xl mx-auto`, gap-6 flex-col, `bg-white rounded-2xl shadow-sm border border-slate-200`

---

## 9. Key Files to Touch for Common Tasks

| Task | Files |
|------|-------|
| Add a new API endpoint | `lib/services/<domain>Service.ts` → add function |
| Add a new query/mutation hook | `lib/hooks/use<Domain>.ts` → add `useQuery` / `useMutation` |
| Add a new dashboard page | `app/(dashboard)/<route>/page.tsx` + optional `lib/services` + `lib/hooks` |
| Change base API URL | `app/url.config.json` |
| Change query defaults (staleTime etc.) | `lib/queryClient.ts` |
| Add global auth logic (e.g. 401 redirect) | `lib/api.ts` → response interceptor |
| Add new Redux slice | `lib/features/<Name>/<name>Slice.ts` → wire in `lib/store.ts` |
| Change MUI theme colors | `lib/theme.ts` |
