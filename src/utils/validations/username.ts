/**
 * Username validation error structure from Auth0 SDK
 */
export interface UsernameValidationError {
  code: string;
  message: string;
}

/**
 * Creates a username validation function for React Hook Form
 * @param isUsernameValid - Whether the username is valid from Auth0 SDK
 * @param userNameErrors - Array of validation errors from Auth0 SDK
 * @returns Function that creates validator for specific required status
 */
export const createUsernameValidator = (
  isUsernameValid: boolean,
  userNameErrors?: UsernameValidationError[]
) => {
  return (isRequired: boolean) => {
    return (value: string | undefined): string | true => {
      if (!isRequired && (!value || value.trim() === "")) {
        return true;
      }

      if (isRequired && (!value || value.trim() === "")) {
        return "This field is required";
      }

      if (value && value.trim() !== "") {
        if (!isUsernameValid && userNameErrors && userNameErrors.length > 0) {
          return userNameErrors[0].message;
        }
      }

      return true;
    };
  };
};
