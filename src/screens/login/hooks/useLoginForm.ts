import { useRef } from "react";

export const useLoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const getFormValues = () => ({
    username: usernameRef.current?.value ?? "",
    password: passwordRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  return {
    usernameRef,
    passwordRef,
    captchaRef,
    getFormValues,
  };
};
