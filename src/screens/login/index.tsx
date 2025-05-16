import Button from "@/common/Button";
import FormField from "@/common/FormField";
import Card from "@/common/Card";
import PasswordInput from "@/common/PasswordInput";
import Logo from "@/common/Logo";
import CaptchaBox from "@/common/CaptchaBox";
import Separator from "@/common/Separator";
import { useLoginManager } from "./hooks/useLoginManager";
import { useLoginForm } from "./hooks/useLoginForm";
import SocialProviderButton from "@/common/SocialProviderButton";
import { getIcon } from "@/utils/iconUtils";
import { BrandingProvider } from "@/context/BrandingProvider";
import Alert from "@/common/Alert";

const LoginScreen: React.FC = () => {
  const { handleLogin, handleSocialLogin, loginInstance } = useLoginManager();
  const { usernameRef, passwordRef, captchaRef, getFormValues } =
    useLoginForm();

  const onLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password, captcha } = getFormValues();
    handleLogin(username, password, captcha);
  };

  // CAPTCHA related variables
  const texts = loginInstance?.screen?.texts || {};
  const isCaptchaAvailable = !!loginInstance?.screen?.captcha;
  const captchaImage = loginInstance?.screen?.captcha?.image || "";
  const captchaLabelText =
    (texts.captchaCodePlaceholder || "Enter the code shown above") + "*";

  // Prepare global messages for the Alert component
  // Attempt to get screen messages, default to empty array if undefined
  const screenMessages: { type: string; text: string }[] =
    (loginInstance?.screen as any)?.messages || [];
  const firstErrorMessage = screenMessages.find(
    (m: { type: string; text: string }) => m.type === "error",
  );

  // Additionally, check for a general pageError from the loginInstance
  const pageError = (loginInstance as any)?.pageError;
  let errorMessageToShow: string | undefined = firstErrorMessage?.text;
  if (!errorMessageToShow && typeof pageError === "string" && pageError) {
    errorMessageToShow = pageError;
  }
  // TODO: Potentially handle other message types (warning, info, success) or multiple messages.

  return (
    <BrandingProvider screenInstance={loginInstance}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-[400px] bg-background-widget rounded shadow-md px-10 py-10">
          <Logo imageClassName="h-13" />
          <h1 className="text-2xl font-normal text-center text-text-default mt-6 mb-4">
            {loginInstance?.screen?.texts?.title || "Welcome"}
          </h1>
          <p className="text-center text-text-default text-sm mb-4">
            {loginInstance?.screen?.texts?.description || "Log in to continue."}
          </p>

          {errorMessageToShow && (
            <Alert
              type="error"
              message={errorMessageToShow}
              title={
                loginInstance?.screen?.texts?.alertListTitle ||
                texts.titleLoginError ||
                "Login Error"
              }
              className="mb-4"
            />
          )}

          <form onSubmit={onLoginClick} className="space-y-4">
            <FormField
              className="mb-4"
              labelProps={{
                children: `${loginInstance?.screen?.texts?.phoneOrUsernameOrEmailPlaceholder || "Phone or Username or Email"}*`,
                htmlFor: "email-login",
              }}
              inputProps={{
                id: "email-login",
                name: "email",
                type: "email",
                ref: usernameRef,
                placeholder: "\u00A0",
                autoComplete: "email",
                className: "border-gray-mid focus:ring-link focus:border-link",
              }}
              inputWrapperClassName="mt-1 rounded-md shadow-sm"
              errorTextClassName="mt-2 text-sm text-error"
            />

            <PasswordInput
              className="mb-4"
              label={`${loginInstance?.screen?.texts?.passwordPlaceholder || "Password"}*`}
              name="password"
              inputProps={{
                ref: passwordRef,
                autoComplete: "current-password",
              }}
              inputClassName="border-gray-mid focus:ring-link focus:border-link"
              inputWrapperClassName="mt-1 rounded-md shadow-sm"
              errorTextClassName="mt-2 text-sm text-error"
            />

            {isCaptchaAvailable && captchaImage && (
              <CaptchaBox
                className="mb-4 space-y-2"
                id="captcha-input-login"
                label={captchaLabelText}
                imageUrl={captchaImage}
                inputProps={{
                  ref: captchaRef,
                }}
                inputClassName="border-gray-mid focus:ring-link focus:border-link"
                imageWrapperClassName="flex justify-center border border-gray-mid rounded p-8 bg-background-widget"
                imageClassName="h-16 object-contain"
                inputWrapperClassName="mt-1 rounded-md shadow-sm"
                errorTextClassName="mt-2 text-sm text-error"
              />
            )}
            <div className="mt-6 text-left font-bold">
              <Button variant="link" size="lg" className="font-bold text-sm">
                {loginInstance?.screen?.texts?.forgotPasswordText ||
                  "Forgot password?"}
              </Button>
            </div>
            <Button type="submit" fullWidth>
              {loginInstance?.screen?.texts?.buttonText || "Continue"}
            </Button>
          </form>

          <div className="mt-4 text-left">
            <span className="text-sm">
              {loginInstance?.screen?.texts?.dontHaveAccountText ||
                "Don't have an account?"}
            </span>{" "}
            <Button variant="link" size="sm" className="px-1 font-bold">
              {loginInstance?.screen?.texts?.signUpText || "Sign up"}
            </Button>
          </div>

          <Separator text="OR" />

          <div className="space-y-3">
            {loginInstance?.transaction?.alternateConnections?.map(
              (connection) => (
                <SocialProviderButton
                  key={connection.name}
                  providerName={
                    connection?.strategy?.charAt(0)?.toUpperCase() +
                    connection?.strategy?.slice(1)
                  } /* Capitalize the first letter of the strategy */
                  icon={getIcon(connection.name)}
                  onClick={() => handleSocialLogin(connection.name)}
                />
              ),
            )}
          </div>
        </Card>
      </div>
    </BrandingProvider>
  );
};

export default LoginScreen;
