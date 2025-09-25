import type { PasswordRuleValidation } from "@auth0/auth0-acul-react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { isGroupRuleValid } from "@/utils/helpers/passwordValidator";

export interface ULThemePasswordValidatorProps {
  /**
   * Array of password validation rules from usePasswordValidation hook
   */
  validationRules: PasswordRuleValidation[];
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
  if (!show || !validationRules.length) {
    return null;
  }

  // Check if we have a grouped structure with "contains-at-least"
  const hasContainsAtLeastRule = validationRules.some((rule) =>
    rule.code.includes("contains-at-least")
  );

  // Get sub-rules that should be nested under "contains-at-least" (only if grouped structure exists)
  const subRules = hasContainsAtLeastRule
    ? validationRules.filter((rule) =>
        [
          "password-policy-lower-case",
          "password-policy-upper-case",
          "password-policy-numbers",
          "password-policy-special-characters",
        ].includes(rule.code)
      )
    : [];

  // Get main rules - if no grouped structure, show all rules; otherwise exclude sub-rules
  const mainRules = hasContainsAtLeastRule
    ? validationRules.filter(
        (rule) =>
          ![
            "password-policy-lower-case",
            "password-policy-upper-case",
            "password-policy-numbers",
            "password-policy-special-characters",
          ].includes(rule.code)
      )
    : validationRules;

  const renderValidationItem = (
    rule: PasswordRuleValidation,
    overrideValid?: boolean
  ) => {
    const isValid = overrideValid !== undefined ? overrideValid : rule.isValid;

    return (
      <li
        key={rule.code}
        className={cn(
          "text-(length:--ul-theme-font-body-text-size) relative",
          isValid ? "list-none text-success" : "text-body-text"
        )}
      >
        {isValid && (
          <Check
            className="absolute -left-5 top-0.5 h-4 w-4 text-success"
            data-testid={`check-icon-${rule.code}`}
          />
        )}
        <span>{rule.policy}</span>
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
        {mainRules.map((rule) => {
          // Handle the "contains-at-least" rule specially
          if (rule.code.includes("contains-at-least")) {
            const containsAtLeastValid = isGroupRuleValid(validationRules);

            return (
              <li
                key={rule.code}
                className={cn(
                  "text-(length:--ul-theme-font-body-text-size) relative",
                  containsAtLeastValid
                    ? "list-none text-success"
                    : "text-body-text"
                )}
              >
                {containsAtLeastValid && (
                  <Check
                    className="absolute -left-5 top-0.5 h-4 w-4 text-success"
                    data-testid={`check-icon-${rule.code}`}
                  />
                )}
                <div>
                  <span>{rule.policy}</span>
                  {/* Render sub-rules nested under contains-at-least */}
                  <ul className="mt-1 space-y-1 pl-4 list-disc">
                    {subRules.map((subRule) => renderValidationItem(subRule))}
                  </ul>
                </div>
              </li>
            );
          }

          return renderValidationItem(rule);
        })}
      </ul>
    </div>
  );
};

ULThemePasswordValidator.displayName = "ULThemePasswordValidator";
