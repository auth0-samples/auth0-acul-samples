import React from "react";
import Logo from "@/common/Logo";
import { useLoginIdManager } from "../hooks/useLoginIdManager";

const Header: React.FC = () => {
  const { title, description, texts } = useLoginIdManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <Logo imageClassName="h-13" altText={logoAltText} />
      <h1 className="text-2xl font-normal text-center text-text-default mt-6 mb-4">
        {title}
      </h1>
      <p className="text-center text-text-default text-sm mb-4">
        {description}
      </p>
    </>
  );
};

export default Header;
