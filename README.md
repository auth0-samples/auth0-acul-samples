# Auth0 ACUL React Sample (React SDK)

This sample will demonstrate how to build custom Auth0 Advanced Customizations for Universal Login (ACUL) screens using React, TypeScript, Tailwind CSS, and the **Auth0 ACUL React SDK**.

## Current Implementation

This implementation currently includes 8 authentication screens:

- **Login Passwordless Email Code**: Email code verification flow
- **Login Passwordless SMS OTP**: SMS OTP verification flow  
- **Reset Password**: Password reset screen
- **Reset Password Email**: Email-based password reset
- **Reset Password Error**: Password reset error handling
- **Reset Password Success**: Password reset confirmation
- **Signup ID**: Identifier-first signup flow
- **Signup Password**: Password signup screen


## Development Status

🚧 **Actively Developing** - This sample currently has 8 screens implemented and is being developed alongside the Auth0 ACUL React SDK for the GA release.

## Available Screens

```bash
# Start development with any implemented screen
npm run screen login-passwordless-sms-otp
npm run screen login-passwordless-email-code
npm run screen signup-id  
npm run screen signup-password
npm run screen reset-password
npm run screen reset-password-email
npm run screen reset-password-error
npm run screen reset-password-success
```

## Project Structure (Planned)

```
react/
├── src/
│   ├── screens/           # ~30 authentication screens
│   ├── components/        # Reusable UI components
│   ├── hooks/            # React hooks for auth flows
│   ├── utils/            # Helper utilities
│   ├── mock-data/        # Mock data for development
│   └── types/            # TypeScript definitions
├── .github/workflows/    # Deployment automation
└── ...config files
```

Stay tuned for updates as we approach the ACUL GA release!
