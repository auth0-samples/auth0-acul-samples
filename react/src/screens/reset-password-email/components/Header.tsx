import { Mail } from "lucide-react";

import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";

function Header() {
  const { texts, data } = useResetPasswordEmailManager();
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
      <ULThemeTitle>{texts?.title || "Check Your Email"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.emailDescription ||
          `Please check the email address ${data?.username} for instructions to reset your password.`}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
