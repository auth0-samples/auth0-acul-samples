import ULThemeLink from "@/components/ULThemeLink";

import { useSignupPasswordManager } from "../hooks/useSignupPasswordManager";

function Footer() {
  const { editLink, texts } = useSignupPasswordManager();

  if (!editLink) {
    return null;
  }

  // Handle text fallbacks in component
  const backButtonText = texts?.backButtonText || "Go back";

  return (
    <div className="mt-4 text-center">
      {editLink && <ULThemeLink href={editLink}>{backButtonText}</ULThemeLink>}
    </div>
  );
}

export default Footer;
