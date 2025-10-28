# Auth0 ACUL React Sample (JS SDK)

This sample demonstrates how to build custom Auth0 Advanced Customizations for Universal Login (ACUL) screens using React, TypeScript, Tailwind CSS, and the **Auth0 ACUL JS SDK**.

## Overview

This implementation includes 3 authentication screens:
- **Login**: Universal login screen
- **Login ID**: Identifier-first login flow
- **Login Password**: Password entry screen

## Features

- 🔐 **Auth0 ACUL JS SDK Integration**: Uses `@auth0/auth0-acul-js`
- ⚡ **Modern Stack**: React 19, TypeScript, Vite, Tailwind CSS
- 🎨 **Auth0 Design System**: Uses Auth0's Universal Design System (UDS) components
- 🧪 **Testing**: Comprehensive test suite with Jest and React Testing Library
- 📱 **Responsive**: Mobile-first design with Tailwind CSS
- 🚀 **CI/CD**: GitHub Actions workflow for automated deployment

## Quick Start

```bash
# Install dependencies
npm install

# Start development with mock data
npm run screen login-id

# Run tests
npm test

# Build for production
npm run build

# Serve built files locally for testing
npx serve dist -p 8080 --cors
```

## Build Output

The Vite build process generates optimized bundles with code splitting:

```
dist/
├── index.html                           # Main entry point
└── assets/
    ├── main.[hash].js                   # Main application bundle
    ├── shared/
    │   ├── style.[hash].css             # Global styles (Tailwind + Auth0 theme)
    │   ├── react-vendor.[hash].js       # React + ReactDOM (~324 kB)
    │   ├── vendor.[hash].js             # Third-party dependencies (~196 kB)
    │   └── common.[hash].js             # Shared app code (~87 kB)
    └── [screen-name]/
        └── index.[hash].js              # Screen-specific code (0.9-6 kB)
```

**Bundle Strategy:**
- **react-vendor**: React and ReactDOM for optimal caching
- **vendor**: Third-party packages (captcha providers, utilities)
- **common**: Shared components and utilities from src/
- **Screen bundles**: Minimal screen-specific logic for fast loading

Each screen can be deployed independently for incremental rollouts.

## Available Screens

- `npm run screen login` - Universal login
- `npm run screen login-id` - Identifier-first login
- `npm run screen login-password` - Password entry

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with optimized code splitting (react-vendor, vendor, common, screen bundles)
- **Styling**: Tailwind CSS v4
- **Auth SDK**: @auth0/auth0-acul-js
- **Testing**: Jest + React Testing Library
- **UI Components**: Auth0 UDS Base Components

## Project Structure

```
react-js/
├── src/
│   ├── screens/           # Authentication screens
│   ├── components/        # Reusable UI components
│   ├── utils/            # Helper utilities
│   ├── mock-data/        # Mock data for development
│   └── types/            # TypeScript definitions
├── .github/workflows/    # Deployment automation
└── ...config files
```

## Deployment

This sample includes a GitHub Actions workflow for automated deployment to AWS S3. See [DEPLOYMENT.md](../DEPLOYMENT.md) for configuration details.

## Documentation

For detailed documentation, refer to the main repository README and Auth0 ACUL documentation.
