import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaLoginOptionsManager } from "../hooks/useMFALoginOptionsManager";

function Header() {
  const { texts } = useMfaLoginOptionsManager();

  return (
    <>
      <ULThemeTitle>
        {texts?.title || "Select a method to verify your identity"}
      </ULThemeTitle>
      <ULThemeSeparator />
    </>
  );
}

export default Header;
