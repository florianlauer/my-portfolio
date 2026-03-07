# Suggested Commands

## Development

```bash
npm run dev          # Dev server with Turbopack — http://localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint (flat config, core-web-vitals + TS)
```

## Add shadcn/ui components

```bash
npx shadcn@latest add <component-name>
```

## System utilities (macOS/Darwin)

```bash
git status / git diff / git log --oneline
ls -la
find . -name "*.tsx" -not -path "./node_modules/*"
grep -r "pattern" src/
trash <file>          # Use instead of rm — user preference
```

## Notes

- No test runner is configured. Linting is the only quality gate.
- Node 22 is provided by devenv — do NOT assume global Node.js.
- Do NOT auto-commit. User manages commits manually.
