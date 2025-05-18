import React, { useId, useState } from "react";
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
  inputProps?: Omit<InputProps, "id" | "name" | "type" | "value" | "onChange"> &
    React.InputHTMLAttributes<HTMLInputElement>;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputWrapperClassName?: string;
  errorTextClassName?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  error,
  className,
  inputClassName,
  labelClassName,
  inputProps: additionalInputProps,
  value,
  onChange,
  inputWrapperClassName,
  errorTextClassName,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isIconButtonFocused, setIsIconButtonFocused] = useState(false);
  const generatedId = useId();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const currentIcon = showPassword ? EyeSlashIcon : EyeIcon;
  const iconTitle = showPassword ? "Hide password" : "Show password";

  const formFieldLabelProps: LabelProps = {
    children: label,
    htmlFor: generatedId,
    className: labelClassName,
    forceApplyFocusStyle: isIconButtonFocused,
  };

  const formFieldInputProps: InputProps = {
    id: generatedId,
    name: name,
    type: showPassword ? "text" : "password",
    className: inputClassName,
    placeholder: "\u00A0",
    ...additionalInputProps,
    value,
    onChange,
  };

  return (
    <FormField
      className={className}
      labelProps={formFieldLabelProps}
      inputProps={formFieldInputProps}
      error={error}
      isParentFocused={isIconButtonFocused}
      inputWrapperClassName={inputWrapperClassName}
      errorTextClassName={errorTextClassName}
      inputIcon={
        <Tooltip text={iconTitle} position="top">
          <Button
            variant="icon"
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={iconTitle}
            onFocus={() => setIsIconButtonFocused(true)}
            onBlur={() => setIsIconButtonFocused(false)}
          >
            <Icon As={currentIcon} />
          </Button>
        </Tooltip>
      }
    />
  );
};

export default PasswordInput;
