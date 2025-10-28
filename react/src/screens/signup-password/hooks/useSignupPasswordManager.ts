import {
  useScreen,
  useSignupPassword,
} from "@auth0/auth0-acul-react/signup-password";
import type {
  ScreenMembersOnSignupPassword,
  SignupPasswordOptions,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

export const useSignupPasswordManager = () => {
  const signupPassword = useSignupPassword();

  const screen: ScreenMembersOnSignupPassword = useScreen();

  const { isCaptchaAvailable, texts, editLink, captcha } = screen;

  const handleSignupPassword = async (
    payload: SignupPasswordOptions
  ): Promise<void> => {
    const options: SignupPasswordOptions = {
      password: payload.password,
    };

    if (payload.email?.trim()) {
      options.email = payload.email.trim();
    }
    if (payload.phoneNumber) {
      options.phoneNumber = payload.phoneNumber;
    }
    if (payload.username?.trim()) {
      options.username = payload.username.trim();
    }
    if (screen.isCaptchaAvailable && payload.captcha?.trim()) {
      options.captcha = payload.captcha.trim();
    }
    // Password redacted from logs
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
    captcha,
    locales,
  };
};
