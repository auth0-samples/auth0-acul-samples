import { useRef } from "react";

export const useSignupIdForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const getFormValues = () => ({
    email: emailRef.current?.value ?? "",
    username: usernameRef.current?.value ?? "",
    phone: phoneNumberRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  return {
    emailRef,
    usernameRef,
    phoneNumberRef,
    captchaRef,
    getFormValues,
  };
};
