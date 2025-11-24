import { CircleCheck, CircleX } from "lucide-react";

import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { useMfaEnrollResultManager } from "../hooks/useMfaEnrollResultManager";

const logoWidget = (data: { status: string } | null) => {
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
};

const themedLogoWidgetColorSuccess = extractTokenValue(
  "--ul-theme-color-success"
);
const themedLogoWidgetColorError = extractTokenValue("--ul-theme-color-error");

function Header() {
  const { texts, data, locales } = useMfaEnrollResultManager();

  const getTitle = (
    data: {
      status: string;
    } | null,
    texts: Record<string, string> | null
  ) => {
    switch (data?.status) {
      case "success":
        return texts?.enrolledTitle || locales.header.title.enrolledText;
      case "already-enrolled":
        return (
          texts?.alreadyEnrolledTitle ||
          locales.header.title.alreadyEnrolledText
        );
      case "already-used":
        return texts?.alreadyUsedTitle || locales.header.title.alreadyUsedText;
      case "invalid-ticket":
        return (
          texts?.invalidTicketTitle || locales.header.title.invalidTicketText
        );
      case "expired-ticket":
        return (
          texts?.expiredTicketTitle || locales.header.title.expiredTicketText
        );
      default:
        return texts?.genericError || locales.header.title.genericErrorText;
    }
  };

  const getDescription = (
    data: {
      status: string;
    } | null,
    texts: Record<string, string> | null
  ) => {
    switch (data?.status) {
      case "success":
        return (
          texts?.enrolledDescription || locales.header.description.enrolledText
        );
      case "already-enrolled":
        return (
          texts?.alreadyEnrolledDescription ||
          locales.header.description.alreadyEnrolledText
        );
      case "already-used":
        return (
          texts?.alreadyUsedDescription ||
          locales.header.description.alreadyUsedText
        );
      case "invalid-ticket":
        return (
          texts?.invalidTicketDescription ||
          locales.header.description.invalidTicketText
        );
      case "expired-ticket":
        return (
          texts?.expiredTicketDescription ||
          locales.header.description.expiredTicketText
        );
      default:
        return "";
    }
  };

  return (
    <>
      {logoWidget(data)}
      <ULThemeTitle>{getTitle(data, texts)}</ULThemeTitle>
      <ULThemeSubtitle>{getDescription(data, texts)}</ULThemeSubtitle>
    </>
  );
}

export default Header;
