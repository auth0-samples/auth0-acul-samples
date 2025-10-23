import { isPasswordValid } from "@/utils/helpers/passwordValidator";

/**
 * Creates a password validation function for React Hook Form
 * @param validationRules - Password validation result from Auth0 SDK
 * @param shouldShow - Whether to show validation (e.g., when user has typed something)
 * @returns Validation function for React Hook Form
 */
export const createPasswordValidator = (
  validationRules: any,
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
