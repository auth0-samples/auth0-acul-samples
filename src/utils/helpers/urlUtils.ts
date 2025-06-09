/**
 * Takes a URL (absolute or relative) and rebases it to the current window's origin,
 */
export const rebaseLinkToCurrentOrigin = (
  originalLink: string | undefined | null,
): string | undefined | null => {
  if (typeof window === "undefined" || !originalLink) {
    return originalLink;
  }

  const targetOrigin = window.location.origin;

  try {
    const tempBase = originalLink.startsWith("/")
      ? targetOrigin
      : "http://dummybase.com";
    const url = new URL(originalLink, tempBase);
    let path = url.pathname;
    if (path && !path.startsWith("/")) {
      path = "/" + path;
    }

    return targetOrigin + path + url.search;
  } catch (error) {
    console.error("Failed to rebase URL:", error);
    return originalLink;
  }
};
