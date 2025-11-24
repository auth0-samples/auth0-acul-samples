import {
  useMfaSmsChallenge,
  useScreen,
} from "@auth0/auth0-acul-react/mfa-sms-challenge";
import type {
  MfaSmsChallengeMembers,
  MfaSmsChallengeOptions,
  ScreenMembersOnMfaSmsChallenge,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

export const useMfaSmsChallengeManager = () => {
  const mfaSmsChallenge: MfaSmsChallengeMembers = useMfaSmsChallenge();
  const screen: ScreenMembersOnMfaSmsChallenge = useScreen();

  const { texts, data, links } = screen;

  const handleContinueMfaSmsChallenge = async (
    code: string,
    rememberDevice: boolean = false
  ): Promise<void> => {
    const options: MfaSmsChallengeOptions = {
      code: code?.trim() || "",
      rememberDevice,
    };

    await executeSafely(
      `Continue MFA SMS Challenge with options: ${JSON.stringify(options)}`,
      () => mfaSmsChallenge.continueMfaSmsChallenge(options)
    );
  };

  const handleResendCode = async (): Promise<void> => {
    await executeSafely("Resend MFA SMS code", () =>
      mfaSmsChallenge.resendCode({})
    );
  };

  const handleGetACall = async (): Promise<void> => {
    await executeSafely("Request MFA call", () => mfaSmsChallenge.getACall({}));
  };

  const handlePickSms = async (): Promise<void> => {
    await executeSafely("Pick SMS method", () => mfaSmsChallenge.pickSms({}));
  };

  const handleTryAnotherMethod = async (): Promise<void> => {
    await executeSafely("Try another MFA method", () =>
      mfaSmsChallenge.tryAnotherMethod({})
    );
  };

  return {
    mfaSmsChallenge,
    handleContinueMfaSmsChallenge,
    handleResendCode,
    handleGetACall,
    handlePickSms,
    handleTryAnotherMethod,
    texts: (texts || {}) as ScreenMembersOnMfaSmsChallenge["texts"],
    data,
    links,
    locales,
  };
};
