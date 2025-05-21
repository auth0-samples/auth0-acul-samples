import React from "react";
import Logo from "@/common/Logo";

const Header: React.FC = () => {
  return (
    <>
      <Logo imageClassName="h-13" />
      <h1 className="text-2xl font-normal text-center text-text-default mt-6 mb-4">
        Enter your password
      </h1>
      <p className="text-center text-text-default text-sm mb-4">
        Please enter your password to continue.
      </p>
    </>
  );
};

export default Header;
