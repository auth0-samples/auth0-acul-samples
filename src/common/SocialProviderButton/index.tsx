import React from "react";

export interface SocialProviderButtonProps {
  providerName: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const SocialProviderButton: React.FC<SocialProviderButtonProps> = ({
  providerName,
  icon,
  onClick,
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "flex items-center justify-start w-full max-w-[320px] h-[52px] py-[14px] px-[16px] border rounded gap-x-4 focus:outline-none transition-colors duration-150 ease-in-out focus:ring-4 focus:ring-primary/15";

  const enabledStyles =
    "bg-white border-gray-mid text-text-default hover:bg-gray-mid/20 focus:bg-primary/15 cursor-pointer";

  const disabledStyles =
    "bg-gray-mid/10 border-gray-mid/50 text-text-secondary cursor-not-allowed";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${disabled ? disabledStyles : enabledStyles}
      ${className}`}
      aria-label={`Continue with ${providerName}`}
    >
      {icon}
      <span className="font-normal text-base">{`Continue with ${providerName}`}</span>
    </button>
  );
};

export default SocialProviderButton;
