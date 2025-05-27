import { useRef } from "react";

export const useSignupIdForm = () => {
  const emailRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;
  const usernameRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;
  const phoneNumberRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;
  const captchaRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;

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
