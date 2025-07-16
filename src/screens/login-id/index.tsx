import React from "react";
import Card from "@/common/Card";
import { useLoginIdManager } from "./hooks/useLoginIdManager";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import IdentifierForm from "./components/IdentifierForm";
import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";
import ULThemePageLayout from "@/components/ULThemePageLayout";

const LoginIdScreen: React.FC = () => {
  const { loginIdInstance, texts } = useLoginIdManager();

  document.title = texts?.pageTitle || "Login";

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(loginIdInstance);

  return (
    //Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <Card className="w-full max-w-[400px]">
        <Header />
        <IdentifierForm />
        <Footer />
        <AlternativeLogins />
      </Card>
    </ULThemePageLayout>
  );
};

export default LoginIdScreen;
