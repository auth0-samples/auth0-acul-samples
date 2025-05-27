import { useState } from "react";
import SignupIdInstance from "@auth0/auth0-acul-js/signup-id";
import { executeSafely } from "@/utils/executeSafely";

export const useSignupIdManager = () => {
  const [signupIdInstance] = useState(() => new SignupIdInstance());

  const loginLink = signupIdInstance.screen.loginLink || "";
  const requiredIdentifiers = signupIdInstance.transaction.requiredIdentifiers;
  const optionalIdentifiers = signupIdInstance.transaction.optionalIdentifiers;

  // Extract text data
  const texts = signupIdInstance?.screen?.texts || {};
  const pageTitle = texts?.pageTitle || "Signup";
  const title = texts?.title || "Create an account";
  const description =
    texts?.description || "Please enter your details to continue.";

  // Extract screen data
  const errors = signupIdInstance?.transaction?.errors || [];
  const captcha = signupIdInstance?.screen?.captcha;
  const links = signupIdInstance?.screen?.links || {};

  const handleSignup = (options: Record<string, string>) => {
    // Trim and filter out empty values
    const payload: Record<string, string> = {};
    Object.entries(options).forEach(([key, value]) => {
      const trimmedValue = value?.trim();
      if (trimmedValue) {
        payload[key] = trimmedValue;
      }
    });

    executeSafely(`Signup id with options: ${JSON.stringify(payload)}`, () =>
      signupIdInstance.signup(payload),
    );
  };

  const handleSocialSignup = (options: { provider: string }) => {
    const payload = {
      connection: options.provider,
    };
    executeSafely(
      `Social signup with options: ${JSON.stringify(payload)}`,
      () => signupIdInstance.socialSignup(payload),
    );
  };

  return {
    signupIdInstance,
    handleSignup,
    handleSocialSignup,
    loginLink,
    requiredIdentifiers,
    optionalIdentifiers,
    // Provide processed data
    pageTitle,
    title,
    description,
    errors,
    captcha,
    links,
  };
};
