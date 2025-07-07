import FormField from "@/common/FormField";
import type { InputProps } from "@/common/Input";
import type { LabelProps } from "@/common/Label";
import { cn } from "@/lib/utils";

export interface CaptchaBoxProps {
  label: string;
  name?: string;
  id?: string;
  error?: string;
  imageUrl: string;
  imageAltText: string;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
  /**
   * Additional props to pass to the input element
   * Note: id, name, type, value, onChange, size are controlled by this component
   */
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "id" | "name" | "type" | "size"
  >;
  className?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  inputWrapperClassName?: string;
  errorTextClassName?: string;
  inputClassName?: string;
}

// No forwardRef needed - react-hook-form's register() provides the ref through inputProps
const CaptchaBox: React.FC<CaptchaBoxProps> = ({
  label,
  name = "captcha",
  id = "captcha-input",
  error,
  imageUrl,
  imageAltText,
  onInputChange,
  inputValue,
  inputProps,
  className,
  imageWrapperClassName,
  imageClassName,
  inputWrapperClassName,
  errorTextClassName,
  inputClassName,
}) => {
  const formFieldLabelProps: LabelProps = {
    children: label,
    htmlFor: id,
  };

  const formFieldInputProps: InputProps = {
    id: id,
    name: name,
    type: "text",
    className: inputClassName,
    value: inputValue,
    onChange: onInputChange,
    placeholder: "\u00A0",
    autoComplete: "off",
    ...inputProps, // This includes the ref from register()
  };

  const currentImageUrl = imageUrl;

  return (
    <div className={cn("space-y-2", className)}>
      {currentImageUrl && (
        <div
          className={cn(
            "flex justify-center border border-gray-mid rounded p-8 bg-background-widget",
            imageWrapperClassName,
          )}
        >
          <img
            src={currentImageUrl}
            alt={imageAltText}
            className={cn("object-contain", imageClassName)}
          />
        </div>
      )}
      <FormField
        labelProps={formFieldLabelProps}
        inputProps={formFieldInputProps}
        error={error}
        inputWrapperClassName={inputWrapperClassName}
        errorTextClassName={errorTextClassName}
      />
    </div>
  );
};

CaptchaBox.displayName = "CaptchaBox";

export default CaptchaBox;
