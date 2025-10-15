import {
  ScreenMembersOnMfaEnrollResult,
  useMfaEnrollResult,
  useScreen,
} from "@auth0/auth0-acul-react/mfa-enroll-result";

/**
 * Handles successful MFA Enrollment process
 *
 */
export const useMfaEnrollResultManager = () => {
  const { texts, data } = useScreen();

  return {
    MfaEnrollResult: useMfaEnrollResult(),
    texts: (texts || {}) as ScreenMembersOnMfaEnrollResult["texts"],
    data: (data || {}) as ScreenMembersOnMfaEnrollResult["data"],
  };
};
