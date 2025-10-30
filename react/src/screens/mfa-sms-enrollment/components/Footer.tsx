import { ULThemeButton } from "@/components/ULThemeButton";

import { useMfaSmsEnrollmentManager } from "../hooks/useMfaSmsEnrollmentManager";

function Footer() {
  const { texts, locales, handleTryAnotherMethod } =
    useMfaSmsEnrollmentManager();

  // Use locales as fallback to SDK texts
  const tryAnotherMethodText =
    texts?.pickAuthenticatorText || locales?.footer?.tryAnotherMethodText;

  const handleTryAnotherMethodClick = async () => {
    await handleTryAnotherMethod();
  };

  return (
    <div className="text-center space-y-2 mt-4">
      {/* Try another method link */}
      <ULThemeButton
        onClick={handleTryAnotherMethodClick}
        variant="link"
        size="link"
      >
        {tryAnotherMethodText}
      </ULThemeButton>
    </div>
  );
}

export default Footer;
