import type { ReactNode } from "react";

import {
  AppleIcon,
  DefaultConnectionIcon,
  DuolingoIcon,
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  InstagramIcon,
  LinkedinIcon,
  MicrosoftIcon,
  PasskeyIcon,
  SlackIcon,
  TwitterIcon,
} from "@/assets/icons";

export const getIcon = (strategy: string): ReactNode => {
  switch (strategy.toLowerCase()) {
    case "google-oauth2":
      return <GoogleIcon />;
    case "twitter":
      return <TwitterIcon />;
    case "windowslive":
    case "microsoft-account":
    case "azureadv2":
    case "microsoft":
      return <MicrosoftIcon />;
    case "passkey":
      return <PasskeyIcon />;
    case "apple":
      return <AppleIcon />;
    case "linkedin":
    case "linkedin-oauth2":
      return <LinkedinIcon />;
    case "slack":
      return <SlackIcon />;
    case "instagram":
      return <InstagramIcon />;
    case "facebook":
      return <FacebookIcon />;
    case "github":
      return <GithubIcon />;
    case "duolingo":
      return <DuolingoIcon />;
    default:
      return <DefaultConnectionIcon />;
  }
};
