import { cn } from "@/lib/utils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { Avatar, AvatarImage } from "./ui/avatar";

export interface ULThemeLogoProps
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

const ULThemeLogo = ({
  imageUrl,
  altText,
  className,
  ...rest
}: ULThemeLogoProps) => {
  // Using extractTokenValue utility to extract the logo URL, Logo Visible flags from CSS variable
  const themedLogoSrcValue = extractTokenValue("--ul-theme-widget-logo-url");
  const isLogoHidden =
    extractTokenValue("--ul-theme-widget-logo-position") === "none";
  const themedStylesAvatar = "flex flex-wrap justify-widget-logo";
  const themedStylesAvatarImg = "h-(--height-widget-logo)";
  const logoSrc = themedLogoSrcValue || imageUrl;

  return (
    !isLogoHidden && (
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
    )
  );
};
export default ULThemeLogo;
