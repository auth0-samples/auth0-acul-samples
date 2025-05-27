import React from "react";
import Logo from "@/common/Logo";
import { useLoginManager } from "../hooks/useLoginManager";

const Header: React.FC = () => {
  const { title, description } = useLoginManager();

  return (
    <>
      <Logo imageClassName="h-13" />
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
