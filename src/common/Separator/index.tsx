import { cn } from "@/utils/helpers/cn";

export interface SeparatorProps {
  text?: string; // Optional text to display in the middle of the separator
  className?: string;
  textClassName?: string;
  lineClassName?: string;
}

const Separator = ({
  text,
  className = "my-6",
  textClassName = "px-2 text-xs [color:var(--ul-theme-color-body-text)] uppercase",
  lineClassName = "[border-color:var(--ul-theme-color-widget-border)]",
}: SeparatorProps) => {
  if (text) {
    return (
      <div className={cn("relative flex items-center", className)}>
        <div className={cn("flex-grow border-t", lineClassName)} />
        <span className={cn("flex-shrink", textClassName)}>{text}</span>
        <div className={cn("flex-grow border-t", lineClassName)} />
      </div>
    );
  }

  return <hr className={cn(className, lineClassName)} />;
};

export default Separator;
