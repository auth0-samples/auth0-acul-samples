import { useRef } from "react";

export const useLoginPasswordForm = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const getFormValues = () => ({
    password: passwordRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  return {
    passwordRef,
    captchaRef,
    getFormValues,
  };
};
