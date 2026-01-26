---
name: documentation-sync
description: Rules for keeping documentation synchronized with code changes. Always use this skill when modifying code.
---

# Documentation Synchronization Rules

You must follow these rules to ensure the project documentation in `docs/` remains accurate and up-to-date.

## 1. Trigger Condition
**WHENEVER** you modify, add, or delete:
- Pages (`app/**/*.tsx`)
- Components (`components/**/*.tsx`)
- API logic or Hooks (`hooks/`, `lib/`)
- Global styles or configuration (`globals.css`, `tailwind.config.ts`)

You **MUST** check if the change affects the existing documentation.

## 2. Documentation Map
Check the relevant file based on your changes:

| Changed Item | Target Doc |
|--------------|------------|
| Project Structure / Tech Stack | `docs/01-project-overview.md` |
| File/Folder Structure | `docs/02-folder-structure.md` |
| Routing, URLs, Navigation | `docs/03-page-routing.md` |
| Components, UI Patterns | `docs/04-components.md` |
| Data Fetching, State | `docs/05-data-fetching.md` |
| Backend API, Integration | `docs/06-api-integration.md` |
| Types, Interfaces | `docs/07-type-definitions.md` |
| Styling, Themes, Colors | `docs/08-styling-guide.md` |

## 3. Action Required
1. **Scan**: Read the relevant doc file to see if it contradicts your new code.
2. **Update**: modifying the markdown file to match the new implementation immediately.
3. **Verify**: Ensure the doc update is accurate and typically done in the same turn or immediately following the code change.

## 4. Example
- If you change the service name in `layout.tsx`, you must update `01-project-overview.md` and `README.md`.
- If you add a new page `/orders/refund`, you must update the routing table in `03-page-routing.md`.
- If you change a button color token, check `08-styling-guide.md`.
