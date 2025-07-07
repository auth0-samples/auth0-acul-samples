import { forwardRef, useId, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import Button from "@/common/Button";
import { EyeIcon, EyeSlashIcon } from "@/assets/icons";
import Icon from "@/common/Icon";
import Tooltip from "@/common/Tooltip";
import FormField from "@/common/FormField";
import type { InputProps } from "@/common/Input";
import type { LabelProps } from "@/common/Label";

export interface PasswordInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "id" | "name" | "type" | "size"
  > {
  id?: string;
  name?: string;
  className?: string;
  showPasswordText?: string;
  hidePasswordText?: string;
  /**
   * Additional props to pass to the input element
   * Note: id, name, type, size are controlled by this component
   */
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "id" | "name" | "type" | "size"
  >;
  label: string;
  error?: string;
  inputClassName?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
  errorTextClassName?: string;
  /**
   * Help text to display below the input
   */
  helpText?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      id,
      name = "password",
      className,
      showPasswordText = "Show password",
      hidePasswordText = "Hide password",
      inputProps,
      label,
      error,
      inputClassName,
      labelClassName,
      inputWrapperClassName,
      errorTextClassName,
      helpText,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [showPassword, setShowPassword] = useState(false);
    const [isIconButtonFocused, setIsIconButtonFocused] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const handleIconFocus = useCallback(() => {
      setIsIconButtonFocused(true);
    }, []);

    const handleIconBlur = useCallback(() => {
      setIsIconButtonFocused(false);
    }, []);

    // Use proper icons and text based on state
    const currentIcon = showPassword ? EyeSlashIcon : EyeIcon;
    const iconTitle = showPassword ? hidePasswordText : showPasswordText;

    const formFieldLabelProps: LabelProps = {
      children: label,
      htmlFor: inputId,
      className: labelClassName,
      forceApplyFocusStyle: isIconButtonFocused,
    };

    const formFieldInputProps: InputProps = {
      id: inputId,
      name: name,
      type: showPassword ? "text" : "password",
      className: inputClassName,
      placeholder: "\u00A0",
      autoComplete: "current-password",
      ...inputProps,
      ...rest,
    };

    const toggleButton = (
      <Tooltip text={iconTitle} position="top">
        <Button
          variant="icon"
          type="button"
          onClick={togglePasswordVisibility}
          aria-label={iconTitle}
          onFocus={handleIconFocus}
          onBlur={handleIconBlur}
          tabIndex={0}
        >
          <Icon
            As={currentIcon}
            className="h-5 w-5 text-icons"
            title={iconTitle}
          />
        </Button>
      </Tooltip>
    );

    return (
      <FormField
        ref={ref}
        className={cn(className)}
        labelProps={formFieldLabelProps}
        inputProps={formFieldInputProps}
        error={error}
        helpText={helpText}
        isParentFocused={isIconButtonFocused}
        inputWrapperClassName={inputWrapperClassName}
        errorTextClassName={errorTextClassName}
        inputIcon={toggleButton}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
