import { cn } from "@/utils/cn";

export interface LogoProps {
  className?: string; // For the container div
  altText?: string;
  src?: string; // Make src optional, can attempt to get from SDK or use fallback
  imageClassName?: string; // For the img tag itself
}

const Logo = ({
  className,
  altText = "Application Logo",
  src, // Default to Auth0 CDN logo if no src provided and SDK doesn't override
  imageClassName, // Destructure the new prop
}: LogoProps) => {
  // In a real scenario, you might fetch this from a context or SDK instance
  const defaultLogoUrl =
    "https://cdn.auth0.com/blog/auth0_by_okta_logo_black.png";
  const logoSrc = src || defaultLogoUrl;

  if (!logoSrc) {
    return null; // Or a placeholder text/icon if no logo URL is available at all
  }

  return (
    <div className={cn("flex justify-center items-center mb-6", className)}>
      <img
        src={logoSrc}
        alt={altText}
        className={cn("object-contain", imageClassName)}
      />
    </div>
  );
};

export default Logo;
