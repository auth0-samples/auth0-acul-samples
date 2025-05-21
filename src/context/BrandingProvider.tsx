import React, { createContext, useContext, useEffect, useMemo } from "react";
import { getThemeValue } from "../utils/themeUtils";

interface BrandingContextValues {
  primaryColor: string;
  linkColor: string;
  pageBackground: string;
  logoUrl: string;
}

const defaultBrandingValues: BrandingContextValues = {
  primaryColor: "#635dff",
  linkColor: "#635dff",
  pageBackground: "#ffffff",
  logoUrl:
    "https://cdn.auth0.com/ulp/react-components/1.59/img/theme-generic/logo-generic.svg",
};

const BrandingContext = createContext<BrandingContextValues>(
  defaultBrandingValues,
);

interface BrandingProviderProps {
  screenInstance: any;
  children: React.ReactNode;
}

export const BrandingProvider: React.FC<BrandingProviderProps> = ({
  screenInstance,
  children,
}) => {
  const brandingValues = useMemo(() => {
    const calculatedPrimaryColor = getThemeValue(
      screenInstance,
      [
        "organization.branding.colors.primary",
        "branding.settings.colors.primary",
        "branding.themes.default.colors.primary_button",
      ],
      defaultBrandingValues.primaryColor,
    );

    let tempLinkColor = getThemeValue(
      screenInstance,
      ["branding.settings.colors.primary"],
      null,
    );

    const calculatedLinkColor =
      tempLinkColor !== null ? tempLinkColor : calculatedPrimaryColor;

    const calculatedPageBackground = getThemeValue(
      screenInstance,
      [
        "organization.branding.colors.page_background",
        "branding.themes.default.pageBackground.background_color",
        "branding.settings.colors.pageBackground",
      ],
      defaultBrandingValues.pageBackground,
    );

    const calculatedLogoUrl = getThemeValue(
      screenInstance,
      [
        "organization.branding.logo_url",
        "branding.themes.default.widget.logo_url",
      ],
      defaultBrandingValues.logoUrl,
    );

    return {
      primaryColor: calculatedPrimaryColor,
      linkColor: calculatedLinkColor,
      pageBackground: calculatedPageBackground,
      logoUrl: calculatedLogoUrl,
    };
  }, [screenInstance]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-primary",
      brandingValues.primaryColor,
    );
    document.documentElement.style.setProperty(
      "--color-link",
      brandingValues.linkColor,
    );
    document.documentElement.style.setProperty(
      "--color-background-page",
      brandingValues.pageBackground,
    );
    document.documentElement.style.setProperty(
      "--logo-url-dynamic",
      `url("${brandingValues.logoUrl}")`,
    );
    document.documentElement.style.setProperty(
      "--logo-url-string",
      brandingValues.logoUrl,
    );
  }, [brandingValues]);

  return (
    <BrandingContext.Provider value={brandingValues}>
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = (): BrandingContextValues => {
  const context = useContext(BrandingContext);
  if (context === undefined) {
    throw new Error("useBranding must be used within a BrandingProvider");
  }
  return context;
};
