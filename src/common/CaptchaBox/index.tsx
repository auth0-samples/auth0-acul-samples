import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export interface CaptchaBoxProps<T extends FieldValues = FieldValues> {
  label: string;
  imageUrl: string;
  imageAltText: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  sdkError?: string;
  className?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
}

const CaptchaBox = <T extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  label,
  imageUrl,
  imageAltText,
  sdkError,
  className,
  imageWrapperClassName,
  imageClassName,
  inputWrapperClassName,
  inputClassName,
}: CaptchaBoxProps<T>) => {
  return (
    <div className={cn("space-y-2", className)}>
      {!!imageUrl && (
        <div
          className={cn(
            "flex justify-center border border-gray-mid rounded p-8 bg-background-widget",
            imageWrapperClassName
          )}
        >
          <img
            src={imageUrl}
            alt={imageAltText}
            className={cn("object-contain", imageClassName)}
          />
        </div>
      )}
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
              className={inputClassName}
              wrapperClassName={inputWrapperClassName}
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

export default CaptchaBox;
