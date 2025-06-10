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
  const defaultImageUrl =
    "https://cdn.auth0.com/ulp/react-components/1.59/img/theme-generic/logo-generic.svg";

  const finalImageUrl = imageUrl || defaultImageUrl;

  return (
    <div className={cn("flex justify-center items-center mb-6", className)}>
      <img
        src={finalImageUrl}
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
