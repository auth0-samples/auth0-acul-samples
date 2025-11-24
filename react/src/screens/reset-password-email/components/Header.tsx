import { Mail } from "lucide-react";

import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";
import { translate } from "@/utils/helpers/localeTranslate";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";

function Header() {
  const { texts, data, locales } = useResetPasswordEmailManager();
  const titleText = texts?.title || locales.header.title;
  const descriptionText =
    texts?.description ||
    translate("header.description", { email: data?.username || "" }, locales);
  const themedLogoWidgetColorValue = extractTokenValue(
    "--ul-theme-color-success"
  );

  return (
    <>
      <Mail
        color={themedLogoWidgetColorValue}
        size={80}
        strokeWidth={1}
        className="flex flex-wrap justify-widget-logo ml-28"
      />
      <ULThemeTitle>{titleText}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">{descriptionText}</ULThemeSubtitle>
    </>
  );
}

export default Header;
