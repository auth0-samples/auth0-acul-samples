import { useState } from "react";
import LoginInstance from "@auth0/auth0-acul-js/login";
import { executeSafely } from "@/utils/executeSafely";

export const useLoginManager = () => {
  const [loginInstance] = useState(() => new LoginInstance());

  const handleLogin = (
    username: string,
    password: string,
    captcha?: string,
  ): void => {
    const options = {
      username,
      password,
      captcha: loginInstance.screen?.captcha ? captcha : "",
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
  };
};
