import SimpleCaptchaWidget from "./providers/SimpleCaptchaWidget";
import FriendlyCaptchaWidget from "./providers/FriendlyCaptchaWidget";
import RecaptchaWidget from "./providers/RecaptchaWidget";
import HCaptchaWidget from "./providers/HCaptchaWidget";
import RecaptchaEnterpriseWidget from "./providers/RecaptchaEnterpriseWidget";
import ArkoseWidget from "./providers/ArkoseWidget";
import AuthChallengeWidget from "./providers/AuthChallengeWidget";

export interface CaptchaResponse {
  provider: string;
  token?: string;
  answer?: string;
  arkoseToken?: string;
}

export interface CaptchaWidgetProps {
  config: {
    provider: string;
    siteKey?: string;
    image?: string;
    theme?: string;
    size?: string;
    placeholder?: string;
  };
  onCaptchaResponse: (response: CaptchaResponse | null) => void;
  onError?: (error: string) => void;
  className?: string;
  label?: string;
  error?: string;
}

export interface ICaptcha {
  provider?: string;
  image?: string;
  enabled?: boolean;
  siteKey?: string;
}

interface CaptchaProps {
  captcha?: ICaptcha;
  onValidationChange?: (
    isValid: boolean,
    value?: string,
    error?: string,
  ) => void;
  onError?: (error: string) => void;
  label?: string;
  error?: string;
  className?: string;
}

export default function Captcha({
  captcha,
  onValidationChange,
  onError,
  label,
  error,
  className,
}: CaptchaProps) {
  const { provider, image, siteKey } = captcha || {};

  const handleResponse = (res: CaptchaResponse | null) => {
    if (onValidationChange) {
      if (res) {
        const value =
          res.provider === "auth0" ? res.answer : res.token || res.arkoseToken;
        const isValid = !!value;
        onValidationChange(isValid, value);
      } else {
        onValidationChange(false);
      }
    }
  };

  const handleError = onError || (() => {});

  if (provider === "auth0") {
    return image ? (
      <SimpleCaptchaWidget
        config={{ provider: "auth0", image }}
        onCaptchaResponse={handleResponse}
        label={label}
        error={error}
        className={className}
      />
    ) : null;
  }

  if (provider === "friendly_captcha") {
    return siteKey ? (
      <FriendlyCaptchaWidget
        config={{ provider: "friendly_captcha", siteKey }}
        onCaptchaResponse={handleResponse}
        onError={handleError}
        label={label}
        error={error}
        className={className}
      />
    ) : null;
  }

  if (provider === "recaptcha_v2") {
    return siteKey ? (
      <RecaptchaWidget
        config={{ provider: "recaptcha_v2", siteKey }}
        onCaptchaResponse={handleResponse}
        onError={handleError}
        label={label}
        error={error}
        className={className}
      />
    ) : null;
  }

  if (provider === "hcaptcha") {
    return siteKey ? (
      <HCaptchaWidget
        config={{ provider: "hcaptcha", siteKey }}
        onCaptchaResponse={handleResponse}
        onError={handleError}
        label={label}
        error={error}
        className={className}
      />
    ) : null;
  }

  if (provider === "recaptcha_enterprise") {
    return siteKey ? (
      <RecaptchaEnterpriseWidget
        config={{ provider: "recaptcha_enterprise", siteKey }}
        onCaptchaResponse={handleResponse}
        onError={handleError}
        label={label}
        error={error}
        className={className}
      />
    ) : null;
  }

  if (provider === "arkose") {
    return siteKey ? (
      <ArkoseWidget
        config={{ provider: "arkose", siteKey }}
        onCaptchaResponse={handleResponse}
        onError={handleError}
        label={label}
        error={error}
        className={className}
      />
    ) : null;
  }

  if (provider === "auth0_v2") {
    return siteKey ? (
      <AuthChallengeWidget
        config={{ provider: "auth0_v2", siteKey }}
        onCaptchaResponse={handleResponse}
        onError={handleError}
        label={label}
        error={error}
        className={className}
      />
    ) : null;
  }

  return null;
}
