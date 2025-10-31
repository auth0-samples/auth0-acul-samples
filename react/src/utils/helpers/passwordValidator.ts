import type { PasswordComplexityRule } from "@auth0/auth0-acul-react/types";

/**
 * Extract required count from "contains-at-least" rule
 * @param rule - The rule to extract count from
 * @returns The required count (1-10), defaults to 1 for invalid input
 */
const extractRequiredCount = (
  rule: PasswordComplexityRule | undefined
): number => {
  const count = rule?.args?.count || 1;
  return Math.max(1, Math.min(count, 10));
};

/**
 * Check if grouped rules meet the "contains-at-least" requirement
 */
export const isGroupRuleValid = (
  validationRules: PasswordComplexityRule[] | null | undefined
): boolean => {
  if (!validationRules || validationRules.length === 0) {
    return false;
  }

  const PASSWORD_RULE_CODES = [
    "password-policy-lower-case",
    "password-policy-upper-case",
    "password-policy-numbers",
    "password-policy-special-characters",
  ];

  const groupedRules = validationRules.filter((rule) =>
    PASSWORD_RULE_CODES.includes(rule.code)
  );

  const containsAtLeastRule = validationRules.find((rule) =>
    rule.code.includes("contains-at-least")
  );

  if (!containsAtLeastRule || groupedRules.length === 0) {
    return false;
  }

  const requiredCount = extractRequiredCount(containsAtLeastRule);
  const validGroupedRulesCount = groupedRules.filter(
    (rule) => rule.isValid
  ).length;

  return validGroupedRulesCount >= requiredCount;
};

/**
 * Check if all password validation rules are satisfied
 */
export const isPasswordValid = (
  validationRules: PasswordComplexityRule[]
): boolean => {
  if (!validationRules || validationRules.length === 0) {
    return false;
  }

  // Separate grouped rules from individual rules
  const groupedRuleCodes = [
    "password-policy-lower-case",
    "password-policy-upper-case",
    "password-policy-numbers",
    "password-policy-special-characters",
  ];

  const individualRules = validationRules.filter(
    (rule: PasswordComplexityRule) =>
      !groupedRuleCodes.includes(rule.code) &&
      !rule.code.includes("contains-at-least")
  );

  const groupedRules = validationRules.filter((rule: PasswordComplexityRule) =>
    groupedRuleCodes.includes(rule.code)
  );

  const containsAtLeastRule = validationRules.find(
    (rule: PasswordComplexityRule) => rule.code.includes("contains-at-least")
  );

  // Check individual rules (like minimum length, no identical characters, etc.)
  const individualRulesValid = individualRules.every(
    (rule: PasswordComplexityRule) => rule.isValid
  );

  // Handle grouped rules validation
  let groupedRulesValid = true;
  if (containsAtLeastRule && groupedRules.length > 0) {
    const requiredCount = extractRequiredCount(containsAtLeastRule);
    const validGroupedRulesCount = groupedRules.filter(
      (rule: PasswordComplexityRule) => rule.isValid
    ).length;
    groupedRulesValid = validGroupedRulesCount >= requiredCount;
  } else if (groupedRules.length > 0) {
    // If no "contains-at-least" rule but we have grouped rules, all must be valid
    groupedRulesValid = groupedRules.every(
      (rule: PasswordComplexityRule) => rule.isValid
    );
  }

  return individualRulesValid && groupedRulesValid;
};
