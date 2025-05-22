import React from "react";
import Card from "@/common/Card";
import { BrandingProvider } from "@/context/BrandingProvider";
import { useLoginPasswordManager } from "./hooks/useLoginPasswordManager";

import Header from "./components/Header";
import LoginPasswordForm from "./components/LoginPasswordForm";
import Footer from "./components/Footer";

const LoginPasswordScreen: React.FC = () => {
  const { loginPasswordInstance } = useLoginPasswordManager();

  const texts = loginPasswordInstance?.screen?.texts || {};
  document.title = texts?.pageTitle || "Login Password";

  return (
    <BrandingProvider screenInstance={loginPasswordInstance}>
      <div className="min-h-screen flex items-center justify-center px-10 py-20">
        <Card className="w-full max-w-[400px]">
          <Header />
          <LoginPasswordForm />
          <Footer />
        </Card>
      </div>
    </BrandingProvider>
  );
};

export default LoginPasswordScreen;
