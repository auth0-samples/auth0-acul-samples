import type {
  FederatedSignupOptions,
  SignupOptions,
} from "@auth0/auth0-acul-js/signup-id";
import { useSignupId } from "@auth0/auth0-acul-react/signup-id";
import { useScreen, useTransaction } from "@auth0/auth0-acul-react/signup-id";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useSignupIdManager = () => {
  const signupId = useSignupId();

  const screen = useScreen();
  const transaction = useTransaction();
  const { alternateConnections } = transaction;

  const { isCaptchaAvailable, texts, loginLink, captchaImage } = screen;

  const handleSignup = async (payload: SignupOptions): Promise<void> => {
    // Clean and prepare data like login-id pattern
    const options: SignupOptions = {};

    if (payload.email?.trim()) {
      options.email = payload.email.trim();
    }
    if (payload.phone?.trim()) {
      options.phone = payload.phone.trim();
    }
    if (payload.username?.trim()) {
      options.username = payload.username.trim();
    }
    if (screen.isCaptchaAvailable && payload.captcha?.trim()) {
      options.captcha = payload.captcha.trim();
    }

    executeSafely(`Signup with options: ${JSON.stringify(options)}`, () =>
      signupId.signup(options)
    );
  };

  const handleFederatedSignup = async (payload: FederatedSignupOptions) => {
    executeSafely(
      `Federated signup with connection: ${payload.connection}`,
      () => signupId.federatedSignup(payload)
    );
  };

  const handlePickCountryCode = async (): Promise<void> => {
    executeSafely(`Pick country code`, () => signupId.pickCountryCode());
  };

  return {
    signupId,
    handleSignup,
    handleFederatedSignup,
    handlePickCountryCode,
    texts,
    isCaptchaAvailable,
    loginLink,
    alternateConnections,
    captchaImage,
    errors: transaction.errors,
  };
};
