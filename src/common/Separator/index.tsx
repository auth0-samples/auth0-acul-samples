import { cn } from "@/lib/utils";

export interface SeparatorProps {
  text?: string; // Optional text to display in the middle of the separator
  className?: string;
  textClassName?: string;
  lineClassName?: string;
}

const Separator = ({
  text,
  className = "my-6",
  textClassName = "px-2 text-xs text-text-default uppercase",
  lineClassName = "border-gray-mid",
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
