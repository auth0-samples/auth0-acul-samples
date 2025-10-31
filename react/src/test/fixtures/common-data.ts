import type { EnterpriseConnection } from "@auth0/auth0-acul-react/types";

/**
 * Common test data that can be reused across all screens
 */
export const CommonTestData = {
  errors: {
    general: { message: "Invalid credentials" },
    fieldSpecific: { message: "Invalid email format", field: "email" },
    captcha: { message: "Invalid CAPTCHA", field: "captcha" },
    network: { code: "NETWORK_ERROR", message: "Network error occurred" },
  },

  socialConnections: [
    {
      name: "google-oauth2",
      strategy: "google",
      options: { displayName: "Google", showAsButton: true },
    },
    {
      name: "github",
      strategy: "github",
      options: { displayName: "Github", showAsButton: true },
    },
    {
      name: "facebook",
      strategy: "facebook",
      options: { displayName: "Facebook", showAsButton: true },
    },
    {
      name: "linkedin",
      strategy: "linkedin",
      options: { displayName: "Linkedin", showAsButton: true },
    },
  ] as EnterpriseConnection[],

  identifierTypes: {
    emailOnly: ["email"],
    usernameOnly: ["username"],
    phoneOnly: ["phone"],
    emailAndUsername: ["email", "username"],
    all: ["email", "username", "phone"],
  },

  commonTexts: {
    continue: "Continue",
    cancel: "Cancel",
    submit: "Submit",
    login: "Log in",
    signup: "Sign up",
    forgotPassword: "Forgot Password?",
    or: "Or",
  },
};
