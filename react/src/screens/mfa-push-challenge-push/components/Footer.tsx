import { ULThemeButton } from "@/components/ULThemeButton";

import { useMfaPushChallengeManager } from "../hooks/useMfaPushChallengeManager";

function Footer() {
  const { texts, handleEnterCodeManually, handleTryAnotherMethod } =
    useMfaPushChallengeManager();

  const enterOtpCodeText = texts?.enterOtpCode || "Manually Enter Code";
  const tryAnotherMethodText =
    texts?.pickAuthenticatorText || "Try another method";

  return (
    <div className="text-center space-y-2 mt-4">
      {/* Enter manual code button */}
      <ULThemeButton
        onClick={() => handleEnterCodeManually()}
        variant="outline"
      >
        {enterOtpCodeText}
      </ULThemeButton>

      {/* Try another method link */}
      <ULThemeButton
        onClick={() => handleTryAnotherMethod()}
        variant="link"
        size="link"
      >
        {tryAnotherMethodText}
      </ULThemeButton>
    </div>
  );
}

export default Footer;
