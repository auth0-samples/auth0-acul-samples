/**
 * Takes a URL (absolute or relative) and rebases it to the current window's origin,
 * preserving the path and query parameters.
 */
export const rebaseLinkToCurrentOrigin = (
  originalLink: string | undefined | null
): string | undefined | null => {
  if (typeof window === "undefined" || !originalLink) {
    return originalLink;
  }

  const targetOrigin = window.location.origin;

  try {
    // Handle absolute URLs
    if (
      originalLink.startsWith("http://") ||
      originalLink.startsWith("https://")
    ) {
      const url = new URL(originalLink);
      return targetOrigin + url.pathname + url.search + url.hash;
    }

    // Handle root-relative URLs (starting with /)
    if (originalLink.startsWith("/")) {
      const url = new URL(originalLink, targetOrigin);
      return targetOrigin + url.pathname + url.search + url.hash;
    }

    // Handle relative URLs (no leading slash)
    // Treat as relative to current path
    const url = new URL(originalLink, window.location.href);
    return targetOrigin + url.pathname + url.search + url.hash;
  } catch (error) {
    console.error("Failed to rebase URL:", error, { originalLink });
    return originalLink;
  }
};
