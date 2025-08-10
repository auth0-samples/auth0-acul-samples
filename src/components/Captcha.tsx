import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export interface CaptchaProps<T extends FieldValues = FieldValues> {
  label: string;
  imageUrl: string;
  imageAltText: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  sdkError?: string;
  className?: string;
}

const Captcha = <T extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  label,
  imageUrl,
  imageAltText,
  sdkError,
  className,
}: CaptchaProps<T>) => {
  // Container styles with theme
  const containerStyles = cn("space-y-2", className);

  // Image container styles with theme
  const imageContainerStyles = cn(
    "flex justify-center p-8 rounded",
    "theme-universal:bg-input-bg",
    "theme-universal:border",
    "theme-universal:border-input-border",
    "theme-universal:rounded-input"
  );

  if (!imageUrl) {
    return null;
  }

  return (
    <div className={containerStyles}>
      <div className={imageContainerStyles}>
        <img src={imageUrl} alt={imageAltText} className="object-contain" />
      </div>
      <FormField
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <FormItem>
            <ULThemeFloatingLabelField
              {...field}
              label={label}
              type="text"
              autoComplete="off"
              error={!!fieldState.error || !!sdkError}
            />
            <ULThemeFormMessage
              className="mt-1"
              sdkError={sdkError}
              hasFormError={!!fieldState.error}
            />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Captcha;
