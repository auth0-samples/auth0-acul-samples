import React from "react";
import Logo from "@/common/Logo";
import { useLoginIdManager } from "../hooks/useLoginIdManager";

const Header: React.FC = () => {
  const { texts } = useLoginIdManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <Logo imageClassName="h-13" altText={logoAltText} />
      <h1 className="text-2xl font-normal text-center text-text-default mt-6 mb-4">
        {texts?.title || "Welcome"}
      </h1>
      <p className="text-center text-text-default text-sm mb-4">
        {texts?.description ||
          "Log in to dev-tenant to continue to my acul react."}
      </p>
    </>
  );
};

export default Header;
