import { cn } from "@/utils/helpers/cn";

interface LogoProps {
  imageUrl?: string;
  altText: string;
  className?: string;
  imageClassName?: string;
}

const Logo: React.FC<LogoProps> = ({
  imageUrl,
  altText,
  className,
  imageClassName,
}) => {
  // Get logo URL from Auth0 theme system
  const getThemeLogoUrl = (): string => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue("--ul-theme-widget-logo-url")
      .trim()
      .replace(/^"(.*)"$/, "$1"); // Remove quotes from CSS string
  };

  // Get logo position from Auth0 theme system (via Tailwind semantic variable)
  const getLogoPosition = (): string => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue("--ul-theme-widget-logo-position")
      .trim();
  };

  const logoSrc = imageUrl || getThemeLogoUrl();
  const logoPosition = getLogoPosition();

  // Hide logo completely when position is "none"
  if (logoPosition === "none") {
    return null;
  }

  return (
    <div
      className={cn("flex items-center mb-6", className)}
      style={{ justifyContent: "var(--justify-widget-logo)" }}
    >
      <img
        src={logoSrc}
        alt={altText}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className={cn(
          "object-contain max-w-full aspect-square h-widget-logo",
          imageClassName,
        )}
      />
    </div>
  );
};

export default Logo;
