---
description: Read this before implementing any UI components.
---

# UI component instructions

- Use shadcn/ui components for user-facing UI. Prefer the existing components in `components/ui` and compose them directly in pages and features.
- Do not create app-specific UI components, wrappers, custom controls, or hand-rolled replacements for shadcn/ui components.
- If a needed component is not present, add the official shadcn/ui component using the configured shadcn CLI, then use it; do not implement a custom substitute.
- Use component props, variants, and existing design tokens for presentation. Plain semantic HTML is appropriate for content and layout, not as a replacement for an available shadcn/ui component.