# Prettier Configuration Guide

## Project Configuration

This project uses the following Prettier settings:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid"
}
```

## Key Rules

### ❌ NO Semicolons
```typescript
// ❌ WRONG
const foo = 'bar';
export default App;

// ✅ CORRECT
const foo = 'bar'
export default App
```

### ❌ NO Parentheses Around Single Arrow Function Parameters
```typescript
// ❌ WRONG
const setData = useStore((state) => state.setData)
array.map((item) => item.id)

// ✅ CORRECT
const setData = useStore(state => state.setData)
array.map(item => item.id)
```

### ✅ Single Quotes
```typescript
// ❌ WRONG
import { foo } from "bar"

// ✅ CORRECT
import { foo } from 'bar'
```

### ✅ Trailing Commas (ES5)
```typescript
// ✅ CORRECT
const obj = {
  foo: 'bar',
  baz: 'qux', // Trailing comma in objects
}

const arr = [
  1,
  2,
  3, // Trailing comma in arrays
]
```

## Before Pushing Code

**ALWAYS run:**
```bash
npm run format
```

This will automatically format all files according to the project's Prettier config.

## CI/CD

The CI pipeline runs `npm run format:check` which will FAIL if files are not formatted correctly.

## Common Mistakes to Avoid

1. **Copying code with semicolons** - Always format after pasting
2. **Using `(state) =>` instead of `state =>`** - Prettier will complain
3. **Forgetting to run format before commit** - CI will catch it

## IDE Setup (Recommended)

### VSCode

Install the Prettier extension and add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

This will auto-format files on save, preventing formatting issues before they reach CI.
