import { CircleX } from "lucide-react";

import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { useResetPasswordErrorManager } from "../hooks/resetPasswordErrorManager";

function Header() {
  const { texts } = useResetPasswordErrorManager();
  const themedLogoWidgetColorValue = extractTokenValue(
    "--ul-theme-color-error"
  );

  return (
    <>
      <CircleX
        color={themedLogoWidgetColorValue}
        size={80}
        strokeWidth={1}
        className="flex flex-wrap justify-widget-logo ml-28"
      />
      <ULThemeTitle>
        {texts?.eventTitleUsed ||
          texts?.eventTitleGeneric ||
          "Please Try Again"}
      </ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.descriptionUsed ||
          texts?.descriptionGeneric ||
          'Something went wrong. Please return to the login page and select "Forgot Your Password" to try again.'}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
