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
      <h1 className="text-title [font-weight:var(--font-weight-title)] text-header [text-align:var(--text-align-header)] mt-6 mb-4">
        {title}
      </h1>
      <p className="text-body [font-weight:var(--font-weight-body)] text-body-text [text-align:var(--text-align-header)] mb-4">
        {description}
      </p>
    </>
  );
};

export default Header;
