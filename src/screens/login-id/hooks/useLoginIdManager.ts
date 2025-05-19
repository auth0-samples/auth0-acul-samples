import { useState } from "react";
import LoginIdInstance from "@auth0/auth0-acul-js/login-id";
import { executeSafely } from "@/utils/executeSafely";

export const useLoginIdManager = () => {
  const [loginIdInstance] = useState(() => new LoginIdInstance());

  const handleLoginId = (loginId: string, captcha?: string): void => {
    const options = {
      username: loginId,
      captcha: loginIdInstance.screen?.captcha ? captcha : undefined,
    };
    executeSafely(`LoginId with options: ${JSON.stringify(options)}`, () =>
      loginIdInstance.login(options),
    );
  };

  const handleSocialLogin = (connectionName: string) => {
    executeSafely(`Social login with connection: ${connectionName}`, () =>
      loginIdInstance.socialLogin({ connection: connectionName }),
    );
  };

  const handlePasskeyLogin = () => {
    const hasPasskeyData = !!loginIdInstance.screen?.data?.passkey;
    if (hasPasskeyData) {
      executeSafely(`Passkey login`, () => loginIdInstance.passkeyLogin());
    }
  };

  return {
    loginIdInstance,
    handleLoginId,
    handleSocialLogin,
    handlePasskeyLogin,
  };
};
