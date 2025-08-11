/**
 * Maps Auth0 ACUL screen names to their corresponding Universal Login prompt names.
 * Used by GitHub Actions to determine which Auth0 prompt to configure for each screen.
 */

export const screenToPromptMap = {
  // Email & Phone Identifiers
  "email-identifier-challenge": "email-identifier-challenge",
  "phone-identifier-challenge": "phone-identifier-challenge",
  "phone-identifier-enrollment": "phone-identifier-enrollment",

  // Captcha
  "interstitial-captcha": "captcha",

  // Login
  "login-id": "login-id",
  "login-password": "login-password",
  login: "login",
  "login-passwordless-email-code": "login-passwordless",
  "login-passwordless-sms-otp": "login-passwordless",

  // Passkeys
  "passkey-enrollment": "passkeys",
  "passkey-enrollment-local": "passkeys",

  // Signup
  "signup-id": "signup-id",
  "signup-password": "signup-password",
  signup: "signup",

  // Password Reset
  "reset-password": "reset-password",
  "reset-password-email": "reset-password",
  "reset-password-error": "reset-password",
  "reset-password-request": "reset-password",
  "reset-password-success": "reset-password",

  // MFA Base
  "mfa-begin-enroll-options": "mfa",
  "mfa-detect-browser-capabilities": "mfa",
  "mfa-enroll-result": "mfa",
  "mfa-login-options": "mfa",

  // MFA SMS
  "mfa-country-codes": "mfa-sms",
  "mfa-sms-challenge": "mfa-sms",
  "mfa-sms-enrollment": "mfa-sms",
  "mfa-sms-list": "mfa-sms",

  // MFA Email
  "mfa-email-challenge": "mfa-email",
  "mfa-email-list": "mfa-email",

  // MFA Push
  "mfa-push-challenge-push": "mfa-push",
  "mfa-push-enrollment-qr": "mfa-push",
  "mfa-push-list": "mfa-push",
  "mfa-push-welcome": "mfa-push",

  // MFA OTP
  "mfa-otp-challenge": "mfa-otp",
  "mfa-otp-enrollment-code": "mfa-otp",
  "mfa-otp-enrollment-qr": "mfa-otp",

  // MFA Phone & Voice
  "mfa-phone-challenge": "mfa-phone",
  "mfa-phone-enrollment": "mfa-phone",
  "mfa-voice-challenge": "mfa-voice",
  "mfa-voice-enrollment": "mfa-voice",

  // MFA Recovery Code
  "mfa-recovery-code-challenge": "mfa-recovery-code",
  "mfa-recovery-code-enrollment": "mfa-recovery-code",
  "mfa-recovery-code-challenge-new-code": "mfa-recovery-code",

  // MFA WebAuthn
  "mfa-webauthn-change-key-nickname": "mfa-webauthn",
  "mfa-webauthn-enrollment-success": "mfa-webauthn",
  "mfa-webauthn-error": "mfa-webauthn",
  "mfa-webauthn-not-available-error": "mfa-webauthn",
  "mfa-webauthn-platform-challenge": "mfa-webauthn",
  "mfa-webauthn-platform-enrollment": "mfa-webauthn",
  "mfa-webauthn-roaming-challenge": "mfa-webauthn",
  "mfa-webauthn-roaming-enrollment": "mfa-webauthn",

  // Reset Password with MFA
  "reset-password-mfa-email-challenge": "reset-password",
  "reset-password-mfa-otp-challenge": "reset-password",
  "reset-password-mfa-push-challenge-push": "reset-password",
  "reset-password-mfa-sms-challenge": "reset-password",
  "reset-password-mfa-phone-challenge": "reset-password",
  "reset-password-mfa-voice-challenge": "reset-password",
  "reset-password-mfa-recovery-code-challenge": "reset-password",
  "reset-password-mfa-webauthn-platform-challenge": "reset-password",
  "reset-password-mfa-webauthn-roaming-challenge": "reset-password",

  // Organizations
  "organization-picker": "organizations",
  "organization-selection": "organizations",

  // Device Flow
  "device-code-activation": "device-flow",
  "device-code-activation-allowed": "device-flow",
  "device-code-activation-denied": "device-flow",
  "device-code-confirmation": "device-flow",

  // Invitations & Consent
  "accept-invitation": "invitation",
  consent: "consent",
  "customized-consent": "customized-consent",

  // Email Verification
  "email-otp-challenge": "email-otp-challenge",
  "email-verification-result": "email-verification",
  "login-email-verification": "login-email-verification",

  // Logout
  logout: "logout",
  "logout-aborted": "logout",
  "logout-complete": "logout",

  // Brute Force Protection
  "brute-force-protection-unblock": "brute-force-protection",
  "brute-force-protection-unblock-failure": "brute-force-protection",
  "brute-force-protection-unblock-success": "brute-force-protection",

  // Common
  "redeem-ticket": "common",
};

export default screenToPromptMap;
