import { useRef } from "react";

export const useLoginPasswordForm = () => {
  const passwordRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;

  const getFormValues = () => ({
    password: passwordRef.current?.value ?? "",
  });

  return {
    passwordRef,
    getFormValues,
  };
};
