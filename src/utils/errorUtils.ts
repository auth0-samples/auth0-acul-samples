/**
 * Represents a generic SDK error object.
 */
export interface SdkError {
  code?: string;
  message: string;
  field?: string;
  [key: string]: any; // Allow other properties
}

/**
 * Finds and returns the error message for a specific field from a list of SDK errors.
 * @param fieldName The name of the field to find an error for.
 * @param sdkErrors An array of SDK error objects.
 * @returns The error message string if found, otherwise undefined.
 */
export const getFieldError = (
  fieldName: string,
  sdkErrors: SdkError[] = [],
): string | undefined => {
  if (!Array.isArray(sdkErrors)) {
    return undefined;
  }
  const error = sdkErrors.find((err) => err.field === fieldName);
  return error?.message;
};
