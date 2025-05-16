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
    "flex items-center justify-start w-full max-w-[320px] h-[52px] py-[14px] px-[16px] border rounded gap-x-4 focus:outline-none transition-colors duration-150 ease-in-out";

  const enabledStyles =
    "bg-white border-gray-mid text-gray-800 hover:bg-gray-100 focus:border-link focus:ring-1 focus:ring-link focus:ring-opacity-50 cursor-pointer";

  const disabledStyles =
    "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed";

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
