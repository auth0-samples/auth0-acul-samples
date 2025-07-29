import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";
import Header from "./components/Header";
import IdentifierForm from "./components/IdentifierForm";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import ULThemeCard from "@/components/ULThemeCard";
import Separator from "@/common/Separator";

import { useLoginPasswordManager } from "./hooks/useLoginPasswordManager";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";
import { SocialConnection } from "@/utils/helpers/socialUtils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

function LoginPasswordScreen() {
  // Extracting attributes from hook made out of LoginPasswordInstance class of Auth0 JS SDK
  const { loginPasswordInstance, texts } = useLoginPasswordManager();

  // Fetching List of Social Connections
  const socialConnectionsList = loginPasswordInstance?.transaction
    ?.alternateConnections as SocialConnection[] | undefined;

  // Check whether separator component needs to be rendered based on passkey or other social connections
  const showSeparator =
    socialConnectionsList && socialConnectionsList.length > 0;

  // Other Texts
  const separatorText = texts?.separatorText || "OR";
  document.title = texts?.pageTitle || "Login";

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(loginPasswordInstance);

  // Extracting Tenant setting for social login component alignment on the layout via theme token
  const socialLoginAlignment = extractTokenValue(
    "--ul-theme-widget-social-buttons-layout"
  );

  const renderSocialLogins = (alignment: "top" | "bottom") => (
    <>
      {alignment === "bottom" && showSeparator && (
        <Separator text={separatorText} />
      )}
      <AlternativeLogins connections={socialConnectionsList} />
      {alignment === "top" && showSeparator && (
        <Separator text={separatorText} />
      )}
    </>
  );

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        {socialLoginAlignment === "top" && renderSocialLogins("top")}
        <IdentifierForm />
        {socialLoginAlignment === "bottom" && renderSocialLogins("bottom")}
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default LoginPasswordScreen;
