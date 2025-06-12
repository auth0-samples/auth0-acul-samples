// Types for different captcha providers
export type CaptchaProvider =
  | "auth0"
  | "auth0_v2"
  | "recaptcha"
  | "hcaptcha"
  | "arkose"
  | "auth-challenge";

export interface BaseCaptchaConfig {
  provider: CaptchaProvider;
  siteKey?: string;
  theme?: "light" | "dark";
  size?: "normal" | "compact" | "invisible";
}

export interface Auth0CaptchaConfig extends BaseCaptchaConfig {
  provider: "auth0" | "auth0_v2";
  image?: string;
  placeholder?: string;
  siteKey?: string;
}

export interface RecaptchaConfig extends BaseCaptchaConfig {
  provider: "recaptcha";
  siteKey: string;
  version?: "v2" | "v3";
}

export interface HCaptchaConfig extends BaseCaptchaConfig {
  provider: "hcaptcha";
  siteKey: string;
}

export interface ArkoseConfig extends BaseCaptchaConfig {
  provider: "arkose";
  publicKey: string;
  mode?: "inline" | "lightbox";
}

export interface AuthChallengeConfig extends BaseCaptchaConfig {
  provider: "auth-challenge";
  challengeType: "sms" | "email" | "totp";
  endpoint?: string;
}

export type CaptchaConfig =
  | Auth0CaptchaConfig
  | RecaptchaConfig
  | HCaptchaConfig
  | ArkoseConfig
  | AuthChallengeConfig;

export interface CaptchaResponse {
  provider: CaptchaProvider;
  token?: string;
  answer?: string;
  arkoseToken?: string;
  challengeId?: string;
}

export interface CaptchaWidgetProps {
  config: CaptchaConfig;
  onCaptchaResponse: (response: CaptchaResponse | null) => void;
  onError?: (error: string) => void;
  className?: string;
  label?: string;
  error?: string;
}
