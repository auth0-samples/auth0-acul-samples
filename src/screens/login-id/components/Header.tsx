import React from "react";
import Logo from "@/common/Logo";
import { useLoginIdManager } from "../hooks/useLoginIdManager";

const Header: React.FC = () => {
  const { title, description, texts } = useLoginIdManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <Logo altText={logoAltText} />
      <h1 className="text-2xl font-normal [text-align:var(--text-align-header)] [color:var(--ul-theme-color-header)] mt-6 mb-4">
        {title}
      </h1>
      <p className="[text-align:var(--text-align-header)] [color:var(--ul-theme-color-body-text)] text-sm mb-4">
        {description}
      </p>
    </>
  );
};

export default Header;
