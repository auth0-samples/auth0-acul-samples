/**
 * In a development environment, this utility dynamically loads a mock JSON file
 * based on the `VITE_SCREEN_NAME` environment variable and sets it to the
 * global `universal_login_context` object. This allows for rapid UI
 * development and testing of screen-specific components.
 *
 * Assumes `scripts/dev-screen.js` (in dev mode) has validated `VITE_SCREEN_NAME`
 * and the existence of the corresponding mock JSON file.
 */
export async function loadAndSetMockContext(): Promise<void> {
  if (!import.meta.env.DEV) {
    return;
  }

  const screenName = import.meta.env.VITE_SCREEN_NAME;

  if (!screenName) {
    console.error(
      "DEV_ERROR: VITE_SCREEN_NAME not set. Use 'npm run screen <screen-name>'. Defaulting to empty context for dev."
    );
    // @ts-expect-error - It's safe to assign an empty object here because the
    // themeEngine, the primary consumer, is now robust enough to handle it.
    window.universal_login_context = {};
    return;
  }

  try {
    console.log(`[DEV] Loading mock data for screen: ${screenName}...`);
    // Dynamically import the mock data file for the specified screen
    const mockDataModule = await import(`../../mock-data/${screenName}.json`);
    console.log(`[DEV] Successfully loaded mock data for: ${screenName}`);
    window.universal_login_context = mockDataModule.default;
  } catch (error) {
    console.error(
      `DEV_ERROR: Failed to load mock data for '${screenName}.json'. ` +
        `Ensure file exists. Dev script should have caught this. Error:`,
      error
    );
    // @ts-expect-error - It's safe to assign an empty object here because the
    // themeEngine, the primary consumer, is now robust enough to handle it.
    window.universal_login_context = {};
  }
}
