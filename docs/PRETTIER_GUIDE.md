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

## Automatic Formatting

### 🎉 Husky Pre-Commit Hook (RECOMMENDED)

This project uses **Husky + lint-staged** to automatically format files before every commit.

**How it works:**
1. You make changes to files
2. You run `git commit`
3. **Husky automatically runs Prettier + ESLint** on staged files
4. Files are formatted and linted
5. Commit proceeds with properly formatted code

**No manual formatting needed!** ✨

### Setup (Already Done)

The project is already configured with:
- `husky` - Git hooks manager
- `lint-staged` - Run commands on staged files
- `.husky/pre-commit` - Pre-commit hook that runs lint-staged

**Installation:**
```bash
npm install  # Husky hooks are installed automatically via 'prepare' script
```

### Manual Formatting (When Needed)

**Format all files:**
```bash
npm run format
```

**Check formatting without changes:**
```bash
npm run format:check
```

## IDE Setup (Optional but Recommended)

### VSCode

Install the Prettier extension and the project includes `.vscode/settings.json` which:
- Auto-formats on save
- Uses Prettier as default formatter

This provides **instant feedback** while coding.

## CI/CD

The CI pipeline runs `npm run format:check` which will FAIL if files are not formatted correctly.

With Husky pre-commit hooks, this should **never happen** because formatting is enforced before commit.

## Common Scenarios

### Scenario 1: Normal Development
```bash
# 1. Make code changes
vim src/components/MyComponent.tsx

# 2. Stage files
git add .

# 3. Commit (Husky auto-formats!)
git commit -m "feat: add new component"
# → Prettier runs automatically
# → ESLint runs automatically
# → Files are formatted
# → Commit succeeds
```

### Scenario 2: Bypassing Hooks (NOT RECOMMENDED)
```bash
# Skip pre-commit hooks (will fail CI!)
git commit --no-verify -m "skip hooks"
```

### Scenario 3: Fixing Formatting Issues
```bash
# If CI fails on formatting:
npm run format
git add .
git commit -m "style: fix prettier formatting"
```

## Troubleshooting

### Husky hooks not running?
```bash
# Reinstall hooks
npm run prepare
```

### Want to disable hooks temporarily?
```bash
# Use --no-verify (NOT recommended for main branch)
git commit --no-verify -m "your message"
```

### Format specific files only?
```bash
prettier --write src/components/MyComponent.tsx
```

## Summary

✅ **Husky pre-commit hook** - Automatic formatting on every commit  
✅ **VSCode auto-format** - Instant feedback while coding  
✅ **CI format check** - Final safety net  

**Result: Zero formatting issues! 🎉**
