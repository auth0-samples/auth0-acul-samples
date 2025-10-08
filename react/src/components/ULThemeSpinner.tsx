import { Spinner } from "./ui/spinner";

export interface ULThemeSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variant of the spinner.
   */
  variant?: "dots" | "pulse" | "solid";
  /**
   * Size of the spinner.
   */
  size?: "sm" | "md" | "lg";
  /**
   * Optional class names for additional styling or overriding default styles.
   */
  className?: string;
}

const ULThemeSpinner = ({
  variant = "solid",
  size = "sm",
  className,
  ...rest
}: ULThemeSpinnerProps) => {
  return (
    <Spinner
      variant={variant}
      size={size}
      className={className}
      data-testid="ul-theme-spinner"
      {...rest}
    />
  );
};

export default ULThemeSpinner;
