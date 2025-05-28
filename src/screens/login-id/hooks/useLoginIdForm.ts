import { useRef } from "react";

export const useLoginIdForm = () => {
  const identifierRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const getFormValues = () => ({
    identifier: identifierRef.current?.value ?? "",
    captcha: captchaRef.current?.value ?? "",
  });

  return {
    identifierRef,
    captchaRef,
    getFormValues,
  };
};
