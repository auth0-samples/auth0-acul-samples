/**
 * In DEVELOPMENT: Loads mock data for the current screen (from `VITE_SCREEN_NAME`)
 * and sets `window.universal_login_context`.
 * In PRODUCTION: This function is a no-op to prevent interference with Auth0's context.
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
      "DEV_ERROR: VITE_SCREEN_NAME not set. Use 'npm run screen <screen-name>'. Defaulting to empty context for dev.",
    );
    window.universal_login_context = {};
    return;
  }

  try {
    console.log(`[DEV] Loading mock data for screen: ${screenName}...`);
    const mockDataModule = await import(`../../mock-data/${screenName}.json`);
    console.log(`[DEV] Successfully loaded mock data for: ${screenName}`);
    window.universal_login_context = mockDataModule.default;
  } catch (error) {
    console.error(
      `DEV_ERROR: Failed to load mock data for '${screenName}.json'. ` +
        `Ensure file exists. Dev script should have caught this. Error:`,
      error,
    );
    window.universal_login_context = {}; // Fallback to empty context for dev
  }
}
