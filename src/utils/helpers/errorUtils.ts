/**
 * Represents a generic SDK error object.
 */
export interface SdkError {
  code?: string;
  message: string;
  field?: string;
  rules?: Array<{ message: string; format?: string[] }>; // Password complexity rules
  [key: string]: unknown; // Allow other properties with unknown type
}

/**
 * Finds and returns the error message for a specific field from a list of SDK errors.
 * @param fieldName The name of the field to find an error for.
 * @param errors An array of SDK error objects.
 * @returns The error message string if found, otherwise undefined.
 */
export const getFieldError = (
  fieldName: string,
  errors: Array<{ field?: string; message: string }>
): string | undefined => {
  if (!Array.isArray(errors)) {
    return undefined;
  }
  const error = errors.find((err) => err.field === fieldName);
  return error?.message;
};
