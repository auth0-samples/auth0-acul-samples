import React from "react";
import Logo from "@/common/Logo";

const Header: React.FC = () => {
  return (
    <>
      <Logo imageClassName="h-13" />
      <h1 className="text-2xl font-normal text-center text-text-default mt-6 mb-4">
        Login
      </h1>
      <p className="text-center text-text-default text-sm mb-4">
        Please enter your username or email address to continue with your
        account.
      </p>
    </>
  );
};

export default Header;
