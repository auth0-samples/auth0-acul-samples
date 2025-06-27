import React from "react";
import Card from "@/common/Card";
import { useLoginIdManager } from "./hooks/useLoginIdManager";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import IdentifierForm from "./components/IdentifierForm";
import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";

const LoginIdScreen: React.FC = () => {
  const { loginIdInstance, pageTitle } = useLoginIdManager();

  document.title = pageTitle;

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(loginIdInstance);

  // Get social buttons layout from theme
  const socialButtonsLayout =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--social-buttons-layout")
      .trim() || "bottom";

  // Get page layout from theme
  const pageLayout =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--justify-page-layout")
      .trim() || "center";

  return (
    <div
      className={`min-h-screen flex items-center p-5`}
      style={{ justifyContent: pageLayout }}
    >
      <Card className="w-full max-w-sm">
        <Header />
        {socialButtonsLayout === "top" && <AlternativeLogins layout="top" />}
        <IdentifierForm />
        <Footer />
        {socialButtonsLayout === "bottom" && (
          <AlternativeLogins layout="bottom" />
        )}
      </Card>
    </div>
  );
};

export default LoginIdScreen;
