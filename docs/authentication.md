# Authentication instructions

- Use Clerk for all authentication and identity flows. Do not introduce or use another authentication method or provider.
- Protect `/dashboard`: only authenticated users may access it. Enforce access on the server with Clerk; never rely only on client-side checks or client-provided identity.
- Redirect authenticated users who visit `/` to `/dashboard`.
- Clerk sign-in and sign-up must always open as modals, not as standalone page flows. Preserve this behavior when changing the sign-in or sign-up UI and routing.
