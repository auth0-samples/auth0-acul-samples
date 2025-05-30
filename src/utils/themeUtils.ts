// Helper function to get value with fallbacks
export const getThemeValue = (
  instance: any,
  paths: string[],
  defaultValue: any,
): any => {
  if (!instance) {
    return defaultValue;
  }
  for (const path of paths) {
    // Safely access nested properties
    const value = path.split(".").reduce((acc, part) => {
      // Check if acc is an object and has the property before accessing
      if (acc && typeof acc === "object" && part in acc) {
        return (acc as any)[part];
      }
      return undefined; // Path is invalid or property doesn't exist
    }, instance);

    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return defaultValue;
};
