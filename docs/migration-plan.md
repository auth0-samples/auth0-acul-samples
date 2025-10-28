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
| Dependencies     | Version bumps and reorganized modules                  | Check each sample’s `package.json`            |
| Documentation    | Moved into `/docs/`                                    | Updated setup and run instructions            |

---

## Next Steps

- Explore the new monorepo structure (`v2.0.0+`)
- Read each sample’s local `README.md` for setup
- Refer to the root [CHANGELOG.md](../CHANGELOG.md) for detailed updates
- Open issues or PRs if you encounter migration problems
