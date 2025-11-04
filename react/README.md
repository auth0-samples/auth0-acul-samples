# Auth0 ACUL React Sample (React SDK)

This sample demonstrates how to build custom Auth0 Advanced Customizations for Universal Login (ACUL) screens using React, TypeScript, Tailwind CSS, and the **Auth0 ACUL React SDK**.

## Overview

This implementation includes 31 comprehensive authentication screens covering the complete authentication flow:

### Login & Authentication (5 screens)

- **Login**: Universal login screen
- **Login ID**: Identifier-first login flow
- **Login Password**: Password entry screen
- **Login Passwordless Email Code**: Email code verification flow
- **Login Passwordless SMS OTP**: SMS OTP verification flow

### Signup & Registration (3 screens)

- **Signup**: Universal signup screen
- **Signup ID**: Identifier-first signup flow
- **Signup Password**: Password signup screen

### Password Reset (5 screens)

- **Reset Password Request**: Initiate password reset
- **Reset Password Email**: Email-based password reset
- **Reset Password**: Password reset screen
- **Reset Password Success**: Password reset confirmation
- **Reset Password Error**: Password reset error handling
- **Reset Password Success**: Password reset confirmation

### Multi-Factor Authentication (15 screens)

- **MFA Begin Enroll Options**: MFA enrollment options selection
- **MFA Country Codes**: Country code selection for phone-based MFA
- **MFA Email Challenge**: Email-based MFA verification
- **MFA Email List**: List of enrolled email addresses
- **MFA Enroll Result**: MFA enrollment confirmation
- **MFA Login Options**: MFA method selection at login
- **MFA Push Challenge Push**: Push notification challenge
- **MFA Push Enrollment QR**: QR code for push notification enrollment
- **MFA Push List**: List of enrolled push devices
- **MFA Push Welcome**: Push notification enrollment introduction
- **MFA SMS Challenge**: SMS-based MFA verification
- **MFA SMS Enrollment**: SMS MFA enrollment flow
- **MFA SMS List**: List of enrolled phone numbers

### Passkey & WebAuthn (2 screens)

- **Passkey Enrollment**: Passkey enrollment flow
- **Passkey Enrollment Local**: Local passkey enrollment

### Identifier Management (2 screens)

- **Email Identifier Challenge**: Email verification for identifier-first flow
- **Phone Identifier Challenge**: Phone verification for identifier-first flow
- **Phone Identifier Enrollment**: Phone number enrollment

## Quick Start

```bash
# Install dependencies
npm install

# Start development server with context inspector
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Serve built files locally for testing
npx serve dist -p 8080 --cors
```

## Development with Context Inspector

In development mode, the application includes **ul-context-inspector** - a visual tool that lets you:
- 📋 View the current Auth0 Universal Login context
- ✏️ Edit context values in real-time
- 🔄 Switch between different screens
- 🧪 Test error states and edge cases

The inspector panel appears automatically when running `npm run dev` and is completely removed from production builds.

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
- **vendor**: Third-party packages (captcha providers, form libraries, utilities)
- **common**: Shared components, hooks, and utilities from src/
- **Screen bundles**: Minimal screen-specific logic for fast loading

Each screen can be deployed independently for incremental rollouts.

## Features

- **Auth0 ACUL React SDK Integration**: Uses `@auth0/auth0-acul-react`
- **Modern Stack**: React 19, TypeScript, Vite, Tailwind CSS v4
- **Auth0 Design System**: Implements Auth0's design language with theme support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **CI/CD Ready**: GitHub Actions workflow for automated deployment
- **Development Tools**: Integrated context inspector for real-time Auth0 context visualization and manipulation

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with optimized code splitting (react-vendor, vendor, common, screen bundles)
- **Styling**: Tailwind CSS v4 with Auth0 theme engine
- **Auth SDK**: @auth0/auth0-acul-react
- **Testing**: Jest + React Testing Library
- **UI Components**: Custom ULTheme components following Auth0 design system

## Project Structure

```
react/
├── src/
│   ├── screens/           # 31 authentication screens
│   ├── components/        # Reusable themed UI components
│   ├── hooks/            # React hooks for auth flows
│   ├── utils/            # Helper utilities and theme engine
│   ├── test/             # Test utilities and setup
│   └── types/            # TypeScript definitions
├── .github/workflows/    # Deployment automation
└── ...config files
```

## Deployment

This sample includes a GitHub Actions workflow for automated deployment to AWS S3. See [DEPLOYMENT.md](DEPLOYMENT.md) for complete setup instructions or [.github/GITHUB_ACTIONS.md](.github/GITHUB_ACTIONS.md) for workflow details.

## Documentation

For detailed documentation, refer to the main repository README and Auth0 ACUL documentation.
