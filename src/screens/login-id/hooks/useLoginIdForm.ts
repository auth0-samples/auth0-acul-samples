import { useRef } from "react";

export const useLoginIdForm = () => {
  const identifierRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;
  const captchaRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;

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
