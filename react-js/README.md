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
```

## Available Screens

- `npm run screen login` - Universal login
- `npm run screen login-id` - Identifier-first login
- `npm run screen login-password` - Password entry

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
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
