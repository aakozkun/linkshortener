# Project agent instructions

This repository is a Next.js 16 App Router application using React 19, strict TypeScript, Clerk, Neon Postgres, Drizzle, and Tailwind CSS 4. Follow these repository-specific instructions whenever editing code or documentation.

## Read the applicable guidance

**CRITICAL: ALWAYS read the relevant individual instruction files in `/docs` BEFORE generating ANY code. This is mandatory for every coding task, with no exceptions. Do not rely only on this summary, prior context, or assumptions; open and read the actual applicable document(s) first. If more than one document applies, read each one before writing code.**

For authentication, Clerk, or protected-route work, follow [docs/authentication.md](docs/authentication.md). Keep guidance consistent with the code when architecture or capabilities change.

For UI work, follow [docs/ui-components.md](docs/ui-components.md) and use shadcn/ui components rather than creating custom components.

## Always follow

- ALWAYS refer to the relevant .md file BEFORE generating any code.
- Verify behavior in the current code before relying on assumptions. This repository is still a scaffold: the home page is starter content, the database schema is empty, and link creation/redirect behavior is not implemented.
- Use existing dependencies and patterns; keep changes focused. Do not invent tables, migrations, tests, routes, or scripts and describe them as existing.
- Default to server components and server-side authorization/data access. Add client code only where browser interaction requires it.
- Never expose secrets or trust client-provided identity, ownership, or authorization claims.
- Run `npm run lint` after code changes and `npm run build` when relevant and feasible. Report verification truthfully, including anything not run.
- Do not modify generated output, dependencies, or local environment secrets as part of ordinary feature work.
