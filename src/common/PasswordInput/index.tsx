import { forwardRef, useId, useState, useCallback } from "react";
import FormField from "@/common/FormField";
import Icon from "@/common/Icon";
import { EyeIcon, EyeSlashIcon } from "@/assets/icons";
import type { InputProps } from "@/common/Input";
import type { LabelProps } from "@/common/Label";
import Tooltip from "@/common/Tooltip";
import Button from "@/common/Button";

export interface PasswordInputProps {
  label: string;
  name: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  /**
   * Additional props to pass to the input element
   * Note: id, name, type, size are controlled by this component
   */
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "id" | "name" | "type" | "size"
  >;
  inputWrapperClassName?: string;
  errorTextClassName?: string;
  /**
   * Help text to display below the input
   */
  helpText?: string;
  /**
   * Whether to show the visibility toggle button
   */
  showToggle?: boolean;
  /**
   * Custom toggle button labels
   */
  toggleLabels?: {
    show: string;
    hide: string;
  };
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      name,
      error,
      className,
      inputClassName,
      labelClassName,
      inputProps: additionalInputProps,
      inputWrapperClassName,
      errorTextClassName,
      helpText,
      showToggle = true,
      toggleLabels = {
        show: "Show password",
        hide: "Hide password",
      },
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isIconButtonFocused, setIsIconButtonFocused] = useState(false);
    const generatedId = useId();

    const togglePasswordVisibility = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const handleIconFocus = useCallback(() => {
      setIsIconButtonFocused(true);
    }, []);

    const handleIconBlur = useCallback(() => {
      setIsIconButtonFocused(false);
    }, []);

    const currentIcon = showPassword ? EyeSlashIcon : EyeIcon;
    const iconTitle = showPassword ? toggleLabels.hide : toggleLabels.show;

    const formFieldLabelProps: LabelProps = {
      children: label,
      htmlFor: generatedId,
      className: labelClassName,
      forceApplyFocusStyle: isIconButtonFocused,
    };

    // Simple: just merge the props directly
    const formFieldInputProps: InputProps & {
      ref?: React.Ref<HTMLInputElement>;
    } = {
      id: generatedId,
      name: name,
      type: showPassword ? "text" : "password",
      className: inputClassName,
      placeholder: "\u00A0",
      autoComplete: "current-password",
      ref,
      ...additionalInputProps,
      ...rest,
    };

    const toggleButton = showToggle ? (
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
          <Icon As={currentIcon} />
        </Button>
      </Tooltip>
    ) : undefined;

    return (
      <FormField
        className={className}
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
