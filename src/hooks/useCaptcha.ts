import { useState, useCallback } from "react";
import Captcha from "@/common/Captcha";

export const useCaptcha = (
  captcha: any,
  label?: string,
  errorText?: string,
) => {
  const [isValid, setIsValid] = useState(!captcha);
  const [value, setValue] = useState<string | undefined>();
  const [error, setError] = useState("");

  const handleValidationChange = useCallback(
    (valid: boolean, val?: string, err?: string) => {
      setIsValid(valid);
      setValue(val);
      setError(err || "");
    },
    [],
  );

  const validate = useCallback(() => {
    if (!captcha) return true;
    if (!isValid) {
      setError(errorText || "");
      return false;
    }
    setError("");
    return true;
  }, [captcha, isValid, errorText]);

  const clearError = useCallback(() => setError(""), []);

  const CaptchaComponent = captcha
    ? Captcha({
        captcha,
        label,
        onValidationChange: handleValidationChange,
      })
    : null;

  return {
    Captcha: CaptchaComponent,
    isValid,
    value,
    error,
    validate,
    clearError,
  };
};
