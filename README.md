# Connect Social App

A modern social networking single-page application built with React 19 + Vite, Tailwind CSS 4, DaisyUI, and React Router. Provides authentication, posting, commenting, lightweight analytics, and responsive UI.

## Features
- User authentication (token-based)
- Protected & auth-only routes
- Profile data & avatar display
- Create / view posts
- Post images & stats section
- Comments with modal & dropdown controls
- Form validation via React Hook Form + Zod
- Loading & skeleton states
- Responsive layout (mobile-first)
- Light / Dark mode (DaisyUI themes)
- Basic analytics placeholder (likes, views, followers)

## Tech Stack
- React 19, React Router DOM 7
- Vite 7 (fast dev / build)
- Tailwind CSS 4 + DaisyUI components
- HeroUI & Lucide / FontAwesome icons
- React Hook Form + Zod (schemas in `src/schema`)
- React Query (TanStack Query) - for specific data fetching
- Axios (API layer)
- date-fns (date formatting)
- Framer Motion (animations potential)

## Project Structure (key folders)
```
src/
  appPages/        # Authenticated app pages (feed, stats, account...)
  authPages/       # Login / Register layouts & forms
  components/      # Reusable UI pieces (post, comment, modal...)
  context/         # React Context (auth)
  protectedRoutes/ # Route guards
  services/        # API service wrappers (auth, posts, comments)
  schema/          # Zod validation schemas
  assets/          # Static images
```

## Auth Flow
1. On load `authContext` checks for token in `localStorage`.
2. If present, calls `getLoggedUserDataApi()` to hydrate user.
3. Context exposes: `isLoggedIn`, `authReady`, `user`, `userId`, `profilePicture`, `refreshUser`.
4. Protected routes redirect if not authenticated.

## Available Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Vite + HMR) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview built app locally |
| `npm run lint` | Run ESLint |

## Environment / Configuration
Create a `.env` file (or use Vite prefixed vars):
```
VITE_API_BASE_URL=https://your-api.example.com
```
Use in code: `import.meta.env.VITE_API_BASE_URL`.

Token persistence: stored in `localStorage` under key `token`.

## Routing & Vercel Deployment
The app is an SPA; to avoid 404s on deep links we added `vercel.json`:
```json
{
  "rewrites": [ { "source": "/(.*)", "destination": "/" } ]
}
```
This ensures all paths serve `index.html` so React Router handles them client-side.

## Styling
- Tailwind utility-first styling
- DaisyUI component classes (`stat`, `avatar`, etc.)
- Gradient text & avatars via Tailwind utilities
- Dark mode supported (DaisyUI theme switching)

## Forms & Validation 
- Built with React Hook Form for minimal re-renders and performance.
- Zod-powered schemas ensure declarative, centralized validation:
  - `loginSchema.js`
  - `registerSchema.js`
  - `changePassSchema.js`
- Unified error mapping via `@hookform/resolvers/zod` (no manual parsing needed).
- Instant field-level feedback + disabled submit on invalid state.
- Single source of truth: schemas reused for UI + potential server validation.
- Easy extensibility (add fields, update schema, form updates automatically).

## API Layer
Service files:
- `authServices.js`
- `postServices.js`
- `commentService.js`

Centralize request logic & error handling. Adjust `axios` base URL with env variable.

## Data Fetching Strategy
- **React Query** is currently implemented specifically for:
  - `getPosts` (Feed) - uses `useInfiniteQuery`.
  - `getUserPosts` (Profile) - uses `useQuery`.
  - *Reasoning:* These endpoints return large datasets where caching and background re-fetching significantly improve performance.
- **Mutations (`useMutation`)**:
  - Implemented in `CreatePost` for creating and editing posts.
  - On success, it triggers `queryClient.invalidateQueries({ queryKey: ["posts"] })` to automatically refresh the feed without a page reload.
- Other endpoints and write operations currently rely on standard Axios calls.

## Future Improvements
- Real analytics integration
- Optimistic UI updates for posts/comments
- Image upload optimization
- Pagination / infinite scroll
- Notifications system
- Accessibility & keyboard navigation enhancements


