# GitHub Actions Configuration for deployment to AWS S3

This directory contains the complete GitHub Actions deployment pipeline for Auth0 Universal Login customizations.

## Directory Structure

```
.github/
├── README.md                    # This file
├── config/                      # Configuration files
│   ├── deploy_config.yml        # Controls which screens to deploy
│   ├── screen-to-prompt-mapping.js   # Maps screens to Auth0 prompts
│   └── context-configuration.js      # Auth0 context data configuration
├── actions/                     # Custom GitHub Actions
│   ├── configure-auth0-screens/
│   ├── discover-screens/
│   ├── setup-auth0-cli/
│   └── upload-acul-to-s3/
└── workflows/                   # GitHub workflow definitions
    └── acul-deploy.yml
```

## Deployment Pipeline

The deployment automatically builds, uploads, and configures Auth0 Universal Login screens using GitHub Actions.

### Flow

1. **Build** → Screens are compiled with Vite
2. **Upload** → Assets uploaded to CDN
3. **Configure** → Auth0 prompts updated with screen settings

## Configuration Files

### `config/deploy_config.yml`

Controls which screens are deployed:

```yaml
default_screen_deployment_status:
  login-id: true
  login-password: false
  # ... other screens
```

### `config/screen-to-prompt-mapping.js`

Maps individual screens to Auth0 prompt categories:

```javascript
export const screenToPromptMap = {
  "login-id": "login-id",
  "mfa-sms-challenge": "mfa-sms",
  "passkey-enrollment": "passkeys",
};
```

### `config/context-configuration.js`

Defines which Auth0 context data is available to screens:

```javascript
export const contextConfig = [
  "branding.settings",
  "screen.texts",
  "user.app_metadata.[keyName]",
];
```

## GitHub Actions

### Available Actions

- **configure-auth0-screens**: Configures Auth0 Universal Login screens using the Auth0 CLI
- **discover-screens**: Discovers available ACUL screens in your application
- **setup-auth0-cli**: Sets up the Auth0 CLI with proper authentication
- **upload-acul-to-s3**: Uploads ACUL assets to an S3 bucket

### Usage in Your Project

To use this deployment system in your own project:

1. Copy the entire `.github` directory to your repository root
2. Update the workflow file (`.github/workflows/acul-deploy.yml`) to match your project structure
3. Configure the required secrets in your GitHub repository (`Settings > Secrets and variables > Actions`):

#### Required GitHub Secrets

| Secret Name           | Sample Value                                                   | Description                                        |
| --------------------- | -------------------------------------------------------------- | -------------------------------------------------- |
| `AWS_S3_ARN`          | `arn:aws:iam::123456789012:role/GitHubActions-ACUL-Deployment` | The ARN of your IAM role for GitHub Actions        |
| `S3_BUCKET_NAME`      | `my-acul-assets-bucket`                                        | Your S3 bucket name for hosting assets             |
| `AWS_REGION`          | `us-east-1`                                                    | AWS region where your S3 bucket is located         |
| `S3_CDN_URL`          | `https://d1234abcdef.cloudfront.net`                           | CloudFront or S3 public URL (no trailing slash)    |
| `AUTH0_DOMAIN`        | `dev-mydomain.auth0.com`                                       | Your Auth0 domain (must have custom domain set up) |
| `AUTH0_CLIENT_ID`     | `abcdef123456789`                                              | Machine-to-Machine application client ID           |
| `AUTH0_CLIENT_SECRET` | `your-m2m-secret-here`                                         | Machine-to-Machine application client secret       |

4. Modify the configuration files as needed for your deployment requirements

## Adding New Screens

1. Add screen implementation to `src/screens/[screen-name]/`
2. Set deployment status in `config/deploy_config.yml`
3. Add screen-to-prompt mapping if needed
4. Deployment happens automatically on push to main

For detailed deployment instructions, refer to the [DEPLOYMENT.md](../DEPLOYMENT.md) document.
