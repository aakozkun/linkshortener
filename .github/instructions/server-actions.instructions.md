---
description: "Use when implementing or changing data mutations, server actions, or database access in this app."
---

# Server Actions and Data Mutations

- Perform all data mutations through server actions, called from client components.
- Name each server action file `actions.ts` and colocate it with the component that calls the action.
- Give action inputs explicit TypeScript types; do not use `FormData`.
- Validate all input with Zod inside the server action before using it.
- Do not throw errors from server actions; return an object with an `error` or `success` property instead.
- Check that a user is logged in before performing any database operation.
- Keep Drizzle queries out of server actions. Put database operations in helper functions under `/data`; these helpers wrap the Drizzle queries and are called by the actions.
