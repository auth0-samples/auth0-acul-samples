import { cn } from "@/utils/cn";
import { useBranding } from "@/context/BrandingProvider";

export interface LogoProps {
  className?: string;
  altText?: string;
  src?: string;
  imageClassName?: string;
  width?: string | number;
  height?: string | number;
}

const Logo = ({
  className,
  altText = "Application Logo",
  width = 80,
  height = 80,
  src,
  imageClassName,
}: LogoProps) => {
  const { logoUrl } = useBranding();

  const defaultLogoUrl =
    "https://cdn.auth0.com/ulp/react-components/1.59/img/theme-generic/logo-generic.svg";
  const logoSrc = src || logoUrl || defaultLogoUrl;

  if (!logoSrc) {
    return null;
  }

  return (
    <div className={cn("flex justify-center items-center mb-6", className)}>
      <img
        width={width}
        height={height}
        src={logoSrc}
        alt={altText}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className={cn(
          "object-contain max-w-full max-h-full aspect-square",
          imageClassName,
        )}
      />
    </div>
  );
};

export default Logo;
