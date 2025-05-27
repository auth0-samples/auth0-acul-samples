import React from "react";

import Card from "@/common/Card";

import { BrandingProvider } from "@/context/BrandingProvider";

import { useSignupIdManager } from "./hooks/useSignupIdManager";
import Header from "./components/Header";
import SignupForm from "./components/SignupForm";
import AlternativeConnections from "./components/AlternativeConnections";
import Footer from "./components/Footer";

const SignupIdScreen: React.FC = () => {
  const { signupIdInstance, pageTitle } = useSignupIdManager();

  document.title = pageTitle;

  return (
    <BrandingProvider screenInstance={signupIdInstance}>
      <div className="min-h-screen flex items-center justify-center px-10 py-20">
        <Card className="w-full max-w-[400px]">
          <Header />
          <SignupForm />
          <Footer />
          <AlternativeConnections />
        </Card>
      </div>
    </BrandingProvider>
  );
};

export default SignupIdScreen;
