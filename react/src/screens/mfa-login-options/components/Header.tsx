import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaLoginOptionsManager } from "../hooks/useMFALoginOptionsManager";

function Header() {
  const { texts, locales } = useMfaLoginOptionsManager();

  return (
    <>
      <ULThemeTitle>{texts?.title || locales.header.title}</ULThemeTitle>
    </>
  );
}

export default Header;
