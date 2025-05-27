import React from "react";
import Button from "@/common/Button";
import CaptchaBox from "@/common/CaptchaBox";
import FormField from "@/common/FormField";
import { getFieldError } from "@/utils/errorUtils";
import { useSignupIdManager } from "../hooks/useSignupIdManager";
import { useSignupIdForm } from "../hooks/useSignupIdForm";

const SignupForm: React.FC = () => {
  const {
    handleSignup,
    requiredIdentifiers,
    optionalIdentifiers,
    errors,
    captcha,
  } = useSignupIdManager();
  const { emailRef, usernameRef, phoneNumberRef, captchaRef, getFormValues } =
    useSignupIdForm();

  const isCaptchaAvailable = !!captcha;
  const captchaImage = captcha?.image || "";

  const allIdentifiers = [
    ...(requiredIdentifiers || []),
    ...(optionalIdentifiers || []),
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formValues = getFormValues();

    // Only include fields that are actually in the form
    const payload: Record<string, string> = {};

    allIdentifiers.forEach((identifier) => {
      const value = formValues[identifier as keyof typeof formValues];
      if (value) {
        payload[identifier] = value;
      }
    });

    if (formValues.captcha) {
      payload.captcha = formValues.captcha;
    }

    handleSignup(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {allIdentifiers.includes("email") && (
        <FormField
          className="mb-4"
          labelProps={{
            children: `Email address${requiredIdentifiers?.includes("email") ? "*" : ""}`,
            htmlFor: "email-signup-id",
          }}
          inputProps={{
            id: "email-signup-id",
            name: "email",
            type: "email",
            ref: emailRef,
            autoComplete: "email",
            required: requiredIdentifiers?.includes("email"),
            autoFocus: requiredIdentifiers?.[0] === "email",
            maxLength: 100,
          }}
          error={getFieldError("email", errors)}
        />
      )}

      {allIdentifiers.includes("username") && (
        <FormField
          className="mb-4"
          labelProps={{
            children: `Username${requiredIdentifiers?.includes("username") ? "*" : ""}`,
            htmlFor: "username-signup-id",
          }}
          inputProps={{
            id: "username-signup-id",
            name: "username",
            type: "text",
            ref: usernameRef,
            autoComplete: "username",
            required: requiredIdentifiers?.includes("username"),
            autoFocus: requiredIdentifiers?.[0] === "username",
            maxLength: 100,
          }}
          error={getFieldError("username", errors)}
        />
      )}

      {allIdentifiers.includes("phone") && (
        <FormField
          className="mb-4"
          labelProps={{
            children: `Phone number${requiredIdentifiers?.includes("phone") ? "*" : ""}`,
            htmlFor: "phone-signup-id",
          }}
          inputProps={{
            id: "phone-signup-id",
            name: "phone",
            type: "tel",
            ref: phoneNumberRef,
            autoComplete: "tel",
            required: requiredIdentifiers?.includes("phone"),
            autoFocus: requiredIdentifiers?.[0] === "phone",
            maxLength: 100,
          }}
          error={getFieldError("phone", errors)}
        />
      )}

      {isCaptchaAvailable && captchaImage && (
        <CaptchaBox
          className="mb-4"
          id="captcha-input-signup-id"
          label="Enter the code shown above*"
          imageUrl={captchaImage}
          inputProps={{
            ref: captchaRef,
            required: isCaptchaAvailable,
            maxLength: 15,
          }}
          error={getFieldError("captcha", errors)}
        />
      )}

      <Button type="submit" fullWidth>
        Continue
      </Button>
    </form>
  );
};

export default SignupForm;
