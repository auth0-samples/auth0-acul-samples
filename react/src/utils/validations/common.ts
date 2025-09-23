/**
 * Determines whether validation should be shown based on field value
 * @param value - Current field value
 * @returns Boolean indicating if validation should be shown
 */
export const shouldShowValidation = (value: string | undefined): boolean => {
  return Boolean(value && value.length > 0);
};
