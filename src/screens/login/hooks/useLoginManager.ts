import { useState } from "react";
import LoginInstance from "@auth0/auth0-acul-js/login";
import { executeSafely } from "@/utils/executeSafely";

export const useLoginManager = () => {
  const [loginInstance] = useState(() => new LoginInstance());

  // Extract text data
  const texts = loginInstance?.screen?.texts || {};
  const pageTitle = texts?.pageTitle || "Login";
  const title = texts?.title || "Login";
  const description =
    texts?.description ||
    "Please enter your username or email address to continue with your account.";

  // Extract screen data
  const errors = loginInstance?.transaction?.errors || [];
  const captcha = loginInstance?.screen?.captcha;
  const links = loginInstance?.screen?.links || {};

  const handleLogin = (
    username: string,
    password: string,
    captcha?: string,
  ): void => {
    const options = {
      username: username?.trim() || "",
      password: password?.trim() || "",
      captcha: loginInstance.screen?.captcha ? captcha?.trim() || "" : "",
    };
    executeSafely(`Login with options: ${JSON.stringify(options)}`, () =>
      loginInstance.login(options),
    );
  };

  const handleSocialLogin = (connection: string) => {
    executeSafely(`Social login with connection: ${connection}`, () =>
      loginInstance.socialLogin({ connection }),
    );
  };

  return {
    loginInstance,
    handleLogin,
    handleSocialLogin,
    // Provide processed data
    pageTitle,
    title,
    description,
    errors,
    captcha,
    links,
  };
};
