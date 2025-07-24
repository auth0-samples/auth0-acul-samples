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
  AmazonIcon,
  AdIcon,
  AdfsIcon,
  AolIcon,
  Auth0OIDCIcon,
  BaiduIcon,
  BitbucketIcon,
  BoxIcon,
  DaccountIcon,
  DropboxIcon,
  DwollaIcon,
  EbayIcon,
  EvernoteIcon,
  ExactIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  FitbitIcon,
  IpIcon,
  MiicardIcon,
  Oauth2Icon,
  Office365Icon,
  OidcIcon,
  OktaIcon,
  PaypalIcon,
  PingfederateIcon,
  PlanningcenterIcon,
  RenrenIcon,
  SalesforceIcon,
  SamlpIcon,
  SharepointIcon,
  ShopifyIcon,
  SoundcloudIcon,
  SpotifyIcon,
  ThecityIcon,
  ThirtysevensignalsIcon,
  VkontakteIcon,
  WaadIcon,
  WeiboIcon,
  WordpressIcon,
  YahooIcon,
  YammerIcon,
  YandexIcon,
} from "@/assets/icons";

export const getIcon = (name: string): ReactNode => {
  switch (name.toLowerCase()) {
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
    case "amazon":
      return <AmazonIcon />;
    case "ad":
      return <AdIcon />;
    case "adfs":
      return <AdfsIcon />;
    case "aol":
      return <AolIcon />;
    case "auth0oidc":
      return <Auth0OIDCIcon />;
    case "baidu":
      return <BaiduIcon />;
    case "bitbucket":
      return <BitbucketIcon />;
    case "box":
      return <BoxIcon />;
    case "daccount":
      return <DaccountIcon />;
    case "dropbox":
      return <DropboxIcon />;
    case "dwolla":
      return <DwollaIcon />;
    case "ebay":
      return <EbayIcon />;
    case "evernote":
      return <EvernoteIcon />;
    case "exact":
      return <ExactIcon />;
    case "exclamationcircle":
      return <ExclamationCircleIcon />;
    case "eye":
      return <EyeIcon />;
    case "eyeslash":
      return <EyeSlashIcon />;
    case "fitbit":
      return <FitbitIcon />;
    case "ip":
      return <IpIcon />;
    case "miicard":
      return <MiicardIcon />;
    case "oauth2":
      return <Oauth2Icon />;
    case "office365":
      return <Office365Icon />;
    case "oidc":
      return <OidcIcon />;
    case "okta":
      return <OktaIcon />;
    case "paypal":
      return <PaypalIcon />;
    case "pingfederate":
      return <PingfederateIcon />;
    case "planningcenter":
      return <PlanningcenterIcon />;
    case "renren":
      return <RenrenIcon />;
    case "salesforce":
      return <SalesforceIcon />;
    case "samlp":
      return <SamlpIcon />;
    case "sharepoint":
      return <SharepointIcon />;
    case "shopify":
      return <ShopifyIcon />;
    case "soundcloud":
      return <SoundcloudIcon />;
    case "spotify":
      return <SpotifyIcon />;
    case "thecity":
      return <ThecityIcon />;
    case "thirtysevensignals":
      return <ThirtysevensignalsIcon />;
    case "vkontakte":
      return <VkontakteIcon />;
    case "waad":
      return <WaadIcon />;
    case "weibo":
      return <WeiboIcon />;
    case "wordpress":
      return <WordpressIcon />;
    case "yahoo":
      return <YahooIcon />;
    case "yammer":
      return <YammerIcon />;
    case "yandex":
      return <YandexIcon />;
    default:
      return <DefaultConnectionIcon />;
  }
};
