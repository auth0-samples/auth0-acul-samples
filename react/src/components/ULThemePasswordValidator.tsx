import type { PasswordComplexityRule } from "@auth0/auth0-acul-react/types";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ULThemePasswordValidatorProps {
  /**
   * Array of password validation rules from usePasswordValidation hook
   */
  validationRules: PasswordComplexityRule[];
  /**
   * Optional class names for additional styling
   */
  className?: string;
  /**
   * Whether to show the validation box (only show when password has content)
   */
  show?: boolean;
  passwordSecurityText?: string;
}

export const ULThemePasswordValidator = ({
  validationRules,
  className,
  passwordSecurityText,
  show = true,
}: ULThemePasswordValidatorProps) => {
  if (!show || !validationRules || validationRules.length === 0) {
    return null;
  }

  const renderValidationItem = (rule: PasswordComplexityRule) => {
    const hasNestedItems = rule.items && rule.items.length > 0;

    return (
      <li
        key={rule.code}
        className={cn(
          "text-(length:--ul-theme-font-body-text-size) relative",
          rule.isValid ? "list-none text-success" : "text-body-text"
        )}
      >
        {rule.isValid && (
          <Check
            className="absolute -left-5 top-0.5 h-4 w-4 text-success"
            data-testid={`check-icon-${rule.code}`}
          />
        )}
        <div>
          <span>{rule.label}</span>
          {/* Render nested items if they exist */}
          {hasNestedItems && (
            <ul className="mt-1 space-y-1 pl-4 list-disc">
              {rule.items!.map((item) => (
                <li
                  key={item.code}
                  className={cn(
                    "text-(length:--ul-theme-font-body-text-size)",
                    item.isValid ? "text-success" : "text-body-text"
                  )}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </li>
    );
  };

  return (
    <div
      className={cn(
        "bg-widget-bg border border-input rounded-input p-4 mb-4",
        className
      )}
    >
      <div className="text-(length:--ul-theme-font-body-text-size) text-body-text mb-3">
        {passwordSecurityText}
      </div>

      <ul className="space-y-2 pl-4 list-disc">
        {validationRules.map((rule) => renderValidationItem(rule))}
      </ul>
    </div>
  );
};

ULThemePasswordValidator.displayName = "ULThemePasswordValidator";
