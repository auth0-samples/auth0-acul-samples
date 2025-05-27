import { useState } from "react";
import LoginPasswordInstance from "@auth0/auth0-acul-js/login-password";
import { executeSafely } from "@/utils/executeSafely";

export const useLoginPasswordManager = () => {
  const [loginPasswordInstance] = useState(() => new LoginPasswordInstance());

  const editIdentifierLink =
    loginPasswordInstance.screen.editIdentifierLink || "";
  const username = loginPasswordInstance.screen.data?.username || "";

  // Extract text data
  const texts = loginPasswordInstance?.screen?.texts || {};
  const pageTitle = texts?.pageTitle || "Login Password";
  const title = texts?.title || "Enter your password";
  const description =
    texts?.description || "Please enter your password to continue.";

  // Extract screen data
  const errors = loginPasswordInstance?.transaction?.errors || [];
  const captcha = loginPasswordInstance?.screen?.captcha;
  const links = loginPasswordInstance?.screen?.links || {};

  const handleLogin = (options: {
    username: string;
    password: string;
    captcha?: string;
  }) => {
    const payload = {
      username: options.username?.trim() || "",
      password: options.password?.trim() || "",
      captcha: options.captcha?.trim() || "",
    };
    executeSafely(
      `Login password with options: ${JSON.stringify(payload)}`,
      () => loginPasswordInstance.login(payload),
    );
  };

  return {
    loginPasswordInstance,
    handleLogin,
    editIdentifierLink,
    username,
    // Provide processed data
    pageTitle,
    title,
    description,
    errors,
    captcha,
    links,
  };
};
