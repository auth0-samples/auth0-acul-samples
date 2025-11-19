import { UsernameValidationError } from "@auth0/auth0-acul-react/types";

/**
 * Creates a username validation function for React Hook Form
 * @param isUsernameValid - Whether the username is valid from Auth0 SDK
 * @param userNameErrors - Array of validation errors from Auth0 SDK
 * @param isRequired - Whether the field is required
 * @param requiredMessage - Custom required field message (optional)
 * @returns Validation function for React Hook Form
 */
export const createUsernameValidator = (
  isUsernameValid: boolean,
  userNameErrors?: UsernameValidationError[],
  isRequired?: boolean,
  requiredMessage?: string
) => {
  return (value: string | undefined): string | true => {
    const trimmedValue = value?.trim();

    // Allow empty or whitespace-only values for optional fields
    if (!isRequired && !trimmedValue) {
      return true;
    }

    // Require non-empty value for required fields
    if (isRequired && !trimmedValue) {
      return requiredMessage || "This field is required";
    }

    // Validate non-empty values using SDK validation
    if (trimmedValue) {
      if (!isUsernameValid && userNameErrors && userNameErrors.length > 0) {
        return userNameErrors[0].message;
      }
    }

    return true;
  };
};
