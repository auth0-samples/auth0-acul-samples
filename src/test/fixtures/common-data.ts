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
    {
      name: "google-oauth2",
      strategy: "google",
      options: { iconUrl: null, displayName: "Google" },
    },
    {
      name: "github",
      strategy: "github",
      options: { iconUrl: null, displayName: "Github" },
    },
    {
      name: "facebook",
      strategy: "facebook",
      options: { iconUrl: null, displayName: "Facebook" },
    },
    {
      name: "linkedin",
      strategy: "linkedin",
      options: { iconUrl: null, displayName: "Linkedin" },
    },
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
