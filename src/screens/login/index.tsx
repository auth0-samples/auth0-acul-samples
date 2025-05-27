import React from "react";

import Card from "@/common/Card";

import { BrandingProvider } from "@/context/BrandingProvider";
import { useLoginManager } from "./hooks/useLoginManager";

import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import AlternativeConnections from "./components/AlternativeConnections";

const LoginScreen: React.FC = () => {
  const { loginInstance, pageTitle } = useLoginManager();

  document.title = pageTitle;

  return (
    <BrandingProvider screenInstance={loginInstance}>
      <div className="min-h-screen flex items-center justify-center px-10 py-20">
        <Card className="w-full max-w-[400px]">
          <Header />
          <LoginForm />
          <Footer />
          <AlternativeConnections />
        </Card>
      </div>
    </BrandingProvider>
  );
};

export default LoginScreen;
