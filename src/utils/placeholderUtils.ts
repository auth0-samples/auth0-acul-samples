/**
 * Get the appropriate placeholder text based on allowed identifiers.
 * @param allowedIdentifiers Array of allowed identifier types (e.g., ["email"], ["username", "email"])
 * @param texts Text configuration object from screen instance (e.g., loginInstance.screen.texts)
 * @param appendAsterisk Whether to append an asterisk (*) to the placeholder (defaults to true)
 * @returns Appropriate placeholder text string.
 */
export const getDynamicPlaceholder = (
  allowedIdentifiers: string[] = [],
  texts: Record<string, string> = {},
  appendAsterisk: boolean = true,
): string => {
  // Ensure texts is an object, even if undefined from SDK
  const safeTexts = texts || {};

  let placeholderKey = "default";
  const sortedIdentifiers = [...new Set(allowedIdentifiers)].sort().join(","); // Deduplicate and sort for a consistent key

  if (allowedIdentifiers.length === 0) {
    // Fallback if no identifiers specified, though usually there will be.
    placeholderKey = "default";
  } else if (sortedIdentifiers === "email,phone,username") {
    placeholderKey = safeTexts.phoneOrUsernameOrEmailPlaceholder
      ? "phoneOrUsernameOrEmailPlaceholder"
      : "default";
  } else if (sortedIdentifiers === "email,phone") {
    placeholderKey = safeTexts.phoneOrEmailPlaceholder
      ? "phoneOrEmailPlaceholder"
      : "default";
  } else if (sortedIdentifiers === "phone,username") {
    placeholderKey = safeTexts.phoneOrUsernamePlaceholder
      ? "phoneOrUsernamePlaceholder"
      : "default";
  } else if (sortedIdentifiers === "email,username") {
    placeholderKey = safeTexts.usernameOrEmailPlaceholder
      ? "usernameOrEmailPlaceholder"
      : "default";
  } else if (sortedIdentifiers === "email") {
    placeholderKey = safeTexts.emailPlaceholder
      ? "emailPlaceholder"
      : "default";
  } else if (sortedIdentifiers === "phone") {
    placeholderKey = safeTexts.phonePlaceholder
      ? "phonePlaceholder"
      : "default";
  } else if (sortedIdentifiers === "username") {
    placeholderKey = safeTexts.usernameOnlyPlaceholder
      ? "usernameOnlyPlaceholder"
      : "default";
  }

  let placeholderText =
    safeTexts[placeholderKey] ||
    safeTexts.phoneOrUsernameOrEmailPlaceholder ||
    "Phone or Username or Email"; // Ultimate fallback

  if (
    placeholderKey === "default" &&
    safeTexts.phoneOrUsernameOrEmailPlaceholder
  ) {
    placeholderText = safeTexts.phoneOrUsernameOrEmailPlaceholder;
  } else if (placeholderKey === "default") {
    placeholderText = "Login ID"; // A more generic default if no specific placeholders are found
  }

  return appendAsterisk ? `${placeholderText}*` : placeholderText;
};
