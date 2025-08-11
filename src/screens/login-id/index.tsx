import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import { SocialConnection } from "@/utils/helpers/socialUtils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";
import Header from "./components/Header";
import IdentifierForm from "./components/IdentifierForm";
import { useLoginIdManager } from "./hooks/useLoginIdManager";

function LoginIdScreen() {
  // Extracting attributes from hook made out of LoginIdInstance class of Auth0 JS SDK
  const { loginIdInstance, texts, isPasskeyEnabled } = useLoginIdManager();

  // Fetching List of Social Connections
  const socialConnectionsList = loginIdInstance?.transaction
    ?.alternateConnections as SocialConnection[] | undefined;

  // Check whether separator component needs to be rendered based on passkey or other social connections
  const showSeparator =
    isPasskeyEnabled ||
    (socialConnectionsList && socialConnectionsList.length > 0);

  // Other Texts
  const separatorText = texts?.separatorText || "OR";
  document.title = texts?.pageTitle || "Login";

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(loginIdInstance);

  // Extracting Tenant setting for social login component alignment on the layout via theme token
  const socialLoginAlignment = extractTokenValue(
    "--ul-theme-widget-social-buttons-layout"
  );

  const renderSocialLogins = (alignment: "top" | "bottom") => (
    <>
      {alignment === "bottom" && showSeparator && (
        <ULThemeSeparator text={separatorText} />
      )}
      <AlternativeLogins connections={socialConnectionsList} />
      {alignment === "top" && showSeparator && (
        <ULThemeSeparator text={separatorText} />
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
        <Footer />
        {socialLoginAlignment === "bottom" && renderSocialLogins("bottom")}
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default LoginIdScreen;
