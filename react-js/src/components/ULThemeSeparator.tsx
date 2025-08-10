import { cn } from "@/lib/utils";

export interface ULThemeSeparatorProps {
  /**
   * Optional text to display in the middle of the separator
   */
  text?: string;
  /**
   * Optional class names for additional styling or overriding default styles
   */
  className?: string;
}

const ULThemeSeparator = ({ text, className }: ULThemeSeparatorProps) => {
  // Base styles
  const containerStyles = "relative flex items-center my-4";

  // Theme overrides for line
  const themedLineStyles = cn(
    "flex-grow border-t",
    "theme-universal:border-input-border"
  );

  // Theme overrides for text
  const themedTextStyles = cn(
    "flex-shrink px-2",
    "theme-universal:text-body-text",
    "theme-universal:text-(length:--ul-theme-font-body-text-size)",
    "theme-universal:font-body"
  );

  if (text) {
    return (
      <div className={cn(containerStyles, className)}>
        <div className={themedLineStyles} />
        <span className={themedTextStyles}>{text}</span>
        <div className={themedLineStyles} />
      </div>
    );
  }

  return <hr className={cn("my-4", themedLineStyles, className)} />;
};

export default ULThemeSeparator;
