import { cn } from "@/lib/utils";

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
  // Get logo URL from CSS variable (theme system sets this)
  const getCSSVariable = (varName: string): string => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim()
      .replace(/^"(.*)"$/, "$1"); // Remove quotes
  };

  const logoFromCSS = getCSSVariable("--ul-theme-widget-logo-url");
  const logoSrc = imageUrl || logoFromCSS;

  return (
    <div className={cn("flex justify-center items-center mb-6", className)}>
      <img
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
