/**
 * In development mode, logs the intended action.
 */
export const executeSafely = <R>(
  actionDescription: string,
  actionFn: () => R,
): R | void => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV ONLY] ${actionDescription}`);
  } else {
    return actionFn();
  }
};
