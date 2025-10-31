import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import type { CaptchaResponse, CaptchaWidgetProps } from "../index";

const SimpleCaptchaWidget = <T extends FieldValues = FieldValues>({
  config,
  onCaptchaResponse,
  control,
  name,
  rules,
  label = "",
  error,
  className = "",
}: CaptchaWidgetProps<T>) => {
  if (config.provider !== "auth0") {
    return null;
  }

  const imageUrl = config.image;
  const captchaImageAlt = "CAPTCHA challenge";
  // Image container styles with theme
  const imageContainerStyles = cn(
    "flex justify-center p-8 rounded",
    "theme-universal:bg-input-bg",
    "theme-universal:border",
    "theme-universal:border-input-border",
    "theme-universal:rounded-input"
  );

  // Handle input change for auth0 v1 (image captcha)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const response: CaptchaResponse = {
      provider: "auth0",
      answer: value,
    };
    onCaptchaResponse(response);
  };

  // Combine react-hook-form onChange with our custom onChange
  const combinedOnChange =
    (field: ControllerRenderProps<T, Path<T>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Call our custom handler first
      handleInputChange(event);
      field.onChange(event); // Then call react-hook-form's onChange
    };

  return (
    <div className={cn("space-y-2", className)}>
      {imageUrl && (
        <div className={imageContainerStyles}>
          <img
            src={imageUrl}
            alt={captchaImageAlt}
            className={cn("object-contain")}
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
              onChange={combinedOnChange(field)} // Use the combined onChange
              label={label}
              type="text"
              autoComplete="off"
              error={!!fieldState.error || !!error}
            />
            <ULThemeFormMessage
              className="mt-1"
              sdkError={error}
              hasFormError={!!fieldState.error}
            />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SimpleCaptchaWidget;
