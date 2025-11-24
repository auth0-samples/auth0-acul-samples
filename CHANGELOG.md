# Changelog

All notable changes to this project will be documented in this file.  
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v2.0.0] - 2025-11-24

### Added

- **Monorepo structure** with framework-specific samples:
  - `react/` - Auth0 ACUL React SDK sample
  - `react-js/` - Auth0 ACUL JS/TS SDK sample
- Centralized documentation in `/docs/` folder
- Migration guide for upgrading from v1.x to v2.0.0
- Per-sample `package.json` and build scripts
- Standardized setup and configuration across samples

### Changed

- Repository restructured from single-sample to monorepo layout
- Each sample now has its own dependencies and scripts
- Updated documentation to reflect new folder structure
- Improved CI/CD pipeline for multi-sample validation

### Breaking Changes

- **Folder structure**: Sample code moved into framework-specific folders (`/react/`, `/react-js/`)
- **Scripts**: Each sample has its own `package.json` - run commands from the respective sample directory
- **Dependencies**: Version bumps and reorganized modules - check each sample's `package.json`
- **Documentation**: Moved into `/docs/` folder

### Migration

See [Migration Guide](./docs/migration-plan.md) for detailed upgrade instructions from v1.x to v2.0.0.

---

## [v1.0.0] - 2025-10-27

### Added

- Initial release of the Auth0 ACUL sample app
- Single auth0-acul-js SDK integration example
- Basic documentation and setup instructions

### Deprecated

- This version is now superseded by **v2.0.0 (monorepo)** release
- v1.0.0 remains available for legacy projects via `git checkout v1.0.0`

---

## How to Use This Changelog

- **[Unreleased]** - Changes that are in development but not yet released
- **[vX.Y.Z]** - Released versions with date
- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security fixes
