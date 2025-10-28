/**
 * In development mode, logs the intended action.
 */
export const executeSafely = <R>(
  actionDescription: string,
  actionFn: () => R
): R | void => {
  if (process.env.NODE_ENV === "development") {
    alert(`[DEV ONLY] ${actionDescription}`);
  } else {
    return actionFn();
  }
};
