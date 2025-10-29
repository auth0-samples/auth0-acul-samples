// Represents either a final translation string, or a nested object that can be indexed by strings.
export type TranslationValue = string | TranslationObject;

// Represents any object in your locales file structure.
export type TranslationObject = {
  [key: string]: TranslationValue;
};
/**
 * Function to retrieve a translation and replace placeholders.
 * @param {string} key - The key from the JSON file.
 * @param {object} variables - An object of key/value pairs for substitution.
 * @returns {string} The translated and interpolated string.
 */
export function translate(
  key: string,
  variables: Record<string, string> = {},
  locales: TranslationObject
): string {
  const rawMessage = key.split(".").reduce(
    (acc: TranslationObject | TranslationValue | undefined, part: string) => {
      if (typeof acc === "object" && acc !== null) {
        return acc[part];
      }
      return undefined;
    },
    locales as TranslationValue | undefined
  );

  const message: TranslationValue | undefined = rawMessage;
  let finalMessage: string = message as string;

  for (const [varName, value] of Object.entries(variables)) {
    const stringValue = String(value);
    const placeholder = new RegExp(`{{${varName}}}`, "g");

    finalMessage = finalMessage.replace(placeholder, stringValue);
  }

  return finalMessage;
}
