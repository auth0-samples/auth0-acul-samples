import {
  useScreen,
  useSignupPassword,
  useTransaction,
} from "@auth0/auth0-acul-react/signup-password";
import type { SignupPasswordOptions } from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useSignupPasswordManager = () => {
  const signupPassword = useSignupPassword();

  const screen = useScreen();
  const transaction = useTransaction();

  const { isCaptchaAvailable, texts, editLink, captchaImage } = screen;

  const handleSignupPassword = async (
    payload: SignupPasswordOptions
  ): Promise<void> => {
    const options: SignupPasswordOptions = {
      password: payload.password,
    };

    if (payload.email?.trim()) {
      options.email = payload.email.trim();
    }
    if (payload.phone) {
      options.phone = payload.phone;
    }
    if (payload.username?.trim()) {
      options.username = payload.username.trim();
    }
    if (screen.isCaptchaAvailable && payload.captcha?.trim()) {
      options.captcha = payload.captcha.trim();
    }
    // ✅ Password redacted from logs
    const logOptions = {
      ...options,
      password: "[REDACTED]",
    };

    executeSafely(
      `Signup password with options: ${JSON.stringify(logOptions)}`,
      () => signupPassword.signup(options)
    );
  };

  return {
    signupPassword,
    handleSignupPassword,
    texts,
    isCaptchaAvailable,
    editLink,
    captchaImage,
    errors: transaction.errors,
  };
};
