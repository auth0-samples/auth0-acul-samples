import React from "react";
import Card from "@/common/Card";
import { BrandingProvider } from "@/context/BrandingProvider";
import { useLoginIdManager } from "./hooks/useLoginIdManager";

import Header from "./components/Header";
import IdentifierForm from "./components/IdentifierForm";
import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";

const LoginIdScreen: React.FC = () => {
  const { loginIdInstance, pageTitle } = useLoginIdManager();

  document.title = pageTitle;

  return (
    <BrandingProvider screenInstance={loginIdInstance}>
      <div className="min-h-screen flex items-center justify-center px-10 py-20">
        <Card className="w-full max-w-[400px]">
          <Header />
          <IdentifierForm />
          <Footer />
          <AlternativeLogins />
        </Card>
      </div>
    </BrandingProvider>
  );
};

export default LoginIdScreen;
