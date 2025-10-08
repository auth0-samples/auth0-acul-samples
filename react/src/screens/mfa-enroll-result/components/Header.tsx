import { CircleCheck, CircleX } from "lucide-react";

import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { useMfaEnrollResultManager } from "../hooks/useMfaEnrollResultManager";

function Header() {
  const { texts, data } = useMfaEnrollResultManager();
  const themedLogoWidgetColorSuccess = extractTokenValue(
    "--ul-theme-color-success"
  );
  const themedLogoWidgetColorError = extractTokenValue(
    "--ul-theme-color-error"
  );

  function getTitle() {
    switch (data?.status) {
      case "success":
        return texts?.enrolledTitle || "You're All Set!";
      case "already-enrolled":
        return texts?.alreadyEnrolledTitle || "Already enrolled";
      case "already-used":
        return texts?.alreadyUsedTitle || "Already used";
      case "invalid-ticket":
        return texts?.invalidTicketTitle || "Invalid Link";
      case "expired-ticket":
        return texts?.expiredTicketTitle || "Expired Link";
      default:
        return texts?.genericError || "Something Went Wrong";
    }
  }

  function getDescription() {
    switch (data?.status) {
      case "success":
        return (
          texts?.enrolledDescription ||
          "You have successfully added a new authentication factor."
        );
      case "already-enrolled":
        return (
          texts?.alreadyEnrolledDescription ||
          "Two-factor Verification has Already Been Enabled."
        );
      case "already-used":
        return (
          texts?.alreadyUsedDescription ||
          "This link has already been used. Please get a new link to enroll with Multi-factor Authentication."
        );
      case "invalid-ticket":
        return (
          texts?.invalidTicketDescription || "This link is invalid or expired."
        );
      case "expired-ticket":
        return texts?.expiredTicketDescription || "This link is expired.";
      default:
        return "";
    }
  }

  function logoWidget() {
    if (data?.status === "success") {
      return (
        <CircleCheck
          data-testid="success-icon"
          color={themedLogoWidgetColorSuccess}
          size={80}
          strokeWidth={1}
          className="flex flex-wrap justify-widget-logo ml-28"
        />
      );
    } else {
      return (
        <CircleX
          data-testid="error-icon"
          color={themedLogoWidgetColorError}
          size={80}
          strokeWidth={1}
          className="flex flex-wrap justify-widget-logo ml-28"
        />
      );
    }
  }

  return (
    <>
      {logoWidget()}
      <ULThemeTitle>{getTitle()}</ULThemeTitle>
      <ULThemeSubtitle>{getDescription()}</ULThemeSubtitle>
    </>
  );
}

export default Header;
