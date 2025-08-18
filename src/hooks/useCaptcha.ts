import { useCallback, useState } from "react";

import type { ICaptcha } from "@/components/Captcha/index";

export const useCaptcha = (
  captchaConfig?: ICaptcha,
  label?: string,
  validationErrorText?: string,
  theme?: "light" | "dark" | "auto"
) => {
  const isCaptchaEnabled = !!captchaConfig && !!captchaConfig.provider;

  const [isValid, setIsValid] = useState<boolean>(!isCaptchaEnabled);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [internalError, setInternalError] = useState<string | undefined>(
    undefined
  );

  const handleValidationChange = useCallback(
    (valid: boolean, val?: string, err?: string) => {
      setIsValid(valid);
      setValue(val);
      setInternalError(err);
    },
    []
  );

  const validateCaptcha = useCallback(() => {
    if (!isCaptchaEnabled) {
      setInternalError(undefined);
      return true;
    }

    if (!isValid) {
      setInternalError(validationErrorText);
      return false;
    }

    setInternalError(undefined);
    return true;
  }, [isCaptchaEnabled, isValid, validationErrorText]);

  return {
    captchaConfig: isCaptchaEnabled ? captchaConfig : undefined,
    captchaProps: {
      label,
      onValidationChange: handleValidationChange,
      error: internalError,
      theme: theme,
    },
    captchaValue: value,
    validateCaptcha,
    isCaptchaSolved: isValid,
  };
};
