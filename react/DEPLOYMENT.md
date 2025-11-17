# Deploying ACUL Screens via GitHub Actions to AWS S3

This guide walks you through setting up automated deployment for your Auth0 Universal Login screens using GitHub Actions.

> **Want to understand the workflow?** See [.github/GITHUB_ACTIONS.md](.github/GITHUB_ACTIONS.md) for details on how the deployment pipeline works.

## What You'll Need

- Auth0 tenant with admin access
- AWS account (for hosting assets)
- GitHub repository with your login screen code

## Setup Overview

The deployment system automatically builds your screens, uploads them to AWS S3, and configures Auth0 to use them. Here's what you need to set up:

1. Auth0 configuration (custom domain + API access)
2. AWS infrastructure (S3 bucket + IAM role)
3. GitHub secrets (to connect everything)

---

## 1. Auth0 Setup

### Set Up a Custom Domain

Custom login screens require a custom domain.

1. Go to **Auth0 Dashboard → Branding → Custom Domains**
2. Click **Add Domain**
3. Follow the verification steps
4. Make sure the domain shows as "Verified" before continuing

### Create API Access

The workflow needs API access to configure your screens automatically.

1. Go to **Applications → Applications**
2. Click **Create Application**
3. Choose **Machine to Machine Applications**
4. Name it "GitHub Actions Deployment" (or whatever makes sense to you)
5. Select **Auth0 Management API**
6. Grant these permissions:
   - `read:branding`
   - `update:branding`
   - `read:prompts`
   - `update:prompts`
   - `read:custom_domains`
7. Save the **Domain**, **Client ID**, and **Client Secret** - you'll need these for GitHub

---

## 2. AWS Setup

### Create an S3 Bucket

This is where your built screens will be stored.

1. Go to **AWS Console → S3**
2. Click **Create bucket**
3. Pick a unique name (e.g., `my-company-login-screens`)
4. Choose your region
5. Enable versioning (recommended)
6. Leave the rest as default for now

### Choose Your Access Strategy

You have two options for serving files from S3:

**Option A: Public S3 Bucket (Simpler)**

Make the bucket publicly readable:

1. In your bucket, go to **Permissions → Bucket Policy**
2. Add this policy (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

**Option B: CloudFront + Private S3 (Recommended)**

Keep the bucket private and use CloudFront as a gateway. This approach requires a combined bucket policy that allows both CloudFront to read files and GitHub Actions to upload them.

1. Go to **CloudFront → Create Distribution**
2. Select your S3 bucket as the origin
3. Choose **Origin access control** (recommended)
4. Under **Viewer Protocol**, select "Redirect HTTP to HTTPS"
5. Set **Cache Policy** to "CachingOptimized"
6. Create the distribution
7. Copy the CloudFront domain (e.g., `d1234abcdef.cloudfront.net`)

After creating your CloudFront distribution and IAM role for GitHub Actions, update your S3 bucket policy to allow both services:

1. Go to your S3 bucket → **Permissions → Bucket Policy**
2. Add this combined policy (replace with your actual values):

```json
{
  "Version": "2008-10-17",
  "Id": "PolicyForCloudFrontPrivateContent",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR-ACCOUNT-ID:distribution/YOUR-DISTRIBUTION-ID"
        }
      }
    },
    {
      "Sid": "AllowGitHubActionsRoleToModify",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR-ACCOUNT-ID:role/YOUR-GITHUB-ACTIONS-ROLE"
      },
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET-NAME",
        "arn:aws:s3:::YOUR-BUCKET-NAME/*"
      ]
    }
  ]
}
```

**What this policy does:**
- First statement: Lets CloudFront read files to serve them publicly
- Second statement: Lets GitHub Actions upload/delete files during deployment

CloudFront gives you HTTPS, better performance, and keeps your S3 bucket private. Use this if security matters.

### Create IAM Role for GitHub

GitHub Actions needs permission to upload files to your bucket.

1. Go to **IAM → Roles → Create role**
2. Select **Web identity**
3. Choose `token.actions.githubusercontent.com` as the identity provider
4. Set audience to `sts.amazonaws.com`
5. For organization/repo, enter your GitHub org name and repo

**Trust Policy** (allows GitHub Actions to assume this role):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR-ACCOUNT-ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR-ORG/YOUR-REPO:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

**Permissions Policy** (what the role can do with S3):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME"
    }
  ]
}
```

6. Name the role (e.g., "GitHubActions-LoginScreens")
8. Copy the role ARN - you'll need it for GitHub

---

## 3. GitHub Configuration

### Add Repository Secrets

Go to **Settings → Secrets and variables → Actions** in your GitHub repo and add these secrets:

| Secret | Value | Notes |
|--------|-------|-------|
| `AWS_S3_ARN` | `arn:aws:iam::123456789012:role/...` | The IAM role ARN from AWS |
| `S3_BUCKET_NAME` | `my-company-login-screens` | Your S3 bucket name |
| `AWS_REGION` | `us-east-1` | Where your bucket lives |
| `S3_CDN_URL` | `https://d1234abcdef.cloudfront.net` | CloudFront domain OR S3 public URL (no trailing slash) |
| `AUTH0_DOMAIN` | `dev-mycompany.auth0.com` | Your Auth0 domain |
| `AUTH0_CLIENT_ID` | `abc123...` | M2M app client ID |
| `AUTH0_CLIENT_SECRET` | `xyz789...` | M2M app secret |

### That's It

The workflow file is already in `.github/workflows/acul-deploy.yml`. It will run automatically when you push to `main`.

---

## Using the Deployment

### Automatic Deployment

Just push to the `main` branch. The workflow will:
1. Build your screens
2. Upload them to S3
3. Configure Auth0 to use them

Watch the progress in the **Actions** tab.

### Manual Deployment

1. Go to **Actions** tab
2. Select the deployment workflow
3. Click **Run workflow**
4. Choose your branch and run it

### Controlling What Gets Deployed

Edit `.github/config/deploy_config.yml`:

```yaml
default_screen_deployment_status:
  "login-id": true        # This will deploy
  "login-password": false # This won't deploy
```

Set everything to `false` and the workflow will skip building entirely.

---

## Troubleshooting

**Auth0 errors?**
- Double-check your `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, and `AUTH0_CLIENT_SECRET`
- Make sure the M2M app has all the required permissions
- Verify your custom domain is active

**S3 upload fails?**
- Check the `AWS_S3_ARN` is correct
- Verify the IAM role trusts `token.actions.githubusercontent.com`
- Make sure the role has S3 write permissions

**Screens don't load in Auth0?**
- Check browser console for 404 errors
- Verify `S3_CDN_URL` is correct
- If using CloudFront, make sure it can access your S3 bucket
- Confirm your custom domain is set up in Auth0

**Assets not loading?**
- Check if your S3 bucket policy allows public access (if not using CloudFront)
- If using CloudFront, verify the distribution is deployed (not just "In Progress")
- Look at the deployment logs to see what URLs were configured

---

## How Assets Work

Each file gets a unique hash in its filename based on its content:
- `login-id.abc123.js` instead of just `login-id.js`
- When you change the file, the hash changes
- Old versions stay cached, new versions get fresh URLs
- No need to manually clear CDN caches

This means fast loading for users and no stale content issues.
