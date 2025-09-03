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
    executeSafely(`Signup with options: ${JSON.stringify(payload)}`, () =>
      signupId.signup(payload)
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
