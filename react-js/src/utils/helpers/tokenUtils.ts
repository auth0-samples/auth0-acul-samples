/**
 *  Extract and return the Token CSS Variable data from the token string
 */
export const extractTokenValue = (varName: string): string => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim()
    .replace(/^"(.*)"$/, "$1"); // Remove quotes
};
