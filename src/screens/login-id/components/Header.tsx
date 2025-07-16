import React from "react";
import Logo from "@/common/Logo";
import ULThemeTitle from "@/components/ULThemeTitle";
import { useLoginIdManager } from "../hooks/useLoginIdManager";

const Header: React.FC = () => {
  const { texts } = useLoginIdManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <Logo imageClassName="h-13" altText={logoAltText} />
      <ULThemeTitle>{texts?.title || "Welcome"}</ULThemeTitle>
      <p className="text-center text-text-default text-sm mb-4">
        {texts?.description ||
          "Log in to dev-tenant to continue to my acul react."}
      </p>
    </>
  );
};

export default Header;
