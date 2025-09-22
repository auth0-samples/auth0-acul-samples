import type { PasswordRuleValidation } from "@auth0/auth0-acul-react";

import { isPasswordValid } from "@/utils/helpers/passwordValidator";

/**
 * Creates a password validation function for React Hook Form
 * @param validationRules - Password validation rules from Auth0 SDK
 * @param shouldShow - Whether to show validation (e.g., when user has typed something)
 * @returns Validation function for React Hook Form
 */
export const createPasswordValidator = (
  validationRules: PasswordRuleValidation[],
  shouldShow: boolean
) => {
  const isPasswordValidState = isPasswordValid(validationRules);

  return (value: string | undefined): string | true => {
    if (!value) return "Password is required";
    if (shouldShow && !isPasswordValidState) {
      return "Password does not meet requirements";
    }
    return true;
  };
};
