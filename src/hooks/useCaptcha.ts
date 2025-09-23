import { useCallback, useState } from "react";

import type { ICaptcha } from "@/components/Captcha/index";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

export const useCaptcha = (captchaConfig?: ICaptcha, label?: string) => {
  const isCaptchaEnabled = !!captchaConfig && !!captchaConfig.provider;

  const [isValid, setIsValid] = useState<boolean>(!isCaptchaEnabled);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [internalError, setInternalError] = useState<string | undefined>(
    undefined
  );

  const getCaptchaTheme = (): "light" | "dark" | "auto" => {
    const allowedThemes = ["light", "dark", "auto"] as const;
    const rawTheme = extractTokenValue("--ul-theme-captcha-widget");

    const isValidTheme = (theme: unknown): theme is "light" | "dark" | "auto" =>
      allowedThemes.includes(theme as "light" | "dark" | "auto");

    return isValidTheme(rawTheme) ? rawTheme : "auto";
  };

  const handleValidationChange = useCallback(
    (valid: boolean, val?: string, err?: string) => {
      setIsValid(valid);
      setValue(val);
      setInternalError(err);
    },
    []
  );

  return {
    captchaConfig: isCaptchaEnabled ? captchaConfig : undefined,
    captchaProps: {
      label,
      onValidationChange: handleValidationChange,
      error: internalError,
      theme: getCaptchaTheme(),
    },
    captchaValue: value,
    isCaptchaSolved: isValid,
  };
};
