import React from "react";
import Logo from "@/common/Logo";

// No props needed as it will use the hook internally
const Header: React.FC = () => {
  return (
    <>
      <Logo imageClassName="h-13" />
      <h1 className="text-2xl font-normal text-center text-text-default mt-6 mb-4">
        Welcome
      </h1>
      <p className="text-center text-text-default text-sm mb-4">
        Please enter your username or email address to continue.
      </p>
    </>
  );
};

export default Header;
