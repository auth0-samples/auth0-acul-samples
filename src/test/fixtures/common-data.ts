/**
 * Common test data that can be reused across all screens
 */
export const CommonTestData = {
  errors: {
    general: { message: "Invalid credentials" },
    fieldSpecific: { message: "Invalid email format", field: "email" },
    captcha: { message: "Invalid CAPTCHA", field: "captcha" },
    network: { message: "Network error occurred" },
  },

  socialConnections: [
    { name: "google-oauth2", strategy: "google" },
    { name: "github", strategy: "github" },
    { name: "facebook", strategy: "facebook" },
    { name: "linkedin", strategy: "linkedin" },
  ],

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
