# Migration Guide — v1.x → v2.0.0 (Monorepo)

## Overview

Starting from **v2.0.0**, this repository has been restructured into a **monorepo**.  
Each framework-specific sample now lives under its own folder at the repository root.

```
/react/           → React SDK sample
/react-js/        → JS/TS SDK sample
/docs/            → Documentation and migration guides
```

---

## Why This Change?

- To simplify maintaining multiple samples in one repository
- To reduce duplication and standardize setup/configuration
- To enable automated releases and changelogs
- To support CI/CD pipelines for sample validation

---

## How to Stay on the Old Version

If your existing projects depend on the old structure:

```bash
git checkout v1.0.0
```

That version will remain available indefinitely as the last **v1.x (legacy)** release.

---

## Breaking Changes

| Area             | Change                                                 | Notes                                         |
| ---------------- | ------------------------------------------------------ | --------------------------------------------- |
| Folder structure | Sample code moved into framework-specific folders      | Adjust your paths and setup steps accordingly |
| Scripts          | Each sample now has its own `package.json` and scripts | Run commands per sample directory             |
| Dependencies     | Version bumps and reorganized modules                  | Check each sample's `package.json`            |
| Documentation    | Moved into `/docs/`                                    | Updated setup and run instructions            |

---

## Migration Steps

### 1. Update Your Local Repository

```bash
# Fetch the latest changes
git fetch origin

# Switch to v2.0.0
git checkout v2.0.0
# or
git checkout feat/monorepo-conversion-samples
```

### 2. Choose Your Sample

Navigate to the appropriate sample directory:

```bash
# For React SDK sample
cd react/

# OR for JS/TS SDK sample
cd react-js/
```

### 3. Install Dependencies

Each sample has its own dependencies:

```bash
npm install
```

### 4. Update Your Scripts

Old v1.x commands:

```bash
npm run dev
npm run build
npm test
```

New v2.0.0 commands (run from sample directory):

```bash
# Development
npm run dev

# Build
npm run build

# Test
npm test

# Lint
npm run lint
```

### 5. Review Documentation

- Check the sample's local `README.md` for specific setup instructions
- Refer to `/docs/` for additional guides and documentation
- Review [CHANGELOG.md](../CHANGELOG.md) for detailed updates

---

## What Changed Per Sample

### React SDK Sample (`/react/`)

- Uses `@auth0/auth0-acul-react` SDK
- 31 screens implemented
- Full React 19 + TypeScript + Vite setup
- Tailwind CSS v4 styling

### JS/TS SDK Sample (`/react-js/`)

- Uses `@auth0/auth0-acul-js` SDK  
- 3 screens implemented (production-ready)
- React 19 + TypeScript + Vite
- Tailwind CSS v4 styling

---

## Common Issues

### Issue: Cannot find module after upgrade

**Solution**: Make sure you're in the correct sample directory and have run `npm install`:

```bash
cd react/  # or react-js/
npm install
```

### Issue: Scripts not found

**Solution**: Each sample has its own scripts. Run commands from the sample directory, not the repository root:

```bash
cd react/
npm run dev  # ✅ Correct
```

Not from root:

```bash
npm run dev  # ❌ Won't work from root
```

### Issue: Old imports or paths not working

**Solution**: Update any custom code to reference the new monorepo structure. Check the sample's `package.json` for current dependencies and versions.

---

## Next Steps

- Explore the new monorepo structure (`v2.0.0+`)
- Read each sample's local `README.md` for setup
- Refer to the root [CHANGELOG.md](../CHANGELOG.md) for detailed updates
- Open issues or PRs if you encounter migration problems

---

## Support

For questions or issues:

- Open an issue on [GitHub](https://github.com/auth0-samples/auth0-acul-samples/issues)
- Check existing documentation in `/docs/`
- Review sample-specific README files
