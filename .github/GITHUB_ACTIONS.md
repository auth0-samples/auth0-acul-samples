# GitHub Actions Configuration for deployment to AWS S3

This directory contains the complete GitHub Actions deployment pipeline for Auth0 Universal Login customizations.

## Directory Structure

```
.github/
├── config/                      # Configuration files
│   ├── deploy_config.yml        # Controls which screens to deploy
│   ├── screen-to-prompt-mapping.js   # Maps screens to Auth0 prompts
│   └── context-configuration.js      # Auth0 context data configuration
├── actions/                     # Custom GitHub Actions
│   ├── check-deployment-targets/ #Checks if any screens need deployment
│   ├── configure-auth0-screens/ # Configures Auth0 Universal Login screens
│   │   ├── action.yml           # Main action orchestrator
│   │   └── scripts/             # Organized bash scripts
│   │       ├── utils.sh         # Shared utilities
│   │       ├── setup-and-config.sh # Config loading & validation
│   │       ├── discover-assets.sh  # Asset discovery logic
│   │       ├── process-screen.sh   # Screen processing
│   │       └── generate-report.sh  # Final reporting
│   ├── setup-auth0-cli/         # Sets up the Auth0 CLI
│   └── upload-acul-to-s3/       # Uploads ACUL assets to S3
└── workflows/                   # GitHub workflow definitions
    └── acul-deploy.yml
```

## Deployment Pipeline

The deployment automatically builds, uploads, and configures Auth0 Universal Login screens using GitHub Actions.

### Flow

1. **Check Targets** → Determines which screens are targeted for deployment
2. **Build** → Screens are compiled with Vite (conditional)
3. **Upload** → Assets uploaded to CDN (S3) (conditional)
4. **Configure** → Auth0 prompts updated with targeted screen settings using the Auth0 CLI (conditional)

## Configuration Files

### `config/deploy_config.yml`

Controls which screens are deployed by default. Example:

```yaml
default_screen_deployment_status:
  login-id: true
  login-password: false
  # ... other screens
```

**💡 Pro Tip**: Setting all screens to `false` will skip the entire build and upload process, making the pipeline complete quickly without using resources.

### `config/screen-to-prompt-mapping.js`

Maps custom screen names (directory names) to Auth0 prompt names. Example:

```javascript
export const screenToPromptMap = {
  "login-id": "login-id", // Screen 'login-id' maps to Auth0 prompt 'login-id'
  "mfa-sms-challenge": "mfa-sms", // Screen 'mfa-sms-challenge' maps to 'mfa-sms'
  "passkey-enrollment": "passkeys",
};
```

### `config/context-configuration.js`

Defines which Auth0 context data (e.g., branding settings, client info) is available to custom screens. Example:

```javascript
export const contextConfig = [
  "branding.settings",
  "screen.texts",
  "user.app_metadata.[keyName]", // Replace [keyName] with actual metadata key
];
```

## GitHub Actions

### Available Actions

#### `check-deployment-targets`

Determines early in the pipeline if any screens are targeted for deployment, enabling conditional execution of expensive operations.

**Outputs**:

- `has_targets`: Boolean indicating if any screens need deployment
- `target_count`: Number of screens targeted
- `target_screens`: JSON array of targeted screen names

#### `configure-auth0-screens`

The main action uses a modular architecture with organized bash scripts:

- **`action.yml`**: Orchestrator that coordinates the deployment flow
- **`scripts/utils.sh`**: Shared utilities for loading JS modules and checking screen targeting
- **`scripts/setup-and-config.sh`**: Loads configurations, validates environment, reads deployment config
- **`scripts/discover-assets.sh`**: Dedicated asset discovery and categorization for screens
- **`scripts/process-screen.sh`**: Handles single screen processing including settings generation and Auth0 CLI integration
- **`scripts/generate-report.sh`**: Creates deployment summary table and final status reporting

#### Other Actions

- **`setup-auth0-cli`**: Installs and authorizes the Auth0 CLI for programmatic interaction with your Auth0 tenant.
- **`upload-acul-to-s3`**: Uploads the built ACUL assets from the `dist` directory to an AWS S3 bucket.

### Usage in Your Project

To use this deployment system in your own project:

1.  Copy the entire `.github` directory to your repository root.
2.  Update the workflow file (`.github/workflows/acul-deploy.yml`) to match your project structure and desired triggers.
3.  Configure the required secrets in your GitHub repository (`Settings > Secrets and variables > Actions`):

#### Required GitHub Secrets

| Secret Name           | Sample Value                                                   | Description                                            |
| --------------------- | -------------------------------------------------------------- | ------------------------------------------------------ |
| `AWS_S3_ARN`          | `arn:aws:iam::123456789012:role/GitHubActions-ACUL-Deployment` | ARN of IAM role for GitHub Actions OIDC with S3 access |
| `S3_BUCKET_NAME`      | `my-acul-assets-bucket`                                        | Your S3 bucket name for hosting assets                 |
| `AWS_REGION`          | `us-east-1`                                                    | AWS region where your S3 bucket is located             |
| `S3_CDN_URL`          | `https://d1234abcdef.cloudfront.net`                           | CloudFront or S3 public URL (no trailing slash)        |
| `AUTH0_DOMAIN`        | `dev-mydomain.auth0.com`                                       | Your Auth0 domain (must have custom domain set up)     |
| `AUTH0_CLIENT_ID`     | `abcdef123456789`                                              | M2M application client ID for Auth0 Management API     |
| `AUTH0_CLIENT_SECRET` | `your-m2m-secret-here`                                         | M2M application client secret                          |

4.  Modify the configuration files in `.github/config/` as needed for your deployment requirements.

## Adding New Screens

1.  Add your new screen's implementation (e.g., HTML, JS, CSS built by Vite) into a subdirectory within `src/screens/` (e.g., `src/screens/my-new-screen/`). Ensure your build process outputs these to `dist/assets/my-new-screen/`.
2.  Update `config/deploy_config.yml` to include your new screen and set its deployment status (e.g., `my-new-screen: true`).
3.  If your screen name doesn't directly map to an Auth0 prompt, add an entry to `config/screen-to-prompt-mapping.js`.
4.  Deployment typically happens automatically on push to the configured branches (e.g., `main`) if the workflow is enabled.

For detailed deployment instructions, refer to the `DEPLOYMENT.md` document (not included in this `.github` folder example).
