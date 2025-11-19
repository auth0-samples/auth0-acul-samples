# GitHub Actions Deployment Pipeline

This workflow automatically builds your Auth0 Universal Login screens, uploads them to AWS S3, and configures them in your Auth0 tenant.

> **New to this workflow?** See [DEPLOYMENT.md](../DEPLOYMENT.md) for complete setup instructions including Auth0 and AWS configuration.

## How It Works

The deployment happens in 4 steps:

1. **Check Targets** - Reads `deploy_config.yml` to see which screens you want to deploy
2. **Build** - Compiles your screens using Vite (skipped if no screens are enabled)
3. **Upload to S3** - Pushes built assets to your CDN (skipped if no screens are enabled)
4. **Configure Auth0** - Updates Auth0 prompts to use the new screens via Auth0 CLI (skipped if no screens are enabled)

## Configuration Files

### `config/deploy_config.yml`

This file controls which screens get deployed when you push to the `main` branch.

```yaml
default_screen_deployment_status:
  # Screens set to 'true' will be deployed
  "login-id": true
  "login-password": true
  
  # Screens set to 'false' won't be deployed
  "login": false
```

**Tip:** If all screens are set to `false`, the workflow skips building and uploading entirely, saving time and resources.

### `config/screen-to-prompt-mapping.js`

Maps your screen directory names to Auth0 prompt identifiers. Most screens map 1:1, but some need custom mappings:

```javascript
export const screenToPromptMap = {
  "login-id": "login-id",                    // Direct mapping
  "mfa-sms-challenge": "mfa-sms",            // Custom mapping
  "passkey-enrollment": "passkeys",          // Custom mapping
};
```

### `config/context-configuration.js`

Defines what Auth0 data your screens can access (branding, user info, etc.):

```javascript
export const contextConfig = [
  "branding.settings",
  "screen.texts",
  "user.app_metadata.[keyName]",  // Replace [keyName] with actual metadata keys
];
```

## GitHub Actions

### `check-deployment-targets`

Runs first to check if any screens need deployment. This prevents wasting resources when nothing needs to be deployed.

**Outputs:**
- `has_targets` - `true` if at least one screen is enabled
- `target_count` - Number of enabled screens
- `target_screens` - JSON array of screen names to deploy

### `configure-auth0-screens`

The main deployment action, organized into these scripts:

- `action.yml` - Coordinates the overall deployment
- `scripts/utils.sh` - Helper functions for loading configs
- `scripts/setup-and-config.sh` - Validates environment and loads deployment settings
- `scripts/discover-assets.sh` - Finds and categorizes screen assets
- `scripts/process-screen.sh` - Processes individual screens and updates Auth0
- `scripts/generate-report.sh` - Creates a deployment summary

### `setup-auth0-cli`

Installs and authenticates the Auth0 CLI so the workflow can update your tenant.

### `upload-acul-to-s3`

Uploads built assets from the `dist` directory to your S3 bucket.

## When the Workflow Runs

The workflow triggers when:
- Code is pushed to the `main` branch
- You manually trigger it from the GitHub Actions tab

It will NOT run on pull requests or development branches.

## Required Secrets

Configure these in your GitHub repository under `Settings > Secrets and variables > Actions`:

| Secret | Example | What It's For |
|--------|---------|---------------|
| `AWS_S3_ARN` | `arn:aws:iam::123456789012:role/GitHubActions-ACUL` | IAM role for uploading to S3 |
| `S3_BUCKET_NAME` | `my-acul-assets` | Where to store the built files |
| `AWS_REGION` | `us-east-1` | AWS region of your bucket |
| `S3_CDN_URL` | `https://d1234abcdef.cloudfront.net` | Public URL for accessing assets |
| `AUTH0_DOMAIN` | `dev-mydomain.auth0.com` | Your Auth0 domain (must have custom domain) |
| `AUTH0_CLIENT_ID` | `abc123...` | M2M app client ID |
| `AUTH0_CLIENT_SECRET` | `secret123...` | M2M app client secret |

## Adding a New Screen

1. Create your screen in `src/screens/my-new-screen/`
2. Build your project - the screen will appear in `dist/assets/my-new-screen/`
3. Add it to `deploy_config.yml`:
   ```yaml
   "my-new-screen": true
   ```
4. If needed, add a custom mapping in `screen-to-prompt-mapping.js`
5. Push to `main` - the workflow deploys automatically

For complete setup instructions including AWS and Auth0 configuration, see `DEPLOYMENT.md`.
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
