import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignupForm from "./components/SignupForm";
import { useSignupManager } from "./hooks/useSignupManager";

function SignupScreen() {
  // Extracting attributes from hook made out of SignupInstance class of Auth0 React ACUL SDK
  const { signup, texts, alternateConnections } = useSignupManager();

  // Check whether separator component needs to be rendered based on social connections
  const showSeparator = alternateConnections && alternateConnections.length > 0;

  // Other Texts
  const separatorText = texts?.separatorText || "OR";
  document.title = texts?.pageTitle || "Signup";

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(signup);

  // Extracting Tenant setting for social login component alignment on the layout via theme token
  const socialLoginAlignment = extractTokenValue(
    "--ul-theme-widget-social-buttons-layout"
  );

  const renderSocialLogins = (alignment: "top" | "bottom") => (
    <>
      {alignment === "bottom" && showSeparator && (
        <ULThemeSeparator text={separatorText} />
      )}
      <AlternativeLogins />
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
        <SignupForm />
        <Footer />
        {socialLoginAlignment === "bottom" && renderSocialLogins("bottom")}
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default SignupScreen;
