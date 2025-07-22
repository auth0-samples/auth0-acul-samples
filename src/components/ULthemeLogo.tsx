import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

export interface ULthemeLogoProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Optional image url of the logo.
   */
  imageUrl?: string;
  /**
   * Alt Text for the logo image
   */
  altText: string;
  /**
   * Optional Classes for custom overrides
   */
  className?: string;
}

const ULthemeLogo = ({
  imageUrl,
  altText,
  className,
  ...rest
}: ULthemeLogoProps) => {
  const themedStylesAvatar = "mb-6 flex flex-wrap justify-widget-logo";
  const themedStylesAvatarImg = "h-(--height-widget-logo)";
  const ulThemeLogoSrc = extractTokenValue("--ul-theme-widget-logo-url"); // Use utility to extract the logo URL from CSS variable
  const logoSrc = ulThemeLogoSrc || imageUrl;

  return (
    <div className={cn(themedStylesAvatar, className)}>
      <Avatar className="size-auto rounded-none">
        <AvatarImage
          src={logoSrc}
          alt={altText}
          className={cn(themedStylesAvatarImg)}
          loading="eager" // Default should load an image immediately
          decoding="async" // Decode the image asynchronously
          fetchPriority="high" // Fetch the image at a high priority
          {...rest}
        />
      </Avatar>
    </div>
  );
};
export default ULthemeLogo;
